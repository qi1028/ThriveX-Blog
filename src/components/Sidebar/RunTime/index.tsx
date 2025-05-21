"use client"

import Image from 'next/image';
import Timer from '@/assets/svg/other/timer.svg';
import { useConfigStore } from '@/stores';

export default () => {
  const { web } = useConfigStore()

  const calculateTimeDifference = (startTimestamp: number) => {
    const startDate = new Date(+startTimestamp);
    const currentDate = new Date();
    
    let years = currentDate.getFullYear() - startDate.getFullYear();
    let months = currentDate.getMonth() - startDate.getMonth();
    let days = currentDate.getDate() - startDate.getDate();
    
    // 处理月份和天数的进位
    if (days < 0) {
      const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }

    return `${years}年 ${months}个月 ${days}天`;
  };

  return (
    <div className="flex flex-col tw_container bg-white dark:bg-black-b p-4 mb-5 tw_title">
      <div className="tw_title w-full dark:text-white">
        <Image src={Timer} alt="站点运行时间" width={33} height={23} /> 站点运行时间
      </div>


      <div className="mt-2.5">{calculateTimeDifference(web?.create_time)}</div>
    </div>
  )
}