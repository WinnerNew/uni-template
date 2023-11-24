import config from "@/config";
import cache from "@utl/cache";
import { getUser } from "@api/user";
export const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * 生成随机数
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @returns
 */
export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * 获取页面路由
 * @returns
 */
export const getPageRoute = (page) => {
  const route = page.route;
  const index = route.indexOf("?");
  const key = index === -1 ? route : route.substring(0, index);
  return key.startsWith("/") ? key.substring(1) : key;
};

/**
 * 获取页面栈的当前页数据
 * @returns
 */
export const getCurrentPage = () => {
  const pages = getCurrentPages(); // 获取加载的页面
  return pages[pages.length - 1];
};

/**
 * 获取页面栈的上一页数据
 * @returns
 */
export const getPrePage = () => {
  const pages = getCurrentPages(); // 获取加载的页面
  if (pages.length >= 2) {
    return pages[pages.length - 2];
  }
};

/**
 * 设置临时缓存
 * @param {*} key 键
 * @param {*} value 值
 * @param {*} key expire (过期时间，单位秒)
 * @returns
 */
export const hset = (key, value, expire = 0) => {
  // 过期时间转换
  let expireAt;
  if (expire > 0) {
    expireAt = new Date();
    expireAt.setSeconds(expireAt.getSeconds() + expire);
    expireAt = expireAt.getTime();
  } else {
    expireAt = -1;
  }
  return new Promise(function (resolve, reject) {
    wx.setStorage({
      key: key,
      data: {
        value,
        expireAt,
      },
      success: (data) => {
        resolve(data);
      },
    });
  });
};

/**
 * 获取临时缓存
 * @param {*} key 键
 * @returns
 */
export const hget = (key) => {
  const now = new Date().getTime();
  return new Promise(function (resolve, reject) {
    wx.getStorage({
      key: key,
      success: (res) => {
        const { value, expireAt = -1 } = res.data || {};
        if (expireAt === -1) {
          resolve(value);
        } else {
          if (now > expireAt) {
            // 过期
            resolve();
            // 删除数据
            wx.removeStorage({
              key: key,
              success: (res) => {},
            });
          } else {
            // 有效
            resolve(value);
          }
        }
      },
    });
  });
};

/**
 * 设置图片地址
 * @param {*} url
 * @returns
 */
export const setImgUrl = function (url) {
  if (!url) return "";
  if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(url)) {
    return url.indexOf("http") === 0 ? url : config.imgUrl + url;
  } else {
    return url.indexOf("http") === 0
      ? url
      : config.imgUrl + url + "?x-oss-process=image/quality,Q_60";
  }
};

/**
 * 隐藏手机号中间四位
 * @param {*} phone
 * @returns
 */
export const hidePhone = function (phone) {
  const reg = /^(\d{3})\d{4}(\d{4})$/;
  return phone.replace(reg, "$1****$2");
};

/**
 * [isDuringDate 比较当前时间是否在指定时间段内]
 * @DateTime 2019-08-21
 * @param  date  [beginDateStr] [开始时间]
 * @param  date  [endDateStr]  [结束时间]
 * @return  Boolean
 */
export const isDuringDate = function (beginDateStr, endDateStr) {
  const curDate = new Date();
  const beginDate = new Date(beginDateStr);
  const endDate = new Date(endDateStr);
  if (curDate < beginDate) {
    return true;
  }
  if (curDate > beginDate && curDate < endDate) {
    return true;
  }
  return false;
};

/**
 * [getCountdownTime 获取到指定日期倒计时天数]
 * @DateTime 2019-08-21
 * @param  date  [endDateStr]  [结束时间]
 * @return  str
 */
export const getCountdownTime = function (endDateStr) {
  const curTime = new Date();
  const endTime = new Date(endDateStr);
  const t = endTime.getTime() - curTime.getTime();
  const d = Math.floor(t / 1000 / 60 / 60 / 24);
  return `倒计时${d}天`;
};

/**
 * 预览图片
 * @param {*} urls  图片列表
 * @param {*} current 当前预览的图片
 * @returns
 */
export const preview = function (urls, current, key = "") {
  let urlList = [];
  let currentUrl = "";
  if (!key) {
    urlList = urls.map((el) => setImgUrl(el));
    currentUrl = setImgUrl(current);
  } else {
    urlList = urls.map((el) => setImgUrl(el[key]));
    currentUrl = setImgUrl(current[key]);
  }
  uni.previewImage({
    urls: urlList,
    current: currentUrl,
  });
};

/**
 *
 * @param {*} time
 * @returns
 */
export const timeFormat = function (time) {
  const arr = time.split("-");
  let timeStr = "";
  arr.forEach((item) => {
    timeStr ? (timeStr += item) : (timeStr = item);
  });
  return timeStr;
};

