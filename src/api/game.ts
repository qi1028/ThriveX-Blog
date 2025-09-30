import Request from '@/utils/request';
import { Game } from '@/types/app/game';

// 分页获取游戏列表
export const getGamePagingAPI = async (page: number = 1, size: number = 8) => {
    return await Request<any>('POST', `/game/paging?page=${page}&size=${size}`);
}

// 获取游戏列表
export const getGameListAPI = async () => {
    return await Request<Game[]>('POST', `/game/list`);
}

// 根据ID获取游戏
export const getGameAPI = async (id: number) => {
    return await Request<Game>('GET', `/game/${id}`);
}