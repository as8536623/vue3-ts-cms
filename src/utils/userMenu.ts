import { RouteRecordRaw } from 'vue-router'
export function changeUserMenu(usermenu: any[]): RouteRecordRaw[] {
  const userRouter: RouteRecordRaw[] = []
  const routerAll: RouteRecordRaw[] = []
  const routerFiles = require.context('../router/main', true, /\.ts/)
  routerFiles.keys().forEach((key) => {
    const route = require('../router/main/' + key.split('./')[1])
    routerAll.push(route.default)
  })
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type == 1) {
        _recurseGetRoute(menu.children)
      } else if (menu.type == 2) {
        const route = routerAll.find((key) => key.path == menu.url)
        if (route) userRouter.push(route)
      }
    }
  }
  _recurseGetRoute(usermenu)
  return userRouter
}
