import Vue from 'vue'
import Router from 'vue-router'

import Main from './main'
import Detail from './detail'
import "less/public.less";

Vue.config.productionTip = false

Vue.use(Router)

const routes = [
  { path: '/home', name: 'Main', component: Main, },
  { path: '/home/detail', name: 'Detail', component: Detail, },
];

const router = new Router({
  mode: 'history',
  routes
})

new Vue({
  router
}).$mount('#app')