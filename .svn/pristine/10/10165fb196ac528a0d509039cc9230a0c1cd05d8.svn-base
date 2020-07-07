
// 用户名验证
export function validatorUser (srt) {
  const reg = /^([a-zA-Z0-9_\u4e00-\u9fa5]{4,20})$/
  return reg.test(srt)
}
export function validatorUserTel (srt) {
  const reg = /^[\w\\u4e00-\u9fa5]{4,20}$/
  return reg.test(srt)
}
// 手机号验证
export function validatorMobile (srt) {
  const reg = /^1[13456789]\d{9}$/
  return reg.test(srt)
}

// 密码验证（6-18位）
export function validatorPass (srt) {
  const reg =/^(?![0-9]+$)(?![a-zA-Z]+$)(?!_+$)[0-9a-zA-Z_]{6,20}$/
  // /^[a-zA-Z0-9]{6,20}$/
  return reg.test(srt)
}

// 验证码（6位）
export function validatorCode (srt) {
  const reg = /^\d{6}$/
  return reg.test(srt)
}
