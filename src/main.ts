import { createApp } from 'vue'
import App from './App.vue'
import { installI18n } from './language/index'
import router from './router'
import pinia from './store'
import './style.css'

const app = createApp(App)
installI18n(app) // 正确注入 i18n 实例
app.use(router)
app.use(pinia)
app.mount('#app')
