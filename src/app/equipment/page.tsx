const list = [
    {
        category: "正在使用的装备",
        description: "这些是我的核心生产力设备",
        items: [
            {
                name: "MacBook Air M4",
                image: "https://res.liuyuyang.net/thrive/equipment/MacBook%20Air%20M4.jpg",
                description: "发布当天就买了，目前在为我创造价值",
                price: 8757,
            },
            {
                name: "iPhone 16 Pro Max",
                image: "https://res.liuyuyang.net/thrive/equipment/iPhone16ProMax.jpg",
                description: "第一次用苹果，感觉除了流畅些，其他的都不如安卓 [:狗头]",
                price: 8299,
                color: "#F6F6F8",
            },
            {
                name: "Xiaomi 7s Pro",
                image: "https://res.liuyuyang.net/thrive/equipment/Xiaomi7sPro.png",
                description: "用来学习是个不错的选择",
                price: 2300,
            },
            {
                name: "Redmi A27U 4K 显示器",
                image: "https://res.liuyuyang.net/thrive/equipment/Redmi%20A27U%204K%20%E6%98%BE%E7%A4%BA%E5%99%A8.png",
                description: "4K 显示屏性价比天花板",
                price: 1399,
            },
            {
                name: "Magic Keyboard",
                image: "https://res.liuyuyang.net/thrive/equipment/Magic%20Keyboard.jpg",
                description: "习惯了用触控板，自然少不了这个",
                price: 599,
            },
            {
                name: "洛斐小顺青春版",
                image: "https://res.liuyuyang.net/thrive/equipment/%E6%B4%9B%E6%96%90%E5%B0%8F%E9%A1%BA%E9%9D%92%E6%98%A5%E7%89%88.jpeg",
                description: "目前我的主力键盘",
                price: 399,
            },
            {
                name: "Keychron K3 Max",
                image: "https://res.liuyuyang.net/thrive/equipment/Keychron%20K3%20Max.jpeg",
                description: "比小顺手感略差些",
                color: "#E9E9E9",
                price: 379,
            },
            {
                name: "ROG月刃无线AimPoint36k",
                image: "https://res.liuyuyang.net/thrive/equipment/ROGAimPoint36k.png",
                description: "颜值、手感和续航都很 Nice，可惜没有无极滚轮功能",
                color: "#E9E9E9",
                price: 319,
            }
        ]
    },
    {
        category: "以往的设备",
        description: "这些设备已经退役，但它们曾经陪伴我度过了一段美好的时光",
        items: [
            {
                name: "MacBook Air M2",
                image: "https://res.liuyuyang.net/thrive/equipment/MacBook%20Air%20M2.png",
                description: "第四台电脑， 用了半年以 6k 价位卖给了同学， 几乎每个月亏损 1k 🥺",
                price: 10017,
            },
            {
                name: "华硕灵耀 14",
                image: "https://res.liuyuyang.net/thrive/equipment/%E5%8D%8E%E7%A1%95%E7%81%B5%E8%80%80%2014.png",
                description: "我的第三台电脑，我比较看重这台电脑的屏幕显示效果。可不知道为什么电脑各方面配置还不错，但经常死机，不夸张的说一天能死机最起码 5 次，只能强制重启。最终用了半年多以 4k 出掉了 😤",
                price: 6596,
            },
            {
                name: "联想拯救者 R900k",
                image: "https://res.liuyuyang.net/thrive/equipment/%E8%81%94%E6%83%B3%E6%8B%AF%E6%95%91%E8%80%85%20R900k.jpg",
                description: "我的第二台电脑，买来之后几乎没打过游戏，每天在教室搬来搬去 用了一年左右干脆 5k 卖掉了",
                price: 9298,
            },
            {
                name: "联想小新 14",
                image: "https://res.liuyuyang.net/thrive/equipment/%E8%81%94%E6%83%B3%E5%B0%8F%E6%96%B0%2014.jpg",
                description: "我的第一台电脑，用了 2 年以 2700 卖掉，还挺保值的 😌",
                price: 4279,
            },
            {
                name: "小米 14 Pro",
                image: "https://res.liuyuyang.net/thrive/equipment/%E5%B0%8F%E7%B1%B3%2014%20Pro.jpg",
                description: "我的第三款小米手机",
                price: 4999,
            },
            {
                name: "小米 13",
                image: "https://res.liuyuyang.net/thrive/equipment/%E5%B0%8F%E7%B1%B3%2013.jpg",
                description: "我的第二款小米手机",
                price: 3920,
            },
            {
                name: "小米 10 至尊纪念版",
                image: "https://res.liuyuyang.net/thrive/equipment/%E5%B0%8F%E7%B1%B3%2010%20%E8%87%B3%E5%B0%8A%E7%BA%AA%E5%BF%B5%E7%89%88.webp",
                description: "我的第一款小米手机，用了 2 年以 1500 元卖掉了",
                price: 5599,
            },
            {
                name: "Vivo X23",
                image: "https://res.liuyuyang.net/thrive/equipment/Vivo%20X23.jpg",
                description: "我的第一款安卓手机",
                price: 2100,
            },
            {
                name: "iPhone SE",
                image: "https://res.liuyuyang.net/thrive/equipment/iPhone%20SE.jpg",
                description: "第一次用苹果 🤩",
                price: 0,
            },
            {
                name: "HUAWEI FreeBuds SE 2",
                image: "https://res.liuyuyang.net/thrive/equipment/HUAWEI%20FreeBuds%20SE%202.png",
                description: "还可以，只可惜不支持降噪和多设备连接",
                price: 175,
            },
            {
                name: "漫步者 LOLLI3 ANC",
                image: "https://res.liuyuyang.net/thrive/equipment/%E6%BC%AB%E6%AD%A5%E8%80%85%20LOLLI3%20ANC.jpg",
                description: "最终还是丢了 😭，以后不会再买这么贵的耳机了",
                price: 469,
                color: "#829887"
            },
            {
                name: "小度降噪耳机 Pro",
                image: "https://res.liuyuyang.net/thrive/equipment/%E5%B0%8F%E5%BA%A6%E9%99%8D%E5%99%AA%E8%80%B3%E6%9C%BA%20Pro.webp",
                description: "丢了 😭",
                price: 438,
            },
            {
                name: "漫步者 LolliPods plus",
                image: "https://res.liuyuyang.net/thrive/equipment/%E6%BC%AB%E6%AD%A5%E8%80%85%20LolliPods%20plus.jpg",
                description: "丢了 😭",
                price: 279,
            },
            {
                name: "腹灵 MK800",
                image: "https://res.liuyuyang.net/thrive/equipment/%E8%85%B9%E7%81%B5%20MK800.webp",
                description: "做工和外观都不错，只是按压偏重适合打游戏，最终以 200 元卖给了同学",
                price: 449,
            },
            {
                name: "RK987",
                image: "https://res.liuyuyang.net/thrive/equipment/RK987.webp",
                description: "键盘进水导致部分按键失灵，但不影响打游戏，后来以 20 元送给了同学",
                price: 273,
            },
            {
                name: "联想拯救者 M600",
                image: "https://res.liuyuyang.net/thrive/equipment/%E8%81%94%E6%83%B3%E6%8B%AF%E6%95%91%E8%80%85%20M600.jpg",
                description: "手感还不错，只是过保就坏😠，修的话也不划算就扔掉了",
                price: 205,
            },
            {
                name: "联想拯救者无线鼠标 M7",
                image: "https://res.liuyuyang.net/thrive/equipment/%E8%81%94%E6%83%B3%E6%8B%AF%E6%95%91%E8%80%85%E6%97%A0%E7%BA%BF%E9%BC%A0%E6%A0%87%20M7.jpg",
                description: "外观和手感都不错，尤其是滚轮支持无极滚动",
                price: 199,
            }
        ]
    }
];

export default () => {
    return (
        <>
            <title>🔭 我的设备 - 工欲善其事必先利其器</title>
            <meta name="description" content="🔭 分享我的生产力工具" />

            <div className="pt-20 pb-10">
                <div className="w-[90%] lg:w-[1200px] mx-auto mt-10 space-y-20 md:space-y-24">
                    {list.map((group, index) => (
                        <div key={index}>
                            <h2 className="text-xl">{group.category}</h2>
                            <p className="text-gray-600 mb-6">{group.description}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {group.items.map((item, idx) => (
                                    <div key={idx} className="group overflow-hidden border rounded-lg bg-white dark:bg-black-a transform transition-transform hover:scale-105 cursor-pointer">
                                        <div className="flex justify-center h-40" style={{ backgroundColor: item.color }}>
                                            <img src={item.image} alt={item.name} className="h-full object-cover" />
                                        </div>

                                        <div className="p-4">
                                            <h3 className="group-hover:text-primary transition-colors">{item.name}</h3>
                                            <p className="text-gray-500 text-sm pt-2 mb-4 line-clamp-2">{item.description}</p>
                                            <span className="mt-2 py-1 px-1.5 rounded-md text-white bg-gray-300 group-hover:bg-primary transition-colors">￥{item.price}</span>
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