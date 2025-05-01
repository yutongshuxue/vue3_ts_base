import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { generateRoutes } from './autoRoutes'

// 自动生成的基础路由
const autoRoutes = generateRoutes()

// 可以在此添加手动路由或覆盖自动路由
const customRoutes: RouteRecordRaw[] = []

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...autoRoutes,
    ...customRoutes,
    // 404路由放在最后
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/NotFound.vue'),
      name: 'NotFound'
    }
  ]
})

export default router
