import { post, get, put } from 'axios'

export default {
  // 获取用户头像
  getAvatar: avatar => put(`user/account/uploadAvatar/${avatar}`),
  // 上传头像
  userAvatar: params => post('user/account/uploadAvatar', params),
  // 更新用户信息    更改除账号之外的用户信息
  updateUserInfo: params => put('user/info/updateUserInfo', params),
  //更改用户账号   账号只能改一次，单独接口
  updateUserName: (id,name) => get('user/account/updateUserName/'+id+'/'+name),
  // 注册
  register: params => post('user/account/regist', params),
  // 忘记密码
  forgetPwd: params => put('user/account/forgetPwd', params),
  // 检查手机号是否可用
  checkMobile: mobile => get(`user/account/checkMobile/${mobile}`),
  // 检查用户名是否可用
  checkUsername: params => post(`user/account/checkUserName`, params),
  // 更改密码
  accountChangePwd: params => put('user/account/changePwd', params),
  // 修改手机
  accountChangeMobile: params => put('user/account/changeMobile', params),
  // 绑定手机
  accountBindMobile: params => put('user/account/bindMobile', params),
  // 设置新的支付密码
  infoPaypassword: params => post('user/info/paypassword', params),
  // 获取当前用户的基本信息
  getLoggedInfo: () => get('user/info'),
  // 获取用户钱包信息
  getwallet: () => get('user/info/wallet'),
  // 检查昵称是否重复
  checkNickName: params => get('user/info/checkNickName/' + params),
}
