<template>
  <div class="scroll-wrap" :key="updateKey">
    <p class="group_tips" v-if="joinUnderReview">申请审核中</p>
    <p class="group_tips" v-else-if="joinToSee" @click="applyToJoin(groupDetail)">申请加入，查看发言</p>
    <template v-else>
      <div v-scroll="whichToRequest" :scroll-disabled="disabled">
        <ideaSingleList v-for='(item,index) in listData' :key='index' :item="item" @getNewData="getNewData" @refreshAttention="refreshAttention" :type="type" :groupDetail="groupDetail" />
      </div>
      <p class="group_tips" v-if="joinToSeeMore" @click="applyToJoin(groupDetail)">加入圈子，查看更多发言</p>
      <template v-else>
        <p v-if="loading" class="nomore-data">加载中...</p>
        <div v-else-if="!listData.length" class="no-data">
          <img src="@/assets/images/No-other.png" alt="">
          <p>{{type==='idea'?'暂无想法':'圈子内想法空空'}}</p>
        </div>
        <p v-else-if="noMore" class="nomore-data">没有更多了</p>
      </template>
    </template>
  </div>
</template>

<script>
import api from '@/fetch'
import ideaSingleList from './ideaSingleList'
export default {
  components: {
    ideaSingleList
  },
  props: {
    currentIndex: String,
    type: {
      default: 'idea' // myIdea groupWithId published commented
    },
    groupDetail: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      updateKey: 1,
      listData: [],
      // 想法参数
      params: {
        pageNum: 1,
        pageSize: 10,
        paramObject: {
          recommendFlag: 2
        }
      },
      // 个人主页想法
      myIdeaParams: {
        accountId: this.$route.query.id || this.$store.state.userInfo.accountId,
        flag: 2,
        pageNum: 1,
        pageSize: 10
      },
      // 圈子主页想法
      groupWithIdParams: {
        groupId: this.$route.params.id,
        page: 1,
        size: 10,
        type: 1 // 1.全部圈子 2.精选
      },
      // 圈子我发布的
      publishedParams: {
        page: 1,
        size: 10,
        type: 1 // 1为我发布的，2为我评论的
      },
      groupsMomentParams: {
        pageNum: 1,
        pageSize: 10
      },
      totalNums: 1,
      loading: false,
      joinToSeeMore: false
    }
  },
  watch: {
    '$route.query.currentIndex': {
      handler: function(val) {
        if (this.type === 'idea') {
          // 想法
          if (val === '热门') {
            this.params.paramObject.recommendFlag = 1
          } else if (val === '关注') {
            if (!this.$store.state.userInfo.accountId) {
              return this.$router.replace('/login?redirectUrl=' + window.location.href)
            }
            this.params.paramObject.accountId = this.$store.state.userInfo.accountId
            this.params.paramObject.recommendFlag = 3
          } else {
            this.params.paramObject.recommendFlag = 2
          }
        } else if (this.type === 'groupWithId') {
          // 圈子主页
          this.groupWithIdParams.type = val === '精选' ? 2 : 1
        }
        this.whichToRequest()
      },
      immediate: true
    }
  },
  computed: {
    disabled() {
      return this.loading || this.noMore
    },
    noMore() {
      return this.listData.length >= this.totalNums
    },
    joinToSee() {
      return this.type === 'groupWithId'
      && this.groupDetail.join !== '3'
      && this.groupDetail.join !== '5'
      && this.groupDetail.join !== '10'
      && this.groupDetail.type===2
    },
    joinUnderReview() {
      return this.type==='groupWithId' && this.groupDetail.join === '1'
    },
    whichToRequest() {
      switch (this.type) {
        case 'myIdea':
          // 我的想法
          return this.myIdeaList
        case 'groupWithId':
          // 圈子主页
          return this.allMoments
        case 'groupsMoment':
          // 圈内发言
          return this.groupsMoment
        case 'published':
        case 'commented':
          // 我发布的，我评论的
          return this.myMoments
        default:
          // 想法
          return this.getIdeaList
      }
    }
  },
  methods: {
    getNewData(data) {
      this.totalNums -= 1
      let index = this.listData.findIndex(item => item.id === data.id)
      this.listData.splice(index, 1)
      if (!this.listData.length) {
        switch (this.type) {
          case 'myIdea':
            this.myIdeaParams.pageNum = 1
            break
          case 'groupWithId':
            this.groupWithIdParams.page = 1
            break
          case 'published':
          case 'commented':
            this.publishedParams.page = 1
            break
        }
      }
      this.updateKey++
    },
    // 获取工程圈想法
    getIdeaList() {
      this.loading = true
      api.getIdeaList(this.params).then(res => {
        res.data.records.forEach((item, index) => {
          item.commentList = [] // 评论列表
          item.showFold = false // 多行折叠
          item.showComment = false // 显示评论
        })
        this.loading = false
        this.listData = [...this.listData, ...res.data.records]
        this.totalNums = res.data.total
        !this.noMore && this.params.pageNum++
      })
    },
    // 获取个人主页想法
    myIdeaList() {
      this.loading = true
      api.myIdeaList(this.myIdeaParams).then(res => {
        res.data.records.forEach((item, index) => {
          item.commentList = [] // 评论列表
          item.showFold = false // 多行折叠
          item.showComment = false // 显示评论
        })
        this.loading = false
        this.listData = [...this.listData, ...res.data.records]
        this.totalNums = res.data.total
        !this.noMore && this.myIdeaParams.pageNum++
      })
    },
    // 圈子主页全部发言/精选发言列表
    allMoments() {
      this.loading = true
      api.allMoments(this.groupWithIdParams).then(res => {
        res.data.records.forEach((item, index) => {
          item.commentList = [] // 评论列表
          item.showFold = false // 多行折叠
          item.showComment = false // 显示评论
        })
        this.loading = false
        this.listData = [...this.listData, ...res.data.records]
        this.totalNums = res.data.total
        if (
          this.groupDetail.join !== '3' &&
          this.groupDetail.join !== '5' &&
          this.groupDetail.join !== '10' &&
          this.groupDetail.type === 1 &&
          this.listData.length > 5
        ) {
          this.listData.splice(5)
          this.joinToSeeMore = this.noMore = true
        }
        !this.noMore && this.groupWithIdParams.page++
      })
    },
    // 我发布的/我评论的
    myMoments() {
      this.loading = true
      this.publishedParams.type = this.type === 'published' ? 1 : 2
      api.myMoments(this.publishedParams).then(res => {
        res.data.records.forEach((item, index) => {
          item.commentList = [] // 评论列表
          item.showFold = false // 多行折叠
          item.showComment = false // 显示评论
        })
        this.loading = false
        this.listData = [...this.listData, ...res.data.records]
        this.totalNums = res.data.total
        !this.noMore && this.publishedParams.page++
      })
    },
    // 圈内发言
    groupsMoment() {
      this.loading = true
      api.groupsMoment(this.groupsMomentParams).then(res => {
        res.data.records.forEach((item, index) => {
          item.commentList = [] // 评论列表
          item.showFold = false // 多行折叠
          item.showComment = false // 显示评论
        })
        this.loading = false
        this.listData = [...this.listData, ...res.data.records]
        this.totalNums = res.data.total
        !this.noMore && this.groupsMomentParams.pageNum++
      })
    },
    // 申请加入圈子
    async applyToJoin(item) {
      try {
        let promptObj = {}
        if (item.type === 2) {
          promptObj = await this.$prompt('加入圈子参与互动，是否申请加入（最多100字）', '申请加入圈子', {
            closeOnClickModal: false,
            closeOnPressEscape: false,
            confirmButtonText: '申请加入',
            cancelButtonText: '取消',
            inputValidator: val => !!val && val.trim().length > 0 && val.length <= 100,
            inputErrorMessage: '字数不超过100'
          })
        } else {
          await this.$confirm('加入圈子参与互动，是否加入？', '提示', {
            closeOnClickModal: false,
            closeOnPressEscape: false,
            confirmButtonText: '加入圈子',
            cancelButtonText: '取消',
            type: 'warning'
          })
        }
        await api.applyGroup({ groupId: item.id, memberId: this.$store.state.userInfo.accountId, reason: promptObj.value || '' })
        if (item.type === 1) {
          item.join = '3'
        } else {
          item.join = '1'
        }
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    },
    // 刷新列表关注状态
    refreshAttention(data) {
      this.listData.forEach(item => {
        if (item.accountId === data.accountId) item.concernStatus = data.concernStatus
      })
    }
  }
}
</script>

<style lang="less" scoped>
.group_tips {
  cursor: pointer;
  color: #fff;
  width: 220px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: linear-gradient(90deg, rgba(255, 0, 10, 1), rgba(255, 95, 8, 1));
  border-radius: 20px;
  margin: 10px auto;
}
.no-data {
  text-align: center;
  padding: 20px 0;
  background-color: #fff;
  border-radius: 10px;
  p {
    height: 14px;
    line-height: 14px;
    font-size: 15px;
    color: rgba(188, 188, 196, 1);
    text-align: center;
  }
}
.nomore-data {
  text-align: center;
  margin: 20px 0 10px;
  color: #999;
}
</style>
