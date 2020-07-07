import { post, get, delete as deleteMethod } from 'axios'

/**
 * 讲堂
 */
export default {
  // 讲堂--课程
  getCourse: params => post('course/list', params),

  // 我购买的--课程
  getMybuyCourse: params => post('course/myPurchaseCourse/list', params),

  // 我的讲堂--课程
  getMyclassCourse: params => post('course/mycourse/list', params),

  // 课程详情
  getCourseDetail: id => get('course/' + id),

  // 保存课程
  saveCourse: params => post('course/save', params),

  // 发布课程
  publishCourse: params => post('course/publish', params),

  // 发布专栏下的课程
  publishForColumn: params => post('course/publishForColumn', params),

  // 保存专栏下的课程 草稿
  saveForColumn: params => post('course/saveForColumn', params),

  delCourse: id => post(`course/${id}`),

  // 下架课程
  downCourse: id => get(`course/undercarriageCourse/${id}`),

  // 专栏下课程排序
  sortCourse: params => post('/course/sortCourse', params),
}
