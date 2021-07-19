<template>
  <view class="user-info-container">
    <button v-if="hasLogin"
            type="default"
            @click="saveUserInfo">
      <slot></slot>
    </button>
    <button v-else
            type="default"
            open-type="getPhoneNumber"
            @getphonenumber="getPhoneNumber">
      <slot></slot>
    </button>
  </view>
</template>




<script>
import { getLogin, loginByUser } from '@/api/user'
export default {
  name: "UserInfoBtn",
  data () {
    return {
      hasLogin: false,
      accessToken: "",
      userInfo: {},
    };
  },
  created () {
    console.log(this.hasLogin);





    this.initLogin();
  },
  methods: {
    async initLogin () {
      const res = (await uni.login()) || [];
      const code = res[1].code;
      getLogin({ code })
        .then((res) => {
          this.userInfo = res;
          this.hasLogin = true;
          this.saveUserInfo();
        })
        .catch((err) => {
          // 新用户
          if (err.code === 711201) {
            this.hasLogin = false;
            this.accessToken = err.data;
          }
        });
    },
    async getPhoneNumber (res) {
      const { encryptedData, iv } = res.detail || {};
      if (!encryptedData || !iv) {
        return uni.showToast({
          title: "请授权登录",
          icon: "none",
        });
      }
      const params = {
        accessToken: this.accessToken,
        encryptedData,
        iv,
      };
      this.userInfo = await loginByUser(params);
      this.saveUserInfo();
    },
    saveUserInfo () {
      console.log(this.userInfo);
      this.$store.commit("user/SET_USERINFO", this.userInfo);
      this.$store.commit("user/SET_TOKEN", this.userInfo.ticket);
      // uni.showToast({
      //   title: "微信授权登录成功",
      //   icon: "none",
      // });
    },
  },
};
</script>

<style>
.user-info-btn::after {
  border: 0;
}

.user-info-btn {
  background-color: transparent;
  line-height: 0;
  padding: 0;
  font-size: 0;
}
</style>
