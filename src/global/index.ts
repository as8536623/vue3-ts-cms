import { App } from 'vue'
import { registerElement } from './register-element'
import { registerElementIcon } from './register-element-icon'
import { globalProperty } from './register-globalProperties'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export function register(app: App): void {
  app.use(registerElement)
  app.use(registerElementIcon)
  app.use(globalProperty)
  app.use(ElementPlus, {
    locale: zhCn
  })
}
