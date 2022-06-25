const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production'
  ? ''//这里写展示页面的仓库名称
  : '/',
  // 跨域问题解决
  devServer: {
    // 配置代理
    proxy: {
        '/bgapi': {
            // 此处的写法，目的是为了 将 /api 替换成 'https://iw233.cn/api.php'
            target: 'https://iw233.cn/api.php',
            // 允许跨域
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/bgapi': ''
            }
        }
    }
  }
})
// publicPath: process.env.NODE_ENV === 'production'
// ? '/My-Music-Cloud/'//这里写展示页面的仓库名称
// : '/',
