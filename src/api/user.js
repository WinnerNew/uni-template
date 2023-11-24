import { request } from "@utl/request";
import { formatParam } from "@utl/index";
// api举例
export function exampleApi(data) {
  return request.ajax({
    // 可传入全域名地址
    url: `http://192.168.1.2:9900/api-content/content/list?${formatParam(
      data
    )}`,
    // 可自定义请求头
    header: {
      Authorization: "Basic",
    },
    // 参照uni.request method字段参数  默认 'post'
    method: "POST",
    // 请求体数据
    data,
    // 是否显示loading状态 默认false
    showLoading: true,
    // 请求媒体类型 : json|form|自定义类型
    contentType: "json",
    repeat: true, // 可否重复发起该请求 默认false
    needExeAgain: 2, // 可重复请求的次数
    callback: (res) => {
      // 请求回调
      console.log("拦截数据", res);
    },
    mock: { data: [Array(10).fill({ name: "as" })] }, // mock数据
  });
}
