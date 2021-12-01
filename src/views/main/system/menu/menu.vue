<template>
  <div class="content">
    <pageContent
      :tableConfigData="tableConfigData"
      getData="menu"
      ref="pageContentRef"
    ></pageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { tableConfigData } from './config/tableConfigData'
import pageContent from '@/components/page-content'

export default defineComponent({
  name: 'user',
  components: {
    pageContent
  },
  setup() {
    const pageContentRef = ref()
    return {
      tableConfigData,
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
