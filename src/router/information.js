/**
 * 消息中心
 */
export default [
  {
    path: '/layout',
    component: () => import('../views/layout/layout.vue'),
    children: [
      {
        path: '/information',
        component: () => import('../views/information/index.vue')
      },
    ]
  }
]
