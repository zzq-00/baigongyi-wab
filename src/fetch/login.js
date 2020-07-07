import { post } from 'axios'

export default {
  // 密码登录
  passLogin: params => post('login', params),
  // 手机号登录
  mobileLogin: params => post('login/mobile', params),
}
