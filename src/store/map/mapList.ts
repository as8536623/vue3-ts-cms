import { Module } from 'vuex'
import { rootState } from '../type'
import { mapState } from './type'
import { mapCountList, mapSaleList, mapFavorList, mapAddreeSaleList } from '@/service/map/map'
const mapModule: Module<mapState, rootState> = {
  namespaced: true,
  state: {
    colunmList: [],
    roseList: [],
    favorList: [],
    addreeList: []
  },
  getters: {},
  mutations: {
    setCuntList(state, list) {
      state.colunmList = list
    },
    setSaleList(state, list) {
      state.roseList = list
    },
    setFavorList(state, list) {
      state.favorList = list
    },
    setAddreeList(state, list) {
      state.addreeList = list
    }
  },
  actions: {
    async getMapData({ commit }) {
      const countListResult = await mapCountList()
      const saleListResult = await mapSaleList()
      const favorListResult = await mapFavorList()
      const addreeListResult = await mapAddreeSaleList()
      commit('setCuntList', countListResult.data.data)
      commit('setSaleList', saleListResult.data.data)
      commit('setFavorList', favorListResult.data.data)
      commit('setAddreeList', addreeListResult.data.data)
    }
  }
}
export default mapModule
