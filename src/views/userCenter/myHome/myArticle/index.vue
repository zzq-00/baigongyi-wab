<template>
  <div class="myArticle">
    <div class="title font-12">
      <router-link :to="isOwn?'/myHome/myArticle/publishArt':'/myHome/myArticle/publishArt?id='+$route.query.id">已发布</router-link>
      <router-link to='/myHome/myArticle/draftArt' v-if="isOwn">草稿箱</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import api from '@/fetch'
export default {
  name: 'myArticle',
  computed: {
    isOwn() {
      if (this.$route.query.id) {
        return this.$route.query.id === this.$store.state.userInfo.accountId
      }
      return true
    }
  },
  data() {
    return {
      releasedTotal: 0,
      draftTotal: 0,
      params: {
        asc: false,
        orderBy: 'publish_time', // watch_count阅读量排序  publish_time发布时间排序
        pageNum: 1,
        pageSize: 1,
        paramObject: {
          flag: 7
        }
      },
    }
  },
  getArticleCount() {
    if (this.$route.query.id) {
      // 他人文章
      this.params.paramObject.accountId = this.$route.query.id
      this.params.paramObject.flag = 9
    }
    
  },
  mounted() {
    // this.getArticleCount()
  }
}
</script>

<style lang="less" scoped>
.myArticle {
  .title {
    padding: 0px 20px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    background-color: #fff3f3;
    display: flex;
    > a + a {
      margin-left: 16px;
    }
    .router-link-active {
      color: #e23732;
    }
  }
}
</style>
