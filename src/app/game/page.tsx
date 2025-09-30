'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getGamePagingAPI } from '@/api/game';
import { Game } from '@/types/app/game';
import styles from './page.module.scss';

export default function GamePage() {
  const router = useRouter();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [pageInput, setPageInput] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    loadGames(currentPage);
  }, [currentPage]);

  const loadGames = async (page: number) => {
    setLoading(true);
    try {
      const result = await getGamePagingAPI(page, 8);
      if (result?.data) {
        // 根据后端实际返回的数据结构处理数据
        // 后端返回的是 IPage<Game>，其中 records 包含游戏列表
        const gameList = result.data.records || [];
        setGames(Array.isArray(gameList) ? gameList : []);
        setTotalPages(result.data.pages || 0);
      } else {
        // 如果没有数据，设置为空数组
        setGames([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error('加载游戏列表失败:', error);
      // 出错时设置为空数组
      setGames([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (game: Game) => {
    // 根据游戏类型处理点击事件
    // type=1: 源代码游戏，在当前页面显示
    // type=2: 外部链接游戏，跳转到新页面
    if (game.type === 2) {
      // 对于超链接类型的游戏，直接跳转到游戏页面
      router.push(`/game/${game.id}`);
    } else {
      // 对于源代码类型的游戏，在模态框中显示
      setSelectedGame(game);
      setViewMode('preview');
    }
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'preview' ? 'code' : 'preview');
  };

  const closeGameView = () => {
    setSelectedGame(null);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeGameView();
    }
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 只允许输入数字
    if (value === '' || /^\d+$/.test(value)) {
      setPageInput(value);
    }
  };

  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(pageInput);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setPageInput('');
    }
  };

  // 渲染骨架屏
  const renderSkeletons = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className={styles.skeletonCard}>
        <div className={styles.skeletonCover}></div>
        <div className={styles.skeletonName}>
          <div className={styles.skeletonText}></div>
        </div>
      </div>
    ));
  };

  return (
    <div className={styles.gameContainer}>  
      <div className={styles.gameGrid}>
        {loading ? (
          renderSkeletons()
        ) : games && games.length > 0 ? (
          games.map(game => (
            <div 
              key={game.id} 
              className={styles.gameCard}
              onClick={() => handleCardClick(game)}
            >
              {game.cover ? (
                <img 
                  src={game.cover} 
                  alt={game.name} 
                  className={styles.gameCover} 
                />
              ) : (
                <div className={styles.gameCover} style={{ background: 'linear-gradient(135deg, #6e8efb, #a777e3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontSize: '3rem' }}>{game.name.charAt(0)}</span>
                </div>
              )}
              <div className={styles.gameName}>{game.name}</div>
            </div>
          ))
        ) : (
          <div className={styles.noData}>
            <h3>暂无游戏</h3>
            <p>敬请期待更多有趣的游戏内容</p>
          </div>
        )}
      </div>

      {/* 分页 */}
      {!loading && totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            className={styles.paginationButton}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            上一页
          </button>
          <span className={styles.pageInfo}>
            {currentPage} / {totalPages}
          </span>
          <button 
            className={styles.paginationButton}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            下一页
          </button>
          
          {/* 页数跳转 */}
          <form onSubmit={handlePageSubmit} className={styles.pageJumpForm}>
            <input
              type="text"
              value={pageInput}
              onChange={handlePageInputChange}
              placeholder="页码"
              className={styles.pageInput}
            />
            <button 
              type="submit"
              className={styles.jumpButton}
              disabled={!pageInput || parseInt(pageInput) < 1 || parseInt(pageInput) > totalPages}
            >
              跳转
            </button>
          </form>
        </div>
      )}

      {/* 游戏预览弹窗 */}
      {selectedGame && (
        <div className={styles.gameView} onClick={handleOverlayClick}>
          <div className={styles.gameViewContent}>
            <div className={styles.viewControls}>
              <button 
                className={`${styles.controlButton} ${styles.toggleView}`} 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleViewMode();
                }}
              >
                切换到{viewMode === 'preview' ? '源码' : '预览'}页面
              </button>
              <button 
                className={`${styles.controlButton} ${styles.closeButton}`}
                onClick={(e) => {
                  e.stopPropagation();
                  closeGameView();
                }}
              >
                关闭
              </button>
            </div>
            
            {viewMode === 'preview' ? (
              <iframe 
                ref={iframeRef}
                className={styles.previewFrame}
                srcDoc={selectedGame.code || ''}
                title={`${selectedGame.name} preview`}
              />
            ) : (
              <pre className={styles.codeContent}>{selectedGame.code || ''}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}