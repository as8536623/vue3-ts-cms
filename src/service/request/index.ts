import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { requestResponseConfig, DSrequestResponseConfig } from './public'
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/packages/components/loading/src/loading.type'
const BASE_LOADING = true
class DSRequest {
  instance: AxiosInstance
  interceptors?: requestResponseConfig
  showLoading?: boolean
  loadingInstance?: ILoadingInstance
  constructor(config: DSrequestResponseConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? BASE_LOADING
    //单个实例拦截请求
    this.instance.interceptors.request.use(
      this.interceptors?.requestInter,
      this.interceptors?.requestReturn
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInter,
      this.interceptors?.responseReturn
    )

    //全局拦截请求
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loadingInstance = ElLoading.service({
            lock: true,
            text: '正在加载中...',
            background: 'rgba(0, 0, 0, 0.8)'
          })
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        if (this.showLoading) {
          setTimeout(() => {
            this.loadingInstance?.close()
          }, 1000)
        }
        return res
      },
      (error) => {
        if (this.showLoading) {
          setTimeout(() => {
            this.loadingInstance?.close()
          }, 1000)
        }
        return error
      }
    )
  }
  request<T>(config: DSrequestResponseConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInter) {
        config = config.interceptors.requestInter(config)
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInter) {
            res = config.interceptors.responseInter(res)
          }
          this.showLoading = BASE_LOADING
          return resolve(res)
        })
        .catch((error) => {
          this.showLoading = BASE_LOADING
          return reject(error)
        })
    })
  }

  get<T>(config: DSrequestResponseConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T>(config: DSrequestResponseConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T>(config: DSrequestResponseConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T>(config: DSrequestResponseConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}
export default DSRequest
