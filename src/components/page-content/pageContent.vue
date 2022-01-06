<template>
  <HyTable
    :dataList="dataList"
    v-bind="tableConfigData"
    @handelchange="handlechange"
    :totalCount="totalCount"
    v-model:page="pageInfo"
    :childrenTable="tableConfigData.childrenTable"
    :showPagination="tableConfigData.showPagination"
  >
    <template #header>
      <span>{{ tableConfigData.headerTitle }}</span>
      <el-button type="primary" v-if="isCreate" class="createUser" @click="createNewUser">
        {{ createBtnTitle }}
      </el-button>
    </template>
    <template #status="scope">
      <el-button size="mini">
        {{ (scope.row.enable || scope.row.status) === 1 ? '可用' : '禁用' }}
      </el-button>
    </template>
    <template #createAt="scope">
      <span>{{ $filters.formatUTCTime(scope.row.createAt) }}</span>
    </template>
    <template #updateAt="scope">
      <span>{{ $filters.formatUTCTime(scope.row.updateAt) }}</span>
    </template>
    <template #operationAt="scope">
      <el-button type="text" size="small" @click="editData(scope.row)">
        编辑{{ scope.row.id }}
      </el-button>
      <el-button type="text" size="small" @click="deleteData(scope.row)">删除</el-button>
    </template>
    <template v-for="item of otherProps" #[item.slotName]="scope">
      <template v-if="item.slotName">
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
    </template>
    <template #footer></template>
  </HyTable>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import HyTable from '@/base-ui/table'
import { useStore } from 'vuex'
import { menuPermission } from '@/hooks/menuPermission'
export default defineComponent({
  name: 'pageContent',
  props: {
    tableConfigData: {
      type: Object
    },
    getData: {
      type: String
    },
    createBtnTitle: {
      type: String
    }
  },
  components: {
    HyTable
  },
  setup(props, { emit }) {
    /*获取用户按钮权限*/
    const isQuery = menuPermission(props.getData + '', 'query')
    const isCreate = menuPermission(props.getData + '', 'create')
    const isDelete = menuPermission(props.getData + '', 'delete')
    const isUpdate = menuPermission(props.getData + '', 'update')
    /*获取服务器列表数据存储到store中*/
    const pageInfo = ref({ current: 1, pageSize: 10 })
    watch(pageInfo, () => {
      getpageList({})
    })
    const store = useStore()
    const getpageList = (queryInfo: any) => {
      if (!isQuery) false
      store.dispatch('userModule/accountUserList', {
        dataName: props.getData,
        url: `/${props.getData}/list`,
        params: {
          offset: (pageInfo.value.current - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getpageList({})
    /*从store中拿取数据*/
    const dataList = computed(() => store.getters['userModule/getDataList'](props.getData))
    const totalCount = computed(() => store.getters['userModule/getTotalCount'](props.getData))
    const handlechange = (value: any) => {
      console.log(value)
    }
    /*动态插槽 排除固定插槽*/
    const otherProps = props.tableConfigData?.tableColumn.filter((item: any) => {
      if (item.slotName == 'status') return false
      if (item.slotName == 'createAt') return false
      if (item.slotName == 'updateAt') return false
      if (item.slotName == 'operationAt') return false
      return true
    })

    /*删除数据*/
    const deleteData = (data: any) => {
      store.dispatch('userModule/deleteUserList', {
        dataName: props.getData,
        id: `${data.id}`
      })
    }
    const createNewUser = () => {
      emit('createNewUser')
    }
    const editData = (data: any) => {
      emit('editUser', data)
    }
    return {
      dataList,
      getpageList,
      handlechange,
      totalCount,
      pageInfo,
      otherProps,
      isQuery,
      isCreate,
      isDelete,
      isUpdate,
      deleteData,
      createNewUser,
      editData
    }
  }
})
</script>

<style scoped lang="less">
.createUser {
  float: right;
  margin-top: -10px;
}
</style>
