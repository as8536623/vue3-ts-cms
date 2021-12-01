export const tableConfigData = {
  tableColumn: [
    { prop: 'name', label: '商品名称', minWidth: '100' },
    { prop: 'oldPrice', label: '原价', minWidth: '100', slotName: 'oldPrice' },
    { prop: 'newPrice', label: '现价', minWidth: '100,' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '100,', slotName: 'imgUrl' },
    { prop: 'desc', label: '描述', minWidth: '100' },
    { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
    { prop: 'createAt', label: '创建时间', minWidth: '400', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '400', slotName: 'updateAt' },
    { prop: 'operation', label: '操作', minWidth: '150', slotName: 'operationAt' }
  ],
  showIndex: true,
  showSelect: true,
  headerTitle: '商品列表'
}
