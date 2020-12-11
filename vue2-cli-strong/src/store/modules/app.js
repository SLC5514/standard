const state = {
  loading: true
}

const mutations = {
  SET_LOADING: (state) => {
    state.loading = false
  }
}

const actions = {
  setLoading({ commit }) {
    commit('SET_LOADING')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
