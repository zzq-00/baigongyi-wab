<!-- 课程详情页 -->
<template>
  <div class="courseDetail">
    <div class="course clearfix">
      <div class="cover fl">
        <img :src="$store.state.imageDomain + courseDetail.image" alt="">
      </div>
      <div class="info fl">
        <div class="courseInfo">
          <h3 class="title font-18">{{courseDetail.name}}</h3>
          <div class="other font-14 gray">
            <span>观看：
              <i>{{courseDetail.watchCount}}</i> 次</span>
            <span> | </span>
            <span>讲师：
              <i>{{courseDetail.realName}}</i>
            </span>
            <span> | </span>
            <span v-if="courseDetail.status!=1000">{{courseDetail.publishTime | formatDate}}</span>
          </div>
        </div>
        <div class="detButtons" v-if="$store.state.userInfo.accountId&&(courseDetail.accountId==$store.state.userInfo.accountId)">
          <el-button type="danger" @click='goPlayFn'>立即学习</el-button>
        </div>
        <div v-else>
          <div class="price purple font-16">
            <i v-if="!courseDetail.purchaseStatus" :class="courseDetail.price > 0 ? 'red' : 'purple'">{{courseDetail.price>0 ? '&yen;'+courseDetail.price : '免费' }}</i>
          </div>
          <div class="detButtons">
            <el-button type="danger" v-if="courseDetail.price=='0.00'||courseDetail.purchaseStatus" @click='goPlayFn'>立即学习</el-button>
            <el-button type="danger" @click="purchase()" v-show="courseDetail.price!='0.00'&&!courseDetail.purchaseStatus">立即购买</el-button>
            <el-button class="fr" v-if="!courseDetail.purchaseStatus" @click="collect()">{{courseDetail.collectStatus ? '已收藏' : '收藏'}}</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 立即购买 -->
    <div class='shopping'>
      <el-dialog title="确认订单" :visible.sync="dialogVisible" width="700px" :close-on-click-modal='false'>
        <div v-loading="loading">
          <div class="order-info">
            <p class="clearfix">
              <span class="fl">课程名称</span>
              <span class="fl">{{courseDetail.name}}</span>
            </p>
            <p>订单信息
              <span>{{payOrderData.orderCode}}</span>
            </p>
            <p class="order-money">订单金额
              <span>&yen;{{payOrderData.payAmount}}</span>
            </p>
            <p>支付方式
              <span>账户余额(&yen;{{payOrderData.balance}})</span>
              <i v-if="!payOrderData.balanceCanPay" class="font-12" style="color:#E23732;display: block;margin-left:80px;">您的账户余额不足，请先充值</i>
            </p>
            <div v-if="payOrderData.balanceCanPay">
              <div class="pay-box">
                <span class="pay-word-label">支付密码</span>
                <div class="pay-word-box clearfix">
                  <vuePayPwd class="fl" :class="[!payOrderData.hasPayPassword?'disabled-input':'']" :isCursor="isCursor" :pwdWidth="300" :pwdHeight="38" :getPassword="payPw">
                  </vuePayPwd>
                  <span class="fl forget-pas">
                    <a :href="`/modifyPayPassword?Identification=2${payOrderData.hasPayPassword?'':'&set=sets'}&url=${$route.path}`">{{payOrderData.hasPayPassword?'忘记密码？':'设置密码'}}</a>
                  </span>
                </div>
                <p class="tips" :class="[passwordLength?'error-tips':'']">{{payOrderData.hasPayPassword?'请输入6位支付密码':'请设置支付密码'}}</p>
              </div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <!-- 余额不足或者没有设置支付密码的不能确认支付 -->
          <el-button type="danger" v-if="!payOrderData.balanceCanPay||!payOrderData.hasPayPassword" disabled>确 认 支 付</el-button>
          <el-button type="danger" v-else @click="confirmPayment()">确 认 支 付</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="container">
      <div class="leftcontent">
        <div class="toggleTab">
          <span v-for="(item,index) in tabsName" :key="index" @click="toggleTabs(index)" :class="{active:index==nowIndex}">{{item}}
          </span>
          <i v-if="nowIndex===1" style="color:#4A4A4A;font-size:18px">({{$store.state.commentNum}})</i>
        </div>
        <div class="middle">
          <!-- 介绍 -->
          <div v-show="nowIndex===0" class="introduce">
            <h3>课程简介</h3>
            <div v-html="handleHtml(courseDetail.courseDescription)" class="answer-details"></div>
          </div>
          <!-- 评论 -->
          <comment-com v-show="nowIndex===1" @getTotal="getTotal" :canComment="courseDetail.purchaseStatus||courseDetail.price=='0.00'" :self="$store.state.userInfo.accountId&&(courseDetail.accountId==$store.state.userInfo.accountId)"></comment-com>
        </div>
      </div>
      <div class="rightContent">
        <div class="teacher">
          <h3 class="font-16">讲师简介</h3>
          <div class="teaInfo">
            <div class="photo">
              <img @click="openTeacherHome(courseDetail.accountId)" :src="courseDetail.avatar?$store.state.imageDomain + courseDetail.avatar : require('@/assets/images/err-header-icon01.png')" alt="">
              <span @click="openTeacherHome(courseDetail.accountId)" class="name font-16">{{courseDetail.realName}}</span>
            </div>
            <span @click="openTeacherHome(courseDetail.accountId)" class="goto gray">查看主页
              <i class="el-icon-arrow-right"></i>
            </span>
          </div>
          <div class="motto">{{courseDetail.introduction}}</div>
        </div>
        <div class="download">
          <img class="qr" :src="$store.state.imageDomain + 'images/download/bgy_download.png'" alt="">
          <div class="downPro">
            <p>扫码下载百工驿APP</p>
            <p>工程人都在用的分享交流神器</p>
          </div>
        </div>
      </div>
    </div>
    <videoPlayer :videoVal='videoVal'></videoPlayer>
  </div>
