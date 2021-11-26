export interface userAccount {
  url: string
  params: any
  dataName: string
}

export interface userResult {
  list: any
  totalCount: number
}

export interface userResultType<T = any> {
  data: {
    data: T
  }
  code: number
}
