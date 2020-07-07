import router from '@/router'
import api from '@/fetch'
import store from '@/store'
import { Message } from 'element-ui'

const hasToken = !!window.localStorage.token
const hasLogged = hasToken && !window.localStorage.token.startsWith('noLogin.')

if (hasLogged) {
  api.getLoggedInfo().then(res => { store.commit('setUser', res.data) })
} else {
  store.commit('setUser', '')
}

router.beforeEach(async (to, from, next) => {
  if (!hasToken) {
    const { data: token } = await api.refreshToken()
    window.localStorage.token = token
  }
  if (!store.state.videoDomain || !store.state.imageDomain || !store.state.originalVideoDomain) {
    const { data: { qiniu: videoDomain, aliyun: imageDomain, qiniuOriVideo: originalVideoDomain } } = await api.resourceInfo()
    window.localStorage.imageDomain = imageDomain
    store.commit('setDomain', { videoDomain, imageDomain, originalVideoDomain })
  }
  // realName讲师名，不存在说明该用户未认证讲师
  if (hasLogged && !store.state.userInfo.wasTeacher) {
    if (to.meta.roles && to.meta.roles.includes('teacher')) {
      return Message.error('您还不是讲师')
    }
  }
  next()
})
