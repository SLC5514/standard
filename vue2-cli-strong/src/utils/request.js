import axios from 'axios'
import get from 'lodash/get'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// 异常拦截处理器
const errorHandler = (error) => {
  const status = get(error, 'response.status');
  switch (status) {
    /* eslint-disable no-param-reassign */
    case 400: error.message = '请求错误'; break;
    case 401: error.message = '未授权，请登录'; break;
    case 403: error.message = '拒绝访问'; break;
    case 404: error.message = `请求地址出错: ${error.response.config.method.toUpperCase()} ${error.response.config.url}`; break;
    case 408: error.message = '请求超时'; break;
    case 500: error.message = '服务器内部错误'; break;
    case 501: error.message = '服务未实现'; break;
    case 502: error.message = '网关错误'; break;
    case 503: error.message = '服务不可用'; break;
    case 504: error.message = '网关超时'; break;
    case 505: error.message = 'HTTP版本不受支持'; break;
    default: break;
    /* eslint-disabled */
  }
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error);
}

// request interceptor
request.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()

      if (config.method.toLocaleUpperCase() === 'GET') {
        config.params = { ...config.params, token: getToken() }
      } else if (config.method.toLocaleUpperCase() === 'POST') {
        config.data = { ...config.data, token: getToken() }
      }
    }
    return config
  },
  errorHandler
)

// response interceptor
request.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    const { code, message } = res
    // if the custom ret is not 1, it is judged as an error.
    if (code !== 1) {
      Message({
        message: message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 2000: Token expired;
      if (code === 2000) {
        // to re-login
        MessageBox.confirm('您已超时，请重新登录', '确认登出', {
          confirmButtonText: '重新登入',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(message || 'Error')
    } else {
      return res
    }
  },
  errorHandler
)

export default request
