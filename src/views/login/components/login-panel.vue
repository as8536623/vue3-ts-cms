<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card">
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon color="#409EFC"><avatar /></el-icon> 账号登录
          </span>
        </template>
        Route
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon color="#409EFC"><iphone /></el-icon> 手机登录
          </span>
        </template>
        Routes
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'login-panel',
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less"></style>
