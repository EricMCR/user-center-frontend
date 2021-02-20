import Vue from 'vue'
import App from './App.vue'
import router from '././router'
import store from '././store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import 'bulma/css/bulma.min.css'
import jsCookie  from 'js-cookie'
import request from './utils/request'

Vue.config.productionTip = false

Vue.use(Antd);

Vue.prototype.$cookie = jsCookie;
Vue.prototype.$request = request;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')