import request from '@/utils/request'
import qs from 'qs'

export function login(data) {
  return request({
    url: '../token',
    method: 'post',
    headers: {
      // 'Access-Control-Request-Headers': 'content-type'
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

export function upCustomerState(token, datas) {
  return request({
    url: '/customProduct/UpCustomerState',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${token}`
    },
    data: qs.stringify(datas)
  })
}

export function getUsers(token, datas) {
  return request({
    url: '/base/users',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${token}`
    },
    data: qs.stringify(datas)
  })
}

export function addusers(token, datas) {
  return request({
    url: '/users/addusers',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${token}`
    },
    data: qs.stringify(datas)
  })
}

export function getInfo(token, username) {
  return request({
    url: '/users/getbaseone',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${token}`
    },
    data: qs.stringify({ username })
    // ,params: { token }
  })
}

export function getone(token, username) {
  return request({
    url: '/users/getone',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${token}`
    },
    data: qs.stringify({ username })
    // ,params: { token }
  })
}

export function customInfo(token, datas) {
  return request({
    url: '/customProduct/customInfo',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${token}`
    },
    data: qs.stringify(datas)
  })
}

export function chilstateinfo(token, datas) {
  return request({
    url: '/customProduct/chilstateinfo',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${token}`
    },
    data: qs.stringify(datas)
  })
}

export function getCustomHandleState(token, datas) {
  return request({
    url: '/customProduct/GetCustomHandleState',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${token}`
    },
    data: qs.stringify(datas)
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
