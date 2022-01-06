<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" :stretch="stretch" v-model="currenTab">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon color="#409EFC"><avatar /></el-icon> 账号登录
          </span>
        </template>
        <loginAccount ref="accountRef" @clickLogin="bthClick"></loginAccount>
      </el-tab-pane>
      <el-tab-pane name="iphone">
        <template #label>
          <span>
            <el-icon color="#409EFC"><iphone /></el-icon> 手机登录
          </span>
        </template>
        <loginPhone></loginPhone>
      </el-tab-pane>
    </el-tabs>
    <div class="rememberPass">
      <el-checkbox v-model="rememberPass" label="记住密码" class="checkbox"></el-checkbox>
      <el-link type="primary" class="forgetpass">忘记密码？</el-link>
    </div>
    <el-button type="primary" class="loginBth" @click="bthClick">登录</el-button>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import loginAccount from './login-account.vue'
import loginPhone from './login-phone.vue'
export default defineComponent({
  name: 'login-panel',
  components: {
    loginAccount,
    loginPhone
  },
  setup() {
    const stretch = true
    const rememberPass = ref(false)
    const currenTab = ref('account')
    //const accountRef = ref<InstanceType<typeof loginAccount>>()
    const accountRef = ref()
    const bthClick = () => {
      if (currenTab.value === 'account') {
        accountRef.value.loginAction(rememberPass.value)
      } else if (currenTab.value === 'iphone') {
        return currenTab.value
      }
    }
    return {
      stretch,
      rememberPass,
      bthClick,
      accountRef,
      currenTab
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 150px;
  .title {
    text-align: center;
  }
  .rememberPass {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .loginBth {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
