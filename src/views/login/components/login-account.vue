<template>
  <div class="login-account">
    <el-form
      ref="ruleForm"
      :model="account"
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号：" prop="name">
        <el-input v-model="account.name" type="text" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
          v-model="account.password"
          type="password"
          autocomplete="off"
          show-password
          @keyup.enter="clickLogin"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/account-conifg'
import { ElForm } from 'element-plus/es'
import LocalStorage from '@/utils/localstorage'
export default defineComponent({
  name: 'login-account',
  setup(props, { emit }) {
    const store = useStore()
    const account = reactive({
      name: '',
      password: ''
    })
    const getUserInfo = window.localStorage.getItem('userInfo')
    if (getUserInfo) {
      account.name = JSON.parse(getUserInfo).name
      account.password = JSON.parse(getUserInfo).password
    }
    const ruleForm = ref<InstanceType<typeof ElForm>>()
    const loginAction = (rememberPass: boolean) => {
      ruleForm.value?.validate((valid: any) => {
        if (valid) {
          const userInfo = {
            name: account.name,
            password: account.password
          }
          if (rememberPass) {
            LocalStorage.setLocal('userInfo', userInfo)
          } else {
            LocalStorage.removeLocal('userInfo')
          }
          store.dispatch('loginModule/accountLogin', userInfo)
        } else {
          console.log('验证不通过')
        }
      })
    }
    const clickLogin = () => {
      emit('clickLogin')
    }
    return {
      account,
      rules,
      loginAction,
      ruleForm,
      clickLogin
    }
  }
})
</script>

<style scoped lang="less"></style>
