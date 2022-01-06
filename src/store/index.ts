import { createStore } from 'vuex'
import { rootState } from './type'
import loginModule from './login/login'
import userModule from './system/userList'
import mapModule from './map/mapList'
import { getDepartmentRoleRequest } from '@/service/system/user'
import { userAccount } from '@/service/system/type'
const store = createStore<rootState>({
  state: {
    name: 'coder why',
    password: 20,
    departmentLists: [],
    roleList: []
  },
  mutations: {
    setDepartmentLists(state, payload) {
      state.departmentLists = payload
    },
    setRoleList(state, payload) {
      state.roleList = payload
    }
  },
  actions: {
    async getdepartmentRoleLists({ commit }, payload: userAccount) {
      const departmentList = await getDepartmentRoleRequest(payload)
      const roleList = await getDepartmentRoleRequest(payload)
      commit('setDepartmentLists', departmentList.data.data.list)
      commit('setRoleList', roleList.data.data.list)
    }
  },
  modules: {
    loginModule,
    userModule,
    mapModule
  }
})

export default store
