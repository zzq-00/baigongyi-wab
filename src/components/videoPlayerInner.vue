<template>
  <div>
    <video-player
      v-if="loaded"
      ref="videoPlayer"
      class="video-player vjs-custom-skin"
      :playsinline="true"
      :options="playerOptions"
      @play="onPlayerPlay($event)"
      @timeupdate="onPlayerTimeupdate($event)"
      @ready="onPlayerReady($event)"
    />
  </div>
</template>
<script>
import api from "@/fetch";

export default {
  props: {
    videoVal: Object,
    // 是否需要记录播放进度
    playHistoryFlag: Boolean,
    objId: String,
    objType: String
  },
  watch: {
    videoVal: {
      handler: function(val) {
        if (val.playerURL || val.poster) {
          // 视频封面
          this.playerOptions.poster = val.poster;
          // 视频地址
          this.playerOptions["sources"][0]["src"] = val.playerURL;
          if (val.playerURL && val.playerURL.includes(".m3u8")) {
            this.playerOptions["sources"][0]["type"] = "application/x-mpegURL";
          } else {
            this.playerOptions["sources"][0]["type"] = "video/mp4";
          }
          this.loaded = true;
        }
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      loaded: false,
      durations: 0,
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "", // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "" // url地址
          }
        ],
        hls: true,
        poster: "", // 你的封面地址
        width: document.documentElement.clientWidth, // 播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }
    };
  },
  mounted() {
    // 如果需要记录播放进度，添加页面刷新或关闭监听方法，记录当前播放进度
    if(this.playHistoryFlag) {
      // 添加窗口关闭或刷新监听
      window.addEventListener('unload', this.playHistory);
    }
    // 滚动条回到顶部
    document.scrollingElement.scrollTop = 0;
  },
  destroyed() {
    // 如果需要记录播放进度，添加页面刷新或关闭监听方法，记录当前播放进度
    if(this.playHistoryFlag) {
      // 销毁前记录播放进度
      this.playHistory();
      // 组件销毁移除监听
      window.removeEventListener('unload', this.playHistory);
    }
  },
  methods: {
    // 监听播放
    onPlayerPlay(e) {
      this.$emit("videoPlay")
    },
    // 当前播放位置发生变化时触发
    onPlayerTimeupdate(e) {
      // 向上取个整
      this.durations = Math.ceil(e.cache_.currentTime);
    },
    // 播放器准备就绪时触发
    onPlayerReady(e) {
      // 未登录时不获取
      if(!this.$store.state.userInfo.accountId) return;
      // 获取历史播放进度
      api.getYivideoPlayHistory(this.objId, this.objType).then(res => {
        // 存在历史播放进度
        if(res.code == 200) {
          // 恢复播放进度。如果保存的进度 >= 当前视频的总时长，说明上次已经播放到最后了，这次应该从头开始
          e.currentTime(res.data.duration >= e.player_.cache_.duration ? 0 : res.data.duration);
        }
      })
      .catch(err => {
        // 没有播放历史时接口会返回404，这里catch住是为了让控制台不打印错误
      })
    },
    // 记录播放进度方法
    playHistory() {
      const accountId = this.$store.state.userInfo.accountId;
      // 登陆状态 && 需要记录播放进度记录 && 当前播放进度大于0
      if(accountId && this.playHistoryFlag && this.durations > 0) {
        let params = {
          accountId: accountId,
          duration: this.durations,
          objId: this.objId,
          objType: this.objType
        }
        // ***这里必须使用同步请求，否则请求无法发送到后台***
        let xhr = new XMLHttpRequest();
        let baseUrl = process.env.NODE_ENV === 'development' ? '/proxyHeader' : window.location.origin + '/api/'
        xhr.open("POST", baseUrl +"/videoPlayHistory", false);
        xhr.setRequestHeader("Authentication", localStorage.getItem("token"));
        xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(params));
      }
    }
  },
};
</script>
<style lang="less" scoped>
/deep/ .video-player {
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>
