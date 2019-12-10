import request from '@/utils/request'
import qs from 'qs'

export function allocation(token, data) {
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
    url: '/upcustomerstate',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${token}`
    },
    data: qs.stringify(data)
  })
}

export function success(token, data) {
  return request({
    url: '',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${token}`
    },
    data: qs.stringify(data)
  })
}

export function lose(token, data) {
  return request({
    url: '',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${token}`
    },
    data: qs.stringify(data)
  })
}
