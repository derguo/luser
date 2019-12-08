import request from '@/utils/request'
import qs from 'qs'

export function allocation(data) {
  return request({
    url: '/upcustomerstate/allocation',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

export function followUp(data) {
  return request({
    url: '/upcustomerstate',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

export function success(data) {
  return request({
    url: '',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

export function lose(data) {
  return request({
    url: '',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
