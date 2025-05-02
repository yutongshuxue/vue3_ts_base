import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export interface PerfMetric {
  url: string
  method: string
  duration: number
  status: number
  timestamp: number
}

export class PerformanceMonitor {
  static metrics: PerfMetric[] = []
  static maxRecords = 200

  static record(config: InternalAxiosRequestConfig, response?: AxiosResponse): void {
    const start = config.metadata?.startTime
    if (!start || !config.url) return

    const duration = Date.now() - start
    const metric: PerfMetric = {
      url: config.url,
      method: config.method?.toUpperCase() || 'GET',
      duration,
      status: response?.status || 0,
      timestamp: Date.now()
    }

    this.metrics.push(metric)
    if (this.metrics.length > this.maxRecords) {
      this.metrics.shift()
    }
  }

  static getMetrics(): PerfMetric[] {
    return [...this.metrics]
  }

  static getAverage(): number {
    return this.metrics.reduce((sum, m) => sum + m.duration, 0) / (this.metrics.length || 1)
  }
}
