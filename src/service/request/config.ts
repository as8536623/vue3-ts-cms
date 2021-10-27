let BASE_URL = ''
let BASE_TIME_OUT = 0
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://123.207.32.32:8000/'
  BASE_TIME_OUT = 1000
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://crderwhy.com/pro'
  BASE_TIME_OUT = 1000
} else {
  BASE_URL = 'http://crderwhy.com/test'
  BASE_TIME_OUT = 1000
}
export { BASE_URL, BASE_TIME_OUT }
