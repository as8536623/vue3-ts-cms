<template>
  <div class="nav-header">
    <el-icon :size="25" @click="handClickIcon">
      <template v-if="isIcon">
        <Fold />
      </template>
      <template v-if="!isIcon">
        <Expand />
      </template>
    </el-icon>
    <div class="header-title">
      <div>
        <el-breadcrumb separator="/">
          <template v-for="item of breadcrumb" :key="item">
            <el-breadcrumb-item :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </div>
      <div class="userInfo">
        <el-avatar
          :size="30"
          :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
        >
        </el-avatar>
        <el-dropdown>
          <span class="el-dropdown-link">
            <span>{{ userName }}</span>
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>退出登录</el-dropdown-item>
              <el-dropdown-item divided>用户信息</el-dropdown-item>
              <el-dropdown-item>系统管理</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, reactive } from 'vue'
import store from '@/store'
import { menuPath } from '@/utils/userMenu'
import { useRoute } from 'vue-router'
export default defineComponent({
  emits: ['navHeaderValue'],
  name: 'nav-header',
  setup(props, context) {
    const isIcon = ref(false)
    const handClickIcon = () => {
      isIcon.value = !isIcon.value
      context.emit('navHeaderValue', isIcon.value)
    }
    const userName = computed(() => store.state.loginModule.userInfo.name)
    const breadcrumb = computed(() => {
      const route = useRoute()
      const breadcrumbpath = route.path
      const userMenu = reactive(store.state.loginModule.menuInfo)
      return menuPath(userMenu, breadcrumbpath, 1)
    })
    return {
      isIcon,
      handClickIcon,
      userName,
      breadcrumb
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .el-icon {
    vertical-align: middle;
  }
  .header-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;
    .userInfo {
      cursor: pointer;
      .el-avatar {
        vertical-align: middle;
        margin-right: 10px;
      }
    }
  }
}
</style>
