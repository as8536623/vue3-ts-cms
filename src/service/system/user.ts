import dsRequest from '@/service'
import { userAccount, userResult, userResultType } from './type'
export function userAccountRequest(account: userAccount) {
  return dsRequest.post<userResultType<userResult>>({
    url: account.url,
    data: account.params
  })
}