</template>

<script>
import commentCom from '@/components/commentCom'
import store from '@/store'
import api from '@/fetch'
import videoPlayer from '@/components/videoPlayer' // 视频插件
import vuePayPwd from '@/components/vuePayPwd' // 支付密码插件
export default {
  name: 'CourseDetail',
  props: {
    courseDetail: Object // 课程详情
  },
  components: {
    commentCom,
    videoPlayer,
    vuePayPwd
  },
  watch: {
    dialogVisible(val, old) {
      if (val == false) {
        this.loading = true
      }
    }
  },
  data() {
    return {
      tabsName: ['介绍', '评论'],
      nowIndex: 0,
      commentTotal: 0, // 评论总数
      dialogVisible: false, // 购买弹框
      // 支付
      payOrderParams: [
        {
          productId: this.$route.params.id,
          productType: 1
        }
      ],
      payOrderData: {}, // 订单数据
      // 收藏
      collectParams: {
        objId: this.$route.params.id,
        objType: 1
      },
      videoVal: {
        playerURL: '',
        dialogTableVisible: false
      },
      isCursor: true, //是否开启光标
      temporaryPassword: '', //临时支付密码
      passwordLength: false,
      isLocked: true, //防止重复提交
      loading: true //订单信息
    }
  },
  methods: {
    payPw(pw) {
      if (pw.length == 6) {
        this.temporaryPassword = pw
        this.passwordLength = false
      } else {
        this.temporaryPassword = ''
      }
    },
    // 确认支付
    confirmPayment() {
      if (!this.isLocked) return
      this.isLocked = false
      if (this.temporaryPassword.length == 6) {
        api
          .payOrder(this.payOrderData.id, this.temporaryPassword)
          .then(res => {
            this.$alert('支付成功，您可在“我的购买-课程”中随时学习该课程。', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.courseDetail.purchaseStatus = true //购买成功改变状态
                this.dialogVisible = false
              }
            })
          })
          .catch(res => {
            this.isLocked = true
          })
      } else {
        this.passwordLength = true
        this.isLocked = true
      }
    },
    // 立即学习
    goPlayFn() {
      if (!this.$store.state.userInfo.accountId) {
        this.$router.push('/login')
        return
      }
      var url = this.courseDetail.hlsUrl ? this.courseDetail.hlsUrl : this.courseDetail.url
      this.videoVal.playerURL = url.includes('http') ? url : this.$store.state.videoDomain + url
      this.videoVal.dialogTableVisible = true
    },
    async purchase() {
      if (!this.$store.state.userInfo.accountId) {
        this.$router.push('/login')
      } else {
        this.dialogVisible = true
        const res = await api.Order(this.payOrderParams)
        this.payOrderData = res.data
        api
          .OrderId(res.data.id)
          .then(resOk => {
            this.payOrderData = resOk.data
            this.loading = false
          })
          .catch(resOk => {
            this.loading = false
          })
      }
    },
    // 收藏，取消收藏
    async collect() {
      // 已登录--课程是否收藏
      if (this.$store.state.userInfo.accountId) {
        if (this.courseDetail.collectStatus) {
          const res = await api.cancelCollect(this.collectParams)
          this.courseDetail.collectStatus = false
        } else {
          const res = await api.addCollect(this.collectParams)
          this.courseDetail.collectStatus = true
        }
      } else {
        this.$alert('请登录后再收藏', {
          confirmButtonText: '去登录',
          callback: () => {
            this.$router.push('/login')
          }
        })
      }
    },
    // 标签切换
    toggleTabs(index) {
      this.nowIndex = index
    },
    getTotal(val) {
      this.commentTotal = val
    }
  },
  mounted() {
    console.log(this.$route.path, 'this.$route.query')
  }
}
</script>

