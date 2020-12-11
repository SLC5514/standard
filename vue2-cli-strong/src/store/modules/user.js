// import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import avatar from '@/assets/images/avatar.gif'

const state = {
  token: getToken(),
  avatar: avatar,
  user: {},
  role: {},
  permission: [],
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_PERMISSION: (state, permission) => {
    state.permission = permission
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      try {
        console.log(username, password)
        const token ='admin-token'
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
      } catch (error) {
        reject(error)
      }
      // login({ username: username.trim(), password: password })
      //   .then(response => {
      //     const { data } = response
      //     commit('SET_TOKEN', data.user.api_token)
      //     setToken(data.user.api_token)
      //     resolve()
      //   })
      //   .catch(error => {
      //     reject(error)
      //   })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        const data = {
          user: { name: "超级管理员" },
          role: { name: "root" },
          permission: [],
        }
        commit('SET_USER', data.user)
        commit('SET_ROLE', data.role)
        commit('SET_PERMISSION', data.permission)
        resolve(data)
      } catch (error) {
        reject(error)
      }
      // getInfo()
      //   .then(res => {
      //     const data = res.data
      //     commit('SET_USER', data.user)
      //     commit('SET_ROLE', data.role)
      //     commit('SET_PERMISSION', data.permission)
      //     commit('SET_CATEGORYOPTIONS', res.category)
      //     resolve(data)
      //   })
      //   .catch(error => {
      //     reject(error)
      //   })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_USER', {})
      commit('SET_ROLE', {})
      commit('SET_PERMISSION', [])
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_USER', {})
      commit('SET_ROLE', {})
      commit('SET_PERMISSION', [])
      removeToken()
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
