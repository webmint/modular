import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';
import vuetify from './plugins/vuetify';
import './plugins/vuelidate';
import '@babel/polyfill';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
