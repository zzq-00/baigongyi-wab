<template>
  <div class="pages">
    <div class="questionsDetails-page">
      <div class="questions-main-descrtion">
        <div class="tag-list">
          <span v-for="(item,index) in tagList" :key="index">{{item.tagName1}}-{{item.tagName2}}</span>
        </div>
        <div class="descrtion-left">
          <p class="qusetions-title">{{questionDetailsObj.title}}</p>
          <div class="questions-details" v-html="questionDetailsObj.stripHtmlContent" v-if="!desOpen"></div>
          <div v-html="handleHtml(questionDetailsObj.questionContent)" class="questions-details" v-if="questionDetailsObj.stripHtmlContent.length <= 150||desOpen"></div>
        </div>
        <div class="descrtion-right">
          <ul class="data-statistics">
            <li>
              <p>{{questionDetailsObj.followers}}</p>
              <p>关注人数</p>
            </li>
            <li>
              <p>{{questionDetailsObj.watchCount}}</p>
              <p>浏览次数</p>
            </li>
          </ul>
        </div>
        <div style="clear:both"></div>
        <div class="descrtion-footer" v-if="questionDetailsObj.accountId!=loginaccountId">
          <el-button type="primary" @click="gotoWriting()" v-if="!whetherAnswerQuestion">写回答</el-button>
          <el-button type="primary" class="my-answer" @click="gotoMyReplay()" v-if="whetherAnswerQuestion">查看我的回答</el-button>
          <el-button class="follow-false" v-if="!isfollow&&questionDetailsObj.accountId!=loginaccountId" @click="followAnswer('1')">关注问题</el-button>
          <el-button type="primary" class="follow-true" v-if="isfollow&&questionDetailsObj.accountId!=loginaccountId" @click="followAnswer('2')">已关注</el-button>
        </div>
        <div class="descrtion-footer" v-if="questionDetailsObj.accountId==loginaccountId">
          <el-button type="primary" @click="gotoEdit()">编辑问题</el-button>
          <el-button class="follow-false" v-if="deleteStatus" @click="deleteQuetion()">删除问题</el-button>
        </div>
      </div>
      <div class="main-box">
        <div class="answer-box">
          <div class="answer-title">
            <span class="answer-number">回答({{fabulousTotal}})</span>
            <p class="distinguish">
              <span :class="[newOrFabulous==1?'focus-color':'']" @click="getAnswer(1)">最赞</span>
              <span>|</span>
              <span :class="[newOrFabulous==2?'focus-color':'']" @click="getAnswer(2)">最新</span>
            </p>
          </div>
          <ul class="answer-list" v-loading="loadingFablous" element-loading-text="正在加载" v-scroll="fabulousLoad" :scroll-disabled="disabled">
            <li v-for="(item,index) in fabulousList" :key="index">
              <div class="answer-person-info" v-if="item.answerCount!=0">
                <img :src="item.avatar?$store.state.imageDomain + item.avatar : require('@/assets/images/err-header-icon01.png')" alt="" @click="openUserCenter(item.accountId)">
                <div>
                  <p @click="openUserCenter(item.accountId)" class="answer-name">{{item.nickName}}</p>
                  <p class="answer-time">{{item.lastUpdateTime}}</p>
                </div>
                <button class="already" v-if="item.concernStatus==1&&loginaccountId!=item.accountId" @click="follow('1',item,index)">已关注</button>
                <button class="not" v-if="item.concernStatus==2&&loginaccountId!=item.accountId" @click="follow('2',item,index)">关注</button>
                <button class="already" v-if="item.concernStatus==3&&loginaccountId!=item.accountId" @click="follow('3',item,index)">互相关注</button>
              </div>
              <div class="answer-content" @click="gotoDetails(item)" v-if="item.answerCount!=0">{{item.stripHtmlContent}}</div>
              <p class="tagging" v-if="item.answerCount!=0">
                <span>{{item.likeCount}}个赞</span>
                <span>·</span>
                <span>{{item.commentCount}}条评论</span>
              </p>
            </li>
          </ul>
        </div>
        <div class="share-box">
          <img class="qr" :src="$store.state.imageDomain + 'images/download/bgy_download.png'" alt="">
          <div class="share-info">
            <p>扫码下载百工驿APP</p>
            <p>工程人都在用的分享交流神器！</p>
          </div>
          <div style="clear:both"></div>
        </div>
        <div style="clear:both"></div>
      </div>
    </div>
    <operateIcon :propData='questionDetailsObj' :weixinShareLink='link()' />
  </div>

