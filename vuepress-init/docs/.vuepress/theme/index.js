module.exports = {
  globalLayout: './layouts/GlobalLayout.vue',
  plugins: [
    '@vuepress/pwa',
    {
      serviceWorker: true,
      updatePopup: true
    }
  ]
}
