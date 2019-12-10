import request from '@/utils/request'
import qs from 'qs'

export const basicType = {
  PROVINCE: 'province',
  CITY: 'city',
  PRODUCT: 'product',
  STATE: 'state',
  USERS: 'users',
  REGION: 'region',
  AUTHOR: 'author',
  INDUSTRY: 'industry'
}

export function getBasic(token, type, data = {}) {
  return request({
    url: '/base/' + type,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${token}`
    },
    data: qs.stringify(data)
  })
}
