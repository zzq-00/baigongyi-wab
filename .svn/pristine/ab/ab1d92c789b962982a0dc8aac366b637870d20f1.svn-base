import { post, get } from 'axios'

export default {
  tagList: () => post('tags/list'),
  // 流水明细
  walletDetailList: params => post('wallet/detailList', params),
  // 流水明细
  withdrawalDetail: objId => get(`wallet/withdrawalDetail/${objId}`),
  // 点击【提现】按钮时返回相关信息
  withdrawal: () => get(`wallet/withdrawal`),
  //提现申请
  withdrawalApply: params => post('wallet/withdrawal', params),
}
