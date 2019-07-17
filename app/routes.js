const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: resolve => require(['./pages/HelloWorld'], resolve),
  },
  {
    path: '/user',
    name: 'User',
    component: resolve => require(['./pages/User'], resolve),
  },
  { 
    path: '*', 
    component: resolve => require(['./pages/NotFound'], resolve), 
  }
]
export default routes
