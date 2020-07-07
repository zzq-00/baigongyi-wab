import { post, get, delete as deleteMethod } from 'axios'

/**
 * 评论
 */
export default {
  // 评论列表
  getCommentList: params => post('commentRecord/list', params),
  // 新增评论
  addComment: params => post('commentRecord/add', params),
  // 更新评论
  updateComment: params => post('commentRecord', params),
  // id查询
  comment: id => get(`commentRecord/${id}`),
  // 删除评论
  delComment: delId => post(`commentRecord/${delId}`),

  //回复列表
  getReplyList: params => post('replyCommentRecord/list', params),
  //新增回复
  addReply: params => post('replyCommentRecord', params),
  //更新回复
  updateReply: params => put('replyCommentRecord', params),
  //id查询
  Reply: id => get(`replyCommentRecord/${id}`),
  //删除回复
  delReply: delId => deleteMethod(`replyCommentRecord/${delId}`),
}
