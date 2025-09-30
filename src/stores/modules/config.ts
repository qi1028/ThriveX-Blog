import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Other, Theme, Web } from '@/types/app/config';

interface ConfigState {
  // 是否暗黑模式
  isDark: boolean;
  setIsDark: (status: boolean) => void;

  // 网站配置
  web: Web;
  setWeb: (data: Web) => void;

  // 主题配置
  theme: Theme;
  setTheme: (data: Theme) => void;
  setSwiperText: (texts: string[]) => void; // 添加设置swiper_text的方法

  // 其他配置
  other: Other;
  setOther: (data: Other) => void;
}

export default create(
  persist<ConfigState>(
    (set) => ({
      isDark: false,
      setIsDark: (status: boolean) => set(() => ({ isDark: status })),

      web: {} as Web,
      setWeb: (data: Web) => set(() => ({ web: data })),

      theme: {} as Theme,
      setTheme: (data: Theme) => set(() => ({ theme: data })),
      setSwiperText: (texts: string[]) => set((state) => ({ 
        theme: { ...state.theme, swiper_text: texts } 
      })),

      other: {} as Other,
      setOther: (data: Other) => set(() => ({ other: data }))
    }),
    {
      name: 'config_storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)