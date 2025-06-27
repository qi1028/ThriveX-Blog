'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaPhone, FaEnvelope } from 'react-icons/fa'
import { Metadata } from 'next'

const personalInfo = {
  "personalInfo": {
    "name": "刘宇阳",
    "title": "前端开发工程师",
    "age": "22岁",
    "location": "郑州",
    "avatar": "https://q1.qlogo.cn/g?b=qq&nk=3311118881&s=640",
    "contact": {
      "phone": "1778811xxxx",
      "email": "liuyuyang1024@yeah.net",
      "github": "https://github.com/LiuYuYang01"
    }
  },
  "advantages": [
    "上海市第十五届计算机应用能力大赛 三等奖、创新项目奖",
    "GitHub 开源项目作者（ThriveX CMS 建站系统）Star 900+",
    "ThriveX CMS 建站系统 计算机软件著作权（申请中）",
    "具备项目从 0 到 1 部署上线的经验：https://liuyuyang.net/",
    "利用业余时间持续输出技术文章，目前在 CSDN 累计拥有 1700+ 粉丝",
    "熟练 Spring Boot 以及 Express、Flask 等多种后端开发语言 对前后端接口联调过程中的问题能够进行清晰定位",
    "能够独当一面，从 0 到 1 构建前端项目 且 具备完整项目设计、研发、部署、全链路问题排查能力"
  ],
  "links": {
    "github": "https://github.com/LiuYuYang01",
    "csdn": "https://thrive.blog.csdn.net",
    "project": "https://liuyuyang.net/"
  },
  "skills": [
    "熟练 HTML5、CSS3、Flex、Scss、TailwindCSS 能够精准还原 UI 设计师的产品原型图，实现产品级的复现",
    "熟练 TypeScript、JavaScript、jQuery、面向对象、闭包、原型链、WebApi、原生DOM",
    "熟练 Vue2 / 3 相关生态：Axios、Vuex、Pinia",
    "熟练 React18 相关生态：NextJS、Redux、Zustand、Ahooks、Motion",
    "熟练 Uniapp 完成多端适配 以及 原生微信小程序开发",
    "熟练 Echarts 数据可视化开发 且 能够根据业务需求进行自定义扩展",
    "熟练 Ant Design、NextUI、Element UI、Vant、Naive UI、Bootstrap 等多种组件库的使用",
    "熟悉 NodeJS 相关生态：Express、NextJS、NestJS、Prisma",
    "熟悉 Python Flask 及 SQLAlchemy 对象映射（ORM）框架",
    "熟悉 Electron 跨平台桌面应用开发框架",
    "了解 Remix 全栈开发框架",
    "了解 WebPack、Vite 等打包构建工具",
    "熟悉 Spring Boot、Spring MVC、Mybatis Plus 等主流框架",
    "熟练 MySQL 关系型数据库，具备手写 SQL 及复杂查询的能力",
    "了解 Spring Cloud 微服务框架及常用的组件 Nacos、OpenFeign、Gateway",
    "熟悉 Linux 常用命令以及 Nginx 基本配置",
    "熟悉 Docker 基本命令、容器编排、镜像构建，并熟练使用可视化工具如：宝塔、1Panel 等，并有项目部署上线的经验"
  ],
  "workExperience": [
    {
      "company": "宁波 XXXX 数字科技有限公司",
      "position": "前端负责人",
      "period": "2024.07-至今",
      "responsibilities": [
        "带领前端团队优化日常项目的开发与落地，并承担重点项目开发与上线",
        "在项目紧急情况下，由我负责前端的设计与实现，在经过 3 个月的 996 加班后，如期完成了项目的高质量上线。最终结果令老板满意，奖励一次性 5 万元奖金。在半年内完成涨薪 100%"
      ]
    },
    {
      "company": "成都 XX 科技有限公司",
      "position": "前端开发工程师",
      "period": "2024.05-2024.06",
      "responsibilities": [
        "负责公司内部 Todo 系统开发与改进，采用 Electron 桌面软件开发框架"
      ]
    }
  ],
  "projects": [
    {
      "name": "ThriveX CMS 建站管理系统",
      "period": "2023.03-至今",
      "role": "全栈开发（NextJS + Spring Boot）",
      "description": "ThriveX 是一个年轻、高颜值、全开源、永不收费的现代化 CMS 管理系统，项目组成是前端、控制端、后端，采用前后端分离开发式，是一个 NextJS + Spring Boot 的产物。",
      "techStack": {
        "frontend": "React、NextJS、TypeScript、Zustand、TailwindCSS、Scss、Next UI、Antd UI、Echarts、React Hook Form、Ahooks、百度统计API、高德地图API、Vue3、Pinia、Element UI",
        "backend": "Spring Boot、Mybatis Plus、MySQL、Qiniu、Swagger、Python、Flask、SQLalchemy",
        "deployment": "采用 Docker Compose 一键部署、采用 Nginx 实现反向代理、SSL 证书等"
      },
      "highlights": [
        "【AI】采用科大讯飞AI大模型实现文章续写、优化、总结、智能问答",
        "【权限】RBAC 权限管理，动态路由、按钮权限、多用户登录",
        "【地图】采用 高德地图实现旅游足迹可视化等功能",
        "【安全】限制异地登录 及 以及多设备登录同一账号",
        "【交互】采用 TailwindCSS 实现白天、昼夜主题切换效果",
        "【适配】采用 TailwindCSS 媒体查询实现手机、平板、电脑三端适配",
        "【可视化】采用 百度统计API + Echarts 实现数据可视化",
        "【SEO】采用 NextJS 服务端渲染技术进行 SEO 优化，在 Lighthouse 中评分 100%",
        "【文件系统】同时兼容阿里云、腾讯云、华为云、七牛云、百度云等对象存储",
        "【一键部署】采用 Docker Compose 脚本实现前端、控制端、后端、数据库一键部署",
        "【自动化部署】利用 Vercel 实现高效的持续集成与自动化部署"
      ],
      "links": {
        "preview": "https://liuyuyang.net/",
        "website": "https://thrivex.liuyuyang.net/",
        "docs": "https://docs.liuyuyang.net/",
        "api": "https://api.liuyuyang.net/doc.html"
      },
      "repositories": {
        "frontend": "https://github.com/LiuYuYang01/ThriveX-Blog",
        "admin": "https://github.com/LiuYuYang01/ThriveX-Admin",
        "backend": "https://github.com/LiuYuYang01/ThriveX-Server"
      },
      "achievements": [
        "一个人完成产品、UI、前端、控制端、后端、数据库、测试 以及 项目部署上线",
        "项目代码全开源，截止目前在 GitHub 已经有 1867 条 Commit 记录，收获 700+ Star，156+ Fork",
        "目前已有多数用户在使用该系统，粉丝群已超千名用户"
      ]
    },
    {
      "name": "点点易付（DianDianPay）",
      "period": "2024.12-至今",
      "role": "前端开发工程师",
      "description": [
        "点点易付专注打造一站式支付解决方案，通过安全可靠的支付通道和高效便捷的服务，助力全球商户拓展国际市场，实现业务全球化",
        "简化中国企业在跨境收单的繁琐流程，提供一站式服务，从账户申请到交易处理全程支持"
      ],
      "techStack": "React、TypeScript、Zustand、TailwindCSS、Scss、Antd UI、Echarts、React Hook Form、Ahooks、百度统计API",
      "links": {
        "website": "https://diandianpay.com/",
        "docs": "https://docs.diandianpay.com/",
        "dashboard": "https://dashboard.diandianpay.com/"
      },
      "achievements": "结果令老板满意，完成涨薪 60%，并赠与 5 万元一次性奖金"
    },
    {
      "name": "Shopify 跨境电商结账页",
      "period": "2024.07-2024.09",
      "role": "前端开发工程师",
      "responsibilities": [
        "主导 jQuery 项目全面迁移至 React 生态，提高项目代码规范及可维护性",
        "负责组件库架构设计，保证组件库可扩展性、易用性",
        "使用 React-i18next 完成八国语言一键切换",
        "集成 Sentry 实现前端监控，快速排查线上项目疑难杂症"
      ],
      "challenges": "商品的最终价格需要根据多种因素决定，如商品单价、运费、税费、运费险等不同的条件进行计算，而且还要通过同一套代码完成单页面布局和多页面布局，整体的逻辑相对复杂",
      "achievements": "结果令老板满意，完成涨薪 25%"
    },
    {
      "name": "云上校园",
      "period": "2022.12-2023.05",
      "role": "全栈开发（小程序 + Eggjs）",
      "description": "云上校园是一个专注提升大学校园生活质量与便利性的平台，打造一个集信息传播、学习辅助、就业赚取、维权举报、科技体验于一体的综合服务平台。",
      "techStack": "微信小程序、Vant、Vue2、Element UI、Echarts、Nodejs（Eggjs）、MySQL、Socket.io",
      "highlights": [
        "通过 Echarts 搭配百度统计API实现数据可视化",
        "微信登录、登录状态检测",
        "实时通讯聊天室：支持私聊、群聊、表情、图片聊天记录存储"
      ],
      "achievements": "上海市第十五届计算机应用能力大赛三等奖"
    }
  ],
  "education": {
    "school": "上海开放大学",
    "major": "软件工程",
    "degree": "本科",
    "period": "2021-2026",
    "achievements": [
      "上海市计算机应用能力大赛三等奖",
      "上海开放大学创新项目奖",
      "二等奖学金",
      "计算机软件著作权"
    ]
  }
}

