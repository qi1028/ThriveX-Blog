#!/usr/bin/env bash
set -x
pushd /thrive
if [[ -e package.json ]];then
  npm dev run &
else
  echo "No package.json found, running default command"
fi
# 启动Nginx
nginx -g "daemon off;"