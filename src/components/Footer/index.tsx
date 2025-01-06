import Link from 'next/link';
import { Tooltip } from '@nextui-org/react';
import { getConfigDataAPI } from '@/api/project';
import { getUserDataAPI } from '@/api/user';
import { User } from '@/types/app/user';
import { Web } from '@/types/app/project';

export default async () => {
  const { data: user } = await getUserDataAPI() || { data: {} as User }
  const { data: web } = await getConfigDataAPI<Web>("web") || { data: {} as Web }

  return (
    <>
      <div className='bg-white dark:bg-black-b border-t dark:border-black-b px-10 transition-colors'>
        <div className="flex justify-center items-center py-4">
          <img src={user?.avatar} alt='作者头像' className='w-20 h-20 rounded-full mr-8 avatar-animation shadow-[5px_11px_30px_20px_rgba(255,255,255,0.1)]' />
          <h2 className="w-[90%] xl:w-3/6 text-sm sm:text-base dark:text-[#8c9ab1] line-clamp-4">{web?.footer}</h2>
        </div>

        {/* 
            为了项目的生态越来越强大，作者在这里恳请大家保留 ThriveX 博客系统版权
            在项目 Star 突破 2K 后大家可自由选择删除 or 保留版权
            如果你是项目贡献者 或 项目赞助者，那么你可以自由选择删除 or 保留版权
        */}
        <div className='py-4 border-t dark:border-black-a transition-colors'>
          <Tooltip showArrow={true} content="一款免费、开源、年轻、高颜值的现代化博客管理系统">
            <div className='flex justify-center items-center space-x-3'>
              <img src="https://bu.dusays.com/2024/11/17/6739adf188f64.png" width={30} height={30} alt='系统LOGO' />
              <Link href="https://github.com/LiuYuYang01/ThriveX-Blog" target='_blank' className='hover:text-primary transition-colors'> 基于开源项目 ThriveX 构建</Link>
            </div>
          </Tooltip>
        </div>
      </div>
    </>
  )
}