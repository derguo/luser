import request from '@/utils/request'

export function login(data) {
  console.log(process.env.VUE_APP_BASE_API)
  return request({
    url: '/token',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'grant_type': 'password'
    },
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/users/getone/',
    method: 'post',
    data: {
      token
    }
    // ,params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
