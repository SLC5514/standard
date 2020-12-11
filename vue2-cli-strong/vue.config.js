'use strict'

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 8080 // dev port

module.exports = {
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import '@/styles/variable.scss';`,
      },
    },
  },
  devServer: {
    port: port,
    // open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // proxy: {
    //   '/api': {
    //     target: `http://127.0.0.1:${port}/mock`,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       // '^/api': ''
    //     }
    //   }
    // },
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
