/// <reference types="@types/office-js"/>
import Vue from 'vue'
import App from '@/App.tsx'
import './registerServiceWorker'
import router from './router'
import AntDesignVue from 'ant-design-vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Buefy)

import {i18n} from "@/lang";

import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;
Vue.use(AntDesignVue);

try {
  Office.onReady(async context => context)
}catch (e) {
  console.log(e)
}
export default new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');
