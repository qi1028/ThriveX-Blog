"use client"

import Script from "next/script"

export default () => {
    return (
        <Script dangerouslySetInnerHTML={{
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
    )
}