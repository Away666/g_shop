import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store/index.js'
import TypeNav from '@/components/TypeNav'
import './mock/mockServe'
import 'swiper/css/swiper.css'
import * as API from '@/api'

import {
  MessageBox
} from 'element-ui'

import VueLazyLoad from 'vue-lazyload'

//引入表单校验插件
import "@/plugins/validate";

Vue.config.productionTip = false
// 注册全局组件
Vue.component(TypeNav.name, TypeNav)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.use(VueLazyLoad, {
  loading: require('@/assets/images/b3.png')
})

new Vue({
  render: h => h(App),
  // 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$api = API;
  },
  router,
  store
}).$mount('#app')