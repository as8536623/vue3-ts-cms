<template>
  <div class="goods">
    <div class="search">
      <pageSearch :formData="formData" @searchData="searchFromData"></pageSearch>
    </div>
  </div>
  <div class="content">
    <pageContent :tableConfigData="tableConfigData" getData="goods" ref="pageContentRef">
      <template #imgUrl="scope">
        <el-image :src="scope.row.imgUrl" :preview-src-list="[scope.row.imgUrl]"></el-image>
      </template>
      <template #oldPrice="scope">
        <span>{{ '￥' + scope.row.oldPrice }}</span>
      </template>
    </pageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { formData } from './config/formItemData'
import pageSearch from '@/components/page-search'

import { tableConfigData } from './config/tableConfigData'
import pageContent from '@/components/page-content'
export default defineComponent({
  name: 'goods',
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
.goods {
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
