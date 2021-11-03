class LocalStorage {
  setLocal(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  getLocal(key: string) {
    window.localStorage.getItem(key)
  }
  removeLocal(key: string) {
    window.localStorage.removeItem(key)
  }
  clearLocal() {
    window.localStorage.clear()
  }
}
export default new LocalStorage()
