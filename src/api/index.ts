import axios, { type AxiosInstance } from 'axios'
import { setupInterceptors } from './http/interceptors'
import type { RequestConfig, ResponseData } from './http/types'

export class Request {
  private instance: AxiosInstance

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    setupInterceptors(this.instance)
  }

  public request<T = any>(config: RequestConfig): Promise<ResponseData<T>> {
    return this.instance.request(config).then(res => res.data)
  }

  public get<T = any>(url: string, config?: RequestConfig) {
    return this.request<T>({ ...config, method: 'GET', url })
  }

  public post<T = any>(url: string, data?: any, config?: RequestConfig) {
    return this.request<T>({ ...config, method: 'POST', url, data })
  }
}

// 默认配置
export const http = new Request({
  timeout: 10000,
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  handleError: true,
  retry: 1, // 重试次数
  retryDelay: 1000, // 重试延迟时间
  throttle: true, // 是否启用请求节流
  throttleTime: 500, // 节流时间
  cache: true, // 是否启用缓存
  cacheTTL: 1000 * 60 * 5 // 缓存时间（毫秒）
})
