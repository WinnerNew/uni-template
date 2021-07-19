// 目前没有针对uni的Fly版本，使用wx版本没有问题
import store from '@/store'
import Vue from 'vue'
// 项目配置参数
import config from '../config/index'
// USER_TICLET常量
import constants from './constants'

import HttpEncrypt from './http_encrypt_origin'

import HeaderFactory from './header'

const CONTENT_TYPE_MAP = {
  json: 'application/json',
  form: 'application/x-www-form-urlencoded'
}
function showError (msg) {
  uni.showToast({
    title: msg,
    icon: 'none',
    duration: 2000,
    mask: false
  })
}
function request (options) {
  options.method = options.method ? options.method : 'POST'
  options.url = options.url.includes('http') ? options.url : config.baseUrl + options.url
  options.contentType = options.contentType && options.contentType.includes('/') ? options.contentType : CONTENT_TYPE_MAP[(options.contentType || 'form').toLowerCase()]
  options.timeout = options.timeout || config.timeout
  // 惠农业务请求头设置
  const orgHeader = HeaderFactory.getHeaders(config)
  const ticket = constants.USER_TICLET
  orgHeader['X-CLIENT-TICKET'] = Vue.prototype.ticket || uni.getStorageSync(ticket)
  orgHeader['x-kdb-app-id'] = 'kd8_site'

  if (options.encrypt) {
    const encryptRes = new HttpEncrypt(options.headers, options.data)

    options.headers = Object.assign(encryptRes.header, options.headers)

    options.data = encryptRes.ciphertext
  }
  options.headers = {
    ...options.headers,
    ...orgHeader
  }
  return new Promise((resolve, reject) => {
    uni.request({
      url: options.url,
      method: options.method,
      timeout: options.timeout,
      header: {
        ...options.headers,
        'content-type': options.contentType
      },
      data: options.data,
      success: (res) => {
        if (res) {
          if (res.statusCode === 200) {
            if (res.data.code !== 0) {
              showError(res.data.msg)
              reject(res.data.msg)
              // if (options.isToastError) {
              // this.$ctx.toastError(resp.msg || '网络请求失败');
              // }
              // return this.$ctx.catchHttpError && this.$ctx.catchHttpError(resp, options)
            } else {
              // return this.$ctx.resolveHttpSuccess(resp, options);
              // return response.data
              if (options.all) {
                resolve(res.data)
              } else {
                resolve(res.data.data)
              }
            }
          } else {
            showError(res.errMsg)
            reject(res.errMsg)
          }
        } else {
          showError(res.data.msg)
          reject(res.data.msg)
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export default request
