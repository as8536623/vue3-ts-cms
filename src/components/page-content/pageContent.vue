<template>
  <HyTable :dataList="dataList" v-bind="tableConfigData" @handelchange="handlechange">
    <template #header>
      <span>{{ tableConfigData.headerTitle }}</span>
    </template>
    <template #status="scope">
      <el-button size="mini">
        {{ scope.row.enable === 1 ? '可用' : '禁用' }}
      </el-button>
    </template>
    <template #createAt="scope">
      <el-button>{{ $filters.formatUTCTime(scope.row.createAt) }}</el-button>
    </template>
    <template #updateAt="scope">
      <span>{{ $filters.formatTimes(scope.row.createAt) }}</span>
    </template>
    <template #operationAt="scope">
      <el-button type="text" size="small">编辑{{ scope.row.id }}</el-button>
      <el-button type="text" size="small">删除</el-button>
    </template>
    <template #footer>
      <el-pagination
        v-model:currentPage="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </template>
  </HyTable>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import HyTable from '@/base-ui/table'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'pageContent',
  props: {
    tableConfigData: {
      type: Object
    },
    getData: {
      type: String
    }
  },
  components: {
    HyTable
  },
  setup(props) {
    const store = useStore()
    store.dispatch('userModule/accountUserList', {
      dataName: props.getData,
      url: `/${props.getData}/list`,
      params: {
        offset: 0,
        size: 10
      }
    })
    const dataList = computed(() => store.getters['userModule/getDataList'](props.getData))

    const handlechange = (value: any) => {
      console.log(value)
    }
    const handleSizeChange = (value: any) => {
      console.log(value)
    }
    const handleCurrentChange = (value: any) => {
      console.log(value)
    }
    const currentPage4 = ref(1)
    return {
      dataList,
      handlechange,
      currentPage4,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped></style>
