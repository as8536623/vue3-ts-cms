import type { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface requestResponseConfig<T = AxiosResponse> {
  requestInter?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestReturn?: (error: any) => any
  responseInter?: (res: T) => T
  responseReturn?: (error: any) => any
}
export interface DSrequestResponseConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: requestResponseConfig<T>
  showLoading?: boolean
}
