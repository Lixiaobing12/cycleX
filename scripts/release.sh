#!/usr/bin/bash

# 本地路径
DIST=dist
# 服务器地址
SERVER_HOST=45.76.204.22
# 服务器路径
TARGET_DIST=/www/wwwroot/shtest

# 打包完，上传到服务器
npm run build && \
scp -r ./$DIST/* root@$SERVER_HOST:$TARGET_DIST

# 服务器重启nginx
ssh root@$SERVER_HOST "nginx -s reload"
