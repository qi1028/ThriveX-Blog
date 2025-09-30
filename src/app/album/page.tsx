'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Cate } from '@/types/app/album';
import { getAlbumCatePagingAPI, getImagesByAlbumIdAPI } from '@/api/album';
import Masonry from 'react-masonry-css';
import { IoLockClosed } from 'react-icons/io5'
import './page.scss';

const breakpointColumnsObj = {
  default: 4,
  1024: 3,
  700: 2,
};

export default function AlbumPage() {
  const router = useRouter();

  const [list, setList] = useState<Cate[]>([]);
    // 密码相关状态
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [currentAlbum, setCurrentAlbum] = useState<Cate | null>(null);
  const [isCheckingPassword, setIsCheckingPassword] = useState(false);

  const getAlbumCatePaging = async () => {
    const { data } = (await getAlbumCatePagingAPI(1, 9999)) || { data: {} as Paginate<Cate[]> };
    setList(data.result);
  };

  useEffect(() => {
    getAlbumCatePaging();
  }, []);

const handleClick = (data: Cate) => {
        // 检查相册是否有密码
    if (data.password) {
      // 如果有密码，则显示密码输入模态框
      setCurrentAlbum(data);
      setShowPasswordModal(true);
    } else {
      // 如果没有密码，直接跳转到相册详情页
      router.push(`/album/${data.id}?name=${data.name}`);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setPasswordError('请输入密码');
      return;
    }
    
    if (currentAlbum) {
      // 先验证密码是否正确
      try {
        setIsCheckingPassword(true);
        const response = await getImagesByAlbumIdAPI(currentAlbum.id!, 1, 1, password);
        
        if (!response || response.code === 401) {
          // 密码错误
          setPasswordError('密码错误');
          setIsCheckingPassword(false);
          return;
        }
        
        // 密码正确，跳转到相册详情页
        router.push(`/album/${currentAlbum.id}?name=${currentAlbum.name}&password=${encodeURIComponent(password)}`);
      } catch (error) {
        console.error('密码验证失败:', error);
        setPasswordError('密码错误');
      } finally {
        setIsCheckingPassword(false);
      }
    }
  };

  return (
    <>
      <title>📷 照片墙</title>
      <meta name="description" content="📷 照片墙" />

      <div className="container mx-auto px-4 py-8 pt-[90px]">
        <Masonry breakpointCols={breakpointColumnsObj} className="masonry-grid mb-12" columnClassName="masonry-grid_column">
          {list.map((cate, index) => (
            <motion.div key={cate.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="mb-6">
              <div className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer" onClick={() => handleClick(cate)}>
                {/* 图片容器 */}
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <img src={cate.cover || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=3840&q=100'} alt={cate.name} className="w-full h-full object-cover transform transition-transform  group-hover:scale-110" />
                </div>

                {/* 分类标签 */}
                <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm flex items-center">
                  {cate.name}
                  {cate.password && <IoLockClosed className="ml-1 w-4 h-4" />}
                </div>

                {/* 标题遮罩 */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-medium text-lg">{cate.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>

        {/* 密码输入模态框 */}
        {showPasswordModal && currentAlbum && (
          <div className="fixed inset-0 backdrop-blur-md bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* 模态框头部 */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center relative">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                  <div className="mx-auto bg-white/20 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4 backdrop-blur-sm">
                    <IoLockClosed className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">&quot;{currentAlbum.name}&quot; 为私密相册,请输入密码访问</h2>
                </div>

                <form onSubmit={handlePasswordSubmit}>
                  <div className="p-6">
                    <div className="mb-6">
                      <label htmlFor="album-password" className="block text-sm font-medium text-gray-700 mb-2">
                        请输入密码
                      </label>
                      <input
                        id="album-password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (passwordError) setPasswordError('');
                        }}
                        placeholder="输入相册密码"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          passwordError ? 'border-red-300' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                        autoFocus
                        disabled={isCheckingPassword}
                      />
                      {passwordError && (
                        <p className="text-red-500 text-sm mt-2 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {passwordError}
                        </p>
                      )}
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowPasswordModal(false);
                          setCurrentAlbum(null);
                          setPassword('');
                          setPasswordError('');
                          router.push('/album');
                        }}
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                        disabled={isCheckingPassword}
                      >
                        取消
                      </button>
                      <button
                        type="submit"
                        className={`flex-1 px-4 py-3 rounded-lg text-white transition-all font-medium flex justify-center items-center ${
                          isCheckingPassword 
                            ? 'bg-blue-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                        }`}
                        disabled={isCheckingPassword}
                      >
                        {isCheckingPassword ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            验证中...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            立即访问
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>    
      </>
  );
}
