# 保证你的build.sh脚本有任何错误就退出
set -e

# 所有内容参考 http://fe.baidu-int.com/build
# 添加下一行保证能够找到正确的Node和npm，以及yarn命令。
export PATH=$NODEJS_BIN_LATEST:$PATH

echo "node: $(node -v)"
echo "npm: v$(npm -v)"

# 重新安装
rm -rf node_modules
### 执行项目构建
npm install --production=false
echo "install finished"
npm run build  || { echo 'build failed'; exit 1; }
echo "build finished"

# 判断是否存在output目录，如果存在则彻底删除
if [ -d "output" ]; then
  rm -rf output
fi

# 把 build 生成的 dist 目录里面的文件打包，并放到 output目录下， 用于发布
mkdir output
cd dist
zip -rq --symlinks ../output/output.zip .
cd ..
ls output

echo "\033[34m build success \033[0m"