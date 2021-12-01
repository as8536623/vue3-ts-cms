import { Module } from 'vuex'
import { rootState } from '../type'
import { userState } from './type'
import { userAccountRequest } from '@/service/system/user'
import { userAccount } from '@/service/system/type'
const userModule: Module<userState, rootState> = {
  namespaced: true,
  state: {
    usersList: [],
    roleList: [],
    goodsList: [],
    menuList: [],
    userTotalCount: 0,
    roleTotalCount: 0,
    goodsTotalCount: 0
  },
  getters: {
    getDataList(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.usersList
          case 'role':
            return state.roleList
          case 'goods':
            return state.goodsList
          case 'menu':
            return state.menuList
        }
      }
      /*return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }*/
    },
    getTotalCount(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.userTotalCount
          case 'role':
            return state.roleTotalCount
          case 'goods':
            return state.goodsTotalCount
        }
      }
    }
  },
  mutations: {
    changeUsersList(state, list) {
      state.usersList = list
    },
    changeRoleList(state, list) {
      state.roleList = list
    },
    changeGoodsList(state, list) {
      state.goodsList = list
    },
    changeMenuList(state, list) {
      state.menuList = list
    },
    changeUserTotalCount(state, count) {
      state.userTotalCount = count
    },
    changeRoleTotalCount(state, count) {
      state.roleTotalCount = count
    },
    changeGoodsTotalCount(state, count) {
      state.goodsTotalCount = count
    }
  },
  actions: {
    async accountUserList({ commit }, payload: userAccount) {
      const listDataResult = await userAccountRequest(payload)
      switch (payload.dataName) {
        case 'users':
          return [
            commit('changeUsersList', listDataResult.data?.data.list),
            commit('changeUserTotalCount', listDataResult.data?.data.totalCount)
          ]
        case 'role':
          return [
            commit('changeRoleList', listDataResult.data?.data.list),
            commit('changeRoleTotalCount', listDataResult.data?.data.totalCount)
          ]
        case 'goods':
          return [
            commit('changeGoodsList', listDataResult.data?.data.list),
            commit('changeGoodsTotalCount', listDataResult.data?.data.totalCount)
          ]
        case 'menu':
          return [commit('changeMenuList', listDataResult.data?.data.list)]
      }
    }
  }
}
export default userModule
