<template>
  <div class="pagesearch">
    <HyForm v-bind="formData" v-model="formDataModel">
      <template v-slot:headerTitle>高级检索</template>
      <template v-slot:footerBtn>
        <el-button @click="handleResetClick" class="btn">
          <el-icon><refresh /></el-icon>
          重置
        </el-button>
        <el-button type="primary" @click="handleSearchClick" class="btn">
          <el-icon><search /></el-icon>
          搜索
        </el-button>
      </template>
    </HyForm>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import HyForm from '@/base-ui/form'
export default defineComponent({
  name: 'pageSearch',
  props: {
    formData: {
      type: Object
    }
  },
  components: {
    HyForm
  },
  setup(props, { emit }) {
    const searchFormData = []
    for (const item in props.formData.hyfromData) {
      searchFormData[props.formData.hyfromData[item].value] = ''
    }
    const formDataModel = ref(searchFormData)
    const handleResetClick = () => {
      for (const key in searchFormData) {
        formDataModel.value[key] = searchFormData[key]
      }
      emit('searchData')
    }
    const handleSearchClick = () => {
      emit('searchData', formDataModel.value)
    }
    return {
      formDataModel,
      handleResetClick,
      handleSearchClick
    }
  }
})
</script>

<style scoped lang="less">
.btn {
  margin-bottom: 20px;
  margin-right: 20px;
}
</style>
