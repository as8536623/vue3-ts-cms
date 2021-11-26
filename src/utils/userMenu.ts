import { RouteRecordRaw } from 'vue-router'
let firstMenu: any = null
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
        if (!firstMenu) {
          firstMenu = menu
        }
      }
    }
  }
  _recurseGetRoute(usermenu)
  return userRouter
}

export function menuPath(usermenu: any[], path: string, breadcrumbs?: number): any {
  const breadcrumb: any[] = []
  for (const userurl of usermenu) {
    if (userurl.type == 1) {
      const findPath = menuPath(userurl.children, path)
      if (findPath) {
        breadcrumb.push({ name: userurl.name })
        breadcrumb.push({ name: findPath.name, path: findPath.url })
        if (!breadcrumbs) {
          return findPath
        }
      }
    } else if (userurl.type == 2 && userurl.url == path) {
      if (!breadcrumbs) {
        return userurl
      }
    }
  }
  if (breadcrumbs) {
    return breadcrumb
  }
}

export { firstMenu }
