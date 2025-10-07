'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const XFEnvelope: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    // 添加一个类到body上，使导航栏样式与足迹页面一致
    document.body.classList.add('entertainment-page');
    
    // 检查URL是否包含#letter，如果是则直接显示背面
    if (window.location.hash === '#letter') {
      setIsFlipped(true);
    }
    
    // 检查URL是否包含#love，如果是则打开信封
    if (window.location.hash === '#love') {
      setIsFlipped(true);
      setIsOpened(true);
    }

    // 监听hash变化
    const handleHashChange = () => {
      setIsFlipped(window.location.hash === '#letter' || window.location.hash === '#love');
      setIsOpened(window.location.hash === '#love');
    };

    window.addEventListener('hashchange', handleHashChange);

    // 清理函数，在组件卸载时移除类和事件监听器
    return () => {
      document.body.classList.remove('entertainment-page');
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleFlip = (e: React.MouseEvent) => {
    e.preventDefault();
    const newFlippedState = !isFlipped;
    setIsFlipped(newFlippedState);
    
    // 更新URL hash
    if (newFlippedState) {
      window.location.hash = 'letter';
    } else {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };
  
  const handleOpenEnvelope = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpened(true);
    // 更新URL hash
    window.location.hash = 'love';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#FFFFF1' }}>
      <div className="relative w-full max-w-[600px]">
        {/* 翻转容器 */}
        <div 
          className="relative w-full h-[300px]"
          style={{ 
            perspective: '1000px',
          }}
        >
          <div
            className="relative w-full h-full transition-all duration-[1000ms] ease-in-out"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* 信封正面 */}
            <div 
              className="absolute w-full h-full bg-cover bg-center rounded-lg shadow-xl overflow-hidden"
              style={{ 
                backgroundImage: "url('/letterBg.jpeg')",
                backfaceVisibility: 'hidden',
              }}
            >

              {/* 邮票 */}
              <div 
                className="absolute bg-cover bg-center"
                style={{ 
                  backgroundImage: "url('/letterStamp.png')",
                  top: '22px',
                  left: '22px',
                  width: '130px',
                  height: '105px'
                }}
              ></div>

              {/* 添加的文字 */}
              <div className="absolute text-center text-3xl font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ color: '#783839' }}>
                Dear Lover
              </div>

              {/* 右下角的按钮 */}
              <button 
                onClick={handleFlip}
                className="absolute bottom-4 right-2 px-4 py-0 text-xl"
                style={{ color: '#783839' }}
              >
                Flip
              </button>
            </div>
            
            {/* 信封背面 */}
            <div 
              className="absolute w-full h-full bg-cover bg-center rounded-lg shadow-xl overflow-hidden"
              style={{ 
                backgroundImage: "url('/letterBg.jpeg')", // 使用相同的背景图片
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              
              {/* 新增信封盖背景 */}
              <div 
                className={`absolute top-0 left-0 w-full h-1/2 bg-cover bg-center rounded-b-lg transition-all duration-[800ms] ease-in-out`}
                style={{ 
                  backgroundImage: "url('/letterBg1.jpeg')",
                  borderBottomLeftRadius: '50px',
                  borderBottomRightRadius: '50px',
                  borderBottom: '2px solid #00000040', // 更细更透明的底部边框,
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'top center',
                  transform: isOpened ? 'rotateX(180deg) translateZ(1px)' : 'rotateX(0deg)',
                  zIndex: isOpened ? 20 : 10
                }}
              ></div>

              {/* 信封纽扣 */}
              <div 
                className="absolute bg-cover bg-center cursor-pointer z-10"
                style={{ 
                  backgroundImage: "url('/letterStitch1.png')",
                  top: '48%',
                  left: '50%',
                  width: '130px',
                  height: '130px',
                  transform: 'translate(-50%, -50%)',
                  transition: 'transform 0.3s ease'
                }}
                onClick={handleOpenEnvelope}
              >
              </div>

              {/* 背面按钮样式与正面保持一致 */}
              <button 
                onClick={handleFlip}
                className="absolute bottom-4 right-2 px-4 py-0 text-xl"
                style={{ color: '#783839' }}
              >
                Flip
              </button>
            </div>
          </div>
        </div>
        
        {/* 返回链接 */}
        <div className="mt-6 text-center">
          <Link href="/hq" className="text-blue-500 hover:text-blue-700 transition">
            &larr; 返回情侣空间
          </Link>
        </div>
      </div>
    </div>
  );
};

export default XFEnvelope;