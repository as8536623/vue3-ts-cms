import { createStore } from 'vuex'
import { rootState } from './type'
import loginModule from './login/login'
const store = createStore<rootState>({
  state: {
    name: 'coder why',
    password: 20
  },
  mutations: {},
  actions: {},
  modules: {
    loginModule
  }
})

export default store
