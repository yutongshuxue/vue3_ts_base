import { DefineLocaleMessage } from 'vue-i18n'

// 自动合并所有JSON文件类型
declare module '*.json' {
  const content: DefineLocaleMessage
  export default content
}

declare module 'vue-i18n' {
  interface DefineLocaleMessage {
    // 空接口，实际类型由JSON文件自动合并
  }
}
