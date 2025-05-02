import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import type { RequestConfig, RequestError } from './types'

export class RetryHandler {
  // 独立存储每个请求的重试状态（修复关键点）
  private static retryStore = new Map<string, number>()

  static async handle(
    error: RequestError,
    instance: AxiosInstance,
    config: InternalAxiosRequestConfig & RequestConfig
  ): Promise<any> {
    if (!error.config || !this.shouldRetry(error)) {
      return Promise.reject(error)
    }

    // 生成唯一请求标识
    const retryKey = this.generateRetryKey(config)
    const retryCount = this.retryStore.get(retryKey) || 0
    const { retry = 0, retryDelay = 300 } = config

    // 检查是否达到最大重试次数
    if (retryCount >= retry) {
      this.retryStore.delete(retryKey)
      return Promise.reject(error)
    }

    // 更新重试计数器
    this.retryStore.set(retryKey, retryCount + 1)

    // 延迟重试（使用递增延迟策略）
    await new Promise(resolve => setTimeout(resolve, retryDelay * (retryCount + 1)))

    // 发起重试请求（创建新配置副本）
    return instance.request({
      ...config,
      metadata: {
        ...config.metadata,
        isRetry: true // 标记为重试请求
      }
    })
  }

  private static generateRetryKey(config: InternalAxiosRequestConfig): string {
    const { method, url, params, data } = config
    return JSON.stringify({
      method,
      url,
      params,
      data: typeof data === 'object' ? JSON.stringify(data) : data
    })
  }

  private static shouldRetry(error: RequestError): boolean {
    return (
      !error.response ||
      [502, 503, 504, 429].includes(error.response.status) ||
      error.code === 'ECONNABORTED'
    )
  }

  // 清理过期记录（可选）
  static cleanup() {
    this.retryStore.clear()
  }
}
