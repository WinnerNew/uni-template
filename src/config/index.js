// process.env.NODE_ENV =>  production or development
const env = process.env.NODE_ENV === "production" ? "prod" : "uat";
// 基本api请求服务地址
const baseUrlMap = {
  dev: "http://baidu.com/", // 本地
  sit: "http://baidu.com/", // 内网测试
  prod: "http://baidu.com/", // 生产环境
};
// 神策埋点上报服务地址
const scUrlMap = {
  dev: "http://baidu.com/", // 本地
  sit: "http://baidu.com/", // 内网测试
  prod: "http://baidu.com/", // 生产环境
};
const imgURL = "https://oss-aliyuncs.com/"; // 图片服务地址
export default {
  env, // 环境
  baseUrl: baseUrlMap[env], // api请求地址
  scUrl: scUrlMap[env], // 神策上报地址
  imgURL, // 图片资源前缀地址
  timeout: 6000, // 请求超时时间
};
