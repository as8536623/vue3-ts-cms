<template>
  <div class="user">
    <div class="search">
      <pageSearch :formData="formData" @searchData="searchFromData"></pageSearch>
    </div>
  </div>
  <div class="content">
    <pageContent
      :tableConfigData="tableConfigData"
      getData="role"
      ref="pageContentRef"
      @createNewUser="createNewUser"
      @editUser="editUser"
      createBtnTitle="新建角色"
    ></pageContent>
    <pageCreateTable
      ref="pageCreateTableRef"
      :createData="createData"
      :editDataMoal="editDataMoal"
      :headerTitle="headerTitle"
      dataName="role"
      :checkedListKeys="checkedListKeys"
    >
      <el-tree
        :data="menuList"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        class="treeBox"
        :default-checked-keys="defaultList"
        @check="treeCheckedData"
      />
    </pageCreateTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import { formData } from './config/formItemData'
import pageSearch from '@/components/page-search'

import { tableConfigData } from './config/tableConfigData'
import pageContent from '@/components/page-content'

import { createData } from './config/createItemData'
import pageCreateTable from '@/components/page-createTable'

import { roleMenu } from '@/utils/userMenu'
export default defineComponent({
  name: 'role',
  components: {
    pageSearch,
    pageContent,
    pageCreateTable
  },
  emits: ['createNewUser', 'editUser'],
  setup() {
    const pageContentRef = ref()
    const searchFromData = (value: any) => {
      pageContentRef.value?.getpageList(value)
    }
    //弹框title
    const headerTitle = ref()
    /*新建*/
    const checkedListKeys: any = ref({})
    const defaultList: any = ref({})
    const pageCreateTableRef = ref()
    const createNewUser = () => {
      defaultList.value = []
      headerTitle.value = '新建角色'
      pageCreateTableRef.value.centerDialogVisible = true
      editDataMoal.value = {}
    }
    /*编辑*/
    const editDataMoal = ref({})
    const editUser = (userData: any) => {
      nextTick(() => {
        defaultList.value = roleMenu(userData.menuList)
      })
      headerTitle.value = '编辑角色'
      pageCreateTableRef.value.centerDialogVisible = true
      editDataMoal.value = userData
    }
    /*树结构默认配置*/
    const defaultProps = ref({
      children: 'children',
      label: 'name'
    })
    /*树结构数据*/
    const store = useStore()
    store.dispatch('userModule/accountUserList', {
      dataName: 'menu',
      url: '/menu/list',
      params: {
        offset: 0,
        size: 10
      }
    })
    const menuList = computed(() => store.state.userModule.menuList)
    /*勾选树结构节点*/
    const treeCheckedData = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      checkedListKeys.value = [...checkedKeys, ...halfCheckedKeys]
    }
    return {
      formData,
      tableConfigData,
      searchFromData,
      pageContentRef,
      createData,
      headerTitle,
      createNewUser,
      pageCreateTableRef,
      editUser,
      editDataMoal,
      defaultProps,
      treeCheckedData,
      menuList,
      checkedListKeys,
      defaultList
    }
  }
})
</script>

<style scoped lang="less">
.user {
  background-color: #fff;
  .search {
    .el-form {
      padding-top: 30px;
    }
    .el-icon {
      vertical-align: bottom;
    }
  }
}
.content {
  margin-top: 20px;
  background-color: #fff;
}
.treeBox {
  padding-left: 30px;
}
</style>
