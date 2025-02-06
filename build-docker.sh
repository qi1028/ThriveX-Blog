#!/usr/bin/env bash
set -e
# 打包vue 项目
echo "start build"
# 设置npm镜像源为国内源，以加快依赖安装速度
npm config set registry https://registry.npmmirror.com
# 安装项目依赖
npm install
# 运行构建命令，生成dist目录
npm run build
echo "build success"
# 删除旧的docker/html目录
rm -rf ./docker/html
# 将新构建的dist目录复制到docker/html
cp -rf ./dist ../docker/html
echo "copy success"
echo "start docker build"
# 进入docker目录
pushd ./docker
# 检查env.sh文件是否存在
if [[ ! -e env.sh ]];then
  echo "env.sh not found"
  exit 1
fi
# 加载环境变量
source env.sh
# 检查环境变量
if [[ -z "${images}" ]];then
  echo "images not Set, Please set env.sh"
  exit 1
fi
if [[ -z "${version}" ]];then
  echo "version not Set, Please set env.sh"
  exit 1
fi
# 判断 server.conf是否存在
if [[ ! -e server.conf ]];then
  echo "server.conf not found"
  exit 1
fi
# 判断 ./html目录是否存在
if [[ ! -e ./html ]];then
  echo "html directory not found"
  exit 1
fi
# 判断 Dockerfile是否存在
if [[ ! -e Dockerfile ]];then
  echo "Dockerfile not found"
  exit 1
fi
# 构建docker镜像
docker build -t ${images}:latest .
if [[ $? -ne 0 ]];then
  echo "build failed"
  exit 1
fi
# 给镜像打标签
docker tag ${images}:latest ${images}:${version}

# 如果server.conf存在，则运行容器
if [[ -e server.conf ]];then
  c="docker run -d --name nginx -P -v $(pwd)/server.conf:/etc/nginx/conf.d/server.conf -v $(pwd)/html:/usr/share/nginx/html ${images}:latest"
  $c
  if [[ $? -ne 0 ]];then
    echo $c
    echo "run failed"
    exit 1
  fi
  echo "Run Success"
fi
# 如果设置了push变量，则推送镜像到仓库
if [[ "${push}" == "1" ]];then
  docker push ${images}:latest
  docker push ${images}:${version}
fi
# 删除打包数据
rm -rf ./dist ./docker/html
echo "Success"
