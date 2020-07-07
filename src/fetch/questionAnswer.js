import { post, get, delete as deleteMethod } from 'axios'

export default {
  // 问答右侧边栏
  getFavoriteUser: () => get('questionAnswer/getFavoriteUser'),
  // 回答列表
  answerList: params => post('questionAnswer/answerList', params),
  // 发布或修改回答
  saveOrUpdateAnswer: params => post('questionAnswer/saveOrUpdateAnswer', params),
  // 我/他收藏的回答，我/他回答列表
  getCollectAndAnswerList: params => post('questionAnswer/getCollectAndAnswerList', params),
  // 回答详情
  answerDetails: id => get(`questionAnswer/answerDetails/${id}`),
  // 删除回答
  deleteAnswer: id => post(`questionAnswer/deleteAnswer/${id}`),
}
