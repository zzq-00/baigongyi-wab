import { post, get, put } from 'axios'
// 用户中心讲师入驻
export default {
  // 申请成为讲师
  lecturerData: params => post('lecturer', params),

  lecturerUpdata: params => put('lecturer', params),
  // 讲师
  getTeacher: params => post('lecturer/list', params),
  // 讲师--id查询
  getTeacherDetail: id => get(`lecturer/${id}`),
  // 登录查询自己的讲师信息
  myLecturerInfo: () => get('homePage/myLecturerInfo'),
  //查询讲师信息是否填写完整  
  infoWasComplete: id => post(`lecturer/infoWasComplete/${id}`,{})
}
