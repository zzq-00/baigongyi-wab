/**
 * 驿视频
 */
export default [
  {
    path: '/getbeans',
    component: () => import('../views/layout/layout.vue'),
    children: [
      {
        path: '/',
        component: () => import('../views/getBeans')
      }
    ]
  }
]
