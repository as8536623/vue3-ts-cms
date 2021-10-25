console.log(process.env.NODE_ENV)
let BASE_URL = ''
let BASE_NAME = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http//crderwhy.com/dev'
  BASE_NAME = 'dev'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http//crderwhy.com/pro'
  BASE_NAME = 'pro'
} else {
  BASE_URL = 'http//crderwhy.com/test'
  BASE_NAME = 'test'
}
export default { BASE_URL, BASE_NAME }
