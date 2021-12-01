<template>
  <div class="hytable">
    <div class="header-title">
      <slot name="header"></slot>
    </div>
    <el-table
      :data="dataList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
      :lazy="true"
      :select="select"
      v-bind="childrenTable"
    >
      <el-table-column type="selection" width="55" align="center" v-if="showSelect" />
      <el-table-column type="index" width="50" align="center" label="序号" v-if="showIndex" />
      <template v-for="item of tableColumn" :key="item">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.labelWidth"
          align="center"
          :show-overflow-tooltip="true"
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
      <template v-if="showPagination">
        <slot name="footer">
          <el-pagination
            v-model:currentPage="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </slot>
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
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
    },
    totalCount: {
      type: Number
    },
    page: {
      type: Object,
      default() {
        return {
          current: 0,
          pageSize: 10
        }
      }
    },
    childrenTable: {
      type: Object
    },
    showPagination: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  setup(props, { emit }) {
    const handleSelectionChange = (value) => {
      emit('handelchange', value)
    }
    const handleSizeChange = (pageSize) => {
      emit('update:page', { ...props.page, pageSize })
    }
    const handleCurrentChange = (current) => {
      emit('update:page', { ...props.page, current })
    }
    const currentPage = ref(1)
    const select = (selection) => {
      console.log(selection)
    }
    return {
      handleSelectionChange,
      currentPage,
      handleSizeChange,
      handleCurrentChange,
      select
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
