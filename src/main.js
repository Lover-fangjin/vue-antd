import Vue from 'vue'
import App from './App.vue'


//引入ant-design-vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from './router'
Vue.use(Antd)
Vue.config.productionTip = false

// axios请求
import api, { ajaxPromise } from './api/index';
import baseUrl from './components/baseUrl.vue'

// 全局事件容器
Vue.prototype.$api = api;
Vue.prototype.$ajax = ajaxPromise;
Vue.prototype.baseUrl = baseUrl.baseUrl;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
