/**
 * 工程圈
 */
export default [
  {
    path: '/layout',
    component: () => import('../views/layout/layout.vue'),
    children: [
      // 想法
      {
        path: '/engineering',
        component: () => import('../views/engineeringCircle/engineering.vue')
      },
      // 创建圈子
      {
        path: '/engineering/createGroup',
        component: () => import('../views/engineeringCircle/createGroup.vue')
      },
      // 再次申请圈子
      {
        path: '/engineering/createGroup/:id',
        component: () => import('../views/engineeringCircle/createGroup.vue')
      },
      // 查看申请创建圈子详情
      {
        path: '/engineering/viewGroupApply/:id',
        component: () => import('../views/engineeringCircle/viewGroupApply.vue')
      },
      // 圈子列表
      {
        path: '/engineering/groupList',
        component: () => import('../views/engineeringCircle/groupList.vue')
      },
      // 我的圈子
      {
        path: '/engineering/myGroup',
        redirect: '/engineering/myGroup/joined',
        component: () => import('../views/engineeringCircle/myGroup/index.vue'),
        children: [
          // 申请创建圈子
          {
            path: 'applyGroup',
            component: () => import('../views/engineeringCircle/myGroup/applyGroup.vue')
          },
          // 申请加入
          {
            path: 'applyJoin',
            component: () => import('../views/engineeringCircle/myGroup/applyJoin.vue')
          },
          // 我加入的
          {
            path: 'joined',
            component: () => import('../views/engineeringCircle/myGroup/joined.vue')
          },
          // 我管理的
          {
            path: 'managed',
            component: () => import('../views/engineeringCircle/myGroup/managed.vue')
          },
          // 我管理的
          {
            path: 'managed/:id',
            component: () => import('../views/engineeringCircle/myGroup/managedWithId.vue')
          },
          // 我发布的
          {
            path: 'published',
            component: () => import('../views/engineeringCircle/myGroup/published.vue')
          },
          // 我评论的
          {
            path: 'commented',
            component: () => import('../views/engineeringCircle/myGroup/commented.vue')
          },
        ]
      },
      // 圈子主页
      {
        path: '/engineering/groupHome',
        components: {
          fullScreen: () => import('../views/engineeringCircle/groupHome/index.vue')
        },
        children: [
          // 圈子主页
          {
            path: ':id',
            name: 'groupIdeaHome',
            component: () => import('../views/engineeringCircle/groupHome/groupWithId.vue')
          },
          // 圈子成员
          {
            path: ':id/groupMember',
            component: () => import('../views/engineeringCircle/groupHome/groupMember.vue')
          },
        ]
      },
      // 想法详情
      {
        path: '/engineering/:id',
        name: 'ideaDetail',
        component: () => import('../views/engineeringCircle/ideaDetail.vue')
      },
      // 想法详情
      {
        path: '/engineering/groupIdea/:id',
        name: 'groupIdeaDetail',
        component: () => import('../views/engineeringCircle/ideaDetail.vue')
      },
    ]
  }
]
