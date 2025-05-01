// pinia.d.ts
import 'pinia'

declare module 'pinia' {
  // 定义持久化策略类型
  export interface PersistStrategy {
    storage?: Storage
    paths?: string[] // 关键：声明 paths 属性
    key?: string
    serializer?: {
      serialize: (value: unknown) => string
      deserialize: (value: string) => unknown
    }
  }

  // 扩展 Store 定义
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: boolean | PersistStrategy | PersistStrategy[]
  }
}
