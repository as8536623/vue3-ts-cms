<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>柱形图</span>
            </div>
          </template>
          <columnChartMap :colunmList="colunmList" :goodsCount="goodsCount"></columnChartMap>
        </el-card>
      </el-col>
      <el-col :span="8"></el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>玫瑰图</span>
            </div>
          </template>
          <roseChartMap :roseList="roseList"></roseChartMap>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { columnChartMap, roseChartMap } from '@/components/page-map'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'dashboard',
  components: {
    columnChartMap,
    roseChartMap
  },
  setup() {
    const store = useStore()
    /*获取数据*/
    store.dispatch('mapModule/getMapData')
    /*柱形图数据*/
    const colunmList = computed(() => {
      return store.state.mapModule.colunmList.map((item: any) => {
        return item.name
      })
    })
    const goodsCount = computed(() => {
      return store.state.mapModule.colunmList.map((item: any) => {
        return item.goodsCount
      })
    })
    /*玫瑰图数据*/
    const roseList = computed(() => {
      return store.state.mapModule.roseList.map((item: any) => {
        return {
          value: item.goodsCount,
          name: item.name
        }
      })
    })
    return {
      colunmList,
      goodsCount,
      roseList
    }
  }
})
</script>

<style scoped lang="less">
.dashboard {
  background-color: #ffffff;
  padding: 20px;
}
</style>
