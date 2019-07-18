import Vue from 'vue'
import Router from 'vue-router'

import Main from './main'
import "less/public.less";

Vue.config.productionTip = false

Vue.use(Router)

const routes = [
  { path: '/user', name: 'User', component: Main, },
];

const router = new Router({
  mode: 'history',
  routes
})

new Vue({
  router
}).$mount('#app')