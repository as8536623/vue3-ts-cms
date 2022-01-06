export const formData = {
  labelWidth: '100px',
  hyfromData: [
    {
      type: 'input',
      label: 'ID',
      placeholder: '请输入用户ID',
      value: 'id'
    },
    {
      type: 'input',
      label: '类别名称',
      placeholder: '请输入类别名称',
      value: 'name'
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
