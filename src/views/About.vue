<template>
  <div class="about">
    <h1>This is an about pagedd</h1>
    <login></login>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import login from 'components/login.vue'

export default defineComponent({
  name: 'Home',
  components: { login }
})
</script>
