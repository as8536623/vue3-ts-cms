import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import localstorage from '@/utils/localstorage'
import main from '@/views/main/main.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: main
  },
  {
    path: '/main',
    name: 'main',
    component: () => import(/* webpackChunkName: "mainuser" */ '@/views/main/main.vue')
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
})

export default router
