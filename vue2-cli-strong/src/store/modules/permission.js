import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use display_name to determine if the current user has permission
 * @param permission
 * @param route
 */
function hasPermission(permission, route) {
  return permission.some(permis => {
    if (route.system) {
      return route.system === permis.name
    } else if (permis.children) {
      return hasPermission(permis.children, route)
    } else {
      return true
    }
  })
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param permission
 */
export function filterAsyncRoutes(routes, permission, type) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (type || hasPermission(permission, tmp)) {
      res.push(tmp)
    } else if (tmp.children) {
      tmp.children = filterAsyncRoutes(tmp.children, permission)
      if (tmp.children.length) {
        res.push(tmp)
      }
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, permission) {
    return new Promise(resolve => {
      let accessedRoutes = null
      accessedRoutes = filterAsyncRoutes(asyncRoutes, permission)
      if (!permission.length) accessedRoutes.push(asyncRoutes[asyncRoutes.length - 1])
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
