import axios from 'axios'
import './request/config'
axios.defaults.baseURL = 'http://httpbin.org'

axios
  .get('/get', {
    params: {
      id: 100,
      name: 'ds'
    }
  })
  .then((res) => {
    console.log(res)
  })

axios({
  method: 'post',
  url: '/post',
  data: {
    id: 1,
    name: 'dingshuai'
  }
}).then((res) => {
  console.log(res)
})

axios.interceptors.request.use(
  (config) => {
    console.log(config)
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  (config) => {
    console.log(config)
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)
