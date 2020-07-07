// 分享
export default [
  {
    path: '/share/hotNews',
    component: () => import('../views/share/hotNews'),
  },
  {
    path: '/share/idea',
    component: () => import('../views/share/idea'),
  },
  {
    path: '/share/article',
    component: () => import('../views/share/article'),
  },
  {
    path: '/share/question',
    component: () => import('../views/share/question'),
  },
  {
    path: '/share/answer',
    component: () => import('../views/share/answer'),
  },
  {
    path: '/share/circle',      //分享圈子主页
    component: () => import('../views/share/circle'),
  },
  {
    path: '/share/circleDetails',      //分享圈子详情
    component: () => import('../views/share/circleDetails'),
  },
]
