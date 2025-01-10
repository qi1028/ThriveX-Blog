#!/usr/bin/env bash
# 启用调试模式
set -x

# 如果BACKEND_PORT环境变量已设置，则将其值赋给PORT变量
if [[ -n "${BACKEND_PORT}" ]];then
    export PORT=${BACKEND_PORT}
fi

# 如果BACKEND_HOST环境变量已设置，则将其值赋给HOST变量，否则使用默认值9003
if [[ -n "${BACKEND_HOST}" ]];then
    export HOST=${BACKEND_HOST}
else
    echo "HOST is not set, use default value: 9003"
fi

# 确保BACKEND_HOST已设置，如果未设置则提示用户并退出脚本
if [[ -n "${BACKEND_HOST}" ]];then
  # 检查/etc/hosts文件中是否存在BACKEND_HOST，如果不存在则将其添加到文件中
  grep "${BACKEND_HOST}" /etc/hosts >/dev/null 2>&1 || echo "${BACKEND_HOST} $(hostname)" >> /etc/hosts
  echo "HOST is set to ${BACKEND_HOST}"
else
  echo "Please set BACKEND_HOST, Use -e BACKEND_HOST=xxxx"
  exit 1
fi

# 修改后端地址
sed -i "s@thrive.Server.demo:9003@${BACKEND_HOST}:${BACKEND_PORT}@" /etc/nginx/conf.d/*.conf

# 更新前端请求的后端地址
if [[ -e /thrive/src/utils/request.ts ]];then
  sed -i "s@thrive.Server.demo:9003@${BACKEND_HOST}:${BACKEND_PORT}@" /thrive/src/utils/request.ts
else
    echo "/thrive/src/utils/request.ts not found"
    exit 1
fi

# 检查nginx配置文件的正确性
nginx -t
if [ $? -ne 0 ];then
    echo "nginx config error"
    exit 1
fi

# 进入项目目录并启动开发服务器
cd /thrive
npm run dev&

# 启动Nginx
nginx -g "daemon off;"