export default () => {
  // 添加平滑滚动效果
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])
  
  return (
    <>
      <title>💪 刘宇阳 - 前端开发工程师</title>
      <meta name="description" content="💪 刘宇阳 - 前端开发工程师" />

      <div className="min-h-screen py-12 mt-[60px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white dark:!bg-black-b rounded-2xl shadow-xl hover:shadow-2xl transition-shadow p-10"
        >
          {/* 个人信息头部 */}
          <div className="flex items-center space-x-8 mb-12">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-48 h-48 rounded-full overflow-hidden group"
            >
              <img
                src={personalInfo.personalInfo.avatar}
                alt={personalInfo.personalInfo.name}
                className="object-cover transition-transform   group-hover:scale-110"
              />
            </motion.div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:!text-white mb-2">{personalInfo.personalInfo.name}</h1>
              <h2 className="text-xl font-semibold text-gray-700 dark:!text-gray-300 mb-6">{personalInfo.personalInfo.title} | {personalInfo.personalInfo.age} | {personalInfo.personalInfo.location}</h2>
              <div className="flex flex-wrap gap-6 text-gray-600 dark:!text-white">
                <a href={`tel:${personalInfo.personalInfo.contact.phone}`} className="flex items-center hover:text-blue-600   font-medium">
                  <FaPhone className="mr-2 text-blue-500" /> {personalInfo.personalInfo.contact.phone}
                </a>
                <a href={`mailto:${personalInfo.personalInfo.contact.email}`} className="flex items-center hover:text-blue-600   font-medium">
                  <FaEnvelope className="mr-2 text-blue-500" /> {personalInfo.personalInfo.contact.email}
                </a>
                <a href={personalInfo.personalInfo.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600   font-medium">
                  <FaGithub className="mr-2 text-blue-500" /> GitHub
                </a>
              </div>
            </div>
          </div>

          {/* 自我介绍 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:!text-white mb-6 flex items-center">
              <span className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></span>
              个人优势
            </h3>

            <div className="flex">
              <div className="text-gray-700 dark:!text-gray-300 leading-relaxed space-y-3">
                {personalInfo.advantages.map((advantage, index) => (
                  <p key={index} className="text-base font-medium flex items-center">
                    <span className="text-blue-500 text-3xl mr-2">•</span>
                    <span>{advantage}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <p className="flex items-center">
                <span className="text-gray-800 dark:!text-white font-semibold mr-3">GitHub 社区地址：</span>
                <a href={personalInfo.links.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                  {personalInfo.links.github}
                </a>
              </p>

              <p className="flex items-center">
                <span className="text-gray-800 dark:!text-white font-semibold mr-3">CSDN 技术博客：</span>
                <a href={personalInfo.links.csdn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                  {personalInfo.links.csdn}
                </a>
              </p>

              <p className="flex items-center">
                <span className="text-gray-800 dark:!text-white font-semibold mr-3">开源项目作品：</span>
                <a href={personalInfo.links.project} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                  {personalInfo.links.project}
                </a>
              </p>
            </div>
          </motion.div>

          {/* 专业技能 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:!text-white mb-6 flex items-center">
              <span className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></span>
              专业技能
            </h3>

            <div className="space-y-4 text-gray-600 dark:!text-gray-300">
              <div className="flex flex-col space-y-2">
                {personalInfo.skills.map((skill, index) => (
                  <p key={index} className="text-base font-medium flex items-center">
                    <span className="text-blue-500 text-3xl mr-2">•</span>
                    <span>{skill}</span>
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 工作经历 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:!text-white mb-6 flex items-center">
              <span className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></span>
              工作经历
            </h3>

            <div className="space-y-4">
              {personalInfo.workExperience.map((job, index) => (
                <div key={index} className="group bg-gray-50 dark:!bg-[#373f4b] p-6 rounded-xl">
                  <div className='flex justify-between items-center mb-3'>
                    <h4 className="text-lg font-bold text-gray-800 dark:!text-white group-hover:text-blue-600    ">{job.company}</h4>
                    <p className="text-gray-600 dark:!text-gray-300 font-medium">{job.period}</p>
                  </div>
                  <p className="text-gray-700 dark:!text-gray-300 font-semibold mb-4">{job.position}</p>
                  <ul className="list-disc list-inside text-gray-600 dark:!text-gray-300 space-y-2">
                    {job.responsibilities.map((responsibility, i) => (
                      <li key={i} className="text-base">{responsibility}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 项目经历 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:!text-white mb-6 flex items-center">
              <span className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></span>
              项目经历
            </h3>

            <div className="space-y-8">
              {personalInfo.projects.map((project, index) => (
                <div key={index} className="group bg-gray-50 dark:!bg-[#373f4b] p-6 rounded-xl">
                  <div className='flex justify-between items-center mb-3'>
                    <h4 className="text-lg font-bold text-gray-800 dark:!text-white group-hover:text-blue-600    ">{project.name}</h4>
                    <p className="text-gray-600 dark:!text-gray-300 font-medium">{project.period}</p>
                  </div>
                  <p className="text-gray-700 dark:!text-gray-300 font-semibold mb-4">{project.role}</p>

                  <div className="space-y-6">
                    <div>
                      <h5 className="font-bold text-gray-800 dark:!text-white mb-3 text-base">项目描述：</h5>
                      <div className="text-gray-600 dark:!text-gray-300 text-base">
                        {Array.isArray(project.description) ? project.description.map((desc, i) => (
                          <div key={i} className="mb-2">{desc}</div>
                        )) : project.description}
                      </div>
                    </div>

                    {project.techStack && (
                      <div>
                        <h5 className="font-bold text-gray-800 dark:!text-white mb-3 text-base">技术栈：</h5>
                        <div className="text-gray-600 dark:!text-gray-300 text-base">
                          {typeof project.techStack === 'string' ? project.techStack : (
                            <>
                              <div className="mb-2">• 前端技术栈：{project.techStack.frontend}</div>
                              <div className="mb-2">• 后端技术栈：{project.techStack.backend}</div>
                              <div>• 项目部署：{project.techStack.deployment}</div>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {project.highlights && (
                      <div>
                        <h5 className="font-bold text-gray-800 dark:!text-white mb-3 text-base">项目亮点：</h5>
                        <div className="space-y-2 text-gray-600 dark:!text-gray-300 text-base">
                          {project.highlights.map((highlight, i) => (
                            <div key={i}>• {highlight}</div>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.links && (
                      <div>
                        <h5 className="font-bold text-gray-800 dark:!text-white mb-3 text-base">项目地址：</h5>
                        <div className="space-y-2 text-gray-600 dark:!text-gray-300 text-base">
                          {Object.entries(project.links).map(([key, value]) => (
                            <div key={key}>• {key === 'preview' ? '项目预览' : key === 'website' ? '项目官网' : key === 'docs' ? '项目文档' : key === 'api' ? '项目接口' : key === 'dashboard' ? '项目后台' : key}：
                              <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium ml-2">
                                {value}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.repositories && (
                      <div>
                        <h5 className="font-bold text-gray-800 dark:!text-white mb-3 text-base">项目仓库：</h5>
                        <div className="space-y-2 text-gray-600 dark:!text-gray-300 text-base">
                          {Object.entries(project.repositories).map(([key, value]) => (
                            <div key={key}>• {key === 'frontend' ? '前端' : key === 'admin' ? '控制端' : '后端'}：
                              <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium ml-2">
                                {value}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.achievements && (
                      <div>
                        <h5 className="font-bold text-gray-800 dark:!text-white mb-3 text-base">业绩：</h5>
                        <div className="space-y-2 text-gray-600 dark:!text-gray-300 text-base">
                          {Array.isArray(project.achievements) ? project.achievements.map((achievement, i) => (
                            <div key={i}>• {achievement}</div>
                          )) : <div>• {project.achievements}</div>}
                        </div>
                      </div>
                    )}

                    {project.challenges && (
                      <div>
                        <h5 className="font-bold text-gray-800 dark:!text-white mb-3 text-base">项目难点：</h5>
                        <div className="text-gray-600 dark:!text-gray-300 text-base">{project.challenges}</div>
                      </div>
                    )}

                    {project.responsibilities && (
                      <div>
                        <h5 className="font-bold text-gray-800 dark:!text-white mb-3 text-base">主要工作：</h5>
                        <div className="space-y-2 text-gray-600 dark:!text-gray-300 text-base">
                          {project.responsibilities.map((responsibility, i) => (
                            <div key={i}>• {responsibility}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 教育背景 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:!text-white mb-6 flex items-center">
              <span className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></span>
              教育背景
            </h3>

            <div className="group bg-gray-50 dark:!bg-[#373f4b] p-6 rounded-xl">
              <div>
                <div className='flex justify-between items-center mb-3'>
                  <h4 className="text-lg font-bold text-gray-800 dark:!text-white group-hover:!text-blue-600  ">{personalInfo.education.school}</h4>
                  <p className="text-gray-600 dark:!text-gray-300 font-medium">{personalInfo.education.major} | {personalInfo.education.degree} | {personalInfo.education.period}</p>
                </div>

                <ul className="list-disc list-inside text-gray-600 dark:!text-gray-300 space-y-2 text-base">
                  {personalInfo.education.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}