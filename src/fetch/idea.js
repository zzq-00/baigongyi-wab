// 工程圈
import { post, get, delete as deleteMethod } from 'axios'
export default {
  // 分页查询
  getIdeaList: params => post('idea/list', params),
  // Id查询想法详情
  getIdeaById: id => get(`idea/${id}`),
  // Id删除想法
  deleteIdeaById: id => post(`idea/${id}`),
  // 最赞用户
  ideaBestLikePeople: () => get('idea/bestLikePeople'),
  // 新增
  ideaAdd: params => post('idea/add', params),

}
