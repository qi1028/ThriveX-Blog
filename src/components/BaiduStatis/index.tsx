'use client';

import { useEffect } from 'react';
import { useConfigStore } from '@/stores';

export default function BaiduAnalytics() {
  const web = useConfigStore((state) => state.web);

  useEffect(() => {
    if (web?.baidu_token) {
      window._hmt = window._hmt || [];
      const baiduScript = document.createElement('script');
      baiduScript.src = `https://hm.baidu.com/hm.js?${web.baidu_token}`;
      baiduScript.async = true;
      document.head.appendChild(baiduScript);

      return () => {
        document.head.removeChild(baiduScript);
      };
    }
  }, [web]);

  return null;
}
