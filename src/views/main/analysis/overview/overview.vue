<template>
  <div class="overview">
    <h2>overview</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'overview',
  setup() {
    const config = require('/package.json')
    console.log(config.devDependencies)
    return {}
  }
})
</script>

<style scoped></style>
