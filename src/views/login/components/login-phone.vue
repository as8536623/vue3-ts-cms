<template>
  <div class="login-phone">
    <el-form
      ref="ruleForm"
      :model="account"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="手机号：" prop="phone">
        <el-input v-model="account.phone" type="text" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码：" prop="verificationCode">
        <div class="getCode">
          <el-input v-model="account.verificationCode" type="password" autocomplete="off">
          </el-input>
          <el-button type="primary" class="getBtn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from '../config/account-conifg'
export default defineComponent({
  name: 'login-phone',
  setup() {
    const account = reactive({
      phone: '',
      verificationCode: ''
    })
    return {
      account,
      rules
    }
  }
})
</script>

<style scoped lang="less">
.getCode {
  display: flex;
  .getBtn {
    margin-left: 10px;
  }
}
</style>
