<template>
  <div class="login">
    <LoginPanel></LoginPanel>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import LoginPanel from './components/login-panel'
export default defineComponent({
  name: 'login',
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
</style>
