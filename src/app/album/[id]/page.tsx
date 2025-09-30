'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronBack, IoChevronForward, IoLockClosed } from 'react-icons/io5';
import { BsCalendar } from 'react-icons/bs';
import { Photo } from '@/types/app/album';
import { getImagesByAlbumIdAPI } from '@/api/album';
import Masonry from 'react-masonry-css';
import Empty from '@/components/Empty';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import './page.scss';

const breakpointColumnsObj = {
  default: 4,
  1024: 3,
  700: 2,
};

interface Props {
  params: Promise<{ id: number }>;
  searchParams: Promise<{ page: number; name: string; password?: string }>;
}

export default function AlbumPage(props: Props) {
  const router = useRouter();
  const [list, setList] = useState<Photo[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [albumName, setAlbumName] = useState('');
  const [albumId, setAlbumId] = useState<number>(0);

  // 密码相关状态
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const initData = async () => {
      const searchParams = await props.searchParams;
      const params = await props.params;

      setAlbumName(searchParams.name);
      setAlbumId(params.id);
      // 如果URL中有密码参数，则使用该密码并验证
      if (searchParams.password) {
        const decodedPassword = decodeURIComponent(searchParams.password);
        setPassword(decodedPassword);
        // 验证密码是否正确
        const isValid = await getImagesByAlbumId(params.id, 1, false, decodedPassword);
        if (!isValid) {
          setShowPasswordModal(true);
          setPasswordError('密码错误');
        }
      } else {
        await getImagesByAlbumId(params.id);
      }
    };
    initData();
  }, [props.searchParams, props.params]);

  const getImagesByAlbumId = async (id: number, page: number = 1, isLoadMore: boolean = false, albumPassword: string = '') => {
    try {
      setLoading(true);
      const response = await getImagesByAlbumIdAPI(id, page, 10, albumPassword);

      if (!response) return;

      // 检查是否需要密码
      if (response.code === 401) {
        setShowPasswordModal(true);
        // 只有在提供了密码但密码错误时才显示错误提示
        if (albumPassword) {
          setPasswordError('密码错误');
        }
        setLoading(false);
        return false; // 返回 false 表示密码验证失败
      }
      const { data } = response;
      // 按照sort字段排序
      const sortedImages = [...data.result].sort((a, b) => {
        const sortA = a.sort !== undefined ? a.sort : Infinity;
        const sortB = b.sort !== undefined ? b.sort : Infinity;
        return sortA - sortB;
      });
      if (isLoadMore) {
        setList((prev) => [...prev, ...sortedImages]);
      } else {
        setList(sortedImages);
      }

      setHasMore(data.result.length === 10);
      // 如果是通过密码验证获取的数据，隐藏密码模态框
      if (showPasswordModal && albumPassword) {
        setShowPasswordModal(false);
        setPassword(''); // 清空密码输入框
        setPasswordError(''); // 清除错误信息
      }
      
      return true; // 返回 true 表示成功获取数据
    } catch (error: any) {
      console.error('Failed to fetch images:', error);
      // 如果是密码错误，显示错误信息
      if (error?.response?.status === 401) {
        setPasswordError('密码错误');
      }
      return false; // 其他异常也返回 false      
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setPasswordError('请输入密码');
      return;
    }
    
    setPasswordError('');
    
    try {
      await getImagesByAlbumId(albumId, 1, false, password);
    } catch (error) {
      // 密码错误或其他异常，保持模态框显示
      setPasswordError('密码错误');
      console.error('密码验证失败:', error);
    }
  };

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollHeight - scrollTop - clientHeight < 300) {
      setPage((prev) => prev + 1);
      getImagesByAlbumId(albumId, page + 1, true, password);
    }
  }, [loading, hasMore, page, albumId, password]);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const openPhoto = async (index: number) => {
    setCurrentPhotoIndex(index);
    setIsImageLoading(true);

    const img = new Image();
    img.src = list[index].image;

    await new Promise((resolve) => {
      img.onload = () => {
        resolve(true);
      };
    });

    setIsImageLoading(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentPhotoIndex(null);
  };

  const nextPhoto = () => {
    if (currentPhotoIndex !== null) {
      setCurrentPhotoIndex((currentPhotoIndex + 1) % list.length);
    }
  };

  const prevPhoto = () => {
    if (currentPhotoIndex !== null) {
      setCurrentPhotoIndex((currentPhotoIndex - 1 + list.length) % list.length);
    }
  };

  return (
    <>
      <title>{`📷 ${albumName} - 照片墙`}</title>
      <meta name="description" content={`📷 ${albumName} - 照片墙`} />

      <div className="container mx-auto px-4 py-8 pt-[90px]">
        {/* 移除最大高度限制 */}
        <div className="w-full">
          {showPasswordModal ? (
            // 如果显示密码模态框，则不显示任何内容
            <></>
          ) : list?.length === 0 ? (
            <Empty info="暂无照片" />
          ) : (
            <>
              <Masonry breakpointCols={breakpointColumnsObj} className="masonry-grid" columnClassName="masonry-grid_column">
                {list?.map((photo, index) => (
                  <motion.div key={photo.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="relative group overflow-hidden rounded-lg shadow-lg mb-6" onClick={() => openPhoto(index)}>
                    <div className="w-full cursor-pointer">
                      <img src={photo.image || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=3840&q=100'} alt={photo.name} className="w-full h-auto object-contain transform transition-transform group-hover:scale-110" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white font-medium text-lg">{photo.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </Masonry>
              {loading && (
                <div className="flex justify-center items-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              )}
              {!hasMore && list.length > 0 && <div className="text-center text-gray-500 py-4">没有更多照片了</div>}
            </>
          )}
        </div>

        {/* 照片查看模态框 */}
        <AnimatePresence>
          {showModal && currentPhotoIndex !== null && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50" onClick={closeModal}>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="relative max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
                <div className="relative rounded-2xl overflow-hidden">
                  {isImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                    </div>
                  )}

                  <motion.div key={currentPhotoIndex} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="relative">
                    <img src={list[currentPhotoIndex].image} alt={list[currentPhotoIndex].name} className="w-full h-auto max-h-[80vh] rounded-2xl object-contain" />

                    {/* 导航按钮 */}
                    <button
                      className="flex justify-center items-center absolute left-4 top-1/2 z-10 -translate-y-1/2 p-2 rounded-full bg-[#fff3] hover:bg-black/50 backdrop-blur-md   duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevPhoto();
                      }}
                    >
                      <IoChevronBack className="w-8 h-8 text-white" />
                    </button>

                    <button
                      className="flex justify-center items-center absolute right-4 top-1/2 z-10 -translate-y-1/2 p-2 rounded-full bg-[#fff3] hover:bg-black/10 backdrop-blur-md   duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextPhoto();
                      }}
                    >
                      <IoChevronForward className="w-8 h-8 text-white" />
                    </button>

                    {/* 照片信息 */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <motion.div key={currentPhotoIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
                        <h3 className="text-white text-2xl font-medium mb-2">{list[currentPhotoIndex].name}</h3>

                        <p className="text-white/50 leading-relaxed mb-3">{list[currentPhotoIndex].description}</p>

                        <div className="flex items-center space-x-2 text-gray-400">
                          <BsCalendar className="w-4 h-4 text-gray-400" />
                          <p className="text-sm">{dayjs(+list[currentPhotoIndex].createTime).format('YYYY-MM-DD HH:mm')}</p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* 密码输入模态框 */}
        <AnimatePresence>
          {showPasswordModal && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.8 }} 
                transition={{ duration: 0.3, ease: 'easeInOut' }} 
                className="relative max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <div className="text-center mb-6">
                    <div className="mx-auto bg-gray-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                      <IoLockClosed className="w-8 h-8 text-gray-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">请输入密码查看</h2>
                    <p className="text-gray-600">此相册为私密相册，请输入密码以查看照片</p>
                  </div>

                  <form onSubmit={handlePasswordSubmit}>
                    <div className="mb-6">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setPasswordError('');
                        }}
                        placeholder="请输入相册密码"
                        className={`w-full px-4 py-3 rounded-lg border ${passwordError ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        autoFocus
                      />
                      {passwordError && <p className="text-red-500 text-sm mt-2 text-left">{passwordError}</p>}
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => {
                          router.push('/album');
                        }}
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        取消
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      >
                        确认
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
