export const formData = {
  labelWidth: '100px',
  hyfromData: [
    {
      type: 'input',
      label: 'ID',
      placeholder: '请输入商品ID',
      value: 'id'
    },
    {
      type: 'input',
      label: '商品名',
      placeholder: '请输入商品名',
      value: 'name'
    },
    {
      type: 'select',
      label: '商品状态',
      placeholder: '请选择商品状态',
      value: 'enable',
      options: [
        {
          value: '1',
          title: '启用'
        },
        {
          value: '2',
          title: '禁用'
        }
      ]
    },
    {
      type: 'datepicker',
      label: '创建时间',
      placeholder: '请选择时间',
      value: 'createAt',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间'
      }
    }
  ],
  paddingWidth: {
    padding: '10px'
  }
}
