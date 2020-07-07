<template>
  <div class='videoPlayer'>
    <el-dialog :visible.sync="videoVal.dialogTableVisible" :before-close="closeDialog" :close-on-click-modal="false" :close-on-press-escape="false">
      <video-player :key="videoVal.dialogTableVisible" ref="videoPlayer" class="video-player vjs-custom-skin" :playsinline="true" :options="playerOptions" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    videoVal: Object
  },
  watch: {
    videoVal: {
      handler: function(val) {
        if(val.playerURL) {
          this.playerOptions['sources'][0]['src'] = val.playerURL
          if (val.playerURL && val.playerURL.includes('.m3u8')) {
            this.playerOptions['sources'][0]['type'] = 'application/x-mpegURL'
          } else {
            this.playerOptions['sources'][0]['type'] = 'video/mp4'
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      playerOptions: {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: '', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: '' // url地址
          }
        ],
        hls: true,
        poster: '', // 你的封面地址
        width: document.documentElement.clientWidth, // 播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }
    }
  },
  mounted() {},
  methods: {
    // 弹窗关闭 视频暂停
    closeDialog(done) {
      this.$refs.videoPlayer.player.pause()
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style lang="less" scoped>
.videoPlayer {
  .video-player {
    display: inline-block;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 100px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  }
}
</style>
