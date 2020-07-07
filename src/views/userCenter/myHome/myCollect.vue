<template>
  <div class="hisCollect">
    <div class="title">
      <span v-for="item in tabsColumn" :key="item" @click="tabChange(item)" :class="{active:item === tabActive}">
        {{item}}
      </span>
    </div>
    <div class="content">
      <articleList v-if="tabActive==='收藏的文章'" :listData="collectData" :noMore="noMore" :loading="loading" @getMore="getMore" @getNewData="getNewData" />
      <CollectedAnswers v-else-if="tabActive==='收藏的回答'" />
      <CollectedLives v-else-if="tabActive==='收藏的直播'" />
      <CollectCourse v-else-if="(tabActive==='收藏的课程'||tabActive==='收藏的专栏')" :tabActive="tabActive" :collectData="collectData" :noMore="noMore" :loading="loading" @getMore="getMore" @getNewData="getNewData" :key="updateKey"></collectCourse>
      <userCenterYiVideoList v-else-if="tabActive==='收藏的驿视频'" :isOwn="isOwn" :listData="collectData" :noMore="noMore" :loading="loading" @getMore="getArticlelist" @getNewData='getNewData' />
    </div>
  </div>
</template>

<script>
import CollectCourse from './components/CollectCourse'
import articleList from '@/components/articleList'
import CollectedAnswers from './components/CollectedAnswers' //收藏的回答
import CollectedLives from './components/CollectedLives' //收藏的直播
import userCenterYiVideoList from '@/components/userCenterYiVideoList' //驿视频
import api from '@/fetch'
import { mapState } from 'vuex'
export default {
  components: {
    CollectCourse,
    articleList,
    CollectedAnswers,
    CollectedLives,
    userCenterYiVideoList
  },
  data() {
    return {
      updateKey: 1,
      tabsColumn: ['收藏的课程', '收藏的专栏', '收藏的直播', '收藏的驿视频','收藏的文章', '收藏的回答'],
      collectData: [],
      loading: false,
      totalNums: 1,
      collectParams: {
        accountId: this.$route.query.id || this.$store.state.userInfo.accountId,
        pageNum: 1,
        pageSize: 10,
        flag: 2
      }
    }
  },
  computed: {
    ...mapState(['tabActive']),
    noMore() {
      return this.collectData.length >= this.totalNums
    },
      isOwn() {
      if (this.$route.query.id) {
        return this.$route.query.id === this.$store.state.userInfo.accountId
      }
      return true
    }
  },
  watch: {
    tabActive: {
      handler: function(val) {
        this.collectData = []
        this.totalNums = 1
        this.updateKey++
        this.collectParams.pageNum = 1
        this.getMore()
      },
      immediate: true
    }
  },
  methods: {
    tabChange(item) {
      this.$store.commit('setTab', item)
    },
    async getMore() {
      this.loading = true
      let res = {}
      if (this.tabActive === '收藏的课程') {
        res = await api.CollectCourse(this.collectParams)
      } else if (this.tabActive === '收藏的专栏') {
        res = await api.CollectColumn(this.collectParams)
      } else if (this.tabActive === '收藏的直播') {
        // res = await api.CollectLive(this.collectParams)
      } else if (this.tabActive === '收藏的文章') {
        res = await api.CollectArticle(this.collectParams)
      } else if (this.tabActive === '收藏的回答') {
        // res = await api.CollectAnswer(this.collectParams)
      } else if (this.tabActive === '收藏的驿视频') {
        res = await api.CollectYivideo(this.collectParams)
      }
      this.loading = false
      if (res.data) {
        this.collectData = [...this.collectData, ...res.data.records]
        this.totalNums = res.data.total
        !this.noMore && this.collectParams.pageNum++
      }
    },
    // 取消收藏后重新获取数据
    getNewData(delData) {
      if (Array.isArray(delData)) {
        delData.forEach(obj => {
          let index = this.collectData.findIndex(item => item.id === obj.objId)
          this.collectData.splice(index, 1)
        })
        this.totalNums -= delData.length
      } else {
        let index = this.collectData.findIndex(item => item === delData)
        this.collectData.splice(index, 1)
        this.totalNums -= 1
      }
      // 更新右侧收藏数量
      this.$store.commit('setFollow', !this.$store.state.cancelStatus)
      if (!this.collectData.length) {
        this.collectParams.pageNum = 1
        this.getMore()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.hisCollect {
  .title {
    padding: 0px 20px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    background-color: #fff3f3;
    cursor: pointer;
    span + span {
      margin-left: 16px;
    }
    .active {
      color: #e23732;
    }
  }
  .content {
    width: 100%;
    background-color: #fff;
  }
}
</style>
