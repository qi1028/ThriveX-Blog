import HCaptcha from '@hcaptcha/react-hcaptcha';
import { forwardRef, Ref } from 'react';
import { useConfigStore } from '@/stores'

export default forwardRef(({ setToken }: { setToken: (token: string) => void }, ref: Ref<HCaptcha>) => {
  const sitekey = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY;
  // console.log('sitekey', sitekey);

  const config = useConfigStore()
  
  return (
    <div>
      <HCaptcha
        theme={config.isDark ? 'dark' : 'light'}
        sitekey={sitekey as string}
        onVerify={setToken}
        ref={ref}
      />
    </div>
  );
});
