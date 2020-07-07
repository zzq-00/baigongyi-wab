<template>
  <div class="myVideo">
    <div class="title font-12">
        <userCenterYiVideoList :isOwn="isOwn" :listData="articleList" :noMore="noMore" :loading="loading" @getMore="getVideolist" @getNewData='getNewData' />
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
import userCenterYiVideoList from '@/components/userCenterYiVideoList'
export default {
  name: 'myyiVideo',
    components: {
    userCenterYiVideoList
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
  data() {
    return {
      articleList: [],
       params: {
        asc: false,
        // orderBy: 'publish_time', // watch_count阅读量排序  publish_time发布时间排序
        pageNum: 1,
        pageSize: 10,
        paramObject: {
          accountId:'',
          hideFlag:0, //0未屏蔽 1 已屏蔽
          deleteFlag:'',//0:未删除，1：已删除
          status:'1002' //2000草稿 1001审核驳回 1000审核中 1002已发布
        }
      },
      totalNum: 1,
    }
  },
  methods: {
      getVideolist() {
       if(this.isOwn){
          this.params.paramObject.accountId = this.$store.state.userInfo.accountId
       }else{
         this.params.paramObject.accountId = this.$route.query.id
       }
      this.loading = true
      api.myVideoList(this.params).then(res => {
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
        this.getVideolist()
      }
    }
  },
  mounted() {
    this.getVideolist()
  }
}
</script>

<style lang="less" scoped>
.myVideo {
    background-color: #fff;
}
   .no-content {
      width: 266px;
      margin: 0 auto;
      padding: 20px 0;
      p {
        height: 14px;
        line-height: 14px;
        font-size: 15px;
        color: rgba(188, 188, 196, 1);
        text-align: center;
      }
    }
</style>
