import dayFormat from './dayFormat'

// 生成随机数
export function getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export { dayFormat }