import { createStore } from 'vuex'
import { rootState } from './type'
import loginModule from './login/login'
import userModule from './system/userList'
const store = createStore<rootState>({
  state: {
    name: 'coder why',
    password: 20
  },
  mutations: {},
  actions: {},
  modules: {
    loginModule,
    userModule
  }
})

export default store
