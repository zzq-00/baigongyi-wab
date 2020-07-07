const urlList = [
  {
    url: 'beans/signIn',
    text1: '签到成功',
    text2: '已获得beanNum青豆'
  },
  {
    url: 'user/account/uploadAvatar',
    text1: '上传头像成功',
    text2: '已获得beanNum青豆'
  },
  {
    url: 'user/info/updateUserInfo',
    text1: '完善个人资料成功',
    text2: '已获得beanNum青豆'
  },
  {
    url: 'article/saveOrUpdateArticle',
    text1: '文章发布成功',
    text2: '已获得beanNum青豆'
  },
  {
    url: 'group/createGroup',
    text1: '审核中',
    text2: '审核通过后，可获得beanNum青豆'
  },
  {
    url: 'group/addGroupRecord',
    text1: '审核中',
    text2: '审核通过后，可获得beanNum青豆'
  },
  {
    url: 'group/applyGroup',
    text1: '首次加入圈子成功',
    text2: '已获得beanNum青豆'
  },
  {
    url: 'idea/add',
    text1: '发布成功',
    text2: '已获得beanNum青豆'
  },
  {
    url: 'group/addMoment',
    text1: '发布成功',
    text2: '已获得beanNum青豆'
  },
  {
    url: 'question/saveOrUpdateQuestion',
    text1: '提问题成功',
    text2: '已获得beanNum青豆'
  },
  {
    url: 'questionAnswer/saveOrUpdateAnswer',
    text1: '回答问题成功',
    text2: '已获得beanNum青豆'
  },
  {
    url: 'commentRecord/add',
    text1: '评论成功',
    text2: '已获得beanNum青豆'
  },
  {
    url: 'like/add',
    text1: '点赞成功',
    text2: '已获得beanNum青豆'
  },
  {
    url: 'collectionRecord/add',
    text1: '收藏成功',
    text2: '已获得beanNum青豆'
  },
]

const whiteList = urlList.map(item => item.url)
// 是否显示奖励青豆弹框
export default function showBeansMessage(response) {
  if ($("#beans-message").length) return

  let url = response.config.url
  let data = response.data.data

  if (!whiteList.includes(url)) return

  let item = urlList.find(item => item.url === url)

  if (typeof data === 'number') {
    data > 0 && showTips(item.text1, item.text2.replace('beanNum', data))
  } else if (Object.prototype.toString.call(data) === '[object Object]') {
    if (data.hasOwnProperty('taskBean')) {
      data.taskBean > 0 && showTips(item.text1, item.text2.replace('beanNum', data.taskBean))
    } else if (data.hasOwnProperty('beansNumber')) {
      data.beansNumber > 0 && showTips(item.text1, item.text2.replace('beanNum', data.beansNumber))
    } else if (data.hasOwnProperty('beansNum')) {
      data.beansNum > 0 && showTips(item.text1, item.text2.replace('beanNum', data.beansNum))
    }
  }
}
function showTips(text1, text2) {
  let newElement = $(
    `<div id="beans-message" style="padding: 25px 77px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);background-color:rgba(27,27,27,0.8);color: #fff;border-radius:8px;text-align: center;">
      <p style="font-size: 16px;margin-bottom: 5px;">${text1}</p>
      <p>${text2}</p>
    </div>`
  )
  $('#app').append(newElement)
  setTimeout(() => {
    $("#beans-message").fadeTo("slow", 0.01, function () {
      $(this).remove()
    })
  }, 2000);
}
