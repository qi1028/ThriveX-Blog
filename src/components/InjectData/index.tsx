'use client';

import { useEffect } from 'react';

import { getWebConfigDataAPI } from '@/api/config';
import { useConfigStore } from '@/stores';
import { Web, Theme, Other } from '@/types/app/config';

export default () => {
  const { setWeb, setTheme, setOther } = useConfigStore();

  // 获取项目配置
  const getConfigData = async () => {
    const {
      data: { value: web },
    } = (await getWebConfigDataAPI<{ value: Web }>('web')) || { data: { value: {} as Web } };
    setWeb(web);

    const {
      data: { value: theme },
    } = (await getWebConfigDataAPI<{ value: Theme }>('theme')) || { data: { value: {} as Theme } };
    setTheme(theme);

    const {
      data: { value: other },
    } = (await getWebConfigDataAPI<{ value: Other }>('other')) || { data: { value: {} as Other } };
    setOther(other);
  };

  useEffect(() => {
    getConfigData();
  }, []);

  return null;
};
