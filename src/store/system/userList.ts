import { Module } from 'vuex'
import { rootState } from '../type'
import { userState } from './type'
import {
  userAccountRequest,
  userDeleteRequest,
  createdUserRequest,
  eidtUserRequest
} from '@/service/system/user'
import { userAccount } from '@/service/system/type'
const userModule: Module<userState, rootState> = {
  namespaced: true,
  state: {
    usersList: [],
    roleList: [],
    goodsList: [],
    menuList: [],
    departmentList: [],
    categoryList: [],
    storyList: [],
    userTotalCount: 0,
    roleTotalCount: 0,
    goodsTotalCount: 0,
    departmentTotalCount: 0,
    categoryTotalCount: 0,
    storyTotalCount: 0
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
          case 'department':
            return state.departmentList
          case 'category':
            return state.categoryList
          case 'story':
            return state.storyList
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
          case 'department':
            return state.departmentTotalCount
          case 'category':
            return state.categoryTotalCount
          case 'story':
            return state.storyTotalCount
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
    changeDepartmentList(state, list) {
      state.departmentList = list
    },
    changeCategoryList(state, list) {
      state.categoryList = list
    },
    changeStoryList(state, list) {
      state.storyList = list
    },
    changeUserTotalCount(state, count) {
      state.userTotalCount = count
    },
    changeRoleTotalCount(state, count) {
      state.roleTotalCount = count
    },
    changeGoodsTotalCount(state, count) {
      state.goodsTotalCount = count
    },
    changeDepartmentTotalCount(state, count) {
      state.departmentTotalCount = count
    },
    changeCategoryTotalCount(state, count) {
      state.categoryTotalCount = count
    },
    changeStoryTotalCount(state, count) {
      state.storyTotalCount = count
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
        case 'department':
          return [
            commit('changeDepartmentList', listDataResult.data?.data.list),
            commit('changeDepartmentTotalCount', listDataResult.data?.data.totalCount)
          ]
        case 'category':
          return [
            commit('changeCategoryList', listDataResult.data?.data.list),
            commit('changeCategoryTotalCount', listDataResult.data?.data.totalCount)
          ]
        case 'story':
          return [
            commit('changeStoryList', listDataResult.data?.data.list),
            commit('changeStoryTotalCount', listDataResult.data?.data.totalCount)
          ]
      }
    },
    async deleteUserList({ dispatch }, payload: userAccount) {
      const { dataName, id } = payload
      const dataUrl = `/${dataName}/${id}`
      userDeleteRequest({ url: dataUrl })
      dispatch('accountUserList', {
        dataName,
        url: `${dataName}/list`,
        params: {
          offset: 0,
          size: 10
        }
      })
    },
    async createUser({ dispatch }, payload: userAccount) {
      const { dataName } = payload
      await createdUserRequest(payload)
      await dispatch('accountUserList', {
        dataName,
        url: `${dataName}/list`,
        params: {
          offset: 0,
          size: 10
        }
      })
    },
    async editUser({ dispatch }, payload: userAccount) {
      const { dataName } = payload
      const editUserRequest = await eidtUserRequest(payload)
      console.log(editUserRequest)
      await dispatch('accountUserList', {
        dataName,
        url: `${dataName}/list`,
        params: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}
export default userModule
