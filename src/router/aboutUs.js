/**
 * 关于我们
 */
export default [
  {
    path: "/layout",
    component: () => import("../views/layout/layout.vue"),
    children: [
      {
        path: "/introduce", //百工驿介绍
        component: () => import("../views/aboutUs/introduce.vue")
      },
      {
        path: "/contactUs", //百工驿介绍
        component: () => import("../views/aboutUs/contactUs.vue")
      }
    ]
  }
];
