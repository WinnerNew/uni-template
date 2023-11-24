import config from "@/config";

const CONTENT_TYPE_MAP = {
  json: "application/json",
  form: "application/x-www-form-urlencoded",
};

function showError(msg) {
  uni.showToast({
    title: msg,
    icon: "none",
    duration: 2000,
    mask: false,
  });
}

function request(options) {
  let {
    showErrorToast = true,
    method = "POST",
    url = "",
    contentType = "",
    timeout = "",
    header = {},
    data = {},
  } = options || {};

  // 请求媒体类型
  contentType = {
    "content-type":
      contentType && contentType.includes("/")
        ? contentType
        : CONTENT_TYPE_MAP[(contentType || "form").toLowerCase()],
  };

  // 请求地址拼接
  url = url.includes("http") ? url : config.baseUrl + url;

  // 请求超时时间
  timeout = timeout || config.timeout;

  // 请求头汇总
  header = {
    ...header,
    ...contentType,
  };

  // 请求参数汇总
  const ajaxParams = {
    ...options,
    method,
    url,
    timeout,
    data,
    header,
  };

  return new Promise((resolve, reject) => {
    uni.request({
      ...ajaxParams,
      success: (res) => {
        // statusCode 请求状态码  datas 响应数据 code 接口响应码  msg 接口提示信息
        const {
          statusCode,
          data: datas,
          data: { code, msg = "" },
        } = res || {};
        // eslint-disable-next-line eqeqeq
        if (!res || statusCode !== 200 || code != 0) {
          showErrorToast && msg && showError(msg);
          reject(datas);
        } else {
          resolve(datas.data || datas);
        }
      },
      fail: (err) => {
        const errMsg = JSON.parse(JSON.stringify(err)).msg;
        errMsg === "request:fail timeout" && showError("请求超时，请稍后重试");
        reject(new Error({ code: -110, msg: errMsg }));
      },
    });
  });
}

// 从请求数组中删除请求
function deleteHttp(arr, tag) {
  const index = arr.findIndex((e) => e.tag === tag);
  arr.splice(index, 1);
  return arr;
}

// 更新请求数组中请求状态
function updateHttp(arr, tag) {
  const index = arr.findIndex((e) => e.tag === tag);
  arr[index].status = false;
  arr[index].count++;
  return {
    arr,
    index,
  };
}

class RequestHttp {
  constructor(param) {
    const {
      beforeCallback = "",
      afterCallback = "",
      goLoginCallback = "",
      globalHeader = {},
    } = param || {};
    this.beforeCallback = beforeCallback; // 调用前
    this.afterCallback = afterCallback; // 调用后
    this.goLoginCallback = goLoginCallback; // 未登录处理
    this.globalHeader = globalHeader; // 全局header
    this.https = [];
  }

  ajax(options) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      // needExeAgain 重发请求次数 0阻止重复请求
      const {
        method = "",
        url = "",
        callback = null,
        mock = null,
        needExeAgain = 0,
        showLoading = false,
        needRepeat = false,
        data = {},
        header = {},
      } = options;
      options.header = { ...header, ...this.globalHeader };
      const dataJson = data ? JSON.stringify(data) : "";
      const tag = method + url + dataJson; // 防重标识
      const index = this.https.findIndex((e) => e.tag === tag);
      // 防重复请求
      if (!needRepeat && index >= 0 && this.https[index].status) return;
      // 判断请求前置回调并执行
      this.beforeCallback &&
        typeof this.beforeCallback === "function" &&
        (options = this.beforeCallback(options));
      if (!options || typeof options !== "object") return;
      // 是否存在重复请求  存在将已存在请求的status状态标记为true  不存在将新的请求保存在请求缓存中
      index >= 0
        ? (this.https[index].status = true)
        : this.https.push({ tag, count: 0, status: true });
      try {
        // 判断显示loading
        showLoading &&
          uni.showLoading({
            title: "",
            mask: true,
          });
        let res =
          mock && process.env.NODE_ENV !== "production"
            ? await Promise.resolve(mock)
            : await request(options);
        // 调用完成删除该请求
        this.https = deleteHttp(this.https, tag);
        // 全局响应拦截
        this.afterCallback &&
          typeof this.afterCallback === "function" &&
          (res = this.afterCallback(res));
        // 自定义响应拦截
        callback && typeof callback === "function" && callback(res);
        showLoading && uni.hideLoading();
        // 返回请求结果
        resolve(res);
      } catch (err) {
        showLoading && uni.hideLoading();
        const { arr, index } = updateHttp(this.https, tag);
        this.https = arr;
        // 登录过期
        if (err.code === -401) {
          this.goLoginCallback && this.goLoginCallback();
          resolve({ msg: "need Login", code: -1 });
        } else {
          // 接口报错时重发请求
          needExeAgain &&
            this.https[index].count <= needExeAgain &&
            (await this.ajax({ options, callback, mock }));
          reject(err);
        }
      }
    });
  }
}

export default RequestHttp;
