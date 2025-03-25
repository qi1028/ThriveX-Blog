import Link from "next/link"

const list = [
    {
        category: "核心生产力",
        describe: "我们正在使用的装备提升了生产力",
        items: [
            {
                name: "MacBook Air M4 2025",
                image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mba13-skyblue-select-202503?wid=904&hei=840&fmt=jpeg",
                description: "目前我吃饭的家伙",
                link: "https://www.apple.com.cn/shop/buy-mac/macbook-air/15-%E8%8B%B1%E5%AF%B8",
            },
            {
                name: "iPhone 16 Pro Max",
                image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-naturaltitanium?wid=5120&hei=2880&fmt=webp&qlt=70&.v=eUdsd0dIb3VUOXdtWkY0VFUwVE8vbEdkZHNlSjBQRklnaFB2d3I5MW94NkkwYXJHRXdBd0xZTDNUS0M2eUNlY0pOZTBYalh5Vk90cEc1K2wwRzFGejRMeXJHUnUva2huMjl4akFHOXNwVjA0YXFmK3VWSWZuRE9oVEFyUFR0T2h6UkM0eXdTUkFqNnFqYk5ZcGUzV2tB&traceId=1",
                description: "第一次用苹果，感觉除了流畅些，其他的都不如安卓 [:狗头]",
                link: "https://www.apple.com.cn/shop/buy-iphone/iphone-16-pro",
                color: "#F6F6F8",
            },
            {
                name: "Redmi A27U 4K 显示器",
                image: "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1736388499.01483010.png",
                description: "4K 显示屏性价比天花板",
                link: "https://www.mi.com/shop/buy/detail?product_id=20271",
            },
            {
                name: "Magic Keyboard",
                image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MXK93?wid=1144&hei=1144&fmt=jpeg",
                description: "习惯了用触控板，自然少不了这个",
                link: "https://www.apple.com.cn/shop/product/MXK93CH/A",
            },
            {
                name: "洛斐小顺青春版",
                image: "https://bu.dusays.com/2025/03/25/67e28aded4653.jpeg",
                description: "目前我的主力键盘",
                link: "",
            },
            {
                name: "京东京造 K3 Max",
                image: "https://bu.dusays.com/2025/03/25/67e28b24c5353.jpeg",
                description: "比小顺手感略差些",
                color: "#E9E9E9",
                link: "",
            },
            {
                name: "HUAWEI FreeBuds SE 2 海岛蓝",
                image: "https://res2.vmallres.com/pimages/uomcdn/CN/pms/202405/gbom/6942103104039/428_428_85111776E033FD73B02D7781416437A6mp.png",
                description: "性价比还不错",
                link: "https://www.vmall.com/product/10086459091537.html",
            },
            {
                name: "联想拯救者无线鼠标 M7",
                image: "https://p2.lefile.cn/product/adminweb/2022/10/19/8BlUh9hL1iU9FudPwlI3iAT2u-2520.jpg",
                description: "外观和手感都不错，尤其是滚轮支持无极滚动",
                link: "https://item.lenovo.com.cn/product/1026318.html",
            }
        ]
    },
    // {
    //     category: "以往设备",
    //     describe: "这些设备已经退役，但它们曾经陪伴我度过了一段美好的时光",
    //     items: [
    //         {
    //             name: "MacBook Air M2 2023",
    //             image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13-spacegray-select-202011?wid=1144&hei=1144&fmt=jpeg",
    //             description: "24年9月购入，25年3月退役，最终以6k价位卖给了同学， 使用了半年几乎每个月亏损 1k",
    //             link: "",
    //         }
    //     ]
    // }
];
export default () => {
    return (
        <>
            <title>工欲善其事必先利其器</title>
            <meta name="description" content="分享我的生产力工具" />

            <div className="pt-20 pb-10">
                <div className="w-[90%] lg:w-[1200px] mx-auto mt-10 space-y-20 md:space-y-24">
                    {list.map((group, index) => (
                        <div key={index}>
                            <h2 className="text-xl">{group.category}</h2>
                            <p className="text-gray-600 mb-6">{group.describe}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {group.items.map((item, idx) => (
                                    <div key={idx} className="overflow-hidden border rounded-lg bg-white dark:bg-black-a">
                                        <div className="flex justify-center h-40" style={{ backgroundColor: item.color }}>
                                            <img src={item.image} alt={item.name} className="h-full object-cover" />
                                        </div>

                                        <div className="p-4">
                                            <h3>{item.name}</h3>
                                            <p className="text-gray-500 text-sm pt-2 pb-4">{item.description}</p>
                                            {
                                                item.link
                                                    ? <Link href={item.link} target="_blank" className={`mt-2 py-1 px-1.5 rounded-md text-gray-600 bg-gray-100 hover:text-blue-800 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500`}>购买</Link>
                                                    : <span className="mt-2 py-1 px-1.5 rounded-md text-gray-400 bg-gray-100">暂无</span>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}