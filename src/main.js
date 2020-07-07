import '@babel/polyfill'
const Vue = require('vue') // 在externals下引入
const ElementUI = require('element-ui') // 在externals下引入
const videoPlayer = require('videoPlayer') // 在externals下引入
import Router from 'vue-router'
import dragVerify from 'vue-drag-verify'
import infiniteScroll from 'vue-infinite-scroll'  //无限滚动，评论的。因为和列表页无限滚动效果不一样。所以没用下边封装的
// import vuePayPwd from 'vue-pay-pwd' // 支付密码

import router from './router'
import store from './store'
import App from './App.vue'

import './permission'
import mixins from '@/mixins' // 引入混合

Vue.config.devtools = true;
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small' })
Vue.use(dragVerify)
Vue.use(videoPlayer)
Vue.use(Router)
Vue.use(infiniteScroll)
// Vue.use(vuePayPwd)
Vue.mixin(mixins);

// 当点击相同页面时防止报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 评论时间格式化过滤器
Vue.filter('commentDate', datetimes => {
  if(!datetimes) return;
  datetimes=parseInt(datetimes.toString().replace(/-/g, '/'));
  let datetime = new Date(datetimes).getTime()
  function timestampFormat(datetime) {
    let curTimestamp = new Date().getTime(); //当前时间戳
    let timestampDiff = curTimestamp - datetime; // 参数时间戳与当前时间戳相差秒数
    let leave1 = timestampDiff % (24 * 3600 * 1000); //相差小时数时间戳
    let disparityH = Math.floor(leave1 / (3600 * 1000)); //相差小时数转化为具体几个小时
    let curDate = new Date(curTimestamp); // 当前时间日期对象
    let tmDate = new Date(datetime);  // 参数时间戳转换成的日期对象, 评论的时间

    let Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
    let H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();
    if ((timestampDiff) / 1000 < 3600) {
      if (timestampDiff / 1000 / 60 < 1) {
        return '刚刚'
      } else {
        return Math.floor(timestampDiff / 1000 / 60) + "分钟前";
      }
    } else if (timestampDiff / 1000 >= 3600 && curDate.getFullYear() == Y && curDate.getMonth() + 1 == m && curDate.getDate() == d) {
      return disparityH + "小时前";
    } else if (curDate.getFullYear() == Y && curDate.getMonth() + 1 == m && curDate.getDate() - 1 == d) {
      return "昨天" + (H < 10 ? '0' + H : H) + ":" + (i < 10 ? '0' + H : i);
    } else if (curDate.getFullYear() == Y && (curDate.getMonth() + 1 != m || (curDate.getMonth() + 1 == m && curDate.getDate() - 1 != d))) {
      return (m < 10 ? '0' + m : m) + "-" + (d < 10 ? '0' + d : d)
    } else if (curDate.getFullYear() != Y) {
      return Y + "-" + (m < 10 ? '0' + m : m) + "-" + (d < 10 ? '0' + d : d)
    }
  }
  // 返回
  return timestampFormat(datetime)
})

// 时间格式化过滤器
Vue.filter('formatDate', (datetime, format) => {
  if (!datetime) return ''
  let date; // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  if (datetime.toString().length > 13) {
    const dateArr = datetime.replace(" ", "-").replace(/:/g, "-").split("-");
    date = new Date(dateArr[0], dateArr[1] - 1, dateArr[2], dateArr[3], dateArr[4], dateArr[5]);
  } else {
    date = new Date(datetime) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  }
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const sdate = ('0' + date.getDate()).slice(-2)
  const hour = ('0' + date.getHours()).slice(-2)
  const minute = ('0' + date.getMinutes()).slice(-2)
  const second = ('0' + date.getSeconds()).slice(-2)
  if (format === 'hasSecond') {
    return year + '-' + month + '-' + sdate + ' ' + hour + ':' + minute + ':' + second
  } else if (format === 'noTime') {
    return year + '-' + month + '-' + sdate
  }
  return year + '-' + month + '-' + sdate + ' ' + hour + ':' + minute
})
// 播放量、点赞、收藏数、圈子成员数格式化
Vue.filter('formatNumbers', num => num > 9999 ? Math.round(num / 10000) + '万' : num)
// 自定义指令，无限滚动
Vue.directive('scroll', {
  // 在指令第一次绑定到元素时调用，只会调用一次。可以在此钩子函数中，执行一次性的初始化设置。
  bind: function (el, binding, vnode) {
    el.scrollFunction = () => {
      const disabled = el.getAttribute('scroll-disabled')
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const innerHeight = window.innerHeight
      const clientHeight = document.body.clientHeight
      if (scrollTop + innerHeight >= clientHeight) {
        // 触发加载数据
        if (!disabled) binding.value()
      }
    }
    // 绑在window上，一个页面不能出现多个v-scroll
    window.addEventListener('scroll', el.scrollFunction)
  },
  unbind: function (el, binding, vnode) {
    window.removeEventListener('scroll', el.scrollFunction)
  }
})
