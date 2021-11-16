import { Module } from 'vuex'
import { rootState } from '../type'
import { loginState } from './type'
import { loginAccountRequest, userInfoRequest, userRoleRequest } from '@/service/login/login'
import { loginAccount } from '@/service/login/type'
import localstorage from '@/utils/localstorage'
import { changeUserMenu } from '@/utils/userMenu'
import router from '@/router'
const loginModule: Module<loginState, rootState> = {
  namespaced: true,
  state: {
    token: '',
    userInfo: {},
    menuInfo: {}
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    changeMenuInfo(state, menuInfo) {
      state.menuInfo = menuInfo
      const routes = changeUserMenu(menuInfo)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    async accountLogin({ commit }, payload: loginAccount) {
      //登录获取token
      const loginResult = await loginAccountRequest(payload)
      commit('changeToken', loginResult.data.data.token)
      localstorage.setLocal('token', loginResult.data.data.token)

      //获取用户信息
      const userInfoResult = await userInfoRequest(loginResult.data.data.id)
      commit('changeInfo', userInfoResult.data.data)
      localstorage.setLocal('loginUserInfo', userInfoResult.data.data)

      //用户对应的菜单
      const userMenuResult = await userRoleRequest(userInfoResult.data.data.role.id)
      commit('changeMenuInfo', userMenuResult.data.data)
      localstorage.setLocal('userMenus', userMenuResult.data.data)

      router.push('/')
    },
    getLoaclData({ commit }) {
      const token = localstorage.getLocal('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localstorage.getLocal('loginUserInfo')
      if (userInfo) {
        commit('changeInfo', userInfo)
      }
      const menuInfo = localstorage.getLocal('userMenus')
      if (menuInfo) {
        commit('changeMenuInfo', menuInfo)
      }
    }
  }
}
export default loginModule
