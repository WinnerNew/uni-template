<script>
export default {
  globalData: {
    titleBarHeight: 0, // titleBar高度 px
    statusBarHeight: 0, // statusBar高度 px
    osName: "", // 系统名称
    deviceType: "", // 设备类型
    systemInfo: null, // 系统信息
    agreement: false,
  },
  async onLaunch() {
    console.log("App Show");
    const res = await uni.getSystemInfo();
    const { titleBarHeight, statusBarHeight, osName, deviceType } = res[1];
    this.globalData.titleBarHeight = titleBarHeight;
    this.globalData.statusBarHeight = statusBarHeight;
    this.globalData.osName = osName.indexOf("ios") !== -1 ? "iOS" : "Android";
    this.globalData.deviceType =
      deviceType.indexOf("phone") !== -1 ? "MOBILE" : "IPAD";
    // 获取设备信息
    this.globalData.systemInfo = res[1];
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
@import "uview-ui/index.scss";
/* 自定义全局样式 */
@import url("@/static/css/index.scss");
* {
  cursor: pointer;
}
</style>
