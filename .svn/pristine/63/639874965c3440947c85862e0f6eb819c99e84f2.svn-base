/**
 * 热点资讯
 */
export default [
  {
    path: '/layout',
    component: () => import('../views/layout/layout.vue'),
    children: [
      {
        path: '/hotmessage',
        component: () => import('../views/hotMessage/hotMessage.vue'),
      },
      {
        path: '/hotmessage/:id',
        component: () => import('../views/hotMessage/newsHotDetails.vue')
      }
    ]
  }
]
