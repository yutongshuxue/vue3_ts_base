import { defineConfig, UserConfig } from 'vite'
import baseEnvConfig from './vite.base.config'
import devEnvConfig from './vite.dev.config'
import prodEnvConfig from './vite.prod.config'

interface ConfigMap {
  production: () => UserConfig
  development: () => UserConfig
  [key: string]: () => UserConfig // 添加索引签名
}

const envDispose: ConfigMap = {
  production: () => {
    console.log('production')
    return Object.assign({}, baseEnvConfig, prodEnvConfig)
  },
  development: () => {
    console.log('development')
    return Object.assign({}, baseEnvConfig, devEnvConfig)
  }
}

// https://vite.dev/config/
export default defineConfig(env => {
  return envDispose[env.mode]()
})
