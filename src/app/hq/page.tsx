'use client';

import React, { useEffect, useState } from 'react';
import Slide from '@/components/Slide';
import Starry from '@/components/Starry';
import RainbowText from '@/components/RainbowText';

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

  const [timeInfo, setTimeInfo] = useState<{
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const startDate = new Date(2021, 8, 12); // 2021年9月12日 (月份从0开始，所以8代表9月)
      const diff = now.getTime() - startDate.getTime();

      if (diff <= 0) {
        setTimeInfo({
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      } else {
        // 计算年份差异
        let years = now.getFullYear() - startDate.getFullYear();
        // 计算月份差异
        let months = now.getMonth() - startDate.getMonth();
        // 计算天数差异
        let days = now.getDate() - startDate.getDate();
        // 计算小时差异
        let hours = now.getHours() - startDate.getHours();
        // 计算分钟差异
        let minutes = now.getMinutes() - startDate.getMinutes();
        // 计算秒数差异
        let seconds = now.getSeconds() - startDate.getSeconds();

        // 处理负值的借位
        if (seconds < 0) {
          seconds += 60;
          minutes--;
        }
        if (minutes < 0) {
          minutes += 60;
          hours--;
        }
        if (hours < 0) {
          hours += 24;
          days--;
        }
        if (days < 0) {
          // 获取上个月的天数
          const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
          days += prevMonth.getDate();
          months--;
        }
        if (months < 0) {
          months += 12;
          years--;
        }

        setTimeInfo({
          years,
          months,
          days,
          hours,
          minutes,
          seconds,
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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

      {/* 新增的时间信息展示区域 */}
      <div className="myCenter love-content">
        <div>
          <div>
            <div className="love-time-title1">
              <RainbowText className="text-2xl md:text-3xl font-bold drop-shadow-lg">这是我们一起走过的</RainbowText>
            </div>
            <div className="love-time1 font-bold text-black text-4xl">
              第{' '}
              <span className="love-time1-item font-bold text-black text-5xl">{timeInfo.years}</span>{' '}
              年{' '}
              <span className="love-time1-item font-bold text-black text-5xl">{timeInfo.months}</span>{' '}
              月{' '}
              <span className="love-time1-item font-bold text-black text-5xl">{timeInfo.days}</span>{' '}
              日{' '}
              <span className="love-time1-item font-bold text-black text-5xl">{timeInfo.hours}</span>{' '}
              时{' '}
              <span className="love-time1-item font-bold text-black text-5xl">{timeInfo.minutes}</span>{' '}
              分{' '}
              <span className="love-time1-item font-bold text-black text-5xl">{timeInfo.seconds}</span>{' '}
              秒
            </div>
          </div>
        </div>
      </div>

      {/* 新增的跳转卡片 */}
      <div className="myCenter mt-8">
        <a 
          href="/message" 
          className="relative w-full max-w-sm h-32 bg-cover bg-center rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
          style={{ backgroundImage: 'url(https://cdn.cloveq.chat/thrive/default/68da357ae4b01cd5d3d3e6e5.jpg)' }}
        >
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white text-xl font-bold">飞车传信</span>
          </div>
        </a>
      </div>

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

          /* 增加新的样式 */
          .myCenter {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
          }

          .love-content {
            text-align: center;
            color: #fff;
          }

          .love-time-title1 {
            font-size: 24px;
            color: pink;
            margin-bottom: 10px;
          }

          .love-time1 {
            font-size: 36px;
            margin-bottom: 10px;
            color: black; /* 修改时间颜色为黑色 */
          }

          .love-time1-item {
            font-weight: bold;
          }

          .love-time-title2 {
            font-size: 20px;
          }
        `}
      </style>
    </>
  );
}