#!/usr/bin/env bash
set -x
nginx -t
if [ $? -ne 0 ];then
    echo "nginx config error"
    exit 1
fi
if [[ -n "${BACKEND_PORT}" ]];then
    export PORT=${BACKEND_PORT}
fi
if [[ -n "${BACKEND_HOST}" ]];then
    export HOST=${BACKEND_HOST}
else
    echo "HOST is not set, use default value: 9003"
fi
if [[ -n "${BACKEND_HOST}" ]];then
  grep "${BACKEND_HOST}" /etc/hosts >/dev/null 2>&1 || echo "${BACKEND_HOST} $(hostname)" >> /etc/hosts
  echo "HOST is set to ${BACKEND_HOST}"
else
  echo "Please set BACKEND_HOST, Use -e BACKEND_HOST=xxxx"
  exit 1
fi
# 修改后端地址
sed -i "s@thrive.Server.demo:9003@${BACKEND_HOST}:${BACKEND_PORT}@" /etc/nginx/conf.d/*.conf
if [[ -e /thrive/src/utils/request.ts ]];then
  sed -i "s@thrive.Server.demo:9003@${BACKEND_HOST}:${BACKEND_PORT}@" /thrive/src/utils/request.ts
else
    echo "/thrive/src/utils/request.ts not found"
    exit 1
fi
ping -c 3 ${BACKEND_HOST} >/dev/null 2>&1
if [ $? -ne 0 ];then
    echo "ping ${BACKEND_HOST} failed"
#    exit 1
fi
cd /thrive
npm run dev&
# 启动Nginx
nginx -g "daemon off;"