<template>
  <div class="myVideo">
    <div class="videoTitle">我的驿视频</div>
    <div class="tabChange">
      <!-- <router-link :to="isOwn?'/myHome/myVideo/publishArt':'/myHome/myVideo/publishArt?id='+$route.query.id" :class="{active:activeName=='all'}" @click="">全部投稿</router-link>
      <router-link to='/myHome/myVideo/draftArt' v-if="isOwn" :class="{active:activeName=='all'}">草稿箱</router-link> -->
      <span :class="{active:activeName=='all'}" @click="activeName = 'all'">全部投稿</span>
      <span v-if="isOwn" :class="{active:activeName=='draft'}" @click="activeName = 'draft'">草稿箱</span>
    </div>
    <div class="chooseTab" v-if="activeName == 'all'">
      <span :class="{active:active==0}" @click="active=0">全部</span>
      <span :class="{active:active==1}" @click="active=1">已发布</span>
      <span :class="{active:active==2}" @click="active=2">审核中</span>
      <span :class="{active:active==3}" @click="active=3">审核驳回</span>
      <span :class="{active:active==4}" @click="active=4">被屏蔽</span>
    </div>
      <userCenterYiVideoList :isOwn="isOwn" :listData="articleList" :noMore="noMore" :loading="loading" @getMore="getVideolist" @getNewData='getNewData' />
  </div>
</template>

<script>
import api from '@/fetch'
import userCenterYiVideoList from '@/components/userCenterYiVideoList'
export default {
  name: 'myVideo',
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
      activeName:'all',
      active:0,
      params: {
        asc: false,
        // orderBy: 'publish_time', // watch_count阅读量排序  publish_time发布时间排序
        pageNum: 1,
        pageSize: 10,
        paramObject: {
          accountId:'',
          hideFlag:'', //0未屏蔽 1 已屏蔽
          deleteFlag:'',//0:未删除，1：已删除
          status:'' //2000草稿 1001审核驳回 1000审核中 1002已发布
        }
      },
        totalNum: 1,
      articleList: [],
      loading: false,
    }
  },
  watch: {
    active(val) {
           this.params.paramObject.status = '';
           this.params.paramObject.hideFlag = '';
           this.params.pageNum = 1;
        if(val == 1){
          this.params.paramObject.hideFlag = 0;
           this.params.paramObject.status = 1002;
        }else if(val == 2){
            this.params.paramObject.status = 1000;
        }else if(val == 3){
            this.params.paramObject.status = 1001;
        }else if(val == 4){
            this.params.paramObject.hideFlag = 1;
        }
        this.articleList = [];
        this.getVideolist();
    },
    activeName(val){
      this.params.pageNum = 1;
      if(val == 'draft'){
        this.params.paramObject.status = 2000;
      }else if(val == 'all'){
        this.params.paramObject.status = '';
      }
      this.articleList = [];
      this.getVideolist();
    }
  },
   methods: {
    // 文章列表
    getVideolist() {
        this.params.paramObject.accountId = this.$store.state.userInfo.accountId
    
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
    this.getVideolist();
  }
}
</script>

<style lang="less" scoped>
.myVideo {
   background: #fff;
  min-height: 500px;
  .videoTitle{
     font-size: 16px;
     color:#333;
     border-bottom: 1px solid #dddddd;
    padding: 22px 20px 11px 20px;
    box-sizing: border-box;
  }
  .tabChange {
    border-bottom: 1px solid #dddddd;
    padding: 11px 20px 11px 20px;
    box-sizing: border-box;
    span{
      cursor:pointer;
      font-size:14px;
      color:#999;
      font-weight:400;
      margin-right: 20px;
    }
    .active {
     font-size:16px;
     font-weight:500;
      color: #4a4a4a;
    }
  }
  .chooseTab{
     padding: 0px 20px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    background-color: #fff3f3;
    display: flex;
    span{
      cursor:pointer;
    }
    > span + span {
      margin-left: 16px;
    }
    .active {
      color: #e23732;
    }
  }
}
</style>
