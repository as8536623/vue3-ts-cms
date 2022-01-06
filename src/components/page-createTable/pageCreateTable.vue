<template>
  <div class="createTable">
    <el-dialog
      v-model="centerDialogVisible"
      :title="headerTitle"
      width="30%"
      center
      destroy-on-close
    >
      <HyForm v-bind="newCreated" v-model="formDataModel" :formDataModel="formDataModel"></HyForm>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false" class="btn">取消</el-button>
          <el-button type="primary" @click="sureCreateUser" class="btn">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import HyForm from '@/base-ui/form'
export default defineComponent({
  name: 'pageContent',
  props: {
    createData: {
      type: Object
    },
    editDataMoal: {
      type: Object
    },
    headerTitle: {
      type: String
    },
    dataName: {
      type: String
    },
    checkedListKeys: {
      type: Object
    }
  },
  components: {
    HyForm
  },
  setup(props) {
    const formDataModel = ref<any>({})
    /*监听父组件数据更新弹框数据*/
    watch(
      () => props.editDataMoal,
      (newValue) => {
        for (const item of props.createData?.hyfromData) {
          formDataModel.value[`${item.value}`] = newValue?.[`${item.value}`]
        }
      }
    )
    /*请求 弹框选择角色和部门列表数据*/
    const store = useStore()
    store.dispatch('getdepartmentRoleLists', {
      url: '/department/list'
    })
    store.dispatch('getdepartmentRoleLists', {
      url: '/role/list'
    })
    const newCreated: any = computed(() => {
      const departmentLists = store.state.departmentLists
      const roleList = store.state.roleList
      const departmentIdis = props.createData?.hyfromData.find(
        (item: any) => item.value === 'departmentId'
      )
      const roleIdis = props.createData?.hyfromData.find(
        (item: any) => item.value === 'departmentId'
      )
      if (departmentIdis) {
        const departmentListsOptions = props.createData?.hyfromData.find((item: any) => {
          if (item.value == 'departmentId') {
            return item
          }
        })
        departmentListsOptions.options = departmentLists
      }
      if (roleIdis) {
        const roleListOptions = props.createData?.hyfromData.find((item: any) => {
          if (item.value == 'roleId') {
            return item
          }
        })
        roleListOptions.options = roleList
      }
      return props.createData
    })
    /*弹框关闭或者显示*/
    const centerDialogVisible = ref(false)
    watch(centerDialogVisible, (newValue) => {
      return (centerDialogVisible.value = newValue)
    })
    //点击确定
    const sureCreateUser = () => {
      centerDialogVisible.value = false
      if (props.headerTitle?.substring(0, 2) == '新建') {
        store.dispatch('userModule/createUser', {
          dataName: props.dataName,
          url: '/' + props.dataName,
          params: { ...formDataModel.value, menuList: props.checkedListKeys }
        })
      } else if (props.headerTitle?.substring(0, 2) == '编辑') {
        let newurl = '/' + props.dataName + '/' + props.editDataMoal?.id
        store.dispatch('userModule/editUser', {
          dataName: props.dataName,
          url: newurl,
          params: { ...formDataModel.value, menuList: props.checkedListKeys }
        })
      }
    }
    return {
      centerDialogVisible,
      formDataModel,
      sureCreateUser,
      newCreated
    }
  }
})
</script>

<style scoped lang="less">
.btn {
  margin-bottom: 10px;
}
</style>
