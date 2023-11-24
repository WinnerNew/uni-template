import { setImgUrl } from "@/utils";

export default {
  // 分享微信好友
  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内分享按钮
      console.log(res.target);
    }
    return {
      title: this.shareInfo.title,
      imageUrl: setImgUrl(this.shareInfo.imgrul),
      success: function (res) {
        this.shareBack && this.shareBack();
      },
    };
  },
  // 分享朋友圈
  onShareTimeline(res) {
    if (res.from === "button") {
      // 来自页面内分享按钮
      console.log(res.target);
    }
    return {
      title: this.shareInfo.title,
      imageUrl: setImgUrl(this.shareInfo.imgrul),
      success: function (res) {
        this.shareBack && this.shareBack();
      },
    };
  },
};
