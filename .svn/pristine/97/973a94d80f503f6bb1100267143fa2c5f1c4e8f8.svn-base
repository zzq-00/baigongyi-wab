<template>
  <div class="my-group-home">
    <router-link to="/">
      <img :src="$store.state.userInfo.avatar?$store.state.imageDomain + $store.state.userInfo.avatar : require('@/assets/images/err-header-icon01.png')" alt="" width="100%" height="100%">
    </router-link>
    <div class="my-group-home-right">
      <h5>
        <router-link to="/engineering/myGroup">我的圈子主页</router-link>
      </h5>
      <ul class="clearfix">
        <li class="fl">
          <router-link to="/engineering/myGroup/published">发布 {{numData.publishCount}}</router-link>
        </li>
        <li class="fl">
          <router-link to="/engineering/myGroup/commented">评论 {{numData.commentCount}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'

export default {
  data() {
    return {
      numData: {}
    }
  },
  methods: {
    myMomentCount() {
      api.myMomentCount().then(res => {
        this.numData = res.data
      })
    }
  },
  created() {
    this.myMomentCount()
  }
}
</script>
<style lang="less" scoped>
.my-group-home {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  > a {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
  }
  .my-group-home-right {
    margin-left: 10px;
    > ul {
      margin-top: 8px;
      color: #666666;
      > li {
        padding-right: 8px;
        line-height: 0.8;
        & + li {
          padding-left: 8px;
          border-left: 1px solid #666666;
        }
      }
    }
  }
}
</style>
