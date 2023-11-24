import config from "@/config";
// 图片生成正确的地址
export const reSetImg = (info, ...theArgs) => {
  theArgs.forEach((key) => {
    if (!info[key]) return "";
    if (info[key].indexOf("http") !== 0) {
      console.log(config.imgUrl + info[key]);
      return config.imgUrl + info[key];
    } else {
      console.log(info[key]);
      return info[key];
    }
  });
};
