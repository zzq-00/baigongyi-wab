<template>
  <div class="myAsk">
    <div class="myAsk-title">{{isOwn?'我的提问':'他的提问'}}</div>
    <div class="myAsk-content">
      <ul v-if="!noData" v-loading="AskLoading" element-loading-text="正在加载" :scroll-disabled='loadStatus' v-scroll="asklistLoad">
        <li v-for="(item,index) in myaskList" :key="index">
          <p class="ask-title">
            <a :href="`/questionsDetails/${item.id}`" target="_blank" rel="noopener noreferrer">{{item.title}}</a>
          </p>
          <p class="subscript">
            <span>{{item.answerCount}}个回答</span>
            <span>·</span>
            <span>{{item.followers}}人关注</span>
          </p>
        </li>
        <!-- <p class="tips">{{newloadText}}</p> -->
      </ul>
      <div class="no-content" v-if="noData">
        <img src="@/assets/images/No-other.png" alt="">
        <p>暂无提问</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
export default {
  data() {
    return {
      myaskList: [], //我的提问列表
      AskLoading: true, //加载状态
      loadStatus: false,
      noData: false, //无数据图
      params: {
        asc: true,
        orderBy: 'id',
        pageNum: 1,
        pageSize: 10,
        paramObject: {
          accountId: '',
          flag: 3,
          id: '',
          questionContent: '',
          tagIds: '',
          title: ''
        }
      },
      newloadText: ''
    }
  },
  computed: {
    isOwn() {
      if (this.$route.query.id) {
        return this.$route.query.id === this.$store.state.userInfo.accountId
      }
      return true
    }
  },
  methods: {
    asklistLoad() {
      this.loadStatus = true
      this.getFollowAndQuestionList()
    },
    getFollowAndQuestionList() {
      if (!this.isOwn) {
        this.params.paramObject.flag = 4
        this.params.paramObject.accountId = this.$route.query.id
      } else {
        this.params.paramObject.flag = 3
        this.params.paramObject.accountId = ''
      }
      api
        .getFollowAndQuestionList(this.params)
        .then(res => {
          this.myaskList = this.myaskList.concat(res.data.records)
          this.myaskList.length == 0 ? (this.noData = true) : (this.noData = false)
          this.AskLoading = false //加载状态
          this.loadStatus = false
          this.params.pageNum += 1
          // if (res.data.records.length == 0) {
          //   this.newloadText = '暂无更多数据'
          // } else {
          //   this.newloadText = ''
          // }
        })
        .catch(res => {
          this.AskLoading = false //加载状态
        })
    }
  },
  mounted() {
    this.getFollowAndQuestionList()
  }
}
</script>

<style lang="less" scoped>
.myAsk {
  .myAsk-title {
    padding: 0px 20px;
    height: 30px;
    line-height: 30px;
    background-color: #fff3f3;
    color: #e23732;
    font-size: 12px;
  }
  .myAsk-content {
    background-color: #fff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    ul {
      min-height: 50px;
      overflow: auto;
      padding-bottom: 67px;
      li {
        padding: 20px 18px 20px 20px;
        border-bottom: 1px solid #dddddd;
        .ask-title {
          width: 550px;
          height: 17px;
          line-height: 17px;
          font-size: 16px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .subscript {
          margin-top: 10px;
          height: 15px;
          line-height: 15px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          span {
            display: inline-block;
          }
          span:nth-child(2) {
            margin: 0 3px;
          }
        }
      }
      .tips {
        text-align: center;
        padding: 10px 0;
        font-size: 16px;
      }
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
  }
}
</style>
