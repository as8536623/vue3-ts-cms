export const rules = {
  name: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名为5-10位数字或者小写字母',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '输入长度为3个以上字符',
      trigger: 'blur'
    }
  ],
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: '输入正确手机号',
      trigger: 'blur'
    }
  ],
  verificationCode: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{5}$/,
      message: '输入正确验证码',
      trigger: 'blur'
    }
  ]
}
