import HeroUIProvider from "@/components/HeroUIProvider";

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RouteChangeHandler from '@/components/RouteChangeHandler'

// 加载样式文件
import "@/styles/index.scss";
import "@/styles/tailwind.scss";

import { getConfigDataAPI } from '@/api/project'

import Tools from '@/components/Tools';
import NProgress from '@/components/NProgress';
import Confetti from '@/components/Confetti';
import { Web } from '@/types/app/project';

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data } = (await getConfigDataAPI<Web>("web")) || { data: {} as Web };

  // 尊重开源，禁止删除此版权信息！！！
  console.log("🚀 欢迎使用 ThriveX 现代化博客管理系统")
  console.log("🎉 开源地址：https://github.com/LiuYuYang01/ThriveX-Blog")
  console.log("🏕 作者主页：https://liuyuyang.net")
  console.log("🌟 觉得好用的话记得点个 Star 哦 🙏")

  return (
    <html lang="zh-CN">
      <head>
        <title>{`${data?.title} - ${data?.subhead}`}</title>
        <meta name="description" content={data?.description} />
        <meta name="keywords" content={data?.keyword} />
        <link rel="icon" href={data?.favicon || '/favicon.ico'} />

        {/* 字体 */}
        {/* 霞鹜文楷 */}
        {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@callmebill/lxgw-wenkai-web@latest/style.css" /> */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@callmebill/lxgw-wenkai-web@latest/lxgwwenkai-regular/result.css" />
        {/* 原俠正楷 */}
        {/* <link rel="stylesheet" href="https://chinese-fonts-cdn.deno.dev/packages/GuanKiapTsingKhai/dist/GuanKiapTsingKhai/result.css" /> */}
        {/* 悠哉 */}
        {/* <link rel="stylesheet" href="https://chinese-fonts-cdn.deno.dev/packages/yozai/dist/Yozai-Medium/result.css" /> */}

        {/* 百度统计 */}
        <script dangerouslySetInnerHTML={{
          __html: `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?e5bf799a3e49312141c8b677b7bec1c2";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
          `
        }} />
      </head>

      <RouteChangeHandler />

      <body className={`dark:!bg-black-a transition-colors`}>
        {/* 🎉 礼花效果 */}
        {/* <Confetti /> */}

        {/* 进度条组件 */}
        <NProgress />
        {/* 顶部导航组件 */}
        <Header />

        {/* 主体内容 */}
        <HeroUIProvider>
          <div className='min-h-[calc(100vh-300px)]'>
            {children}
          </div>
        </HeroUIProvider>

        {/* 底部组件 */}
        <Footer />
        {/* 右侧工具栏组件 */}
        <Tools />
      </body>
    </html>
  );
}
