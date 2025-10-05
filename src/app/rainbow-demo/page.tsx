'use client';

import React from 'react';
import RainbowText from '@/components/RainbowText';
import Container from '@/components/Container';

const RainbowDemoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              彩虹渐变文字效果演示
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              使用CSS渐变和动画实现的动态彩虹文字效果，可以应用于标题、重点文字等场景
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                基础效果展示
              </h2>
              <div className="space-y-6">
                <p className="text-lg">
                  普通文字效果: <span className="font-bold">普通粗体文字</span>
                </p>
                <p className="text-lg">
                  彩虹文字效果: <RainbowText>彩虹渐变粗体文字</RainbowText>
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                不同尺寸展示
              </h2>
              <div className="space-y-6">
                <p className="text-sm">
                  小号文字: <RainbowText className="text-sm">小号彩虹文字</RainbowText>
                </p>
                <p className="text-base">
                  中号文字: <RainbowText>中号彩虹文字</RainbowText>
                </p>
                <p className="text-xl">
                  大号文字: <RainbowText className="text-xl">大号彩虹文字</RainbowText>
                </p>
                <p className="text-2xl">
                  超大文字: <RainbowText className="text-2xl">超大彩虹文字</RainbowText>
                </p>
              </div>
            </div>

            <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                应用场景示例
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
                    页面标题应用
                  </h3>
                  <h1 className="text-4xl md:text-5xl">
                    欢迎来到 <RainbowText>ThriveX</RainbowText> 博客
                  </h1>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
                    按钮文字应用
                  </h3>
                  <button className="px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                    <RainbowText className="text-lg">彩虹按钮文字</RainbowText>
                  </button>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
                    卡片标题应用
                  </h3>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6 max-w-md">
                    <h4 className="text-2xl mb-3">
                      <RainbowText>特别通知</RainbowText>
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      这是一个使用彩虹文字效果的卡片示例，展示了如何在不同背景上使用该效果。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RainbowDemoPage;