/**
 * 随机数
 * @param min
 * @param max
 * @returns {number}
 */
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 生产uuid
 * @returns {string}
 */
const generateUUID = () => {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
    function (c) {
      const r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
  return uuid
}

/**
 * 本地存储设备 ID 的 key
 * @type {string}
 */
const STORE_DEVICE_ID = 'my_device_id'

/**
 * 缓存设备ID
 * @type {string}
 */
let cacheDeviceId = ''

/**
 * 获取设备ID
 * @returns {string|any | string}
 */
const getDeviceId = () => { // 获取设备id
  if (cacheDeviceId) {
    return cacheDeviceId
  } else {
    let deviceId = uni.getStorageSync(STORE_DEVICE_ID)
    if (!deviceId) {
      deviceId = generateUUID()
      cacheDeviceId = deviceId
      uni.setStorageSync(STORE_DEVICE_ID, cacheDeviceId)
      return cacheDeviceId
    } else {
      cacheDeviceId = deviceId
      return cacheDeviceId
    }
  }
}

let cachedSessionId = ''
const getSessionId = () => { // 获取回话id
  if (!cachedSessionId) {
    cachedSessionId = util.generateUUID()
  }
  return cachedSessionId
}

const getPageRoute = page => {
  const route = page.route
  const index = route.indexOf('?')
  const key = index == -1 ? route : route.substring(0, index)
  return key.startsWith('/') ? key.substring(1) : key
}

// const sleep = (numberMillis) => {
//   let exitTime = new Date().getTime() + numberMillis;
//   while(true) {
//     if (new Date().getTime() > exitTime)
//       return;
//   }
// }

const wait = (scope, flagField, method, args) => {
  if (scope && scope[flagField]) {
    return true
  } else {
    const fn = scope[method]
    if (typeof fn === 'function') {
      fn._waitcount = fn._waitcount || 1
      if (fn._cellUpdateTimeout) clearTimeout(fn._cellUpdateTimeout)
      if (fn._waitcount < 10) {
        fn._cellUpdateTimeout = setTimeout(() => {
          fn._waitcount++
          if (wait(scope, method, args, flagField)) {
            fn.apply(scope, args || [])
          }
        }, 200)
      }
    }
  }
}

const newId = () => {
  var a = (new Date().getTime() + Math.random())
  return a.toString(16).replace('.', '').slice(8)
}

/**
 * base36
 * @type {string}
 */
const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const toBase36 = (num, n = 9) => {
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

export default {
  newId: newId,
  wait: wait,
  getDeviceId: getDeviceId,
  getSessionId: getSessionId,
  randomInt: randomInt,
  generateUUID: generateUUID,
  toBase36: toBase36
}
