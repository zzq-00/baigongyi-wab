<template>
  <div id="app">
    <!-- <router-view /> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :key="updataKey"></router-view>
    <el-dialog class="idea-dialog" :visible.sync="ideaDialogVisible" width="660px" :before-close="handleClose" :close-on-press-escape="false" :close-on-click-modal="false">
      <h4 slot="title" class="idea-title">写想法</h4>
      <ideaPublishCom @publishFinish="handleClose" />
    </el-dialog>
    <div v-if="!excludeRouter.includes($route.path)" id="onlineService">
      <!-- <img src="@/assets/images/kefupic.png" alt=""> -->
      <div class="kefupic"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ideaPublishCom from '@/components/ideaPublishCom'
export default {
  components: {
    ideaPublishCom
  },
  data() {
    return {
      updataKey: 1,
      excludeRouter: ['/appsearch', '/protocol', '/share', '/download', '/mEditor', '/liveBox']
    }
  },
  computed: mapState(['ideaDialogVisible']),
  methods: {
    ...mapMutations(['setIdeaDialog']),
    handleClose(done) {
      this.setIdeaDialog(false)
      // done是before-close的回调，当publishFinish调用该函数时，done为undefined
      if (!done && this.$route.path != '/engineering') return this.$router.push('/engineering')
      // 在工程圈页面使用该弹框发布想法后，列表数据要重新加载
      if (!done) this.updataKey++
    }
  },
  created() {
    this.$store.dispatch('getInformationCount')
  }
}
</script>

<style lang="less" scoped>
.idea-dialog {
  .idea-title {
    font-size: 16px;
    text-align: center;
  }
  /deep/ .el-dialog__body {
    padding: 0 20px 20px;
  }
}
</style>
<style lang="less">
// 下拉菜单样式
.el-popover {
  box-sizing: border-box;
  box-shadow: 0px 0px 10px 0px rgba(166, 171, 167, 0.35);
  .menus {
    margin: -12px;
    font-size: 14px;
    color: #333;
    > p {
      height: 44px;
      line-height: 44px;
      cursor: pointer;
      text-align: center;
    }
    > li {
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
    > p:hover,
    > li:hover {
      background-color: rgb(252, 235, 235);
      color: rgb(232, 95, 91);
    }
    a {
      display: inline-block;
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding: 0 10px;
      box-sizing: border-box;
    }
  }
  .menu-info {
    margin: -12px;
    box-shadow: 0px 0px 10px 0px rgba(166, 171, 167, 0.35);
    li {
      height: 49px;
      line-height: 49px;
      color: #333333;
      font-size: 14px;
      position: relative;
      text-align: center;
      .counts {
        position: absolute;
        height: 15px;
        line-height: 15px;
        padding: 0 6px;
        background: #fd4040;
        border: 1px solid rgba(255, 255, 255, 1);
        border-radius: 7px;
        top: 12px;
        font-size: 12px;
        color: #fff;
      }
    }
    li + li {
      border-top: 1px solid #eeeeee;
    }
    li:hover {
      background-color: rgb(252, 235, 235);
      color: rgb(232, 95, 91);
      cursor: pointer;
    }
  }
}
#onlineService {
  cursor: pointer;
  position: fixed;
  right: 50px;
  bottom: 100px;
  width: 40px;
  height: 40px;
  .kefupic {
    width: 100%;
    height: 100%;
    background-image: url('./assets/images/kefupic.png');
  }
}
/deep/.main-chat {
  bottom: 80px;
}
</style>
