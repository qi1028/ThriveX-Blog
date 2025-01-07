FROM nginx:latest
LABEL authors="坐公交也用券"
LABEL HOME="https://gitee.com/liumou_site"
# 复制网页源码到Nginx的默认网站根目录
COPY ./html /usr/share/nginx/html
COPY ./thrive.conf /etc/nginx/conf.d/thrive.conf
ENV TZ=Asia/Shanghai
ARG HTML_VERSION=2.1.5
ENV HTML_VERSION=${HTML_VERSION}
RUN ln -sf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 暴露80端口
EXPOSE 80

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]
