export interface loginAccount {
  name: string
  password: number
}

export interface loginResult {
  id: number
  name: string
  token: string
}

export interface loginResultType<T = any> {
  data: {
    data: T
  }
  code: number
}
