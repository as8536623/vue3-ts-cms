import dsRequest from '@/service'
import { userAccount, userResult, userResultType } from './type'
import { ElMessage } from 'element-plus'
export function userAccountRequest(account: userAccount) {
  return dsRequest.post<userResultType<userResult>>({
    url: account.url,
    data: account.params
  })
}

export function userDeleteRequest(account: userAccount) {
  return dsRequest
    .delete<userResultType<userResult>>({
      url: account.url
    })
    .then((res) => {
      ElMessage({
        message: `${res.data.data}`,
        type: 'success'
      })
    })
}
export function getDepartmentRoleRequest(account: userAccount) {
  return dsRequest.post<userResultType<userResult>>({
    url: account.url,
    data: account.params
  })
}

export function createdUserRequest(account: userAccount) {
  return dsRequest.post<userResultType<userResult>>({
    url: account.url,
    data: account.params
  })
}

export function eidtUserRequest(account: userAccount) {
  return dsRequest.patch<userResultType<userResult>>({
    url: account.url,
    data: account.params
  })
}