<style lang="less" scoped>
.courseDetail {
  .course {
    height: 250px;
    border-radius: 10px;
    margin-top: 20px;
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px;
    .cover {
      width: 280px;
      height: 210px;
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .info {
      width: 760px;
      height: 100%;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      .price {
        margin-bottom: 60px;
      }
      .courseInfo {
        .title {
          font-weight: 700;
          margin-bottom: 10px;
          word-break: break-word;
        }
        .other {
          vertical-align: middle;
          span:nth-child(2n) {
            padding: 0 5px;
          }
        }
      }
      .detButton {
        /deep/.el-button {
          width: 90px;
          height: 34px;
          padding: 0;
        }
      }
    }
  }
  .shopping {
    /deep/.el-dialog {
      border-radius: 10px;
      .el-dialog__header {
        .el-dialog__title {
          font-size: 16px;
          line-height: 16px;
        }
      }
      .el-dialog__body {
        padding: 21px 20px 22px 20px;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        .order-info {
          margin-left: 107px;
          > p {
            margin-bottom: 20px;
            color: #999;
            span {
              margin-left: 20px;
              color: #333;
            }
          }
          > p:nth-child(1) {
            span:nth-child(1) {
              color: #999;
              margin-left: 0px;
            }
            span:nth-child(2) {
              max-width: 476px;
            }
          }
          .order-money {
            span {
              font-size: 16px;
              color: #e23732;
            }
          }
        }
        .pay-box {
          .pay-word-label {
            color: #999;
            float: left;
          }
          .pay-word-box {
            display: inline-block;
            margin-left: 22px;
            /deep/.disabled-input {
              pointer-events: none;
              ul {
                li {
                  background: rgba(242, 242, 242, 1);
                }
              }
            }
          }
          .forget-pas {
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            margin-left: 22px;
            color: #0066cc;
          }
          .tips {
            margin-top: 10px;
            height: 15px;
            line-height: 15px;
            font-size: 14px;
            color: rgba(213, 212, 212, 1);
            margin-left: 78px;
          }
          .error-tips {
            color: #e23732;
          }
        }
      }
      .el-dialog__footer {
        text-align: center;
        padding: 8px 0 9px;
      }
    }
  }

  .container {
    margin-top: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-bottom: 20px;
    .leftcontent {
      width: 780px;
      background-color: #fff;
      border-radius: 10px;
      padding-bottom: 20px;
      .toggleTab {
        cursor: pointer;
        position: relative;
        height: 50px;
        padding: 20px 0 0 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        color: #999;
        span + span {
          margin-left: 20px;
        }
        .active {
          position: relative;
          color: #4a4a4a;
          font-size: 18px;
          font-weight: 400;
        }
        .active::after {
          content: '';
          display: inline-block;
          position: absolute;
          bottom: -6px;
          left: 2px;
          height: 3px;
          width: 24px;
          background-color: #e43c31;
        }
      }
      .middle {
        // padding: 20px 20px 0 20px;
        height: cacl(100vh);
        .introduce {
          padding: 20px 20px 0 20px;
          min-height: calc(100vh - 520px);
          h3 {
            font-weight: bold;
            font-size: 16px;
            color: #4a4a4a;
            margin-bottom: 18px;
          }
          p {
            font-size: 14px;
            color: #666;
            margin-top: 20px;
          }
        }
      }
    }
    .rightContent {
      .teacher {
        width: 300px;
        height: 150px;
        border-radius: 10px;
        background-color: #fff;
        box-sizing: border-box;
        padding: 15px 8px 15px 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        color: #4a4a4a;
        .teaInfo {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          .goto {
            cursor: pointer;
          }
          .photo {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            img {
              width: 60px;
              height: 60px;
              border-radius: 50%;
            }
            .name {
              cursor: pointer;
              margin-left: 10px;
              font-weight: bold;
              width: 120px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .motto {
          color: #666;
          width: 260px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .download {
        width: 300px;
        border-radius: 10px;
        box-sizing: border-box;
        background-color: #fff;
        margin-top: 20px;
        padding: 20px 0 20px 20px;
        .downPro {
          display: inline-block;
          vertical-align: middle;
          margin-left: 5px;
          p {
            height: 20px;
            line-height: 20px;
          }
        }
      }
    }
  }
}
em,
i,
s {
  font-style: normal;
  text-decoration: none;
}
</style>
