import type { AxiosRequestConfig, AxiosResponse } from 'axios'
interface requestResponseConfig {
  requestInter?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestReturn?: (error: any) => any
  responseInter?: (res: any) => any
  responseReturn?: (error: any) => any
}
interface DSrequestResponseConfig extends AxiosRequestConfig {
  interceptors?: requestResponseConfig
  showLoading?: boolean
}

export { requestResponseConfig, DSrequestResponseConfig }
