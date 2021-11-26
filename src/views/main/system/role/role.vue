<template>
  <div class="user">
    <div class="search">
      <pageSearch :formData="formData"></pageSearch>
    </div>
  </div>
  <div class="content">
    <pageContent :tableConfigData="tableConfigData" getData="role"></pageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
    return {
      formData,
      tableConfigData
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
