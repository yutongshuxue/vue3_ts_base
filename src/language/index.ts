import type { App } from 'vue'
import { createI18n } from 'vue-i18n'

// 动态加载所有语言文件
const localeModules = import.meta.glob('../language/*/*.json', { eager: true })

// 自动推断支持的语言类型
export type SupportedLocale = keyof typeof localeModules
export const SUPPORTED_language = Object.keys(localeModules) as SupportedLocale[]

// 自动生成消息类型
type AutoMessageSchema = typeof enMessages

// 加载英文文件用于生成基础类型
const enMessages = (localeModules[Object.keys(localeModules)[0]] as any).default

// 创建i18n实例
export const i18n = createI18n<[AutoMessageSchema], SupportedLocale>({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: Object.entries(localeModules).reduce(
    (acc, [path, mod]) => {
      // 安全匹配并处理错误
      const match = path.match(/\.\/([A-Za-z-]+)\//)
      if (!match) {
        console.error('路径不匹配语言目录格式:', path)
        return acc
      }
      const [, locale] = match

      // 合并消息（假设 mod 是模块对象）
      acc[locale] = {
        ...acc[locale],
        ...(mod as { default: Record<string, string> }).default
      }
      return acc
    },
    {} as Record<string, any>
  )
})

// 安装插件
export const installI18n = (app: App) => {
  app.use(i18n)
}

// 语言切换方法
export const setLocale = (locale: SupportedLocale) => {
  //@ts-ignore
  i18n.global.locale.value = locale
}

export const getLocale = () => {
  //@ts-ignore
  return i18n.global.locale.value
}
