/**
 * 驿视频
 */
export default [
  {
    path: '/yivideo',
    component: () => import('../views/layout/layout.vue'),
    children: [
      {
        path: 'recommend',
        component: () => import('../views/yivideo')
      },
      {
        path: 'microClassroom/:areaId',
        component: () => import('../views/yivideo/microClassroom')
      },
      {
        path: 'otherArea/:areaId',
        component: () => import('../views/yivideo/otherArea')
      },
      {
        path: 'publish',
        component: () => import('../views/yivideo/publish')
      },
      {
        path: 'publish/:id',
        component: () => import('../views/yivideo/publish')
      },
      {
        path: 'detail/:id',
        component: () => import('../views/yivideo/detail')
      },
      {
        path: 'search',
        component: () => import('../views/yivideo/search')
      },
      {
        path:'approving',
        component: ()=>import('../views/yivideo/approving')
      },
      {
        path:'creationProtocol',
        component: ()=>import('../views/yivideo/creationProtocol')
      },
      {
        path:'violationHandlerProtocol',
        component: ()=>import('../views/yivideo/violationHandlerProtocol')
      }
    ]
  }
]
