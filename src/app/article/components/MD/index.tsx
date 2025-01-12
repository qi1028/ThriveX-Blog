"use client"

import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useConfigStore } from "@/stores";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import 'highlight.js/styles/vs2015.css';
import "./index.scss";
import "katex/dist/katex.min.css";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { remarkMark } from 'remark-mark-highlight';
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeSemanticBlockquotes from "rehype-semantic-blockquotes";
import rehypeCallouts from "rehype-callouts";
import 'rehype-callouts/theme/obsidian';
import rehypeRaw from 'rehype-raw';
import Skeleton from "@/components/Skeleton";

interface Props {
    data: string;
}

const ContentMD = ({ data }: Props) => {
    const { isDark } = useConfigStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        document.body.style.backgroundColor = '#fff';
        let color = isDark ? "36, 41, 48" : "255, 255, 255";

        const waves = document.querySelectorAll<SVGUseElement>(".waves use");
        if (waves) {
            waves[0].style.fill = `rgba(${color}, 0.7)`;
            waves[1].style.fill = `rgba(${color}, 0.5)`;
            waves[2].style.fill = `rgba(${color}, 0.3)`;
            waves[3].style.fill = `rgba(${color})`;
        }

        return () => {
            document.body.style.backgroundColor = '#f9f9f9';
            
            if (waves) {
                waves[0].style.fill = "rgba(249, 249, 249, 0.7)";
                waves[1].style.fill = "rgba(249, 249, 249, 0.5)";
                waves[2].style.fill = "rgba(249, 249, 249, 0.3)";
                waves[3].style.fill = "rgba(249, 249, 249)";
            }
        };
    }, [isDark]);

    if (!isClient) {
        return (
            <div className="ContentMdComponent">
                <div className="content markdown-body space-y-6 p-4">
                    {/* 标题骨架屏 */}
                    <Skeleton className="h-10 w-3/4" />
                    
                    {/* 段落骨架屏 */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-11/12" />
                        <Skeleton className="h-4 w-4/5" />
                    </div>
                    
                    {/* 图片骨架屏 */}
                    <Skeleton className="h-[200px] w-3/6 my-4" />
                    
                    {/* 更多段落骨架屏 */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-10/12" />
                        <Skeleton className="h-4 w-9/12" />
                    </div>
                    
                    {/* 代码块骨架屏 */}
                    <Skeleton className="h-[120px] w-full" />
                </div>
            </div>
        );
    }

    const renderers = {
        img: ({ alt, src }: { alt?: string; src?: string }) => {
            const imgRef = useRef<HTMLImageElement>(null);

            useEffect(() => {
                const img = imgRef.current;
                if (!img) return;

                // 监听图片是否进入可视区
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                setTimeout(() => {
                                    img.style.filter = 'blur(0px)';
                                }, 400)
                                observer.unobserve(img); // 停止观察
                            }
                        });
                    },
                    { threshold: 0.1 }
                );

                observer.observe(img);

                return () => {
                    observer.unobserve(img);
                };
            }, []);

            return (
                <PhotoView src={src || ''}>
                    <span className="flex justify-center my-4 dark:brightness-90">
                        <img ref={imgRef} alt={alt} src={src} className="max-h-[650px]" />
                    </span>
                </PhotoView>
            );
        },
        a: ({ href, children }: { href?: string, children?: React.ReactNode }) => {
            if (children === 'douyin-video' && href) {
                // 从URL中提取视频ID
                const videoId = href.split('/').pop();

                return (
                    <div className="flex justify-center">
                        <iframe
                            src={`https://open.douyin.com/player/video?vid=${videoId}&autoplay=0`}
                            referrerPolicy="unsafe-url"
                            allowFullScreen
                            className="douyin"
                        />
                    </div>
                );
            }
            
            return <a href={href}>{children}</a>;
        }
    };

    return (
        <div className="ContentMdComponent">
            <PhotoProvider>
                <div className="content markdown-body">
                    <ReactMarkdown
                        components={renderers}
                        remarkPlugins={[[remarkGfm, { singleTilde: false }], remarkMath, remarkMark]}
                        rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex, rehypeCallouts, rehypeSemanticBlockquotes]}
                    >{data}</ReactMarkdown>
                </div>
            </PhotoProvider>
        </div>
    );
};

export default ContentMD;
