/**
 * 封装axios模块
 */
import axios from 'axios'
import { Message } from 'element-ui'
import showBeansMessage from "../mixins/showBeansMessage";

axios.defaults.timeout = 0
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/proxyHeader' : window.location.origin + '/api/'

// axios拦截器
axios.interceptors.request.use(
  config => {
    window.localStorage.token && (config.headers.Authentication = window.localStorage.token)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 不弹出错误的code码
const hideMessage = ['手机号已注册', '用户名已注册', '当前用户有创建的圈子未完成审核,不可创建下一个圈子']
const hideCode = [404, 403, 401, 400]
// 返回状态判断
axios.interceptors.response.use(
  response => {
    if (response.status === 200 && response.config.url === 'alipay/web') return response.data
    if (response.data && response.data.code !== 200) {
      if (!hideCode.includes(response.data.code) && !hideMessage.includes(response.data.message)) {
        Message.error(response.data.message)
      }
      if (response.data.code === 403) {
        // token非法或者要求登录  返回403
        setTimeout(() => {
          window.localStorage.clear()
          window.location.replace('/login?redirectUrl=' + window.location.href)
        }, 1000)
      } else if (response.data.code === 401) {
        // token过期  返回401
        if (window.localStorage.token.startsWith('noLogin.')) {
          refreshToken()
        } else {
          window.localStorage.clear()
          window.location.replace('/login?redirectUrl=' + window.location.href)
        }
      }
      return Promise.reject(response.data)
    }
    // 是否显示青豆奖励弹框
    showBeansMessage(response)
    return response.data
  },
  error => {
    return Promise.reject(error.message)
  }
)

async function refreshToken() {
  const { data } = await axios.post('refreshToken')
  window.localStorage.token = data.data || data
  window.location.reload()
}

let apiObject = {
  // refreshToken
  refreshToken: () => axios.post('refreshToken'),
  // 获取阿里云图片上传授权码
  aliyunConfig: () => axios.get('aliyun/config'),
  // 获取七牛视频上传token
  qiniuConfig: () => axios.get('qiniu/config'),
  // 获取oss资源域名
  resourceInfo: () => axios.get('resource/info'),
  // 支付宝付款
  alipayWeb: (params) => axios.post('alipay/web', params),
  // 微信付款
  wechatpayWeb: (params) => axios.post('wechatpay/web', params),
  // 检查支付状态
  getPaystatus: (orderId) => axios.get('paystatus/' + orderId),
  // 全站搜索
  getfullSearch: (params) => axios.post('fullSearch', params),
  // 首页
  getIndexPageData: () => axios.get('index'),
  // 首页轮播图
  getSliderData: () => axios.get('Slideshow/list?moduleType=1'),
}
// 自动导入当前文件夹下的文件内容，合并为一个Object。
// 不太好，以后放弃
const apiFiles = require.context('.', false, /\.js$/)
apiFiles.keys().forEach(key => {
  if (key === './index.js') return
  apiObject = {
    ...apiObject,
    ...apiFiles(key).default
  }
})

export default apiObject
