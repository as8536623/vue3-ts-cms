import type { AxiosRequestConfig, AxiosResponse } from 'axios'
interface requestResponseConfig<T = AxiosResponse> {
  requestInter?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestReturn?: (error: any) => any
  responseInter?: (res: T) => T
  responseReturn?: (error: any) => any
}
interface DSrequestResponseConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: requestResponseConfig<T>
  showLoading?: boolean
}

export { requestResponseConfig, DSrequestResponseConfig }
