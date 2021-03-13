import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./plugins/element.js";
import "@/assets/css/reset.css";
import "@/assets/font/iconfont.css";

Vue.config.productionTip = false;

/* eslint-disable */
if (process.env.NODE_ENV === 'development') {
  require('./mock'); //要写NODE_ENV,要用commonjs规范
  // import '@/mock';
}
/* eslint-enable */

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
