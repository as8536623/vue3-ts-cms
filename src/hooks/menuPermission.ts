import { useStore } from 'vuex'
export function menuPermission(menuName: string, jurisdictionName: string) {
  const store = useStore()
  const pPerssionName = `system:${menuName}:${jurisdictionName}`
  if (store.state.loginModule.permission.indexOf(pPerssionName) > -1) {
    return true
  } else {
    return false
  }
}
