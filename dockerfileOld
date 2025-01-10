# 使用官方的Node.js镜像作为基础镜像
FROM node:20-alpine

# # 设置工作目录
WORKDIR /thrive

# 配置 npm 镜像源
RUN npm config set registry https://registry.npmmirror.com

# 安装依赖
RUN npm install

# 复制所有文件到工作目录
COPY . .

# 构建Next.js应用
RUN npm run build

# 第二阶段：部署 Node.js 应用并集成 Nginx
FROM nginx:alpine

COPY --from=builder /thrive/build /usr/share/nginx/html


# 暴露应用运行的端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
