import request from '../untils/request'

// 如果没注册 就根据code拿accesstoken 如果登录了就拿用户的基本信息
export function getLogin (data) {
  return request({
    url: '/kd8-user-center/kd8/api/third/login',
    method: 'POST',
    headers: {
      code: data.code
    },
    data
  })
}
// 手机号登录
export function loginByPhone (data) {
  return request({
    url: '/kd8-user-center/kd8/api/sms/code/login',
    method: 'POST',
    contentType: 'json',
    encrypt: true,
    data
  })
}
// 第三方登录
export function loginByUser (data) {
  return request({
    url: '/kd8-user-center/kd8/api/fast/login',
    method: 'POST',
    contentType: 'json',
    data
  })
}

export function loginOut (data) {
  return request({
    url: '/kd8-user-center/kd8/api/auth/login/out',
    method: 'POST',
    data
  })
}
