"use client"

import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@heroui/react";
import { getFootprintListAPI } from "@/api/footprint";
import { Footprint } from "@/types/app/footprint";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import dayjs from 'dayjs'
import Masonry from "react-masonry-css";
import "./page.scss";

const breakpointColumnsObj = {
    default: 4,
    1024: 3,
    700: 2
};

export default function MapContainer() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isDismissable, setIsDismissable] = useState(true); // 默认允许关闭
    const [list, setList] = useState<Footprint[]>([])

    const getFootprintList = async () => {
        const { data } = (await getFootprintListAPI()) || { data: [] as Footprint[] }
        setList(data)
    }

    useEffect(() => {
        getFootprintList()
    }, [])

    const [data, setData] = useState<Footprint>({} as Footprint);
    let map: any = null;

    useEffect(() => {
        if (!list.length) return

        // 确保代码仅在客户端执行
        import('@amap/amap-jsapi-loader').then(AMapLoader => {
            // @ts-ignore
            window._AMapSecurityConfig = {
                securityJsCode: process.env.NEXT_PUBLIC_GAODE_SECURITYJS_CODE,
            };

            AMapLoader.load({
                key: process.env.NEXT_PUBLIC_GAODE_KEY_CODE!, // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0",
                plugins: ["AMap.Scale", "AMap.Marker"],
            })
                .then((AMap) => {
                    map = new AMap.Map("container", {
                        // 地图样式
                        mapStyle: "amap://styles/grey",
                        viewMode: "3D", // 是否为3D地图模式
                        zoom: 4.8,
                        center: [105.625368, 37.746599], // 初始化地图中心点位置
                    });

                    // 遍历 locations 数组，创建标记
                    list?.forEach((data) => {
                        console.log(data);

                        const marker = new AMap.Marker({
                            position: data?.position.split(","), // 标记位置
                            map: map, // 将标记添加到地图
                            content: `
                            <div style="display: flex; justify-content: center; align-items: center; background-color: #fff; width: 30px; height: 30px; border-radius: 50%; overflow: hidden; box-shadow: 0 0 30px 1px rgba(255, 255, 255, 0.7);">
                                <img src="${data?.images[0]}" alt="" style="width: 90%; height: 90%; border-radius: 50%;">
                            </div>
                            `
                        });

                        // 点击标记时，设置选中的位置，并打开 Modal
                        marker.on("click", () => {
                            onOpen();
                            setData(data);
                        });
                    });

                    // 点击任意位置清空信息框内容并关闭
                    // map.on("click", () => {
                    //     setData(null);
                    // });
                })
                .catch((e) => {
                    console.log(e);
                });

            return () => map?.destroy();
        });
    }, [list]);

    return (
        <>
            <title>那年走过的路</title>
            <meta name="description" content="那年走过的路" />

            <div id="container"></div>

            <Modal
                size="4xl"
                backdrop="opaque"
                isDismissable={isDismissable}
                isOpen={isOpen}
                onOpenChange={(open) => {
                    if (isDismissable || !open) onOpenChange();
                }}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent className="bg-[rgba(36,40,45,0.9)]">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center pb-2 text-white">{data?.title}</ModalHeader>

                            <ModalBody>
                                <div className="flex flex-col">
                                    <div className="flex flex-col justify-between w-full mb-8">
                                        <p className="overflow-auto max-h-[210px] text-[#d6d6d6] px-[5px]">{data?.content}</p>

                                        <div className="text-sm text-end text-[#a5a5a5] pt-2">
                                            <p>时间：{dayjs(+data?.createTime).format('YYYY-MM-DD HH:mm')}</p>
                                            <p>地址：{data?.address}</p>
                                        </div>
                                    </div>

                                    <div className={`overflow-auto flex justify-center w-full ${data?.images.length !== 1 ? 'max-h-96' : ''} mb-5 hide_sliding`}>
                                        <PhotoProvider
                                            speed={() => 800}
                                            easing={(type) => (type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}
                                            onVisibleChange={(visible) => {
                                                // 当图片预览模式打开时，不允许关闭 Modal
                                                setIsDismissable(!visible);
                                            }}
                                        >
                                            <Masonry
                                                breakpointCols={breakpointColumnsObj}
                                                className="masonry-grid mb-12"
                                                columnClassName="masonry-grid_column"
                                            >
                                                {
                                                    data?.images?.map((item, index) => (
                                                        <PhotoView src={item} key={index}>
                                                            <img src={item} alt="" className="rounded-2xl w-full mb-3 cursor-pointer" />
                                                        </PhotoView>
                                                    ))
                                                }
                                            </Masonry>
                                        </PhotoProvider>
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}