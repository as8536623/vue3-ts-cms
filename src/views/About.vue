<template>
  <div class="about">
    <h1>{{ count }}</h1>
    <login></login>
    <el-button @click="btnClick">哈哈</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import login from 'components/login.vue'

export default defineComponent({
  name: 'Home',
  components: {
    login
  },
  setup() {
    const count = ref(0)
    const btnClick = () => {
      count.value++
    }
    return { btnClick, count }
  }
})
</script>
