<template>
  <div class="draftArt">
    <div class="content">
      <articleList :isOwn="isOwn" :listData="draftList" :noMore="noMore" :loading="loading" @getMore="getDraftlist" @getNewData='getNewData' />
    </div>
  </div>
</template>

<script>
import articleList from '@/components/articleList'
import api from '@/fetch'
export default {
  components: {
    articleList
  },
  data() {
    return {
      noData: true,
      params: {
        pageNum: 1,
        pageSize: 10,
        paramObject: {
          flag: 8 // 1热门 2最新 3关注
        }
      },
      totalDraft: 1,
      draftList: [],
      loading: false
    }
  },
  computed: {
    noMore() {
      return this.draftList.length >= this.totalDraft
    },
    isOwn() {
      if (this.$route.query.id) {
        return this.$route.query.id === this.$store.state.userInfo.accountId
      }
      return true
    }
  },
  methods: {
    // 草稿列表
    getDraftlist() {
      this.loading = true
      api.getArticlelist(this.params).then(res => {
        this.loading = false
        this.totalDraft = res.data.total
        this.draftList = [...this.draftList, ...res.data.records]
        this.totalDraft == 0 ? (this.noData = true) : (this.noData = false)
        !this.noMore && this.params.pageNum++
      })
    },
    getNewData(delData) {
      this.totalDraft -= 1
      let index = this.draftList.findIndex(item => item === delData)
      this.draftList.splice(index, 1)
      if (!this.draftList.length) {
        this.params.pageNum = 1
        this.getDraftlist()
      }
    }
  },
  mounted() {
    this.getDraftlist()
  }
}
</script>

<style lang="less" scoped>
.draftArt {
  .content {
    background-color: #fff;
  }
}
</style>
