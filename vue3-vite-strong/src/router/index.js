import { createRouter, createWebHistory } from 'vue-router'
import qs from 'qs'

/* Layout */
import Layout from '/@/layout/index.vue'

const base = '/'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
    noPermission: Boolean
  }
 * TODO 参考自 vue-element-admin 将逐步支持
 */

const routes = [
  {
    path: '/404',
    component: () => import('/@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('/@/views/error-page/401.vue'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('/@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        component: () => import('/@/views/home/index.vue'),
        name: 'Home',
        meta: { title: '首页', icon: 'home', affix: true, noCache: true }
      }
    ]
  }
]

const create = () =>
  createRouter({
    history: createWebHistory(base), // createWebHashHistory
    routes: routes,
    parseQuery: qs.parse,
    stringifyQuery: qs.stringify,
    scrollBehavior: () => ({ top: 0 }),
  })

let router = create()

// router.addRoute({
//   path: '/login',
//   component: () => import('/@/views/login/index.vue'),
//   name: 'Login',
//   hidden: true
// })

// ! removeRoute 无效 => Cannot remove non-existent route "Login"(/login)
export const resetRouter = () => {
  router.removeRoute('Login')
}

export default router
