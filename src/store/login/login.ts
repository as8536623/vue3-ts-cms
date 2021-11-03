import { Module } from 'vuex'
import { rootState } from '../type'
import { loginState } from './type'
const loginModule: Module<loginState, rootState> = {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
  },
  getters: {},
  mutations: {},
  actions: {
    accountLogin({ commit }, payload) {
      console.log('account', payload, commit)
    }
  }
}
export default loginModule
