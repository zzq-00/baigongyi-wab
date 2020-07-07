<template>
  <div class="publishArt">
    <div class="content">
      <userCenterYiVideoList :isOwn="isOwn" :listData="articleList" :noMore="noMore" :loading="loading" @getMore="getArticlelist" @getNewData='getNewData' />
    </div>
  </div>
</template>

<script>
import userCenterYiVideoList from '@/components/userCenterYiVideoList'
import api from '@/fetch'

export default {
  name: 'publishArt',
  components: {
    userCenterYiVideoList
  },
  data() {
    return {
      params: {
        asc: false,
        orderBy: 'publish_time', // watch_count阅读量排序  publish_time发布时间排序
        pageNum: 1,
        pageSize: 10,
        paramObject: {
          flag: 7
        }
      },
      totalNum: 1,
      articleList: [],
      loading: false,
    }
  },
  computed: {
    noMore() {
      return this.articleList.length >= this.totalNum
    },
    isOwn() {
      if (this.$route.query.id) {
        return this.$route.query.id === this.$store.state.userInfo.accountId
      }
      return true
    }
  },
  methods: {
    // 文章列表
    getArticlelist() {
      if (this.$route.query.id) {
        // 他人文章
        this.params.paramObject.accountId = this.$route.query.id
        this.params.paramObject.flag = 9
      }
      this.loading = true
      api.getArticlelist(this.params).then(res => {
        this.loading = false
        this.totalNum = res.data.total
        this.articleList = [...this.articleList, ...res.data.records]
        !this.noMore && this.params.pageNum++
      })
    },
    getNewData(delData) {
      this.totalNum -= 1
      let index = this.articleList.findIndex(item => item.id === delData.id)
      this.articleList.splice(index, 1)
      if (!this.articleList.length) {
        this.params.pageNum = 1
        this.getArticlelist()
      }
    }
  },
  mounted() {
    this.getArticlelist()
  }
}
</script>

<style lang="less" scoped>
.publishArt {
  .content {
    background-color: #fff;
  }
}
</style>
