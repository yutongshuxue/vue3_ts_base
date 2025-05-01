/// <reference types="vite/client" />
/// <reference types="pinia-plugin-persistedstate" />
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_TITLE: string
  // 其他自定义变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
