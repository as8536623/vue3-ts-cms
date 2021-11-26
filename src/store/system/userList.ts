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
    totalCount: 0
  },
  getters: {
    getDataList(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.usersList
          case 'role':
            return state.roleList
        }
      }
      /*return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }*/
    }
  },
  mutations: {
    changeUsersList(state, list) {
      state.usersList = list
    },
    changeRoleList(state, list) {
      state.roleList = list
    },
    changeUserTotalCount(state, count) {
      state.totalCount = count
    }
  },
  actions: {
    async accountUserList({ commit }, payload: userAccount) {
      const userListResult = await userAccountRequest(payload)
      switch (payload.dataName) {
        case 'users':
          return commit('changeUsersList', userListResult.data.data.list)
          return commit('changeUserTotalCount', userListResult.data.data.totalCount)
        case 'role':
          return commit('changeRoleList', userListResult.data.data.list)
      }
    }
  }
}
export default userModule
