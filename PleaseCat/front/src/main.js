import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
 window.Vue = Vue;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate(){
    this.$store.dispatch('checkToken');
  },
  vuetify,
  render: h => h(App)
}).$mount('#app')
