import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'

const errorCodeInfo = {
  '0': 'success，成功，存在，交互正常',
  '1': '用户名或密码错误',
  '2': '令牌信息不正常',
  '3': '数据库异常',
  '4': '无此大区',
  '5': '无此级别',
  '-97': '符合条件的记录为 0 条',
  '-98': '缺少必要的参数',
  '-99': '未知异常',
  '-1002': '用户不存在'
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
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
    console.log('返回的数据', response)
    const res = response.data

    if (res.access_token) {
      return res
    }
    // if the custom code is not 20000, it is judged as an error.
    res.errorcode = res.errorcode * 1
    if (res.errorcode !== 0) {
      if (res.errorcode === 1 || res.errorcode === 2) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }

      Message({
        message: `errorcode: ${res.errorcode} -- ${errorCodeInfo[res.errorcode] || '未知错误编码'}`,
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject(new Error(errorCodeInfo[res.errorcode] || '未知错误编码'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
