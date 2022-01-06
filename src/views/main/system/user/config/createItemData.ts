export const createData = {
  labelWidth: '80px',
  isHiddenTitle: true,
  hyfromData: [
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
      value: 'password',
      isHidden: false
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
      label: '选择部门',
      placeholder: '请选择部门',
      value: 'departmentId',
      options: []
    },
    {
      type: 'select',
      label: '选择角色',
      placeholder: '选择角色',
      value: 'roleId',
      options: []
    }
  ],
  paddingWidth: {
    padding: '5px'
  },
  colLayout: {
    xl: 21,
    lg: 21,
    md: 21,
    sm: 21,
    xs: 21
  }
}
