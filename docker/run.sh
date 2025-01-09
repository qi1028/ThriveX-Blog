#!/usr/bin/env sh
set -x
cd /thrive
if [[ -e /thrive/package.json ]];then
  npm dev run &
else
  echo "No package.json found, running default command"
fi
# 启动Nginx
nginx -g "daemon off;"