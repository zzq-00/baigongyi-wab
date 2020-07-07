<template>
  <div class="container clearfix">
    <div class="left-content fl">
      <ul class="top-tab clearfix">
        <li class="fl" :class="{'active': articleParams.paramObject.flag == 2}" @click="tabChange(2)">推荐</li>
        <li class="fl" :class="{'active': articleParams.paramObject.flag == 1}" @click="tabChange(1)">热门</li>
        <li class="fl" :class="{'active': articleParams.paramObject.flag == 3}" @click="tabChange(3)">关注</li>
      </ul>
      <div class="list-data">
        <articleList :listData="articleList" :noMore="noMore" :loading="loading" @getMore="getArticlelist" />
      </div>
    </div>
    <div class="right-content fr">
      <recommendColumn />
      <recommendCourse />
    
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
import recommendColumn from '@/components/recommendColumn'
import recommendCourse from '@/components/recommendCourse'

import articleList from '@/components/articleList'

export default {
  components: {
    recommendColumn,
    recommendCourse,
    articleList
  },
  data() {
    return {
      noData: true,
      loading: false,
      articleParams: {
        pageNum: 1,
        pageSize: 10,
        paramObject: {
          flag: 2 // 1热门 2推荐 3关注
        }
      },
      articleList: [],
      totalNums: 1
    }
  },
  computed: {
    noMore() {
      return this.articleList.length >= this.totalNums
    }
  },
  methods: {
    // tab栏切换
    tabChange(flag) {
      if (flag == 3 && !this.$store.state.userInfo.accountId) {
        return this.$router.push('/login')
      }
      this.articleParams.pageNum = 1
      this.articleParams.paramObject.flag = flag
      this.articleList = []
      this.getArticlelist()
    },
    // 文章列表
    getArticlelist() {
      this.loading = true
      api.getArticlelist(this.articleParams).then(res => {
        this.loading = false
        this.articleList = [...this.articleList, ...res.data.records]
        this.totalNums = res.data.total
        this.totalNums == 0 ? (this.noData = true) : (this.noData = false)
        !this.noMore && this.articleParams.pageNum++
      })
    }
  },
  created() {
    this.getArticlelist()
  }
}
</script>

<style lang="less" scoped>
.container {
  margin: 21px auto 29px;
  .left-content {
    width: 780px;
    background-color: #fff;
    border-radius: 10px;
    min-height: 700px;
    .top-tab {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ddd;
      padding-left: 5px;
      font-size: 16px;
      color: #999;
      > li {
        cursor: pointer;
        padding: 0 16px;
        position: relative;
        &.active {
          color: #4a4a4a;
          &::after {
            content: '';
            display: block;
            width: 20px;
            height: 3px;
            background-color: #e23732;
            position: absolute;
            bottom: 1px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
    .no-content {
      width: 266px;
      margin: 0 auto;
      padding: 40px 0;
      p {
        height: 14px;
        line-height: 14px;
        font-size: 15px;
        color: rgba(188, 188, 196, 1);
        text-align: center;
      }
    }
  }
  .right-content {
    width: 300px;
    position: fixed;
    top: 120px;
    margin-left: 800px;
    > div + div {
      margin-top: 20px;
    }
  }
}
</style>

