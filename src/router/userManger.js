export default [
  {
    path: '/layout',
    component: () => import('@/views/layout/layout.vue'),
    children: [
      {
        path: '/myReplyDetails/:id',
        component: () => import('@/views/userCenter/myHome/myReplyDetails.vue')
      },
      {
        path: '/userCenter',
        redirect: '/myHome/myReply',
        component: () => import('@/views/userCenter/userCenter.vue'),
        children: [
          {
            path: '/myHome',
            redirect: '/myHome/myReply',
            component: () => import('@/views/userCenter/myHome/myHome.vue'),
            children: [
              {
                path: 'myReply',
                name: 'myReply',
                component: () => import('@/views/userCenter/myHome/myReply.vue'),
              },
              {
                path: 'myQuestion',
                name: 'myQuestion',
                component: () => import('@/views/userCenter/myHome/myQuestion.vue')
              },
              {
                path: 'myArticle',
                name: 'myArticle',
                component: () => import('@/views/userCenter/myHome/myArticle/index.vue'),
                children: [
                  {
                    path: 'publishArt',
                    name: 'publishArt',
                    component: () => import('@/views/userCenter/myHome/myArticle/publishArt.vue')
                  },
                  {
                    path: 'draftArt',
                    name: 'draftArt',
                    component: () => import('@/views/userCenter/myHome/myArticle/draftArt.vue')
                  },
                ]
              },
              {
                path: 'myIdea',
                name: 'myIdea',
                component: () => import('@/views/userCenter/myHome/myIdea.vue')
              },
              {
                path: 'myLive',
                name: 'myLive',
                component: () => import('@/views/userCenter/myHome/myLive.vue')
              },
              {
                path: 'myCollect',
                name: 'myCollect',
                component: () => import('@/views/userCenter/myHome/myCollect.vue')
              },
              {
                path: 'myAttention',
                name: 'myAttention',
                component: () => import('@/views/userCenter/myHome/myAttention.vue')
              },
              {
                path: 'myYiVideo',
                name: 'myYiVideo',
                component: () => import('@/views/userCenter/myHome/myYiVideo.vue')
              }
            ]
          },
          {
            path: '/myWallet',
            component: () => import('@/views/userCenter/myWallet/myWallet.vue')
          },
          {
            path: '/myBean',
            component: () => import('@/views/userCenter/myBean/myBean.vue')
          },
          {
            path: '/myBuy',
            component: () => import('@/views/userCenter/myBuy/myBuy.vue')
          },
          {
            path: '/myLive',
            component: () => import('@/views/userCenter/myLive/myLive.vue')
          },
          {
            path: '/myVideo',
            component: () => import('@/views/userCenter/myVideo/index.vue')
          },
          {
            path: '/myLecture',
            component: () => import('@/views/userCenter/myLecture/myLecture.vue')
          },
          { // 创建专栏
            path: '/myLecture/editColumn',
            name: 'createColumn',
            meta: {
              roles: ['teacher']
            },
            component: () => import('@/views/userCenter/myLecture/editColumn.vue')
          },
          { // 创建专栏
            path: '/myLecture/editColumn/:id',
            name: 'reEditColumn',
            meta: {
              roles: ['teacher']
            },
            component: () => import('@/views/userCenter/myLecture/editColumn.vue')
          },
          // 创建课程
          {
            path: '/myLecture/editCourse',
            name: 'createCourse',
            meta: {
              roles: ['teacher']
            },
            component: () => import('@/views/userCenter/myLecture/editCourse.vue')
          },
          { // 编辑 课程
            path: '/myLecture/editCourse/:id',
            name: 'reEditCourse',
            meta: {
              roles: ['teacher']
            },
            component: () => import('@/views/userCenter/myLecture/editCourse.vue')
          },
          { // 课程管理
            path: '/myLecture/courseMessage/:id',
            name: 'courseMessage',
            meta: {
              roles: ['teacher']
            },
            component: () => import('../views/userCenter/myLecture/courseMessage.vue')
          },
          {
            path: '/applyTeacher/agreement',
            component: () => import('@/views/userCenter/myTeacher/agreement.vue')
          },
          {
            path: '/applyTeacher/fillInMessage',
            component: () => import('@/views/userCenter/myTeacher/fillInMessage.vue')
          },
          {
            path: '/applyTeacher/messageSbmit',
            component: () => import('@/views/userCenter/myTeacher/messageSbmit.vue')
          },
          {
            path: '/applyTeacher/examineIng',
            component: () => import('@/views/userCenter/myTeacher/examineIng.vue')
          },
          {
            path: '/applyTeacher/seeInformation',
            meta: {
              roles: ['teacher']
            },
            component: () => import('@/views/userCenter/myTeacher/seeInformation.vue')
          },
          {
            path: '/safetySet',
            component: () => import('@/views/userCenter/safeSet/safetySet.vue')
          },
          {
            path: '/personalData',
            component: () => import('@/views/userCenter/personalData/personalData.vue')
          },
          {
            path: '/editPersonal/:id',
            component: () => import('@/views/userCenter/personalData/editPersonal.vue')
          }
        ]
      },
      { // 预览课程
        path: '/previewCourse',
        name: 'previewCourse',
        component: () => import('../views/userCenter/myLecture/previewCourse.vue')
      },
      { // 预览专栏
        path: '/previewColumn',
        name: 'previewColumn',
        component: () => import('../views/userCenter/myLecture/previewColumn.vue')
      },
      {//安全设置 更改成功
        path: '/modifiedSuccess',
        name: 'modifiedSuccess',
        component: () => import('@/views/userCenter/safeSet/modifiedSuccess.vue')
      },
      {//支付密码 确认密码
        path: '/paySubmitPassword',
        name: 'paySubmitPassword',
        component: () => import('@/views/userCenter/safeSet/paySubmitPassword.vue')
      },
      {//修改支付密码
        path: '/modifyPayPassword',
        name: 'modifyPayPassword',
        component: () => import('@/views/userCenter/safeSet/modifyPayPassword.vue')
      },
      {//修改密码 第二步
        path: '/changePassword',
        name: 'changePassword',
        component: () => import('@/views/userCenter/safeSet/changePassword.vue')
      },
      {//我的钱包-流水明细
        path: '/flowingWater',
        name: 'flowingWater',
        component: () => import('@/views/userCenter/myWallet/flowingWater.vue')
      },
      {//我的钱包-提现详情
        path: '/withdrawDeatils/:id',
        name: 'withdrawDeatils',
        component: () => import('@/views/userCenter/myWallet/withdrawDeatils.vue')
      },
      { // 我的钱包-充值
        path: '/myWallet/recharge',
        component: () => import('@/views/userCenter/myWallet/recharge.vue')
      },
      {//我的钱包-提现
        path: '/myWallet/withdrawal',
        name: 'withdrawal',
        component: () => import('@/views/userCenter/myWallet/withdrawal.vue')
      },
    ],
  }
]
