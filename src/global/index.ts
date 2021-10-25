import { App } from 'vue'
import { registerElement } from './register-element'
export function register(app: App): void {
  app.use(registerElement)
}
