const Router  = require('koa-router')
const router = Router()

// 前端路由
const pages = [
  '/home',
  '/user',
];

router.get('/home*',  async (ctx, next) => {
  await ctx.render('home');
});

router.get('/user*',  async (ctx, next) => {
  await ctx.render('user');
});


module.exports = router