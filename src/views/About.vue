<template>
  <div class="about">
    <h1>{{ count }}</h1>
    <login></login>
    <el-button @click="btnClick">哈哈</el-button>
    <el-input v-model="input" placeholder="Please input" />
    <div ref="inputRef">123</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import login from 'components/login.vue'

export default defineComponent({
  name: 'Home',
  components: {
    login
  },
  setup() {
    const inputRef = ref(null)
    const count = ref(0)
    const input = ref('')
    onMounted(() => {
      console.log(inputRef.value)
    })
    const btnClick = () => {
      count.value++
    }
    return { btnClick, count, inputRef, input }
  }
})
</script>
