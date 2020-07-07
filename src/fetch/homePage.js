import {get, post} from 'axios'

export default {
  // 收藏的回答
  CollectAnswer: params => post('homePage/myCollectAnswerList', params),
  // 收藏直播列表
  CollectLive: params => post('homePage/myCollectLiveList', params),
  // 收藏课程列表
  CollectCourse: params => post('homePage/myCollectCourseList', params),
  // 收藏专栏列表
  CollectColumn: params => post('homePage/collection/column', params),
  // 收藏文章列表
  CollectArticle: params => post('homePage/myCollectArticleList', params),
  //收藏的驿视频列表
  CollectYivideo: params => post("homePage/myCollectYivideoList",params),
  // 我关注的人
  myAttention: params => post('homePage/myConcernPersonList', params),
  // 关注我的人--粉丝
  myFans: params => post('homePage/concernMePersonList', params),
  // 关注的问题
  concernQuestion: params => post('homePage/concernQuestionList', params),
  // 我的想法
  myIdeaList: params => post('homePage/myIdeaList', params),
  // 我购买的--专栏
  getMybuyColumn: params => post('homePage/bought/column', params),
  // 我的讲堂--专栏
  getMyclassColumn: params => post('homePage/myColumnList', params),
  // 个人收藏信息
  userCollectCount: accountId => post(`homePage/myCollectInfos/${accountId}`),
  // 个人信息
  getUserInfo: accountId => post(`homePage/userInfo/${accountId}`),
  // 我的直播
  myLiveList: params => post('homePage/myLiveList', params),
  // 我的专栏下课程列表
  columnCourseList: params => post('homePage/column/course/list', params),
  homePageColumnList: (userId, params) => post('homePage/columnList/' + userId, params),
  //我的驿视频分页查询
  myVideoList: params => post("homePage/yivideo/list",params),
  //我的青豆分页查询
  myBeansList: params => post("beans/getBeanDetailRecord",params),
  //我的青豆分页查询
  getBeanTaskList: () => get('beans/getTaskCenterList'),
  //青豆签到
  beanSignIn: () => get('beans/signIn'),
}
