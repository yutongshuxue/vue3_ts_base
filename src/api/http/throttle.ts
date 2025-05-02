import type { RequestConfig } from './types'

interface ThrottleRecord {
  controller: AbortController
  timer: NodeJS.Timeout
  lastRequestTime: number
}

export class RequestThrottle {
  private static pendingMap = new Map<string, ThrottleRecord>()
  private static defaultThrottleTime: number = 500

  /**
   * 精准节流控制（修复关键问题）
   */
  static check(config: RequestConfig): void {
    const key = this.generateKey(config)
    const throttleTime = (config as any).throttleTime || RequestThrottle.defaultThrottleTime
    const now = Date.now()

    // 清理过期记录（新增逻辑）
    this.cleanupExpired(now, throttleTime)

    // 存在未过期请求时取消前序（关键修复）
    if (this.pendingMap.has(key)) {
      const record = this.pendingMap.get(key)!

      // 强制取消前序请求（无论时间差）
      record.controller.abort('throttle-cancel')
      clearTimeout(record.timer)
    }

    // 创建新记录（严格时间窗口管理）
    const controller = new AbortController()
    const timer = setTimeout(() => {
      this.pendingMap.delete(key)
    }, throttleTime)

    this.pendingMap.set(key, {
      controller,
      timer,
      lastRequestTime: now // 记录最新请求时间
    })

    config.signal = controller.signal
  }

  /**
   * 精准清理过期记录（修复时间计算）
   */
  private static cleanupExpired(now: number, throttleTime: number): void {
    this.pendingMap.forEach((record, key) => {
      if (now - record.lastRequestTime >= throttleTime) {
        clearTimeout(record.timer)
        this.pendingMap.delete(key)
      }
    })
  }

  /**
   * 强化请求标识生成（处理边缘情况）
   */
  private static generateKey(config: RequestConfig): string {
    const { method, url, params, data } = config
    // 深度规范化参数
    const normalized = {
      method: method?.toLowerCase(),
      url,
      params: params ? this.normalize(params) : null,
      data: data ? this.normalize(data) : null
    }

    return JSON.stringify(normalized, (_, value) => {
      if (typeof value === 'object' && value !== null) {
        return Object.keys(value)
          .sort()
          .reduce((acc, key) => {
            acc[key] = value[key]
            return acc
          }, {} as any)
      }
      return value
    })
  }

  /**
   * 深度排序对象属性（解决参数顺序问题）
   */
  private static deepSort(obj: any): any {
    if (typeof obj !== 'object' || obj === null) return obj
    if (Array.isArray(obj)) return obj.map(this.deepSort)

    return Object.keys(obj)
      .sort()
      .reduce(
        (acc, key) => {
          acc[key] = this.deepSort(obj[key])
          return acc
        },
        {} as Record<string, any>
      )
  }

  // 深度规范化数据结构
  private static normalize(obj: any): any {
    if (obj instanceof FormData) {
      return Array.from(obj.entries()).sort()
    }
    if (Array.isArray(obj)) {
      return obj.map(this.normalize)
    }
    if (typeof obj === 'object' && obj !== null) {
      return Object.keys(obj)
        .sort()
        .reduce((acc, key) => {
          acc[key] = this.normalize(obj[key])
          return acc
        }, {} as any)
    }
    return obj
  }
}