</template>

<script>
import api from '@/fetch'
import operateIcon from '@/components/operateIcon'

export default {
  components: {
    operateIcon
  },
  data() {
    return {
      questionDetailsObj: {
        stripHtmlContent: ''
      },
      tagList: [], //问题标签
      newOrFabulous: 1, //1最赞 2最新
      params: {
        pageNum: 1,
        pageSize: 4,
        asc: false,
        orderBy: 'like_count',
        paramObject: {
          questionId: ''
        }
      },
      fabulousList: [], //回答列表
      fabulousTotal: '',
      loginaccountId: '', //登录人id
      desOpen: false, //是否展开描述
      isfollow: false,
      loadingFablous: true,
      newStatus: false,
      deleteStatus: false, //如果回答为空为true
      whetherAnswerQuestion: false, //问题下 登录用户是否回答过
      myAnswerId: '', //我的回答id,
      type:false
    }
  },
  created() {
    window.expandDescription = this.expandDescription
  },
  watch: {
    newOrFabulous(val) {
      if(val == 1){
        this.params.orderBy = 'like_count'
      }else{
        this.params.orderBy = 'last_update_time'
      }
      this.fabulousList= []  
      this.params.pageNum=1;
      this.type = true;
      this.answerListFabulous()
    }
  },
  computed: {
    disabled() {
      return this.loadingFablous || this.noMore;
    },
    noMore() {
           return this.fabulousList.length >= this.fabulousTotal;
    }
  },
  methods: {
    // 关注问题
    followAnswer(val) {
      if (val == 1) {
        api.addAttention({ objId: this.questionDetailsObj.id, objType: 4 }).then(res => {
          this.isfollow = true
          this.questionDetailsObj.followers = this.questionDetailsObj.followers + 1
        })
      } else if (val == 2) {
        api.delAttention({ objId: this.questionDetailsObj.id, objType: 4 }).then(res => {
          this.isfollow = false
          this.questionDetailsObj.followers = this.questionDetailsObj.followers - 1
        })
      }
    },
    gotoDetails(item) {
      let routeUrl
      routeUrl = this.$router.resolve(`/myReplyDetails/${item.id}`)
      window.open(routeUrl.href, '_blank')
    },
    // 关注
    follow(val, item, index) {
      // val:1:已关注;2:关注;3:互相关注;
      if (!this.loginaccountId) {
        let routeUrl = this.$router.resolve('/login')
        window.open(routeUrl.href, '_blank')
      } else {
        let objId = item.accountId
        let objType = 6
        if (val == 1) {
          api.delAttention({ objId: objId, objType: objType }).then(res => {
            item.concernStatus = 2
          })
        } else if (val == 2) {
          api.addAttention({ objId: objId, objType: objType }).then(res => {
            item.concernStatus = 1
          })
        } else if (val == 3) {
          api.delAttention({ objId: objId, objType: objType }).then(res => {
            item.concernStatus = 2
          })
        }
      }
    },
    // 最赞回答
    fabulousLoad() {
      this.params.pageNum += 1
      this.answerListFabulous()
    },
    questionDetails() {
      return new Promise((resolve, relect) => {
        api.questionDetails(this.$route.params.id).then(res => {
          this.questionDetailsObj = res.data.question
          this.isfollow = res.data.whetherToFocusOnTheIssue
          this.whetherAnswerQuestion = res.data.whetherAnswerQuestion
          this.myAnswerId = res.data.myAnswerId
          if (this.questionDetailsObj.stripHtmlContent) {
            if (this.questionDetailsObj.stripHtmlContent.length > 150) {
              this.questionDetailsObj.stripHtmlContent =
                this.questionDetailsObj.stripHtmlContent.substring(0, 148) +
                '...' +
                `<span style='display:inline-block;color: rgba(226, 55, 50, 1);cursor:pointer;margin-left:7px;' onclick="expandDescription('1')"}>展开描述<img src=${require('../../assets/images/Open.png')} alt="" style="margin-left:5px;"></span>`
              this.questionDetailsObj.questionContent =
                this.questionDetailsObj.questionContent +
                `<p style="text-align:right"><span style='color: rgba(226, 55, 50, 1);cursor:pointer;margin-left:7px;' onclick="expandDescription('2')">收起描述<img src=${require('../../assets/images/Retract.png')} alt="" style="margin-left:5px;display:inline-block;"></span><p>`
            } else {
              this.desOpen = true
            }
          }
          res.data.questionTagList.map(item => {
            item.children.map(items => {
              this.tagList.push({ tagName1: item.tagName, tagName2: items.tagName })
            })
          })
          this.params.paramObject.questionId = res.data.question.id
          resolve(this.questionDetailsObj)
        })
      })
    },
    // 展开描述
    expandDescription(val) {
      val == 1 ? (this.desOpen = true) : (this.desOpen = false)
    },
    // 写回答
    gotoWriting() {
      if (this.loginaccountId) {
        this.$router.push({ path: `/writeAnswer/${this.questionDetailsObj.id}`, query: { editOrNew: 'new' } })
      } else {
        this.$router.push('/login')
      }
    },
    // 查看我的回答
    gotoMyReplay() {
      this.$router.push(`/myReplyDetails/${this.myAnswerId}`)
    },
    // 编辑问题
    gotoEdit() {
      this.$router.push({ path: `/askingQuestions`, query: { id: this.$route.params.id, askEditOrNew: 'edit' } })
    },
    // 删除问题
    deleteQuetion() {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api.deleteQuestion(this.$route.params.id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.$router.push('/questions')
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 获取回答列表1最赞 2最新
    getAnswer(val) {
      this.newOrFabulous = val
    },
    // 回答列表最赞
    answerListFabulous() {
      if(this.type){
        this.params.pageNum =1;
      }
      this.type = false;
      api.answerList(this.params).then(res => {
        this.fabulousList = this.fabulousList.concat(res.data.records)
        this.loadingFablous = false
        this.fabulousTotal = res.data.total
        if (this.fabulousTotal == 0) {
          this.deleteStatus = true
        } else {
          this.deleteStatus = false
        }
        this.fabulousList.map(item => {
          if (item.stripHtmlContent.length > 150) {
            item.stripHtmlContent = item.stripHtmlContent.substring(0, 150) + '...'
          }
        })
      })
    },
    link() {
      return process.env.VUE_APP_M_URL + 'share/question?id=' + this.$route.params.id
    }
  },
  mounted() {
    if (window.localStorage.userInfo) {
      this.loginaccountId = JSON.parse(window.localStorage.getItem('userInfo')).accountId
    }
    this.questionDetails().then(res => {
      this.answerListFabulous()
      // this.answerListNew()
    })
  }
}
</script>
<style lang="less" scoped>
.pages {
  position: relative;
  .questionsDetails-page::-webkit-scrollbar {
    display: none;
    overflow: hidden;
  }
  .questionsDetails-page {
    height: calc(100vh - 120px);
    // overflow: auto;
    scrollbar-width: none; //火狐隐藏滚动条
    -ms-overflow-style: none; //IE10
    .questions-main-descrtion {
      margin-top: 21px;
      background: #fff;
      padding: 21px 0 26px 20px;
      border-radius: 10px;
      .tag-list {
        span {
          display: inline-block;
          padding: 0 12px 0 10px;
          height: 20px;
          line-height: 20px;
          background: #f2f2f2;
          border-radius: 3px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          margin-bottom: 16px;
          margin-right: 10px;
        }
      }
      .descrtion-left {
        width: 730px;
        padding-right: 50px;
        float: left;
        .qusetions-title {
          line-height: 24px;
          font-size: 18px;
          font-weight: bold;
          color: rgba(74, 74, 74, 1);
          margin-bottom: 17px;
        }
        .questions-details {
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 19px;
          margin-bottom: 20px;
          word-break: break-all;
          .more-descrtion {
            font-weight: 400;
            color: rgba(226, 55, 50, 1) !important;
          }
        }
      }
      .descrtion-right {
        float: right;
        height: 110px;
        width: 299px;
        border-left: 1px solid #dddddd;
        .data-statistics {
          margin-top: 43px;
          display: flex;
          justify-content: center;
          li {
            margin-right: 41px;
            p:nth-child(1) {
              height: 15px;
              line-height: 15px;
              font-size: 18px;
              font-weight: bold;
              color: rgba(74, 74, 74, 1);
              margin-bottom: 10px;
            }
            p:nth-child(2) {
              height: 13px;
              line-height: 13px;
              font-size: 12px;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
            }
          }
        }
      }
      .descrtion-footer {
        /deep/.el-button {
          width: 84px;
          height: 34px;
          line-height: 34px;
          border-radius: 10px;
          padding: 0;
          font-size: 14px;
          border-radius: 5px;
        }
        /deep/.el-button:nth-child(1) {
          background: #e23732;
        }
        /deep/.el-button--primary:focus,
        /deep/.el-button--primary:hover {
          background: rgb(232, 95, 91);
          border-color: rgb(232, 95, 91);
          color: #fff;
        }
        .follow-false {
          color: #e23732;
          border: 1px solid #e23732 !important;
          background-color: #fff !important;
        }
        .follow-false:focus,
        .follow-false:hover {
          color: #e23732;
          border-color: rgb(246, 195, 194);
          background-color: rgb(252, 235, 235);
        }
        .my-answer {
          width: 110px;
        }
      }
    }
    .main-box {
      margin-top: 20px;
      .answer-box {
        width: 780px;
        background-color: #fff;
        border-radius: 10px;
        float: left;
        // margin-bottom: 20px;
        .answer-title {
          height: 28px;
          padding: 22px 20px 0 20px;
          border-bottom: 1px solid #ddd;
          .answer-number {
            height: 17px;
            line-height: 17px;
            font-size: 16px;
            font-weight: 400;
            color: rgba(74, 74, 74, 1);
            position: relative;
          }
          .answer-number:after {
            position: absolute;
            content: '';
            display: block;
            width: 20px;
            height: 3px;
            background: #e23732;
            border-radius: 2px;
            left: 7px;
            bottom: -10px;
          }
          .distinguish {
            float: right;
            vertical-align: middle;
            .focus-color {
              color: #e23732;
            }
            span {
              height: 15px;
              line-height: 15px;
              font-size: 14px;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              cursor: pointer;
            }
            span:nth-child(2) {
              margin: 0 10px;
            }
          }
        }
        .answer-list {
          padding-bottom: 20px;
          min-height: 50px;
          li {
            padding: 20px;
            border-bottom: 1px solid #dddddd;
            .answer-person-info {
              img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 10px;
                float: left;
                cursor: pointer;
              }
              div {
                display: inline-block;
                .answer-name {
                  height: 12px;
                  line-height: 12px;
                  font-size: 14px;
                  font-weight: 400;
                  color: rgba(74, 74, 74, 1);
                  margin-top: 4px;
                }
                .answer-name:hover {
                  color: #e23732;
                  cursor: pointer;
                }
                .answer-time {
                  margin-top: 11px;
                  height: 9px;
                  line-height: 9px;
                  font-size: 12px;
                  font-weight: 400;
                  color: rgba(153, 153, 153, 1);
                }
              }
              button {
                padding: 0 13px;
                float: right;
                height: 34px;
                border-radius: 5px;
                background-color: #ffffff;
                cursor: pointer;
                margin-top: 5px;
              }
              .not {
                border: 1px solid #e23732;
                color: #e23732;
              }
              .not:focus,
              .not:hover {
                color: #e23732;
                border-color: rgb(246, 195, 194);
                background-color: rgb(252, 235, 235);
              }
              .already {
                border: 1px solid #666666;
                color: #666666;
              }
            }
            .answer-content {
              margin-top: 11px;
              font-size: 14px;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              line-height: 19px;
              max-height: 55px;
              cursor: pointer;
              overflow: hidden;
            }
            .tagging {
              margin-top: 10px;
              height: 15px;
              line-height: 15px;
              font-size: 14px;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
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
        .answer-list::-webkit-scrollbar {
          display: none;
          overflow: hidden;
        }
      }
      .share-box {
        padding: 19px 15px 23px 20px;
        float: right;
        width: 265px;
        height: 64px;
        background: rgba(255, 255, 255, 1);
        border-radius: 10px;
        img {
          width: 63px;
          height: 64px;
          float: left;
        }
        .share-info {
          float: left;
          margin-left: 6px;
          p:nth-child(1) {
            margin: 10px 0;
            height: 17px;
            line-height: 17px;
            font-size: 16px;
            color: rgba(74, 74, 74, 1);
          }
          p:nth-child(2) {
            height: 15px;
            line-height: 15px;
            font-size: 14px;
            color: rgba(153, 153, 153, 1);
          }
        }
      }
    }
  }
}
</style>
