import RequestHttp from "./request";
import cache from "@utl/cache";
// const provider = uni.getStorageSync("provider") || "weixin";
export const request = new RequestHttp({
  // 全局请求头
  globalHeader: {},
  /**
   * 全局请求拦截
   * @param {请求的参数} options
   * @returns 非对象或者false将终止请求发送
   */
  beforeCallback: function (options) {
    // 请求体加入
    options.header = {
      // 加入用户凭证
      AccessToken: cache.getToken(),
      // "SO-ID": "2006",
    };
    return options;
  },
  /**
   * 全局用户凭证过期回调
   * @param {请求响应数据} res
   * @returns 处理后的响应数据
   */
  goLoginCallback: function () {
    uni.clearStorageSync();
    uni.reLaunch({
      url: "/pages/login/index",
    });
    uni.hideHomeButton();
  },
  /**
   * 全局响应拦截
   * @param {请求响应数据} res
   * @returns 处理后的响应数据
   */
  afterCallback: function (res) {
    return Number(res.code) === 0 ? res.result : res;
  },
});
