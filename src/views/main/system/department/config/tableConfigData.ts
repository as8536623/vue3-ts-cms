export const tableConfigData = {
  tableColumn: [
    { prop: 'name', label: '部门名称', minWidth: '100' },
    { prop: 'leader', label: '部门领导', minWidth: '100' },
    { prop: 'createAt', label: '创建时间', minWidth: '250', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '250', slotName: 'updateAt' },
    { prop: 'operation', label: '操作', minWidth: '150', slotName: 'operationAt' }
  ],
  showIndex: true,
  showSelect: true,
  headerTitle: '部门列表'
}
