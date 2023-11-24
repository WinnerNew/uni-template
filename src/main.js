import Vue from "vue";
import App from "@/App";
import cache from "@/utils/cache";
import config from "@/config";
import uView from "uview-ui";
// 神策配置
import sensors from "@utl/sensors/sensorsdata.autotrack.es6.min";
sensors.setPara({
  name: "sensors",
  show_log: false,
  server_url: config.scUrl,
  autoTrack: {
    appLaunch: true, // 是否采集 $MPLaunch 事件，true 代表采集，false 不采集。
    appShow: true, // 是否采集 $MPShow 事件，true 代表采集，false 不采集。
    appHide: true, // 是否采集 $MPHide 事件，true 代表采集，false 不采集。
    pageShow: true, // 是否采集 $MPViewScreen 事件，true 代表采集，false 不采集。
    mpClick: true, // 是否采集 $MPClick 事件，true 代表采集，false 不采集。
  },
});
sensors.registerApp({ product_platform: "平台名称" });
sensors.init();

Vue.use(uView);
Vue.prototype.$sensors = sensors;
Vue.prototype.$cache = cache;
Vue.prototype.$EventBus = new Vue();
Vue.prototype.$config = config;
Vue.config.productionTip = false;

App.mpType = "app";
const app = new Vue({
  ...App,
});
app.$mount();
