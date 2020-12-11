import { createApp } from 'vue'

import router from '/@/router'
import store from '/@/store'

import App from '/@/App.vue'

import '/@/index.css'

// TODO UI库

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')

// ! 中断
