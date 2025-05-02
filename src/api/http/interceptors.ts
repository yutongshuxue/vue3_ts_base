import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { RequestCache } from './cache'
import { RetryHandler } from './retry'
import { RequestThrottle } from './throttle'
import type { RequestConfig, RequestError, ResponseData } from './types'

// 明确导出拦截器设置函数
export function setupInterceptors(instance: AxiosInstance): void {
  // 请求拦截器
  instance.interceptors.request.use(
    //@ts-ignore
    (config: InternalAxiosRequestConfig & RequestConfig) => {
      config.metadata = { startTime: Date.now() }
      const requestConfig = config as RequestConfig

      // 请求节流处理
      if (config.throttle) {
        RequestThrottle.check(config)
      }

      // 缓存处理
      // 缓存处理逻辑
      if (requestConfig.cache) {
        const cachedData = RequestCache.getInstance().get(requestConfig)

        if (cachedData) {
          // 创建伪造响应对象终止请求
          return {
            ...config,
            adapter: () =>
              Promise.resolve({
                data: cachedData,
                status: 200,
                statusText: 'OK (From Cache)',
                headers: {},
                config: requestConfig,
                request: {}
              }),
            __fromCache: true
          }
        }
      }

      return config
    },
    error => Promise.reject(error)
  )

  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse<ResponseData>) => {
      const requestConfig = response.config as RequestConfig
      // 缓存成功响应
      if (requestConfig.cache && !requestConfig.__fromCache) {
        RequestCache.getInstance().set(requestConfig, response.data, requestConfig.cacheTTL)
      }
      return response
    },
    async (error: RequestError) => {
      const config = error.config as InternalAxiosRequestConfig & RequestConfig
      // 自动重试处理
      if (config) {
        return RetryHandler.handle(error, instance, config)
      }
      return Promise.reject(error)
    }
  )
}
