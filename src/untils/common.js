
import constants from './constants'
// 操作缓存中得token
export function getToken () {
  return uni.getStorageSync(constants.USER_TICLET) || ''
}

export function setToken (token) {
  return uni.setStorageSync(constants.USER_TICLET, token)
}

export function removeToken () {
  return uni.removeStorageSync(constants.USER_TICLET)
}
// 操作缓存中得用户信息
export function getUserInfo () {
  return uni.getStorageSync(constants.USER_INFO) || {}
}

export function setUserInfo (userInfo) {
  return uni.setStorageSync(constants.USER_INFO, userInfo)
}

export function removeUserInfo () {
  return uni.removeStorageSync(constants.USER_INFO)
}
