<template>
  <div class="myLive">
    <div class="title">{{isOwn?'我的直播':'他的直播'}}</div>
    <p class="tips" v-if="isOwn">提示：直播回放暂不支持编辑及下架</p>
    <div class="content">
      <Live></Live>
    </div>
  </div>
</template>

<script>
import Live from '@/components/Live'
export default {
  name: 'MyLive',
  components: {
    Live
  },
  computed: {
    isOwn() {
      if (this.$route.query.id) {
        return this.$route.query.id === this.$store.state.userInfo.accountId
      }
      return true
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.myLive {
  .title {
    padding: 0px 20px;
    height: 30px;
    line-height: 30px;
    background-color: #fff3f3;
    color: #e23732;
    font-size: 12px;
  }
  .tips {
    background: #fff;
    height: 13px;
    line-height: 13px;
    font-size: 12px;
    color: rgba(226, 55, 50, 1);
    padding: 11px 0 0 20px;
  }
  .content {
    background-color: #fff;
  }
}
</style>
