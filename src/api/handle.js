import request from '@/utils/request'
import qs from 'qs'

export function allocation(token, data) {
  console.log(token)
  console.log(data)
  return request({
    url: '/customProduct/allocation',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${token}`
    },
    data: qs.stringify(data)
  })
}

export function followUp(token, data) {
  return request({
    url: 'customProduct/UpCustomerState',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${token}`
    },
    data: qs.stringify(data)
  })
}

export function upUserInfo(token, data) {
  return request({
    url: 'customProduct/UpCustomerInfo',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${token}`
    },
    data: qs.stringify(data)
  })
}
