/**
 * 讲堂
 */
export default [
  {
    path: '/layout',
    component: () => import('@/views/layout/layout.vue'),
    children: [
      {
        path: '/lectureRoom',
        component: () => import('@/views/lectureRoom/lectureRoom.vue')
      }, {
        path: '/courseDetail/:id',
        component: () => import('@/views/lectureRoom/detail/courseDetail.vue')
      }, {
        path: '/columnDetail/:id',
        component: () => import('@/views/lectureRoom/detail/columnDetail.vue')
      },
      {
        path: '/teacherHome/:id',
        component: () => import('@/views/lectureRoom/teacherHome/teacherHome.vue')
      }
    ]
  }
]
