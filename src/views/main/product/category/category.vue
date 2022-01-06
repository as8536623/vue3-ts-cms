<template>
  <div class="category">
    <div class="search">
      <pageSearch :formData="formData" @searchData="searchFromData"></pageSearch>
    </div>
  </div>
  <div class="content">
    <pageContent
      :tableConfigData="tableConfigData"
      :createData="createData"
      getData="category"
      ref="pageContentRef"
      @createNewUser="createNewUser"
      @editUser="editUser"
      createBtnTitle="新建商品类别"
    ></pageContent>
    <pageCreateTable
      ref="pageCreateTableRef"
      :createData="createData"
      :editDataMoal="editDataMoal"
      :headerTitle="headerTitle"
      dataName="category"
    ></pageCreateTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { formData } from './config/formItemData'
import pageSearch from '@/components/page-search'

import { tableConfigData } from './config/tableConfigData'
import pageContent from '@/components/page-content'
import { createData } from './config/createItemData'

import pageCreateTable from '@/components/page-createTable'

export default defineComponent({
  name: 'category',
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
    /*新建部门*/
    const pageCreateTableRef = ref()
    const createNewUser = () => {
      headerTitle.value = '新建商品'
      pageCreateTableRef.value.centerDialogVisible = true
      editDataMoal.value = {}
    }
    /*编辑部门*/
    const editDataMoal = ref({})
    const editUser = (userData: any) => {
      headerTitle.value = '编辑商品'
      pageCreateTableRef.value.centerDialogVisible = true
      editDataMoal.value = userData
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
      editDataMoal
    }
  }
})
</script>

<style scoped lang="less">
.category {
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
</style>