export const formatParam = function (params) {
  let parameter = "";
  for (const key in params) {
    parameter += `${key}=${params[key]}&`;
  }
  parameter = parameter.substr(0, parameter.length - 1);
  return parameter;
};

// 时间差转换为“几天前”或“几小时前”的格式
export const getTimeDiff = function (publishTime) {
  // 获取当前时间的时间戳
  const currentTime = new Date().getTime();
  // 将发布时间转换为时间戳
  publishTime = new Date(publishTime).getTime();
  // 计算时间差，单位为秒
  let timeDiff = (currentTime - publishTime) / 1000;
  // 将时间差转换为“几天前”或“几小时前”的格式
  if (timeDiff < 3600) {
    timeDiff = Math.ceil(timeDiff / 60) + "分钟前";
  } else if (timeDiff >= 3600 && timeDiff < 86400) {
    timeDiff = Math.ceil(timeDiff / 3600) + "小时前";
  } else {
    timeDiff = Math.ceil(timeDiff / 86400) + "天前";
  }
  // 返回转换后的时间差
  return timeDiff;
};

// 定义按字段排序的规则函数
export const sortBy = (name, sort) => {
  // console.log('name='+name+',sort='+sort);
  return function (o, p) {
    let a, b;
    if (typeof o === "object" && typeof p === "object" && o && p) {
      a = parseInt(o[name]);
      b = parseInt(p[name]);
      if (a === b) {
        return 0;
      }
      // 升序
      if (sort === "asc") {
        if (typeof a === typeof b) {
          return a < b ? -1 : 1;
        }
        return typeof a < typeof b ? -1 : 1;
      } else {
        if (typeof a === typeof b) {
          return a > b ? -1 : 1;
        }
        return typeof a > typeof b ? -1 : 1;
      }
    } else {
      throw new Error("error");
    }
  };
};

/**
 * 日期转换为 x月x号 x:x
 * @param {*} date
 * @returns
 */
export const rTime = (date) => {
  const jsonDate = new Date(date).toJSON();
  let time = new Date(+new Date(jsonDate) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, " ")
    .replace(/\.[\d]{3}Z/, "");
  time = time.split(" ");
  const time1 = time[0];
  const time2 = time[1];
  const timeArr1 = time1.split("-");
  const timeArr2 = time2.split(":");
  time =
    Number(timeArr1[1]) +
    "月" +
    Number(timeArr1[2]) +
    "号 " +
    timeArr2[0] +
    ":" +
    timeArr2[1];
  return time;
};

/**
 * 获取地址中指定参数
 * @param {获取参数的地址} url
 * @param {获取的参数} paramskey
 * @returns
 */
export const getParamFormUrl = (url, paramskey) => {
  const paramArr = url.slice(url.indexOf("?") + 1).split("&");
  const params = {};
  paramArr.forEach((param) => {
    const [key, val] = param.split("=");
    params[key] = decodeURIComponent(val);
  });
  return params[paramskey] || "";
};

/**
 * 版本检查，发现新版本重新启动刷缓存
 */
export const checkVersion = () => {
  // 应用版本更新
  const updateManager = uni.getUpdateManager(); // 小程序版本更新管理器
  updateManager.onCheckForUpdate((res) => {
    // 检测新版本后的回调
    if (res.hasUpdate) {
      // 如果有新版本提醒并进行强制升级
      uni.showModal({
        content: "新版本已经准备好，是否重启应用？",
        showCancel: false,
        confirmText: "确定",
        confirmColor: "#3e90fa",
        success: (res) => {
          if (res.confirm) {
            updateManager.onUpdateReady((res) => {
              // 新版本下载完成的回调
              updateManager.applyUpdate(); // 强制当前小程序应用上新版本并重启
            });

            updateManager.onUpdateFailed((res) => {
              // 新版本下载失败的回调
              // 新版本下载失败，提示用户删除后通过冷启动重新打开
              uni.showModal({
                content: "下载失败，请删除当前小程序后重新搜索打开",
                showCancel: false,
                confirmText: "我知道了",
              });
            });
          }
        },
      });
    }
  });
};

/**
 * 用户登录
 * @returns
 */
export const authLogin = () => {
  let provider;
  return new Promise((resolve, reject) => {
    // 获取服务供应商
    uni.getProvider({
      service: "oauth",
      success: (res) => {
        console.log("provider", res.provider);
        provider = res.provider[0];
        uni.setStorageSync("provider", provider);
        // 获取用户登录凭证code
        uni.login({
          provider,
          success: async (loginRes) => {
            // console.log('uniapp统一登录凭证',loginRes)
            uni.setStorageSync("code", loginRes.code);
            // 传递给后端获取userId/openId
            const params = {
              code: loginRes.code,
            };
            const { userInfo } = await getUser(params);
            cache.setUserInfo(userInfo);
            resolve(userInfo);
          },
        });
      },
    });
  });
};
