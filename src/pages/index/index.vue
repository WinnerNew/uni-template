<template>
  <view class="content">
    HOME
    <view>
      <button type="default"
              @click="phoneLogin">手机号登录</button>
      <wxUserInfo class="wxUserBtn">微信授权登录</wxUserInfo>
      <button type="default"
              @click="userLoginOut">退出登录</button>
    </view>
  </view>
</template>

<script>
import { loginByPhone, loginOut } from '@/api/user'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import wxUserInfo from '../../component/wxUserInfo.vue'

export default {
  components: {
    wxUserInfo
  },
  data () {
    return {
      title: 'Hello'
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'token'])
  },
  onLoad () {
    const userId = this.userInfo.userId

    console.log(userId)
  },

  methods: {
    ...mapActions('user', { stateLoginOut: 'loginOut' }),
    async phoneLogin () {
      uni.login({
        success: async (res) => {
          const params = {
            mobile: '18599990001',
            smsCode: '0000',
            thirdCode: res.code
          }

          // 方案一:
          const userInfo = await loginByPhone(params)

          if (userInfo.userId) {
            this.$store.commit('user/SET_USERINFO', userInfo)

            this.$store.commit('user/SET_TOKEN', userInfo.ticket)

            uni.showToast({
              title: '登录成功'
            })
          }

          // 方案二:
          // const userInfo = await this.$store.dispatch("user/phonelogin", params);
          // if (userInfo.userId) {
          //   uni.showToast({
          //     title: "登录成功",
          //   });
          // }

          console.log(this.userInfo, this.token)
        }
      })
    },
    async userLoginOut () {
      // 方案一:
      await loginOut({ userId: this.userInfo.userId })

      this.$store.commit('user/SET_TOKEN', '')

      this.$store.commit('user/SET_USERINFO', {})

      // 方案二:
      // await this.stateLoginOut();
      uni.showToast({
        title: '退出登录成功',
        icon: 'none'
      })
    }
  }
}
</script>

<style>
.wxUserBtn {
  background: #07c160;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
button {
  margin: 200rpx;
}
</style>
