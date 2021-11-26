<template>
  <div class="nav-menu">
    <div class="nav-menu-header">
      <img src="~@/assets/img/logo.svg" />
      <span v-show="!collapse">Vue3+TS</span>
    </div>
    <div class="nav-menu-box">
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical"
        background-color="#0c2135"
        text-color="#b7bdc3"
        active-text-color="#0a60bd"
        :unique-opened="true"
        :collapse="collapse"
        :collapse-transition="false"
      >
        <template v-for="item in userMenu" :key="item.id">
          <template v-if="item.type == 1">
            <el-sub-menu :index="item.id + ''">
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{ item.name }}</span>
              </template>
              <template v-for="itemTwo in item.children" :key="itemTwo.id">
                <el-menu-item :index="itemTwo.id + ''" @click="routePath(itemTwo)">
                  <span>{{ itemTwo.name }}</span>
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <template v-else-if="item.type == 2">
            <el-menu-item :index="item.id + ''">
              <el-icon><location /></el-icon>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'
import { useRoute } from 'vue-router'
import { menuPath } from '@/utils/userMenu'
export default defineComponent({
  name: 'nav-left-menu',
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const userMenu = reactive(store.state.loginModule.menuInfo)
    const routePath = (routePath) => {
      router.push({
        path: routePath.url ?? '/notFound'
      })
    }
    const menuId = menuPath(userMenu, route.path)
    const defaultActive = ref(menuId.id + '')
    return {
      userMenu,
      routePath,
      defaultActive
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  overflow: hidden;
  background-color: #001529;
  .nav-menu-header {
    height: 28px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    padding: 16px;
    border-right: 0;
    img {
      height: 100%;
      margin: 0 10px;
    }
    span {
      height: 28px;
      line-height: 28px;
      display: inline-block;
      color: #fff;
    }
  }
  .nav-menu-box {
    margin-right: -1px !important;
    .el-main {
      background-color: #e9eef3;
      color: var(--el-text-color-primary);
      text-align: center;
      line-height: 160px;
      .el-sub-menu__title {
        i {
          display: inline-block;
        }
      }
    }
    .el-menu {
      border-right: 0;
    }
    .el-menu-item.is-active {
      color: #fff !important;
      background-color: #0a60bd !important;
    }
  }
}
</style>
