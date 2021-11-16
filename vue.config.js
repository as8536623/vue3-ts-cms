const path = require('path')
module.exports = {
  outputDir: './build',
  publicPath: './',
  /*configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    }
  }*/
  /*configureWebpack: (config) => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, 'src'),
      components: '@/components'
    }
  }*/
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src')).set('components', '@/components')
  },
  devServer: {
    hot: true,
    open: true,
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    port: 8081
  }
}
