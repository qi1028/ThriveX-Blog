'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

const XFPage: React.FC = () => {
  useEffect(() => {
    // 添加一个类到body上，使导航栏样式与足迹页面一致
    document.body.classList.add('entertainment-page');
    
    // 清理函数，在组件卸载时移除类
    return () => {
      document.body.classList.remove('entertainment-page');
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#FFFFF1' }}>
      <div className="relative w-full max-w-[600px]">
        {/* 信封背景 */}
        <div 
          className="relative w-full h-[300px] bg-cover bg-center rounded-lg shadow-xl overflow-hidden"
          style={{ backgroundImage: "url('/letterBg.jpeg')" }}
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
            className="absolute bottom-4 right-2 px-4 py-0 text-xl"
            style={{ color: '#783839' }}
          >
            Flip
          </button>
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