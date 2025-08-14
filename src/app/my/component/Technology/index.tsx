'use client';

import { useEffect } from 'react';

import IconCloud from '@/app/my/component/IconCloud';

import AOS from 'aos';
import 'aos/dist/aos.css';

const techIcons = ['scss', 'css', 'html', 'tailwindcss', 'axios', 'fetch', 'vue', 'vuex', 'redux', 'zustand', 'element-plus', 'typescript', 'javascript', 'antdesign', 'motion', 'pinia', 'framer-motion', 'echarts', 'java', 'spring', 'springboot', 'mybatis', 'mybatis-plus', 'redis', 'rabbitmq', 'mysql', 'mongodb', 'react', 'nextjs', 'nestjs', 'webpack', 'vite', 'nodedotjs', 'nextdotjs', 'prisma', 'koa', 'express', 'python', 'flask', 'nginx', 'vercel', 'docker', 'git', 'github', 'visualstudiocode', 'intellijidea', 'datagrip', 'apifox', 'postman', 'trae', 'cursor', 'webstorm', 'navicat', 'hbuilder', 'hbuilderx', 'googledrive', 'apple', 'windows', 'linux', 'pycharm', 'wechat'];

export default () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div data-aos="zoom-in" className="w-full md:w-7/12 flex flex-col items-center justify-center mt-52 md:mt-0">
        <div className="text-center text-xl mb-8">我的技术栈</div>

        <div className="flex justify-center w-4/6">
          <IconCloud iconSlugs={techIcons} />
        </div>
      </div>
    </>
  );
};
