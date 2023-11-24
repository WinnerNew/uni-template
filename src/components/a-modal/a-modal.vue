<template>
  <!-- 基础弹窗 -->
  <uni-popup
    ref="popup"
    type="center"
    :maskClick="false"
    :is-mask-click="false"
    :animation="false"
    @change="change"
  >
    <view class="pop">
      <view class="pop_content">
        <view class="content">
          <!-- 标题 -->
          <view class="title" v-if="option.title">
            {{ option.title }}
          </view>
          <!-- 内容 -->
          <view class="text">
            <slot><view v-html="option.content"></view></slot>
          </view>
        </view>
      </view>
      <!-- 底部按钮 -->
      <view class="pop_foot">
        <!-- 取消 -->
        <template v-if="option.cancelText">
          <navigator
            v-if="option.exit"
            class="btn cancel"
            open-type="exit"
            target="miniProgram"
            >{{ option.cancelText }}</navigator
          >
          <view class="btn cancel" @click="cancel" v-else>{{
            option.cancelText
          }}</view>
        </template>
        <!-- 确定 -->
        <template v-if="option.confirmText">
          <button
            v-if="option.type === 'authorize'"
            class="btn confirm"
            open-type="getAuthorize"
            scope="phoneNumber"
            @getAuthorize="confirm"
          >
            {{ option.confirmText }}
          </button>
          <button
            v-if="option.type === 'phone'"
            class="btn confirm"
            open-type="getAuthorize"
            scope="phoneNumber"
            @getAuthorize="confirm"
          >
            {{ option.confirmText }}
          </button>
          <button
            v-if="option.type === 'phone'"
            class="btn confirm"
            open-type="getAuthorize"
            scope="phoneNumber"
            @getAuthorize="confirm"
          >
            {{ option.confirmText }}
          </button>
          <view class="btn confirm" @click="confirm" v-else>
            {{ option.confirmText }}
          </view>
        </template>
      </view>
    </view>
  </uni-popup>
</template>

<script>
// 默认配置
const defaultOption = {
  title: "",
  content: "",
  confirmText: "",
  cancelText: "",
  confirm: () => {},
  cancel: () => {},
};

export default {
  props: {
    show: Boolean,
  },
  data() {
    return {
      option: {},
    };
  },
  methods: {
    change(e) {
      this.$emit("update:show", e.show);
    },
    // 打开
    open(opt) {
      console.log(1);
      setTimeout(() => {
        const option = defaultOption;
        Object.keys(opt).forEach((key) => {
          if (opt[key] === false) return;
          option[key] = opt[key];
        });
        this.option = option;
        this.$refs.popup.open(option.type);
        this.$emit("open");
      }, 300);
    },
    // 关闭
    close() {
      this.$refs.popup.close();
      this.$emit("close");
    },
    // 确认
    confirm() {
      if (!this.option.type) {
        this.confirmCallBack();
        return;
      }
      switch (this.option.type) {
        case "phone":
          uni.getPhoneNumber({
            success: (e) => {
              this.confirmCallBack(e);
            },
            fail: (res) => {
              this.cancel(res);
            },
          });
          break;
        case "idNumber":
          uni.getIDNumber({
            success: (e) => {
              this.confirmCallBack(e);
            },
            fail: (res) => {
              this.cancel(res);
            },
          });
          break;
        case "auth":
          break;
      }
    },
    // 拒绝
    cancel(res) {
      this.cancelCallBack(res);
    },
    // 确认回调
    confirmCallBack(e) {
      this.$emit("confirm");
      this.close();
      this.$nextTick(() => {
        this.option.confirm &&
          typeof this.option.confirm === "function" &&
          this.option.confirm.call(this, e);
      });
    },
    // 拒绝回调
    cancelCallBack(e) {
      this.$emit("cancel");
      this.close();
      this.$nextTick(() => {
        this.option.cancel &&
          typeof this.option.cancel === "function" &&
          this.option.cancel.call(this, e);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pop {
  width: 562rpx;
  min-height: 336rpx;
  background: #ffffff;
  border-radius: 18rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &_content {
    min-height: 100rpx;
    width: 100%;
    padding: 50rpx 28rpx 44rpx 28rpx;
    box-sizing: border-box;
    .content {
      .title {
        font-size: 36rpx;
        font-weight: 600;
        color: #222222;
        text-align: center;
        font-family: PingFangSC-Semibold, PingFang SC;
      }
      .text {
        margin-top: 30rpx;
        font-size: 28rpx;
        color: #4a4a4a;
        line-height: 40rpx;
        font-weight: 400;
        overflow-y: scroll;
        max-height: 660rpx;
      }
    }
  }
  &_foot {
    display: flex;
    box-sizing: border-box;
    .btn {
      width: 50%;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      font-size: 32rpx;
      border: 0;
      border-radius: 0;
    }
    .confirm {
      font-weight: 500;
      border-left: 0.5px solid #cecede;
      border-top: 0.5px solid #cecede;
      color: #ff8865;
      font-weight: bold;
      background-color: rgba(255, 255, 255, 0);
    }
    .cancel {
      font-weight: 500;
      color: #666666;
      border-top: 0.5px solid #cecede;
    }
  }
}
</style>
