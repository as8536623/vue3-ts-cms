<template>
  <div class="pagesearch">
    <HyForm v-bind="formData" v-model="formDataModel">
      <template v-slot:headerTitle>高级检索</template>
      <template v-slot:footerBtn>
        <el-button @click="handleResetClick">
          <el-icon><refresh /></el-icon>
          重置
        </el-button>
        <el-button type="primary">
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
  setup(props) {
    const searchFormData = []
    for (const item in props.formData.hyfromData) {
      searchFormData[props.formData.hyfromData[item].value] = ''
    }
    const formDataModel = ref(searchFormData)
    const handleResetClick = () => {
      console.log(1)
    }

    return {
      formDataModel
    }
  }
})
</script>

<style scoped></style>
