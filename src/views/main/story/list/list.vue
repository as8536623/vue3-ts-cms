<template>
  <div class="list"></div>
  <div class="content">
    <pageContent
      :tableConfigData="tableConfigData"
      :createData="createData"
      getData="story"
      ref="pageContentRef"
      @createNewUser="createNewUser"
      @editUser="editUser"
      createBtnTitle="新建故事"
    ></pageContent>
    <pageCreateTable
      ref="pageCreateTableRef"
      :createData="createData"
      :editDataMoal="editDataMoal"
      :headerTitle="headerTitle"
      dataName="story"
    ></pageCreateTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { tableConfigData } from './config/tableConfigData'
import pageContent from '@/components/page-content'
import { createData } from './config/createItemData'

import pageCreateTable from '@/components/page-createTable'

export default defineComponent({
  name: 'list',
  components: {
    pageContent,
    pageCreateTable
  },
  emits: ['createNewUser', 'editUser'],
  setup() {
    const pageContentRef = ref()
    //弹框title
    const headerTitle = ref()
    /*新建*/
    const pageCreateTableRef = ref()
    const createNewUser = () => {
      headerTitle.value = '新建故事'
      pageCreateTableRef.value.centerDialogVisible = true
      editDataMoal.value = {}
    }
    /*编辑*/
    const editDataMoal = ref({})
    const editUser = (userData: any) => {
      headerTitle.value = '编辑故事'
      pageCreateTableRef.value.centerDialogVisible = true
      editDataMoal.value = userData
    }
    return {
      tableConfigData,
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
.story {
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
