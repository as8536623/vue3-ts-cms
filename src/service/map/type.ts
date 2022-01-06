export interface mapResult {
  list: any
  totalCount: number
}

export interface mapResultType<T = any> {
  state: boolean
  data: {
    data: T
  }
  code: number
}
