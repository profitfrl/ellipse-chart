/**
 * @file 运行配置
 * @author BIFE
 */
/* eslint-disable */

const path = require('path');
const fs = require('fs');

const sourceFile = __dirname + '/build/auth.js.example';
const targetFile = __dirname + '/build/auth.js';
if (!fs.existsSync(targetFile)) {
    fs.copyFileSync(sourceFile, targetFile);
}

function resolve(dir) {
    return path.join(__dirname, dir);
}


module.exports = {
    devServer: {
        before(app) {
        }
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            }
        }
    },
    transpileDependencies: ['resize-detector'],
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('css', resolve('src/assets/styles'))
            .set('components', resolve('src/components'))
            .set('types', resolve('src/types'))
            .set('utils', resolve('src/utils'))
            .set('views', resolve('src/views'))
            .set('options', resolve('src/options'))
            .end();
        // 异步组件禁用预加载
        config.plugins.delete('prefetch');
    },

    // 打包配置
    publicPath: '',
    // 放置打包后生成的静态资源（js、css、img、fonts）的目录，该目录相对于outputDir
    assetsDir: 'static',
    // 指定生成的index.html的输出路径，相对于outputDir。也可以是一个绝对路径。
    indexPath: 'index.html'
};
