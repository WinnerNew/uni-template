<template>
  <view>
    <web-view
      src="http://127.0.0.1:5500/public/index.html"
      bindmessage="getMessage"
    ></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      url: "",
    };
  },
  getMessage(e) {},
  onLoad(options) {
    console.log(options);
    // 如果带入参数是空则使用全局的webUrl
    this.url = decodeURIComponent(options.url || getApp().globalData.webUrl);
  },
};
</script>

<style></style>
