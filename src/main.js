import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import i18n from '@/i18n';
import router from './router';
import store from './store';
import './utils/vee-validate';
import './filters';
import './components';

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
