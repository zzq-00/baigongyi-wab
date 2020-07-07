var browser = {
  isAndroid: function () {
    return navigator.userAgent.match(/Android/i) ? true : false;
  },
  isMobileQQ: function () {
    var ua = navigator.userAgent;
    return /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(ua) || /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(ua);
  },
  isIOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
  },
  isWx: function () {
    return navigator.userAgent.match(/micromessenger/i) ? true : false;
  },
  isChrome: function () {
    return (navigator.userAgent.match(/Chrome\/([\d.]+)/) || navigator.userAgent.match(/CriOS\/([\d.]+)/)) ? true : false;
  },
  isBaidu: function () {
    return navigator.userAgent.match(/baidubrowser/i) ? true : false;
  },
  isUC: function () {
    return navigator.userAgent.match(/UCBrowser/i) ? true : false;
  },
  isSafari: function () {
    return navigator.userAgent.match(/safari/i) ? true : false;
  },
  isQQBrowser: function () {
    return navigator.userAgent.match(/MQQBrowser/i) ? true : false;
  },
  isWeibo: function () {
    return navigator.userAgent.match(/weibo/i) ? true : false;
  },
  isAlipay: function () {
    return navigator.userAgent.match(/Alipay/i) ? true : false;
  }
}

function formatDate(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}

export function convertDate(val) {
  if (!val) return;
  let date;
  if (val.toString().length > 13) {
    let dateArr = val.replace(" ", "-").replace(/:/g, "-").split("-");
    date = new Date(dateArr[0], dateArr[1] - 1, dateArr[2], dateArr[3], dateArr[4], dateArr[5]);
  } else {
    date = new Date(val);
  }

  let minute = 60 * 1000;// 1分钟
  let hour = 60 * minute;// 1小时
  let isSameMonth = new Date().getMonth() == date.getMonth(); //同一个月
  let isCurrentDay = new Date().getDate() == date.getDate(); //是否同一天
  let isYesterday = isSameMonth && (new Date().getDate() - date.getDate() == 1);//是否昨天
  let isYesterdayBefore = (new Date().getMonth() > date.getMonth())
    || (new Date().getMonth() == date.getMonth() && new Date().getDate() - date.getDate() > 1);//是否前天和之前
  let isCurrentYear = new Date().getFullYear() == date.getFullYear(); //是否同年
  let diff = new Date().getTime() - date.getTime();
  if (!isCurrentYear) {//去年的
    return formatDate("YYYY-mm-dd", date);
  } else if (isYesterdayBefore && isCurrentYear || (diff < 0)) {//今年的但是大于两天了
    return formatDate("mm-dd HH:MM", date);
  } else if (isYesterday) {//昨天
    return "昨天" + formatDate("HH:MM", date);
  } else if (isCurrentDay && diff > hour) {//今天且大于一小时
    return "今天" + formatDate("HH:MM", date);
  } else if (isCurrentDay && diff > minute) {//今天且一小时内
    return parseInt(diff / minute) + "分钟前";
  } else if (diff < minute) {
    return "刚刚";
  }
}

// app内打开
export function openApp() {
  // Android 微信不支持schema唤醒，必须提前加入腾讯的白名单
  // 百度浏览器会拦截schema，所以直接跳下载页
  // QQ,weobo 内也直接跳转下载页
  var schemaStr = "start";
  var protocal = "bgy";
  var failBack = "http://android.myapp.com/myapp/detail.htm?apkName=com.tztech.peer&ADTAG=mobile";
  if (browser.isWx() || browser.isBaidu() || (browser.isIOS() && browser.isMobileQQ())
    || (browser.isIOS() && browser.isAlipay()) || browser.isWeibo() || browser.isQQBrowser()) {
    // alert("is wx or do not support schema");
    schemaStr = failBack;
  } else if (browser.isChrome() && browser.isAndroid() && browser.isUC() === false && browser.isQQBrowser() === false) {
    // 如果是安卓chrome浏览器，则通过intent方式打开；UC/QQ浏览器被识别为chrome，排除之
    // alert("is chrome or support intent");
    schemaStr = 'intent://' + schemaStr + '#Intent;' +
      'scheme=' + protocal + ';' +
      'package=' + ';' +
      'category=' + 'android.intent.category.DEFAULT' + ';' +
      'action=' + 'android.intent.action.VIEW' + ';' +
      'S.browser_fallback_url=' + encodeURIComponent(failBack) + ';' +
      'end';
  } else {
    // alert("is support schema");
    schemaStr = protocal + '://' + schemaStr;
    var t = Date.now();
    setTimeout(function () {
      if (Date.now() - t < 2200) {
        // alert("is browser and not install");
        schemaStr = failBack;
        window.location.href = schemaStr;
      }
    }, 500);
  }
  window.location.href = schemaStr;
}

export function share(conf) {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
    appId: conf.appId, // 必填，公众号的唯一标识
    timestamp: conf.timestamp, // 必填，生成签名的时间戳
    nonceStr: conf.nonceStr, // 必填，生成签名的随机串
    signature: conf.signature,// 必填，签名，见附录1
    jsApiList: [
      "updateAppMessageShareData",//“分享给朋友”及“分享到QQ”
      "updateTimelineShareData",//“分享到朋友圈”及“分享到QQ空间”
      "onMenuShareWeibo",//“分享到腾讯微博”
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
  wx.ready(function () {
    wx.updateAppMessageShareData({ //“分享给朋友”及“分享到QQ”
      title: conf.wechat_title,
      desc: conf.wechat_desc,
      link: conf.url,
      imgUrl: conf.wechat_images0,
      success: function () { //分享成功回调
      },
      fail: function () { //分享失败回调
      }
    });
    wx.updateTimelineShareData({ //“分享到朋友圈”及“分享到QQ空间”
      title: conf.wechat_title,
      desc: conf.wechat_desc,
      link: conf.url,
      imgUrl: conf.wechat_images0,
      success: function () { //分享成功回调
      },
      fail: function () { //分享失败回调
      }
    });
    wx.onMenuShareWeibo({ //“分享到腾讯微博”
      title: conf.wechat_title,
      desc: conf.wechat_desc,
      link: conf.url,
      imgUrl: conf.wechat_images0,
      success: function () { //分享成功回调
      },
      fail: function () { //分享失败回调
      }
    });
  });
  wx.error(function (res) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  });

  /*钉钉分享*/
  dd.ready(function () {
    dd.biz.navigation.setRight({
      show: true,       //控制按钮显示， true 显示， false 隐藏， 默认true
      control: true,    //是否控制点击事件，true 控制，false 不控制， 默认false
      text: '更多',       //控制显示文本，空字符串表示显示默认文本
      onSuccess: function (result) {
        //如果control为true，则onSuccess将在发生按钮点击事件被回调
        dd.biz.util.share({
          type: 0,    //分享类型，  0:全部组件 默认； 1:只能分享到钉钉； 2:不能分享，只有刷新按钮
          url: conf.url,
          title: conf.wechat_title,
          content: conf.wechat_desc,
          image: conf.wechat_images0,
          onSuccess: function () {
          },
          onFail: function (err) {
          }
        })
      },
      onFail: function (err) {
        //失败时会执行此函数
      }
    });
  });
}
