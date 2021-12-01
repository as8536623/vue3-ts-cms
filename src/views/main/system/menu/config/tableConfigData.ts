export const tableConfigData = {
  tableColumn: [
    { prop: 'name', label: '菜单名', minWidth: '100' },
    { prop: 'type', label: '类型', minWidth: '100' },
    { prop: 'url', label: '菜单路径', minWidth: '100' },
    { prop: 'icon', label: '菜单图标', minWidth: '100' },
    { prop: 'permission', label: '按钮权限', minWidth: '100' },
    { prop: 'sort', label: '排序', minWidth: '100' },
    { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'updateAt' },
    { prop: 'operation', label: '操作', minWidth: '150', slotName: 'operationAt' }
  ],
  showIndex: true,
  showSelect: true,
  headerTitle: '菜单列表',
  childrenTable: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  },
  showPagination: false
}
