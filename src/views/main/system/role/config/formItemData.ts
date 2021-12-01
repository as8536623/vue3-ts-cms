export const formData = {
  labelWidth: '100px',
  hyfromData: [
    {
      type: 'input',
      label: 'ID',
      placeholder: '请输入id',
      value: 'id'
    },
    {
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名',
      value: 'name'
    },
    {
      type: 'select',
      label: '用户状态',
      placeholder: '请选择用户状态',
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
