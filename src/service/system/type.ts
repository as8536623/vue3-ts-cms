export interface userAccount {
  url: string
  params?: any
  dataName?: string
  id?: number
}

export interface userResult {
  list: any
  totalCount: number
}

export interface userResultType<T = any> {
  state: boolean
  data: {
    data: T
  }
  code: number
}
