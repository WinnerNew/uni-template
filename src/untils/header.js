import helper from './helper'
import util from './util.js'
import md5 from './crypto-js/md5'
import sha1 from './crypto-js/sha1'
import sha256 from './crypto-js/sha256'
import sha384 from './crypto-js/sha384'
import Long from './long'
const SECRET_TYPE = '4'
const prefix = util.toBase36(new Date().getTime(), 9)
const suffix = util.toBase36(util.randomInt(0, 78364164095), 7)

const headers = {

  'X-CLIENT-ID': function () {
    return util.getClientID()
  },

  'X-CLIENT-UA': function () {
    const systemInfo = uni.getSystemInfoSync()
    // 平台|系统版本|渠道|版本号|机型|网络类型
    return [
      systemInfo.platform,
      systemInfo.system,
      'unknown',
      'unknown',
      systemInfo.model,
      'unknown'
    ].join('|')
  },

  'X-CLIENT-TICKET': function () {
    return ''
  },

  'X-CLIENT-SID': function () {
    return `S_${prefix}${suffix}`
  },

  'X-CLIENT-APPID': function () {
    return 10
  },

  'X-B3-TRACEID': function () {
    const now = new Date()
    const prefix = helper.toBase36(now.getTime(), 9)
    const suffix = helper.toBase36(helper.randomInt(0, 78364164095), 7)
    return prefix + suffix
  },

  'X-CLIENT-TIME': function () {
    const now = new Date()
    return now.getTime()
  },

  'X-CLIENT-PAGE': function () {
    const pages = getCurrentPages()
    return (pages && pages.length > 0) ? pages[pages.length - 1].route : ''
  },

  'content-type': function () {
    // application/x-www-form-urlencoded
    return 'application/json'
  },
  'X-HN-JOB': function () {
    return 'If you see these message, I hope you dont hack us, I hope you can join us! Please visit https://www.cnhnkj.com/job.html'
  },
  'X-CLIENT-TIME': function () {
    const now = new Date()
    return String(now.getTime())
  },
  'X-CLIENT-NONCE': function () {
    return util.newUUID(true)
  }

}
export default {
  getOrginHeader (ctx) {
    const header = {}
    Object.keys(headers).forEach(key => {
      const headValue = headers[key]
      header[key] = headValue.apply(this)
    })
    return header
  },
  getSin (header = {}, config) {
    const _obscureNonce = md5(header['X-CLIENT-NONCE'] + sha1(SECRET_TYPE)).toString()
    const _obscureTimestamp = sha256(md5(SECRET_TYPE) + header['X-CLIENT-TIME']).toString()
    const _obscureDeviceId = sha1(header['X-CLIENT-ID'] + md5(header['X-CLIENT-NONCE']) + '(1o__o1)').toString()
    let md5Hex = sha384(sha256(header['X-CLIENT-TIME']) + 'I_l_1_L_l_1_1' + config.monkSecret).toString()
    md5Hex = md5Hex.substring(md5Hex.length - 16, md5Hex.length - 1)
    const _obscureSecret = Long.fromString(md5Hex, true, 16).toUnsigned().toString(10)
    const list = [_obscureTimestamp, _obscureDeviceId, _obscureSecret, _obscureNonce]
    const _obscure = list.reduce((pre, item) => {
      return pre + '!-_-!' + item
    })
    const sign = sha384(_obscure).toString()
    return sign
  },
  getHeaders (config) {
    const orgHeader = this.getOrginHeader() || {}
    orgHeader['X-CLIENT-SIGN'] = this.getSin(orgHeader, config)
    return orgHeader
  }
}
