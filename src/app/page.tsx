import Swiper from "@/components/Swiper";
import Typed from "@/components/Typed";
import Starry from "@/components/Starry"
import Container from "@/components/Container";
import ArticleLayout from "@/components/ArticleLayout";
import Sidebar from "@/components/Sidebar";

import { getConfigDataAPI } from '@/api/project'
import { Theme } from "@/types/app/project";
import Lantern from "@/components/Lantern";

interface Props {
  searchParams: { page: number };
};

export default async ({ searchParams }: Props) => {
  const page = searchParams.page || 1;
  const { data } = await getConfigDataAPI<Theme>("layout") || { data: {} as Theme }

  return (
    <>
      <Lantern data={['新', '春', '快', '乐']} />

      <Swiper src={data?.swiper_image}>
        {/* 星空背景组件 */}
        <Starry />
        {/* 打字机组件 */}
        <Typed className="absolute top-[45%] sm:top-[40%] left-[50%] transform -translate-x-1/2 w-[80%] text-center text-white xs:text-xl sm:text-[30px] leading-7 sm:leading-[40px] md:leading-[50px] custom_text_shadow"></Typed>
      </Swiper>

      <Container>
        {/* 文章列表 */}
        <ArticleLayout page={page} />
        {/* 侧边栏 */}
        <Sidebar />
      </Container>
    </>
  );
}