import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/*import "./service/axios";*/
//elementui组件库
/*import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'*/
import { register } from './global'

import 'normalize.css'
import './assets/css/index.less'
const app = createApp(App)
/*app.use(ElementPlus)*/

/*register(app)*/
app.use(register)
app.use(store)
store.dispatch('loginModule/getLoaclData')
app.use(router)
app.mount('#app')
