// 工程圈
import { post, get, delete as deleteMethod } from 'axios'
export default {
  // 创建圈子
  createGroup: params => post('group/createGroup', params),
  // 创建圈子之前的判断,有圈子处于审核中,禁止创建下一个圈子
  groupPredicate: memberId => get('group/groupPredicate/' + memberId),
  // 查询圈子分区
  regionList: params => post('group/regionList', params),
  // 查看我加入的圈子
  getJoiningGroups: params => post('group/getJoiningGroups', params),
  // 圈子列表
  getListByRegion: params => post('group/getListByRegion', params),
  // 圈子详情
  getGroupDetail: groupId => get('group/getGroupDetail/' + groupId),
  // 我的圈子最近浏览
  myRecentGroups: limit => get('group/home/myRecentGroups/' + limit),
  // 我发布的发言数、我评论的发言数
  myMomentCount: () => get('group/home/myMomentCount'),
  // 圈子公告
  groupAnnouncement: () => get('group/home/announcement'),
  // 查看圈子成员
  getMembersOfTheGroup: groupId => get('group/getMembersOfTheGroup/' + groupId),
  // 搜索圈子成员
  getMembersOfTheGroupSearch: (groupId, nickName) => get(`group/getMembersOfTheGroup/${groupId}/${nickName}`),
  // 获取最近加入的成员
  getRecentMembersOfTheGroup: (groupId, limit) => get(`group/getRecentMembersOfTheGroup/${groupId}/${limit}`),
  // 申请加入
  applyGroup: params => post('group/applyGroup', params),
  // 撤销申请
  delApplyInfo: infoId => get('group/delApplyInfo/' + infoId),
  // 获取申请列表
  getApplyInfo: params => post('group/getApplyInfo', params),
  // 处理加入圈子的申请
  handleApplying: params => post('group/handleApplying', params),
  // 解散圈子
  delGroup: groupId => get('group/delGroup/' + groupId),
  // 圈子主页全部发言/精选发言列表
  allMoments: params => post('group/allMoments', params),
  // 更换圈主
  changeLeader: params => post('group/changeLeader', params),
  // 禁言
  memberShutUp: params => post('group/memberShutUp', params),
  // 删除圈子成员
  delMember: params => post('group/delMember', params),
  // 我的发言列表
  myMoments: params => post('group/myMoments', params),
  // 发布圈子想法
  addMoment: params => post('group/addMoment', params),
  // 设为精选/取消设为精选
  momentToFeatured: params => post('group/momentToFeatured', params),
  // 精选发言置顶
  momentToFeaturedTop: params => post('group/momentToFeaturedTop', params),
  // 全部发言置顶
  momentToTop: params => post('group/momentToTop', params),
  // 删除发言
  delMoment: id => deleteMethod('group/moment/' + id),
  // 删除评论
  delGroupComment: id => deleteMethod('group/delComment/' + id),
  // 查看圈子瞬间详情
  getMomentDetail: momentId => get('group/getMomentDetail/' + momentId),
  // 圈子是否重名     true:没有重 false:重了
  groupNamePredicate: params => post('group/groupNamePredicate/', params),
  // 解散圈子按钮显示
  showDelGroupButton: groupId => get('group/delGroupButton/' + groupId),
  // 圈内发言
  groupsMoment: params => post('group/home/groupsMoment', params),
  // 编辑圈子
  addGroupRecord: params => post('group/addGroupRecord', params),
  // 获取圈子申请信息详情
  myGroupApplyRecord: applyId => get('group/myGroupApplyRecord/' + applyId),
}
