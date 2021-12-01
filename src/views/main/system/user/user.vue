<template>
  <div class="user">
    <div class="search">
      <pageSearch :formData="formData" @searchData="searchFromData"></pageSearch>
    </div>
  </div>
  <div class="content">
    <pageContent
      :tableConfigData="tableConfigData"
      getData="users"
      ref="pageContentRef"
    ></pageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { formData } from './config/formItemData'
import pageSearch from '@/components/page-search'

import { tableConfigData } from './config/tableConfigData'
import pageContent from '@/components/page-content'
export default defineComponent({
  name: 'user',
  components: {
    pageSearch,
    pageContent
  },
  setup() {
    const pageContentRef = ref()
    const searchFromData = (value: any) => {
      pageContentRef.value?.getpageList(value)
    }
    return {
      formData,
      tableConfigData,
      searchFromData,
      pageContentRef
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
</style>
