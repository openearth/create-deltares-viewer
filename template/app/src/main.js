import Vue from 'vue'
import VueCompositionAPI from "@vue/composition-api";
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import i18n from './i18n'
import './plugins/vue2MapboxGL';

Vue.use(VueCompositionAPI);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
