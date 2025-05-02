import type { RequestConfig } from './types'

interface CacheItem<T> {
  expire: number
  data: T
  timer?: NodeJS.Timeout
}

export class RequestCache {
  private static instance: RequestCache
  private cacheMap = new Map<string, CacheItem<any>>()
  private defaultTTL = 5 * 60 * 1000

  static getInstance(): RequestCache {
    if (!this.instance) {
      this.instance = new RequestCache()
    }
    return this.instance
  }

  set<T>(config: RequestConfig, data: T, ttl?: number): void {
    const key = this.serializeKey(config)
    this.clearExpired(key)

    const expire = Date.now() + (ttl || this.defaultTTL)
    const timer = setTimeout(() => this.deleteByKey(key), expire - Date.now())

    this.cacheMap.set(key, { data, expire, timer })
  }

  get<T>(config: RequestConfig): T | null {
    const key = this.serializeKey(config)
    const item = this.cacheMap.get(key)

    if (!item) return null
    if (Date.now() > item.expire) {
      this.deleteByKey(key)
      return null
    }
    return item.data
  }

  delete(config: RequestConfig): void {
    const key = this.serializeKey(config)
    this.deleteByKey(key)
  }

  private deleteByKey(key: string): void {
    const item = this.cacheMap.get(key)
    if (item?.timer) clearTimeout(item.timer)
    this.cacheMap.delete(key)
  }

  private clearExpired(key: string): void {
    const item = this.cacheMap.get(key)
    if (item && Date.now() > item.expire) this.deleteByKey(key)
  }

  private serializeKey(config: RequestConfig): string {
    const { method, url, params, data } = config
    return JSON.stringify({
      method: method?.toLowerCase(),
      url,
      params: params ? this.deepSort(params) : null,
      data: data ? this.deepSort(data) : null
    })
  }

  // 新增深度排序方法
  private deepSort(obj: any): any {
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
}
