import request from '@/utils/request'
import qs from 'qs'

export function login(data) {
  return request({
    url: '../token',
    method: 'post',
    headers: {
      'Access-Control-Request-Headers': 'content-type'
    },
    data: qs.stringify(Object.assign(data, { grant_type: 'password' }))
  })
}

export function refreshToken(refresh_token) {
  return request({
    url: '/token',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
      // 'grant_type': `refresh_token & refresh_token = ${refresh_token}`
    },
    data: {
      grant_type: 'refresh_token',
      refresh_token
    }
  })
}

export function getInfo(token, username) {
  return request({
    url: '/users/getone/',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${token}`,
      username
    },
    data: qs.stringify({ username })
    // ,params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
