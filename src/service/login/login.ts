import dsRequest from '@/service'

import { loginAccount, loginResult, loginResultType } from './type'

export function loginAccountRequest(account: loginAccount) {
  return dsRequest.post<loginResultType<loginResult>>({
    url: '/login',
    data: account
  })
}
export function userInfoRequest(id: number) {
  return dsRequest.get<loginResultType>({
    url: '/users/' + id
  })
}

export function userRoleRequest(id: number) {
  return dsRequest.get<loginResultType>({
    url: '/role/' + id + '/menu'
  })
}
