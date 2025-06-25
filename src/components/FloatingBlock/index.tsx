'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@heroui/react'
import {
    IoChevronUp,
    IoChevronDown,
    IoChatbubbleEllipsesOutline,
    IoCallOutline,
    IoMailOutline,
    IoHelpCircleOutline
} from 'react-icons/io5'

const FloatingBlock = () => {
    const [isExpanded, setIsExpanded] = useState(false) // 展开状态的变量

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }

    const actionItems = [
        {
            icon: IoChatbubbleEllipsesOutline,
            id: '1',
            onClick: () => console.log('1')
        },
        {
            icon: IoCallOutline,
            id: '2',
            onClick: () => console.log('2')
        },
        {
            icon: IoMailOutline,
            id: '3',
            onClick: () => console.log('3')
        },
        {
            icon: IoHelpCircleOutline,
            id: '4',
            onClick: () => console.log('4')
        },
        {
            icon: IoHelpCircleOutline,
            id: '5',
            onClick: () => console.log('5')
        },
        {
            icon: IoHelpCircleOutline,
            id: '6',
            onClick: () => console.log('6')
        },
        {
            icon: IoHelpCircleOutline,
            id: '7',
            onClick: () => console.log('7')
        },
    ]

    // 计算每个项目的位置（圆形分布）
    const getItemPosition = (index: number, total: number) => {
        const angle = (index * 360) / total - 90 // 从顶部开始
        const radius = 50 // 半径 [距离按钮的距离]
        const x = Math.cos((angle * Math.PI) / 180) * radius
        const y = Math.sin((angle * Math.PI) / 180) * radius
        return { x, y }
    }

    return (
        <div className={`fixed bottom-[100px] right-[150px] z-50`}>
            {/* 围绕的功能项 */}
            <AnimatePresence>
                {isExpanded && (
                    <>
                        {actionItems.map((item, index) => {
                            const position = getItemPosition(index, actionItems.length)
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ // 初始状态
                                        opacity: 0,
                                        scale: 0,
                                        x: 0,
                                        y: 0
                                    }}
                                    animate={{ // 动画状态
                                        opacity: 1,
                                        scale: 1,
                                        x: position.x,
                                        y: position.y
                                    }}
                                    exit={{ // 退出状态
                                        opacity: 0,
                                        scale: 0,
                                        x: 0,
                                        y: 0
                                    }}
                                    transition={{ // 过渡动画
                                        duration: 0.4,
                                        delay: index * 0.1,
                                        ease: [0.25, 0.46, 0.45, 0.94]
                                    }}
                                    className="absolute"
                                    style={{
                                        left: '50%',
                                        top: '50%',
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="relative"
                                    >
                                        <Button
                                            isIconOnly
                                            size="md"
                                            className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
                                            shadow-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50
                                            dark:hover:bg-gray-700 -translate-x-5 -translate-y-5"
                                            onClick={item.onClick}
                                        >
                                            <item.icon className="w-5 h-5" />
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            )
                        })}
                    </>
                )}
            </AnimatePresence>

            {/* 主按钮 */}
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative"
            >
                <Button
                    isIconOnly
                    size="lg"
                    className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg rounded-full"
                    onClick={toggleExpanded}
                >
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isExpanded ? (
                            <IoChevronDown className="w-6 h-6" />
                        ) : (
                            <IoChevronUp className="w-6 h-6" />
                        )}
                    </motion.div>
                </Button>
            </motion.div>
        </div>
    )
}

export default FloatingBlock
