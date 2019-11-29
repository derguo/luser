import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/token',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'grant_type': `password&username=${data.username}&password=${data.password}`
    }
  })
}

export function refreshToken(refresh_token) {
  return request({
    url: '/token',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'grant_type': `refresh_token & refresh_token = ${refresh_token}`
    }
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
