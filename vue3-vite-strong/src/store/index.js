import { createStore } from 'vuex'

import getters from './getters'
import app from './modules/app'

// TODO 获取 modules 文件夹
const modules = {
  app
}

const store = createStore({
  modules,
  getters
})

export default store
