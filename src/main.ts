import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//elementui组件库
/*import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'*/
import { register } from './global'

const app = createApp(App)
register(app)
app.use(store).use(router).mount('#app')
