import request from '@/utils/request'

const address = ''
// const address = '192.168.70.80'
export function login(data) {
  return request({
    url: address + '/user/login',
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
    url: '/user/info',
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
