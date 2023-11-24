import constants from "./constants";
export default {
  // 操作缓存中得token
  getToken() {
    return uni.getStorageSync(constants.USER_TICLET) || "";
  },
  setToken(token) {
    return uni.setStorageSync(constants.USER_TICLET, token);
  },
  removeToken() {
    return uni.removeStorageSync(constants.USER_TICLET);
  },
  // 操作缓存中得用户信息
  getUserInfo() {
    return uni.getStorageSync(constants.USER_INFO) || {};
  },
  setUserInfo(userInfo) {
    return uni.setStorageSync(constants.USER_INFO, userInfo);
  },
  removeUserInfo() {
    return uni.removeStorageSync(constants.USER_INFO);
  },
};
