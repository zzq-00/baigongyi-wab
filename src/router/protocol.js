// app 注册协议
export default [
    {
      path: '/protocol/userRegist',
      component: () => import('../views/protocol/userRegist'),
    },
    {
        path: '/protocol/lecturerRegist',
        component: () => import('../views/protocol/lecturerRegist'),
    },
    {
        path: '/protocol/clause',
        component: () => import('../views/protocol/clause'),
    },
    {
        path: '/protocol/applePayDesc',
        component: () => import('../views/protocol/applePayDesc'),
    },
    {
        path: '/protocol/applePayHelp',
        component: () => import('../views/protocol/applePayHelp'),
    },
    {
        path: '/protocol/quanziProtocol',
        component: () => import('../views/protocol/quanziProtocol'),
    },
    {
      path: '/protocol/qingDouDirections',
      component: () => import('../views/protocol/qingDouDirections'),
    }
  ]
