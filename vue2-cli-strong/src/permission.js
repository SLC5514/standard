import router from './router'
import store from './store'
import { Message } from 'element-ui'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress 配置

const whiteList = ['/login', '/auth-redirect'] // 重定向白名单

// 拼接完整权限路由
const getAccessRoutes = function(routes) {
  const res = []
  routes.forEach(v => {
    const arr = []
    const url = v.path
    if (v.children) {
      getAccessRoutes(v.children).forEach(val => {
        arr.push(url + '/' + val)
      })
    } else {
      arr.push(url)
    }
    res.push(arr)
  })
  return res
}

router.beforeEach(async(to, from, next) => {
  // 开始进度条
  NProgress.start()

  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (to.meta.auth === false) {
    // 不需要身份校验 直接通过
    next()
  } else {
    // 是否存有token作为验证是否登录的条件
    const token = getToken()
    if (token && token !== 'undefined') {
      // ! 无role死循环
      const role = store.getters.role && store.getters.role.name
      // 是否处于登录页面
      if (to.path === '/login') {
        // 如果已登录，重定向到主页
        next({ path: '/' })
        NProgress.done()
      } else if (!role) { // 查询是否储存用户信息
        try {
          // 获得用户权限&角色
          const { permission } = await store.dispatch('user/getInfo')

          // 根据角色生成动态路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', permission)

          // 添加动态路由
          router.addRoutes(accessRoutes)

          // hack方法以确保addRoutes是完整的
          // 设置replace：true，导航不会留下历史记录
          if (to.path.includes('system') && !getAccessRoutes(accessRoutes).join().includes(to.path)) {
            next({ path: '/' })
            return
          }

          // 未捕获 next({ ...to, replace: true })
          router.push({ ...to, replace: true }).catch(() => {})
        } catch (error) {
          console.log('for bug', error)
          // 删除token并进入登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(typeof error === 'string' ? error : 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        next()
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        // 不需要身份校验 直接通过
        next()
      } else {
        // 其他无权访问的页面将重定向到登录页面
        next(`/login?redirect=${to.path}`)

        // TODO 无需登录跳转(手动设置token)
        // store
        //   .dispatch('user/login', {
        //     username: 'admin',
        //     password: 123456
        //   })
        //   .then(() => {
        //     router.push({ ...to, replace: true }).catch(() => {})
        //   })
        //   .catch(() => {})

        NProgress.done()
      }
    }
  }
  store.dispatch('app/setLoading')
})

router.afterEach(to => {
  // 结束进度条
  NProgress.done()
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)
})
