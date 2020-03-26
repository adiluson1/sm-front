import Vue from 'vue'
import App from '@/App.tsx'
import './registerServiceWorker'
import router from './router'
import AntDesignVue from 'ant-design-vue'

import {i18n} from "@/lang";

import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;
Vue.use(AntDesignVue);


new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');
