import { post, delete as deleteMethod } from 'axios'
/**
 * 点赞
 */
export default {
  // 点赞
  likeAdd: params => post('like/add', params),
  // 取消点赞
  likeDelete: (bizType, id) => post(`like/delete/${bizType}/${id}`),
}
