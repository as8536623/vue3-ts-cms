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
    component: () => import(/* webpackChunkName: "mainHome" */ '@/views/main/mainHome.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/login/login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "NotFound" */ '@/components/NotFound.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if (to.name !== 'login') {
    const token = localstorage.getLocal('token')
    if (!token) {
      router.push('/login')
    }
  }
  if (to.name === 'mainHome') {
    return router.push(firstMenu.url)
  }
})

export default router
