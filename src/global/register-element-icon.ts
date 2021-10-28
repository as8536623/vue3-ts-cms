import { App } from 'vue'
import { Avatar, Iphone } from '@element-plus/icons'

const components: any[] = [Avatar, Iphone]

export function registerElementIcon(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
