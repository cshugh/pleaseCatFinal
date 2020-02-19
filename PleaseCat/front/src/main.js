import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import moment from 'moment'
import infiniteScroll from "vue-infinite-scroll";
import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

window.Vue = Vue;
Vue.use(infiniteScroll);
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.config.productionTip = false

Vue.prototype.moment = moment

new Vue({
  router,
  store,
  beforeCreate(){
    this.$store.dispatch('checkToken');
  },
  vuetify,
  render: h => h(App)
}).$mount('#app')
