import { post, get, delete as deleteMethod } from 'axios'

export default {
  // 发布或者修改问题
  saveOrUpdateQuestion: params => post('question/saveOrUpdateQuestion', params),
  // 问答列表
  getQuestionList: params => post('question/getQuestionList', params),
  // 问题详情
  questionDetails: id => get(`question/questionDetails/${id}`),
  // 删除问题
  deleteQuestion: id => post(`/question/deleteQuestion/${id}`),
  // 我/他关注的问题，我/他提问列表
  getFollowAndQuestionList: params => post('question/getFollowAndQuestionList', params),
}
