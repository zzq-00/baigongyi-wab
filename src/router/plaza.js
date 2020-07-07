/**
 * 广场
 */
export default [
  {
    path: '/layout',
    component: () => import('../views/layout/layout.vue'),
    children: [
      {
        path: '/plaza',
        component: () => import('../views/plaza/plaza.vue')
      }
    ]
  }
]
