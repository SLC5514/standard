import path from 'path'

export default {
  // optimizeDeps: {
  //   include: ['es6-promise/auto']
  // },
  alias: {
    // fs目录必须以斜杠开头和结尾
    '/@/': path.resolve(__dirname, 'src')
  },
  // proxy: {
  //   '/api': {
  //     target: 'http://jsonplaceholder.typicode.com',
  //     changeOrigin: true,
  //     rewrite: path => path.replace(/^\/api/, '')
  //   }
  // },
}
