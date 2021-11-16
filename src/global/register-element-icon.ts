import { App } from 'vue'
import {
  Avatar,
  Iphone,
  Location,
  Document,
  Menu as IconMenu,
  Setting,
  Fold,
  Expand,
  ArrowDown
} from '@element-plus/icons'

const components: any[] = [
  Avatar,
  Iphone,
  Location,
  Document,
  IconMenu,
  Setting,
  Fold,
  Expand,
  ArrowDown
]

export function registerElementIcon(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
