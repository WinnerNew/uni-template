// 请求参数加密
import aes from './crypto-js/aes'
import utf8 from './crypto-js/enc-utf8'
import ecb from './crypto-js/mode-ecb'
import pkcs7 from './crypto-js/pad-pkcs7'
// 环境变量
import config from '../config/index.js'
const JSEncrypt = require('./jsencrypt.min.js')

export default function (header = {}, data) {
  const isDev = config.env === 'dev'
  // 16位随机数
  const randomString = (n = 16) => {
    let result = ''
    const RANDOM_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = n; i > 0; --i) result += RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)]

    return result
  }
  const aes_key = randomString()

  //  RSA加密算法
  const encryptWithPublicKey = (toEncrypt) => {
    // 加密的公钥
    const RSA_PUBLIC_KEY = isDev ? ('-----BEGIN PUBLIC KEY-----\n' +
      'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC9I6X63YeFT833GhRZiD4zlF2X7wwdPZ2tkE4IH9wq3pf8F+du0c9CpJO41oD+/wp7taxbKGWXnolpcigrwWo6rn8I4j76V08PnXO1jT14lkfNdK3R4lEj67bl9tZN0z/47BqynS9jaQlX+eombcHDuaeH2ANxziEailEYZCsw3QIDAQAB\n' +
      '-----END PUBLIC KEY-----') : ('-----BEGIN PUBLI KEY-----\n' +
        'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDmJlSlC+d3zynTkBeAB49zcNSDJMFFi8nvRILkj1VSoTzv02km9jdBGZwkm63OhcqPUa7bEUxtuXJFGkQHbX8z5WKkt4S/7GEcHoG9UwLBFeSmH2YYqSKnMnHX1DvKJVEDMO1uGVmgylDExPKnBtsHD33E69Yptp/xv3D7ODHJxQIDAQAB\n' +
        '-----END PUBLI KEY-----')
    let destRsaStr = ''
    const encrypt = new JSEncrypt.default()
    encrypt.setPublicKey(RSA_PUBLIC_KEY)
    destRsaStr = encrypt.encrypt(toEncrypt)
    return destRsaStr
  }
  const base64Safe = (str = '') => {
    return String(str).replace(/\+/g, '-').replace(/\//g, '_')
  }
  const encrypt = (header, data = '') => {
    const message = JSON.stringify(data)
    // AES加密
    const ciphertext = base64Safe(aes.encrypt(message, utf8.parse(aes_key), {
      iv: '', // 填充量
      mode: ecb, // 模式
      padding: pkcs7 // 偏移量
    }).toString())
    // RSA
    const encryptKey = base64Safe(encryptWithPublicKey(aes_key))
    header['X-ENCRYPTED-KEY'] = encryptKey
    return {
      header,
      ciphertext
    }
  }

  return encrypt(header, data)
}
