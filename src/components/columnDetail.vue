<!-- 专栏详情页 -->
<template>
  <div class="columnDetail">
    <div class="course clearfix">
      <div class="cover fl">
        <img :src="$store.state.imageDomain + columnDetail.image" alt="">
      </div>
      <div class="info fl">
        <div class="courseInfo">
          <h3 class="title font-18">{{columnDetail.name}}</h3>
          <div class="other font-14 gray">
            <span>观看：
              <i>{{columnDetail.watchCount}}</i> 次</span>
            <span> | </span>
            <span>讲师：
              <i>{{columnDetail.lecturerInfo.realName}}</i>
            </span>
            <span> | </span>
            <span v-if="columnDetail.status!=1000">{{columnDetail.auditTime|formatDate}}</span>
          </div>
        </div>
        <div class="price font-16" v-if="(columnDetail.accountId!=$store.state.userInfo.accountId)">
          <i v-if="!columnDetail.hasBuy" :class="!chargeFree(columnDetail.price) ? 'red' : 'purple'">{{!chargeFree(columnDetail.price) ? '&yen;'+columnDetail.price : '免费' }}</i>
        </div>
        <div class="detButton" v-show="!$store.state.userInfo.accountId||(columnDetail.accountId!=$store.state.userInfo.accountId)">
          <el-button type="danger" v-if="!chargeFree(columnDetail.price)&&!columnDetail.hasBuy" @click="purchase">立即购买</el-button>
          <el-button class="fr" v-if="!columnDetail.hasBuy" @click="collect()">{{columnDetail.hasCollected ? '已收藏' : '收藏'}}</el-button>
        </div>
      </div>
    </div>

    <!-- 立即购买 -->
    <div class='shopping'>
      <el-dialog title="确认订单" :visible.sync="dialogVisible" width="700px" :close-on-click-modal='false'>
        <div v-loading="loading">
          <div class="order-info">
            <p class="clearfix">
              <span class="fl">专栏名称</span>
              <span class="fl">{{columnDetail.name}}</span>
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
          <i v-if="nowIndex===2" style="color:#4A4A4A;font-size:18px">({{$store.state.commentNum}})</i>
        </div>
        <div class="middle">
          <div class="introduce" v-if="nowIndex===0">
            <div v-html="handleHtml(columnDetail.description)" class="answer-details"></div>
          </div>
          <div class="catalog" v-else-if="nowIndex===1">
            <ol v-for="(item,index) in columnCourseList.records" :key="index">
              <a href="javascript:;" v-on:click="goPlayFn(columnDetail,chargeFree(columnDetail.price),item)">
                <div style="text-align:left">
                  <span>{{item.name}}</span>
                  <span style="margin-left: 20px;color: #7355F6" v-if="item.allowAudition==1">免费试听</span>
                </div>
                <span> <img src="@/assets/images/shipin.png" alt=""></span>
              </a>
            </ol>
            <img src="@/assets/images/No-courses.png" v-if="columnCourseList.records==0">
            <div style="color: #BCBCC4;font-size: 15px" v-if="columnCourseList.records==0">暂无课程</div>
          </div>
          <comment-com v-else @getTotal="getTotal" :num="2" :canComment="columnDetail.hasBuy||chargeFree(columnDetail.price)" :self="$store.state.userInfo.accountId&&(columnDetail.accountId==$store.state.userInfo.accountId)"></comment-com>
        </div>
      </div>
      <div class="rightContent">
        <div class="teacher">
          <h3 class="font-16">讲师简介</h3>
          <div class="teaInfo">
            <div class="photo">
              <img @click="openTeacherHome(columnDetail.accountId)" :src="columnDetail.lecturerInfo.avatar?$store.state.imageDomain + columnDetail.lecturerInfo.avatar : require('@/assets/images/err-header-icon01.png')" alt="">
              <span @click="openTeacherHome(columnDetail.accountId)" class="name font-16">{{columnDetail.lecturerInfo.realName}}</span>
            </div>
            <span @click="openTeacherHome(columnDetail.accountId)" class="gray goto">查看主页
              <i class="el-icon-arrow-right"></i>
            </span>
          </div>
          <div class="motto">{{columnDetail.lecturerInfo.introduction}}</div>
        </div>
        <div class="subscribe">
          <p>订阅须知</p>
          <ul>
            <li>
              1、订阅成功后即可随时观看订阅内容
            </li>
            <li>
              2、请关注专栏更新时间，及时查看最新课程
            </li>
            <li>
              3、虚拟物品与服务购买后概不退换，请悉知
            </li>
          </ul>
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
  name: 'ColumnDetail',
  props: {
    sign: Number,
    columnDetail: {},
    columnCourseList: {}
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
      currentUser: true,
      tabsName: ['专栏介绍', '课程目录', '评论'],
      nowIndex: 0,
      commentTotal: 0, // 评论总数
      dialogVisible: false,
      // 收藏
      collectParams: {
        objId: this.$route.params.id,
        objType: 2 // 专栏
      },
      // 支付
      payOrderParams: [
        {
          productId: this.$route.params.id,
          productType: 2
        }
      ],
      videoVal: {
        playerURL: '',
        dialogTableVisible: false
      },
      payOrderData: {}, // 订单数据
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
            this.$alert('支付成功，您可在“我的购买-专栏”中随时学习该专栏。', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.columnDetail.hasBuy = true //购买成功改变状态
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
    chargeFree(price) {
      if (price == '0' || price == '0.00') {
        return true
      }
      return false
    },
    // 立即购买
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
    // 立即学习
    goPlayFn(columnDetail, free, item) {
      if (!this.$store.state.userInfo.accountId) {
        this.$router.push('/login')
        return
      }
      if (
        columnDetail.hasBuy ||
        free ||
        item.allowAudition == 1 ||
        this.$store.state.userInfo.accountId == columnDetail.accountId
      ) {
        var url = item.hlsUrl ? item.hlsUrl : item.url
        this.videoVal.playerURL = url.includes('http') ? url : this.$store.state.videoDomain + url
        this.videoVal.dialogTableVisible = true
      } else {
        this.$alert('购买后可观看视频', '提示', {
          confirmButtonText: '确定',
          callback: action => {}
        })
      }
    },
    // 标签切换
    toggleTabs(index) {
      this.nowIndex = index
    },
    // 评论总数
    getTotal(val) {
      this.commentTotal = val
    },
    // 收藏，取消收藏
    async collect() {
      // 已登录--课程是否收藏
      if (this.$store.state.userInfo.accountId) {
        if (this.columnDetail.hasCollected) {
          const res = await api.cancelCollect(this.collectParams)
          this.columnDetail.hasCollected = false
        } else {
          const res = await api.addCollect(this.collectParams)
          this.columnDetail.hasCollected = true
        }
      } else {
        this.$alert('请登录后再收藏', {
          confirmButtonText: '去登录',
          callback: () => {
            this.$router.push('/login')
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.columnDetail {
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
        .el-button {
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
              line-height: 19px;
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
          left: 0px;
          right: 0;
          margin: auto;
          height: 3px;
          width: 24px;
          background-color: #e43c31;
        }
      }
      .middle {
        .introduce {
          min-height: calc(100vh - 520px);
          padding: 20px 20px 0 20px;
          p {
            color: #666;
            line-height: 18px;
          }
        }
        .catalog {
          width: 100%;
          min-height: calc(100vh - 500px);
          text-align: center;
          > img {
            margin-top: 30px;
          }
          ol {
            position: relative;
            > a {
              padding: 0 20px;
              display: block;
              height: 50px;
              list-style-type: decimal;
              list-style-position: inside;
              display: flex;
              justify-content: space-between;
              align-items: center;
              span > img {
                margin-left: 30px;
              }
            }
            a:hover {
              background-color: #fef4f4;
              color: #e23732;
            }
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
      .subscribe {
        margin-top: 20px;
        padding: 19px 30px 17px 20px;
        background: rgba(255, 255, 255, 1);
        border-radius: 10px;
        width: 250px;
        height: 124px;
        font-size: 14px;
        color: #666666;
        line-height: 18px;
        p {
          margin-bottom: 12px;
          font-size: 16px;
          color: #4a4a4a;
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
