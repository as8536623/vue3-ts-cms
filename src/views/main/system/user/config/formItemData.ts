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
      label: '用户名',
      placeholder: '请输入用户名',
      value: 'name'
    },
    {
      value: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      value: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      type: 'select',
      label: '用户状态',
      placeholder: '请选择用户状态',
      value: 'enable',
      options: []
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
