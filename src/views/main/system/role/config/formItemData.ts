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
      type: 'password',
      label: '密码',
      placeholder: '请输入密码',
      value: 'password'
    },
    {
      type: 'select',
      label: '选择',
      placeholder: 'Select',
      value: 'select',
      options: [
        {
          value: 'Option1',
          title: 'Option1'
        },
        {
          value: 'Option2',
          title: 'Option2'
        },
        {
          value: 'Option3',
          title: 'Option3'
        },
        {
          value: 'Option4',
          title: 'Option4'
        },
        {
          value: 'Option5',
          title: 'Option5'
        }
      ]
    },
    {
      type: 'datepicker',
      label: '创建时间',
      placeholder: '请选择时间',
      value: 'createtime',
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
