<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'" class="left-menu">
        <navLeftMenu :collapse="isCollapse"></navLeftMenu>
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <navHeader @navHeaderValue="handNavHeader"></navHeader>
        </el-header>
        <el-main class="page-header">
          <div class="page">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import navLeftMenu from '@/components/nav-menu/'
import navHeader from '@/components/nav-header/'
export default defineComponent({
  components: {
    navLeftMenu,
    navHeader
  },
  setup() {
    const isCollapse = ref(false)
    const handNavHeader = (isFoldShow: boolean) => {
      isCollapse.value = isFoldShow
    }
    return {
      handNavHeader,
      isCollapse
    }
  }
})
</script>
<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
  display: flex;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.page {
  background-color: #fff;
}
</style>
