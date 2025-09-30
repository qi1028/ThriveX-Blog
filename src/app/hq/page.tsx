'use client';

import React, { useEffect, useState } from 'react';
import Slide from '@/components/Slide';
import Starry from '@/components/Starry';

import { getWebConfigDataAPI } from '@/api/config';
import { Theme } from '@/types/app/config';

export default function HQPage() {
  const [swiperImage, setSwiperImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWebConfigDataAPI<{ value: Theme }>('theme');
        if (response && response.data && response.data.value) {
          const imageData = response.data.value.swiper_image;
          // 只有当swiper_image存在且非空时才设置
          if (imageData) {
            setSwiperImage(imageData);
          }
        }
      } catch (error) {
        console.error('Failed to fetch config data:', error);
      }
    };

    fetchData();
  }, []);

  // 头像图片地址（可后续改为从配置读取）
  const avatarUrl = 'https://cdn.cloveq.chat/thrive/default/68da357ae4b01cd5d3d3e6e5.jpg';

  return (
    <>
      <Slide src={swiperImage}>
        {/* 星空背景组件 */}
        <Starry />
        {/* 头像和爱心展示区域 */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* 半透明长方形底座，覆盖头像和爱心 */}
          <div className="relative w-full max-w-4xl h-80 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center animate-fade-in">
            <div className="flex items-center justify-center space-x-24">
              {/* 左侧头像 */}
              <div className="text-center animate-slide-in-left">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg transform transition-transform hover:scale-110 relative">
                  <img src={avatarUrl} alt="头像1" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.5)]"></div>
                  {/* 头像光晕效果 */}
                  <div className="absolute inset-0 rounded-full shadow-[0_0_30px_10px_rgba(255,255,255,0.3)] animate-pulse"></div>
                </div>
                <div className="mt-4 text-white text-2xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">浩</div>
              </div>

              {/* 中间爱心图标 */}
              <div className="text-center animate-slide-in-down">
                <div className="w-28 h-28 relative">
                  {/* 静态爱心 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src="/爱心.png" alt="爱心" className="w-24 h-24 animate-heart-beat" />
                  </div>
                </div>
              </div>

              {/* 右侧头像 */}
              <div className="text-center animate-slide-in-right">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg transform transition-transform hover:scale-110 relative">
                  <img src={avatarUrl} alt="头像2" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.5)]"></div>
                  {/* 头像光晕效果 */}
                  <div className="absolute inset-0 rounded-full shadow-[0_0_30px_10px_rgba(255,255,255,0.3)] animate-pulse"></div>
                </div>
                <div className="mt-4 text-white text-2xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">琦</div>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* 自定义动画样式 - 使用标准 style 标签替代 styled-jsx */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slide-in-left {
            from { 
              opacity: 0; 
              transform: translateX(-50px); 
            }
            to { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }
          
          @keyframes slide-in-right {
            from { 
              opacity: 0; 
              transform: translateX(50px); 
            }
            to { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }
          
          @keyframes slide-in-down {
            from { 
              opacity: 0; 
              transform: translateY(-50px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          
          @keyframes heart-beat {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
          
          .animate-slide-in-left {
            animation: slide-in-left 0.8s ease-out;
          }
          
          .animate-slide-in-right {
            animation: slide-in-right 0.8s ease-out;
          }
          
          .animate-slide-in-down {
            animation: slide-in-down 0.8s ease-out;
          }
          
          .animate-heart-beat {
            animation: heart-beat 1.5s ease-in-out infinite;
          }
          
          .animate-float {
            animation: float 2s ease-in-out infinite;
          }
        `}
      </style>
    </>
  );
}