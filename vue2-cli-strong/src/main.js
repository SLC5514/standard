import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

import 'normalize.css/normalize.css' // CSS重置

// UI库
import Element from 'element-ui'
import './styles/element-variables.scss'
// import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)
// TODO 按需加载 组件样式会被提升 不会被全局样式覆盖
// import { Loading, Message } from 'element-ui'
// Vue.use(Loading)
// Vue.prototype.$message = Message

// 移动端 100vh 问题
import vhCheck from 'vh-check'
vhCheck('browser-address-bar')

// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  // error: imgLoading,
  // loading: imgLoading,
  lazyComponent: true,
  observer: true
})

// 自定义指令
import Directives from './directives'
Vue.use(Directives)

import './styles/global.scss' // 全局样式
import './icons' // svg图标
import './permission' // 权限控制
import './mock' // mock数据

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

// 生产提示
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
