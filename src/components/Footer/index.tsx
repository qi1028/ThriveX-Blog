import Image from 'next/image';
import { getWebConfigDataAPI } from '@/api/config';
import { getAuthorDataAPI } from '@/api/user';
import { User } from '@/types/app/user';
import { Web } from '@/types/app/config';

import animals from './images/animals.webp';
import ICP from './images/ICP.png';

export default async () => {
  const { data: user } = (await getAuthorDataAPI()) || { data: {} as User };
  const {
    data: { value: web },
  } = (await getWebConfigDataAPI<{ value: Web }>('web')) || { data: { value: {} as Web } };

  return (
    <>
      <div className='sticky bottom-0 z-30 translate-y-[25px] flex justify-center w-full bg-cover bg-center after:content-[""] after:w-full after:h-[60%] after:absolute after:bottom-[25px] after:left-0 after:bg-[linear-gradient(to_top,#fff,transparent)] dark:after:bg-[linear-gradient(to_top,#2c333e,transparent)]'>
        <div className="flex justify-center lg:w-[950px] xl:w-[1200px] mx-auto">
          <Image src={animals} alt="动物" width={660.34} height={79.99} className="relative z-40 hidden md:block" />
        </div>
      </div>

      <div className="bg-white dark:bg-black-b border-t dark:border-black-b px-10  ">
        <div className="flex justify-center items-center py-4">
          <img src={user?.avatar} alt="作者头像" className="w-20 h-20 rounded-full mr-8 avatar-animation shadow-[5px_11px_30px_20px_rgba(255,255,255,0.1)]" />
          <h1 className="w-[90%] xl:w-3/6 text-sm sm:text-base dark:text-[#8c9ab1] line-clamp-4 text-center">{web?.footer}</h1>
        </div>

        <div className="flex flex-col items-center pb-4 cursor-pointer">
          <div className="flex items-center space-x-2">
            <Image src={ICP} alt="ICP" width={20} height={22} className="w-5 h-[22px]" />
            <span className="hover:text-primary">{web?.icp}</span>
          </div>
          <div className="flex flex-col items-center mt-2">
            <span className="hover:text-primary">吉ICP备2025030900号-1</span>
          </div>
        </div>
      </div>
    </>
  );
};
