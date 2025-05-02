import type { AxiosError, AxiosRequestConfig } from 'axios'

export interface RequestConfig extends AxiosRequestConfig {
  /** 是否处理错误（默认true） */
  handleError?: boolean
  /** 重试次数（默认0） */
  retry?: number
  /** 重试延迟时间（毫秒，默认300） */
  retryDelay?: number
  /** 是否启用缓存 */
  cache?: boolean
  /** 缓存时间（毫秒） */
  cacheTTL?: number
  /** 是否启用请求节流 */
  throttle?: boolean
  /** 节流时间（毫秒，默认500） */
  throttleTime?: number
  /** 取消请求标识 */
  cancelId?: string | symbol
}

export interface ResponseData<T = any> {
  code: number
  data: T
  message?: string
  [key: string]: any
}

declare module 'axios' {
  interface AxiosRequestConfig {
    metadata?: {
      startTime?: number
      isRetry?: boolean
    }
    __retryCount?: number
    __fromCache?: boolean
    cancelId?: string | symbol
  }
}

export type RequestError = AxiosError<ResponseData>
