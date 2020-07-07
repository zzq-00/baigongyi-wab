import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
  {
    path: '/index',
    redirect: '/'
  },
  {
    path: '/',
    name: 'index',
    component: () => import ('../views/index.vue')
  },
  {
    path: '/layout',
    component: () => import('../views/layout/layout.vue'),
    children: [
      {
        path: '/searchPage',
        component: () => import('../views/layout/searchPage.vue')
      },
    ]
  },
  {
    path: '/entryInterface',
    name: 'entryInterface',
    component: () => import('../views/entryInterface/entryInterface.vue'),
    children: [
      {
        path: '/login',
        component: () => import('../views/entryInterface/login.vue')
      },
      {
        path: '/register',
        component: () => import('../views/entryInterface/register.vue'),
        meta: {
          keepAlive: true
        },
      },
      {
        path: '/forgetPassword',
        component: () => import('../views/entryInterface/forgetPassword.vue')
      }, {
        path: '/userAgreement',
        component: () => import('../views/entryInterface/userAgreement.vue')
      }
    ]
  }
]

const routeFiles = require.context('.', false, /\.js$/)
routeFiles.keys().forEach(key => {
  if (key === './index.js') return
  routes = [
    ...routeFiles(key).default,
    ...routes
  ]
})

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ x: 0, y: 0 }), // 解决路由跳转时滚动条位置不变
  routes
})

// 解决点击重复路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

export default router
