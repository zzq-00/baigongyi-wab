import { post, get, delete as deleteMethod } from 'axios'

export default {
  // 收藏
  addCollect: params => post('collectionRecord/add', params),
  // 取消收藏
  cancelCollect: params => post('collectionRecord/cancelCollect', params),
  // 查询收藏
  getCollect: params => post('collectionRecord/list', params),
  // 删除收藏
  delCollect: delId => post(`collectionRecord/${delId}`),
  // 批量取消收藏
  batchCancelCollect: params => post('collectionRecord/batchCancelCollect', params),

}
