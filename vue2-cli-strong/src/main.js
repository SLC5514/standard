import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import VueLazyLoad from 'vue-lazyload'
// import Element from 'element-ui'
import { Loading, Message } from 'element-ui'

// 移动端 100vh 问题
import vhCheck from 'vh-check'
vhCheck('browser-address-bar')

import './styles/global.scss' // global style

import './icons' // icon
import './permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import './mock'

Vue.use(Loading)
Vue.prototype.$message = Message

Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  // error: imgLoading,
  // loading: imgLoading,
  lazyComponent: true,
  observer: true
})

// 防止连续点击
Vue.directive("preventReClick", {
  inserted: function(el, binding) {
    el.addEventListener("click", () => {
      if (!el.disabled) {
        el.disabled = true;
        el.timer = setTimeout(() => {
          el.disabled = false;
          clearTimeout(el.timer);
        }, binding.value || 3000);
      }
    });
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
