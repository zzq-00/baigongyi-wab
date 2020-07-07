import { post, get } from 'axios'

export default {
  tagList: () => post('tags/list'),
  // bizId查询
  tagId: id => get(`tags/${id}`),
  // 工程圈课程
  courseTag: params => post('tags/course/list', params),
  // 工程圈专栏
  columnTag: params => post('tags/column/list', params),
  //文章分页
  tagsArticleList: params => post('tags/article/list', params),
  //课程分页
  tagsCourseList: params => post('tags/course/list', params),
  //问答
  tagsQuestionList: params => post('tags/question/list', params),
  
}
