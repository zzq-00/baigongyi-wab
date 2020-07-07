/**
 * 文章
 */
export default [
  {
    path: '/article',
    component: () => import('../views/layout/layout.vue'),
    children: [
      {
        path: 'publishArticle',
        name: 'publishArticle',
        component: () => import('../views/article/publishArticle.vue')
      },
      {
        path: 'reEditArticle/:id',
        name: 'reEditArticle',
        component: () => import('../views/article/publishArticle.vue')
      },
      {
        path: 'list',
        component: () => import('../views/article/list.vue')
      },
      {
        path: 'list/:id',
        component: () => import('../views/article/detail.vue')
      }
    ]
  }
]
