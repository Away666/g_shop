module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'api': '@/api',
        'views': '@/views',
        'plugins': '@/plugins',
        'store': '@/store',
        'utils': '@/utils'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        changeOrigin: true,
        ws: true,
        secure: false,
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  },
}