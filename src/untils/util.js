const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const toBase36 = function (num, n = 9) {
  let b = num
  let nb = ''
  while (b != 0) {
    const c = b % 36
    const d = b / 36
    nb = CHARS.charAt(c) + nb
    b = Math.round(Math.floor(d))
  }
  return ('0000000000000000' + nb).substr(-n)
}

const newUUID = (nonce) => {
  let d = new Date().getTime()
  const tpl = nonce ? 'xxxxxxxxxxxxxyxxxxyxxxxxxxxxxxxx' : 'xxxxxxx-xxxx-5xxx-yxxx-xxxxxxxxx'
  const uuid = tpl.replace(/[xy]/g,
    function (c) {
      const r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
  return uuid
}

const HN_CLIENT_ID = 'HN-CLIENT-ID-NEW'
const getClientID = () => {
  let _clientID = wx.getStorageSync(HN_CLIENT_ID)
  if (!_clientID) {
    _clientID = newUUID()
    wx.setStorageSync(HN_CLIENT_ID, _clientID)
  }
  return _clientID
}

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getPageRoute = page => {
  const route = page.route
  const index = route.indexOf('?')
  const key = index == -1 ? route : route.substring(0, index)
  return key.startsWith('/') ? key.substring(1) : key
}

const getCurrentPage = () => {
  const pages = getCurrentPages() // 获取加载的页面
  return pages[pages.length - 1]
}

const getPrePage = () => {
  const pages = getCurrentPages() // 获取加载的页面
  if (pages.length >= 2) {
    return pages[pages.length - 2]
  }
}

// key value expire (过期时间，单位秒)
export const hset = (key, value, expire = 0) => {
  // 过期时间转换
  let expireAt
  if (expire > 0) {
    expireAt = new Date()
    expireAt.setSeconds(expireAt.getSeconds() + expire)
    expireAt = expireAt.getTime()
  } else {
    expireAt = -1
  }
  return new Promise(function (resolve, reject) {
    wx.setStorage({
      key: key,
      data: {
        value,
        expireAt
      },
      success: (data) => {
        resolve(data)
      }
    })
  })
}

// key
export const hget = (key) => {
  const now = new Date().getTime()
  return new Promise(function (resolve, reject) {
    wx.getStorage({
      key: key,
      success: (res) => {
        const {
          value,
          expireAt = -1
        } = res.data || {}
        if (expireAt === -1) {
          resolve(value)
        } else {
          if (now > expireAt) {
            // 过期
            resolve()
            // 删除数据
            wx.removeStorage({
              key: key,
              success: res => { }
            })
          } else {
            // 有效
            resolve(value)
          }
        }
      }
    })
  })
}

export default {
  toBase36,
  newUUID,
  getClientID,
  randomInt,
  hget,
  hset,
  getCurrentPage: getCurrentPage,
  getPrePage: getPrePage,
  getPageRoute: getPageRoute
}
