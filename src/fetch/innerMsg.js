/**
 * 站内信
 */
import { post, get, delete as deleteMethod } from 'axios'
export default {
  // 站内信列表
  innerMsgList: (type, params) => post('innerMsg/list/' + type, params),
  // 站内信已读
  innerMsgReaded: id => post('innerMsg/readed/' + id),
  // 站内信删除
  innerMsgDelete: id => post('innerMsg/' + id),
  // 未读数量
  innerMsgUnreadCount: type => post('innerMsg/unreadCount/' + type),
}
