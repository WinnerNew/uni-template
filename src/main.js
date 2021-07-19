import Vue from 'vue'
import App from './App'
import store from './store/index'
import config from './config/index'
// 项目配置
Vue.prototype.$config = config
// 事件总程
Vue.prototype.$EventBus = new Vue()

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
