import { App } from 'vue'
import 'element-plus/dist/index.css'
import {
  ElButton,
  ElTable,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge,
  ElInput,
  ElLoading,
  ElTabs,
  ElTabPane,
  ElIcon
} from 'element-plus'

const components: any[] = [
  ElButton,
  ElTable,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge,
  ElInput,
  ElLoading,
  ElTabs,
  ElTabPane,
  ElIcon
]

export function registerElement(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
