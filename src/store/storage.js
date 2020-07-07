/**
 * 该模块存放本地存储方法
 */

export const getItem = name => {
  if (name === 'userInfo' && (!window.localStorage.token || window.localStorage.token.startsWith('noLogin.'))) {
    return { accountId: '', userName: '', nickName: '', avatar: '', mobile: '' }
  }
  return JSON.parse(window.localStorage.getItem(name))
}

export const setItem = (name, value) => {
  window.localStorage.setItem(name, JSON.stringify(value))
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
