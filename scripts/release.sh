#!/usr/bin/bash

# 本地路径
DIST=dist
# 服务器地址
SERVER_HOST=45.76.204.22
# 服务器路径
TARGET_DIST=/www/wwwroot/cyclex.monster-island.top

# 打包完，上传到服务器
npm run build && \
sshpass -p "#8vHw_!EDE7Jk[S=" scp -r ./$DIST/* root@$SERVER_HOST:$TARGET_DIST

# 服务器重启nginx
sshpass -p "#8vHw_!EDE7Jk[S=" ssh root@$SERVER_HOST "nginx -s reload"

