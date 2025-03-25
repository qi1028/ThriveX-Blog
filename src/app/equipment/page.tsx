import Link from "next/link"

const list = [
    {
        category: "核心生产力",
        describe: "我们正在使用的装备提升了生产力",
        items: [
            {
                name: "MacBook Pro 2026",
                image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp16-spacegray-select-202601?wid=904&hei=840&fmt=jpeg",
                description: "M2芯片，32GB内存，1TB存储",
                link: "/equipment/macbook-pro",
            },
            {
                name: "iPhone 14 Pro Max",
                image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone14promax-silver-select-202601?wid=904&hei=840&fmt=jpeg",
                description: "A16芯片，256GB存储",
                link: "/equipment/iphone-14-pro-max",
            },
            {
                name: "无线机械键盘",
                image: "https://example.com/images/keyboard.jpg",
                description: "RGB背光，红轴，蓝牙连接",
                link: "/equipment/wireless-keyboard",
            },
            {
                name: "Logitech MX Master 4",
                image: "https://example.com/images/mouse.jpg",
                description: "高级无线鼠标，USB-C充电",
                link: "/equipment/logitech-mx-master-4",
            },
            {
                name: "三星49英寸超宽显示器",
                image: "https://example.com/images/monitor.jpg",
                description: "5120x1440分辨率，HDR支持",
                link: "/equipment/samsung-monitor",
            }
        ]
    },
    {
        category: "创意设计",
        describe: "这些装备帮助我们实现创意设计",
        items: [
            {
                name: "Wacom Cintiq Pro 24",
                image: "https://example.com/images/wacom.jpg",
                description: "4K触控显示屏，支持手写笔",
                link: "/equipment/wacom-cintiq",
            },
            {
                name: "Adobe Creative Cloud",
                image: "https://example.com/images/adobe.jpg",
                description: "全套创意软件，云端存储",
                link: "/equipment/adobe-creative-cloud",
            },
            {
                name: "Canon EOS R5",
                image: "https://example.com/images/camera.jpg",
                description: "4500万像素，全画幅无反相机",
                link: "/equipment/canon-eos-r5",
            }
        ]
    }
];

export default () => {
    return (
        <>
            <title>装备</title>
            <meta name="description" content="装备" />

            <div className="pt-20">
                <div className="w-[90%] lg:w-[1200px] mx-auto mt-10 space-y-20 md:space-y-24">
                    {list.map((group, index) => (
                        <div key={index}>
                            <h2 className="text-xl">{group.category}</h2>
                            <p className="text-gray-600 mb-6">{group.describe}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {group.items.map((item, idx) => (
                                    <div key={idx} className="overflow-hidden border rounded-lg bg-white dark:bg-black-a">
                                        <div className="flex justify-center h-40 bg-gray-100">
                                            <img src={item.image} alt={item.name} className="h-full object-cover" />
                                        </div>

                                        <div className="p-4">
                                            <h3>{item.name}</h3>
                                            <p className="text-gray-500 text-sm pt-2 pb-4">{item.description}</p>
                                            <Link className="mt-2 py-1 px-1.5 rounded-md text-gray-600 bg-gray-100 hover:text-blue-800" href={item.link}>详情</Link>
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