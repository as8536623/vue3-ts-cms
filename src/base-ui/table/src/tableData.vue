<template>
  <div class="hytable">
    <div class="header-title">
      <slot name="header"></slot>
    </div>
    <el-table :data="dataList" style="width: 100%" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" v-if="showSelect" />
      <el-table-column type="index" width="50" align="center" label="序号" v-if="showIndex" />
      <template v-for="item of tableColumn" :key="item">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.labelWidth"
          align="center"
        >
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'tableData',
  props: {
    dataList: {
      type: Array
    },
    tableColumn: {
      type: Array
    },
    showIndex: {
      type: Boolean
    },
    showSelect: {
      type: Boolean
    }
  },
  setup(props, { emit }) {
    const handleSelectionChange = (value) => {
      emit('handelchange', value)
    }
    return {
      handleSelectionChange
    }
  }
})
</script>

<style scoped lang="less">
.hytable {
  padding: 20px;
  .header-title {
    padding: 20px;
  }
  .footer {
    padding: 20px;
    text-align: right;
  }
}
</style>
