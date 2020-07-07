import { post, get } from 'axios'

export default {
  // 下单
  Order: params => post('order', params),
  // 支付订单
  payOrder: (orderId, payPassword) => get(`order/pay?orderId=${orderId}&payPassword=${payPassword}`),
  // 查询订单
  OrderId: id => get(`order/${id}`),
}
