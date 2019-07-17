import Vue from 'vue'
import Router from 'vue-router'

import App from './App'
import routes from './routes'
import "less/public.less";

Vue.config.productionTip = false

Vue.use(Router)

const router = new Router({
  routes
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})