'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Rss } from '@/types/app/rss';
import { getRssPagingAPI } from '@/api/Rss';
import Container from '@/components/Container';
import Loading from '@/components/Loading';
import Empty from '@/components/Empty';
import Pagination from '@/components/Pagination';
import RandomAvatar from '@/components/RandomAvatar';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import { HTMLParser } from '@/utils/htmlParser';

export default function FishpondPage() {
  const [rssData, setRssData] = useState<Paginate<Rss[]> | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const fetchRssData = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await getRssPagingAPI({
        query: {},
        pagination: {
          page,
          size: 10
        }
      });

      if (response?.data) {
        setRssData(response.data);
      }
    } catch (error) {
      console.error('获取RSS数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRssData(currentPage);
  }, [currentPage]);

  // 渲染内容组件
  const ContentRenderer = ({ content, mode = 'html' }: { content: string, mode?: 'html' | 'text' }) => {
    if (mode === 'text') {
      const summary = HTMLParser.getSummary(content, 150);
      return (
        <p className="m-0 my-2 text-sm leading-6 text-[#666] text-justify">
          {summary.text}
        </p>
      );
    }

    // HTML模式：安全渲染
    const cleanHTML = HTMLParser.sanitize(content, {
      allowedTags: ['p', 'br', 'strong', 'em', 'u', 'a', 'span', 'div'],
      allowedAttributes: ['href', 'target', 'rel'],
      maxLength: 150
    });

    return (
      <div className="m-0 my-2 text-sm leading-6 text-[#666] text-justify">
        {parse(cleanHTML)}
      </div>
    );
  };

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <Container>
      <title>🐟 鱼塘</title>
      <meta name="description" content="🐟 鱼塘" />

      <div className="w-full pt-20">
        <h2 className="text-center text-5xl pb-8">鱼塘</h2>

        <div>
          {rssData?.result && rssData.result.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] gap-5 md:grid-cols-1 md:gap-3.75">
              {rssData.result.map((item, index) => {
                const hasHTML = HTMLParser.containsHTML(item.description);
                const summary = HTMLParser.getSummary(item.description, 150);

                return (
                  <div key={`${item.url}-${index}`} className="border border-[#eee] rounded-md transition-all hover:shadow-[0_2px_8px_rgba(186,186,186,0.15)] bg-white p-5 hover:-translate-y-0.5">
                    <div className="flex justify-between items-center mb-3.75">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#eee]">
                          {item.image ? (
                            <img src={item.image} alt="avatar" className="w-full h-full object-cover" />
                          ) : (
                            <RandomAvatar className="w-full h-full rounded-full" />
                          )}
                        </div>

                        <div className="text-sm font-medium text-[#333]">
                          {item.email ? item.email.split('@')[0] : '匿名用户'}
                        </div>

                        {/* HTML标识 */}
                        {hasHTML && (
                          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                            HTML
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-[#666] opacity-80">
                        {item.createTime ? dayjs(+item.createTime).format('YYYY-MM-DD HH:mm:ss') : ''}
                      </div>
                    </div>

                    <div className="mb-3.75">
                      <h3 className="m-0 mb-2.5 text-lg font-semibold leading-6">
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[#333] no-underline transition-colors hover:text-[#539dfd]">
                          {item.title}
                        </a>
                      </h3>

                      <ContentRenderer content={item.description} />

                      {/* 显示内容长度信息 */}
                      {summary.isTruncated && (
                        <div className="text-xs text-[#999] mt-1">
                          已截断 · 原文 {summary.originalLength} 字符
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#eee]">
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-3 py-1 bg-[#539dfd60] text-[#539dfd] text-xs rounded-full font-medium">
                          {item.type}
                        </span>
                      </div>

                      <div className="text-xs text-[#888]">
                        {item.createTime ? dayjs(+item.createTime).format('MM-DD HH:mm') : ''}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <Empty info="暂无友链动态" />
          )}

          {rssData && rssData.pages > 1 && (
            <div className="mt-10 flex justify-center">
              <Pagination
                total={rssData.pages}
                page={currentPage}
                path="/fishpond"
                className="flex justify-center mt-8"
              />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}