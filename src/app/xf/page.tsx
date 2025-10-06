'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const XFPage: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // 添加一个类到body上，使导航栏样式与足迹页面一致
    document.body.classList.add('entertainment-page');
    
    // 检查URL是否包含#letter，如果是则直接显示背面
    if (window.location.hash === '#letter') {
      setIsFlipped(true);
    }

    // 监听hash变化
    const handleHashChange = () => {
      setIsFlipped(window.location.hash === '#letter');
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#FFFFF1' }}>
      <div className="relative w-full max-w-[600px]">
        {/* 翻转容器 */}
        <div 
          className="relative w-full h-[300px] transition-transform duration-[1000ms] ease-in-out"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)'
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
              backgroundImage: "url('/letterBg.jpeg')",
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="absolute text-center text-3xl font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ color: '#783839' }}>
              Love You Forever
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

export default XFPage;