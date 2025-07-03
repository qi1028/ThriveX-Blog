import Request from "@/utils/request";
import { EnvConfig, EnvConfigName } from "@/types/app/project";

// 获取项目配置
export const getConfigDataAPI = <T>(type: string) => Request<T>("GET", `/config/list/${type}`)

// 修改项目配置
export const editConfigDataAPI = (type: string, data: object) => Request<{ [string: string]: string }>("PATCH", `/config/${type}`, { data })


// 获取环境配置
export const getEnvConfigDataAPI = () => Request("GET", `/env_config/gaode_map`)