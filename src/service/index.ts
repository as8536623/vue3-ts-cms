import { BASE_URL, BASE_TIME_OUT } from './request/config'
import DSRequest from './request'
const dsRequest = new DSRequest({
  baseURL: BASE_URL,
  timeout: BASE_TIME_OUT,
  interceptors: {
    requestInter: (config) => {
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
