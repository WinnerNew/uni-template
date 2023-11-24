<template>
  <view class="page">
    <button style="background: red" @click="open">测试</button>
    <a-modal ref="modal" />
  </view>
</template>

<script>
export default {
  methods: {
    open() {
      this.$refs.modal.open({
        title: "隐私声明",
        content: "创金合信基金管理有限公司（以下称“创金合信”或“我们”）...",
        cancelText: "拒绝",
        confirmText: "同意",
        confirm: () => {},
        cancel: () => {},
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding-top: 200rpx;
}
</style>
