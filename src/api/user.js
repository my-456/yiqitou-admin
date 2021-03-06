import request from '@/utils/request'

// 用户登录
export function Login (data) {
  return request({
    method: 'post',
    url: '/mp/v1_0/authorizations',
    data
  })
}

// 获取用户资料
export function getInfo (data) {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile',
    data
  })
}
