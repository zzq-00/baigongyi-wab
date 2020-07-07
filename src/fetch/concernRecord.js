import { post, get, delete as deleteMethod } from 'axios'

export default {
  // 新增关注
  addAttention: params => post('concernRecord/add', params),
  // 查询
  getAttention: params => post('concernRecord/list', params),
  // 取消关注
  delAttention: params => post('concernRecord/cancelConcern', params),
}
