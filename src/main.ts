import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/*import "./service/axios";*/
import dsRequest from './service'
//elementui组件库
/*import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'*/
import { register } from './global'

import 'normalize.css'
import './assets/css/index.less'

const app = createApp(App)
/*app.use(ElementPlus)*/

app.use(register)
app.use(store).use(router).mount('#app')
/*console.log(process.env.VUE_APP_BASE_URL);*/

interface DataType {
  data: any
  returnCode: string
  success: boolean
}
dsRequest
  .get<DataType>({
    url: '/home/multidata',
    method: 'GET',
    showLoading: true
  })
  .then((res) => {
    console.log(res.data.data)
    console.log(res.data.returnCode)
    console.log(res.data.success)
  })
