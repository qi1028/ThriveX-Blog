'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { getGameAPI } from '@/api/game';
import { Game } from '@/types/app/game';
import Loading from '@/components/Loading';
import styles from '../page.module.scss';

export default function GameDetailPage() {
  const params = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const fetchGame = async () => {
      setLoading(true);
      try {
        const id = parseInt(params.id as string, 10);
        if (!isNaN(id)) {
          try {
            const result = await getGameAPI(id);
            if (result?.data) {
              setGame(result.data);
              
              // 如果是超链接类型的游戏，直接跳转
              if (result.data.type === 2 && result.data.code) {
                window.location.href = result.data.code;
              }
            } else {
              console.warn(`未找到ID为 ${id} 的游戏`);
            }
          } catch (fetchError) {
            console.error(`获取ID为 ${id} 的游戏失败:`, fetchError);
          }
        } else {
          console.error('无效的游戏ID');
        }
      } catch (error) {
        console.error('获取游戏详情失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [params.id]);

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'preview' ? 'code' : 'preview');
  };

  if (loading) {
    return <Loading />;
  }

  // 如果是超链接类型的游戏且正在跳转，则显示跳转提示
  if (game && game.type === 2) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column'
      }}>
        <p>正在跳转到游戏页面...</p>
        <p>如果未自动跳转，<a href={game.code} target="_blank" rel="noopener noreferrer">请点击这里</a></p>
      </div>
    );
  }

  if (!game) {
    return <div>游戏未找到</div>;
  }

  return (
    <div className={styles.gameView} style={{ background: 'rgba(0, 0, 0, 0.8)', display: 'flex' }}>
      <div className={styles.gameViewContent}>
        <div className={styles.viewControls}>
          <button 
            className={`${styles.controlButton} ${styles.toggleView}`} 
            onClick={toggleViewMode}
          >
            切换到{viewMode === 'preview' ? '源码' : '预览'}页面
          </button>
        </div>
        
        {viewMode === 'preview' ? (
          <iframe 
            ref={iframeRef}
            className={styles.previewFrame}
            srcDoc={game.code || ''}
            title={`${game.name} preview`}
          />
        ) : (
          <pre className={styles.codeContent}>{game.code || ''}</pre>
        )}
      </div>
    </div>
  );
}