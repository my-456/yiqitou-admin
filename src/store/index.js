import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: localStorage.getItem('user') || '',
    isCollapse: false
  },
  mutations: {
    setUser (state, user) {
      localStorage.setItem('user', JSON.stringify(user))
      state.user = localStorage.getItem('user')
    },

    setCollapse (state, value) {
      state.isCollapse = value
    }
  },
  actions: {
  },
  modules: {
  }
})
