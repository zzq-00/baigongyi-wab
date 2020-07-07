import { post, get } from 'axios'
// 直播回放
export default {
  liveHomeList: params => post('live/home/list', params),
  // Id查询详情
  liveHomeId: id => get(`live/home/${id}`),
  // 收藏直播列表
  liveHomeCollectionList: params => post('live/home/collectionList', params),
  // 点击播放按钮时调用，返回url
  livePlay: id => get(`live/${id}`),
}
