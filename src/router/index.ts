import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import localstorage from '@/utils/localstorage'
import mainHome from '@/views/main/mainHome.vue'
import { firstMenu } from '@/utils/userMenu'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: mainHome
  },
  {
    path: '/main',
    name: 'mainHome',
    component: () => import(/* webpackChunkName: "mainHome" */ '@/views/main/mainHome.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/login/login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "NotFound" */ '@/components/not-found/NotFound.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to: any) => {
  const token = localstorage.getLocal('token')
  if (to.meta.requiresAuth && !token) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: '/login',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath }
    }
  }
  if (to.name !== 'login') {
    if (!token) {
      router.push('/login')
    }
  }
  if (to.name === 'mainHome') {
    return router.push(firstMenu.url)
  }
})

export default router
