import request from '@/utils/request'
import qs from 'qs'

export const basicType = {
  PROVINCE: 'province', // 地区（省份）
  CITY: 'city', // 城市
  PRODUCT: 'product', // 产品类型
  STATE: 'state', // 获取处理状态
  USERS: 'users', // 跟进人列表
  REGION: 'region', // 大区名称
  AUTHOR: 'author', // 级别名称
  INDUSTRY: 'industry' // 行业名称
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
