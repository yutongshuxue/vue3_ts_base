import type { RouteRecordRaw } from 'vue-router'

/**
 * 将 views 文件转换为路由数组
 */
export function generateRoutes(): RouteRecordRaw[] {
  // 1. 获取所有视图组件 (Vite专有API)
  const views = import.meta.glob('../views/**/*.vue', { eager: true })

  // 2. 转换为路由配置
  return Object.entries(views).map(([path, component]) => {
    // 处理路径格式
    let routePath = path
      .replace('../views', '') // 移除基础路径
      .replace(/\.vue$/, '') // 移除扩展名
      .replace(/\/index$/, '') // 处理index文件
      .replace(/\[(\w+)\]/, ':$1') // 转换动态路由 [id] -> :id

    // 处理根路径
    if (routePath === '') routePath = '/'

    // 3. 返回路由配置
    return {
      path: routePath, // 空路径转为根路由
      name: routePath.replace(/\//g, '-').replace(/^-/, ''), // 生成路由名称
      component: (component as any).default,
      meta: (component as any).default?.routeMeta || {} // 从组件获取元信息
    }
  })
}
