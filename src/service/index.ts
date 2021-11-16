import { BASE_URL, BASE_TIME_OUT } from './request/config'
import DSRequest from './request'
import localstorage from '@/utils/localstorage'
const dsRequest = new DSRequest({
  baseURL: BASE_URL,
  timeout: BASE_TIME_OUT,
  interceptors: {
    requestInter: (config) => {
      const token = localstorage.getLocal('token')
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`
        }
      }
      return config
    },
    requestReturn: (error) => {
      return error
    },
    responseInter: (res) => {
      return res
    },
    responseReturn: (error) => {
      return error
    }
  }
})
export default dsRequest
