<template>
  <div class="userCenter">
    <div class="silder" v-if="isOwn">
      <div class="useTitle">用户中心</div>
      <el-menu :default-active="sliderIndex" @select='selectMenu'>
        <el-menu-item index="/myHome">我的主页 </el-menu-item>
        <el-menu-item index="/myBean">我的青豆</el-menu-item>
        <el-menu-item index="/myWallet">我的钱包</el-menu-item>
        <el-menu-item index="/myBuy">我的购买</el-menu-item>
        <el-menu-item index="/myLive">我的直播</el-menu-item>
        <el-menu-item index="/myLecture">我的讲堂</el-menu-item>
        <el-menu-item index="/myVideo">我的驿视频</el-menu-item>
        <el-menu-item index="/applyTeacher">讲师入驻</el-menu-item>
        <el-submenu index="/accountManage">
          <template slot="title">账号管理</template>
          <el-menu-item index="/safetySet">安全设置</el-menu-item>
          <el-menu-item index="/personalData">个人资料</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="main">
      <router-view :userInfoData='userInfoData' />
    </div>
    <div class='Visible'>
      <el-dialog title="验证身份" :visible.sync="dialogTableVisible" :close-on-click-modal='false'>
        <div class='el-dialog_mian'>
          <div>
            <p>您已绑定手机号：{{$store.state.userInfo.mobile && $store.state.userInfo.mobile.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")}}</p>
            <!-- <button @click='getCode'>{{buttonText}}</button> -->
            <button class="getCode" v-show="show" @click='getCode'>{{yzCode}}</button>
            <button class="getCode" v-show="!show">{{count}} S后重新获取</button>
          </div>
          <el-input v-model="value" placeholder="请输入手机验证码"></el-input>
          <slideVerify :verifyVal='verifyVal' @getVerify="getVerify" v-if='verifyFlag' :key="uploadKey"></slideVerify>
        </div>
        <div class='el-dialog_footer'>
          <button @click='dialogTableVisible = false'>取消</button>
          <button @click='editSubmitFn'>确认</button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
import slideVerify from '../../components/slideVerify' // 滑动验证
export default {
  components: {
    slideVerify
  },
  data() {
    return {
      uploadKey: 1,
      subMenu: [],
      userInfoData: {},
      verifyFlag: false,
      dialogTableVisible: false,
      value: '',
      moveVerify: false,
      show: true,
      count: 120,
      flag: '',
      yzCode: '获取验证码',
      verifyVal: {
        width: 460,
        height: 30
      }
    }
  },
  computed: {
    isOwn() {
      if (this.$route.query.id) {
        return this.$route.query.id === this.$store.state.userInfo.accountId
      }
      return true
    },
    sliderIndex() {
      if (this.$route.fullPath.includes('myHome')) return '/myHome'
      if (this.$route.fullPath.includes('myLecture')) return '/myLecture'
      if (this.$route.fullPath.includes('applyTeacher')) return '/applyTeacher'
      return this.$route.path
    }
  },
  methods: {
    selectMenu(index) {
      if (index === '/applyTeacher') return this.teacherFn()
      if (index === '/myLecture') return this.lectureFn()
      this.$router.push(index)
    },
    // 个人信息
    async getuserInfo(id) {
      if (!id) return this.$router.replace('/login')
      const res = await api.getUserInfo(id)
      this.userInfoData = res.data;
    },
    //点击我的讲堂  未入驻跳转协议   审核中跳转未入驻-审核    审核通过的进入我的讲堂
    lectureFn(){
      if (!this.userInfoData.wasTeacher) return this.teacherFn()
      this.$router.push('/myLecture')
    },
    teacherFn() {
      api
        .myLecturerInfo(this.$store.state.userInfo.accountId)
        .then(res => {
          if (res.data && res.data.status === 1000) {
            this.$router.push('/applyTeacher/examineIng')
          } else if (res.data.status === 1002) {
            this.$router.push('/applyTeacher/seeInformation')
          } else if (res.data.status === 1001) {
            this.dialogTableVisible = true
          }
        })
        .catch(err => {
          this.$router.push('/applyTeacher/agreement')
        })
    },
    // 滑块验证
    getVerify(resVerify) {
      this.moveVerify = resVerify
      if (resVerify) {
        api.getSmsCode({ mobile: this.$store.state.userInfo.mobile }).then(res => {
          if (res.code === 200) {
            if (res.code === 200) {
              this.$message({
                message: '验证码已发送，120s内有效',
                type: 'success'
              })
              const TIME_COUNT = 120
              if (!this.timer) {
                this.count = TIME_COUNT
                this.show = false
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--
                    this.yzCode = '重新获取'
                  } else {
                    this.show = true
                    clearInterval(this.timer)
                    this.timer = null
                  }
                }, 1000)
              }
            }
          }
        })
      } else {
        this.$message({
          message: '请拖动验证'
        })
      }
    },
    // 获取验证码
    getCode() {
      this.verifyFlag = true
      this.uploadKey++
    },
    editSubmitFn() {
      if (this.value && this.moveVerify) {
        api
          .verifySmsCode({
            mobile: this.$store.state.userInfo.mobile,
            smsVerifyCode: this.value
          })
          .then(res => {
            this.dialogTableVisible = false
            this.value = ''
            this.$router.push('/applyTeacher/messageSbmit')
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$message({
          message: '请输入验证码或拖动验证'
        })
      }
    }
  },
  mounted() {
    this.getuserInfo(this.$route.query.id || this.$store.state.userInfo.accountId)
  },
  beforeRouteUpdate(to, from, next) {
    this.getuserInfo(to.query.id || this.$store.state.userInfo.accountId)
    next()
  }
}
</script>

<style lang="less" scoped>
.userCenter {
  padding-top: 20px;
  display: flex;
  overflow: hidden;
  .silder {
    width: 220px;
    // height: 536px;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    position: fixed;
    top: 120px;
    .useTitle {
      height: 50px;
      border-radius: 10px 10px 0 0;
      background: #e23732;
      font-size: 18px;
      color: #fff;
      line-height: 50px;
      padding-left: 20px;
    }
    /deep/.el-menu {
      border: none;
      border-radius: 0 0 10px 10px;
      // padding-bottom: 60px;
    }
    /deep/.el-menu-item,
    /deep/.el-submenu__title {
      position: relative;
      height: 48px;
      line-height: 48px;
    }
    /deep/.el-menu-item:focus,
    /deep/.el-menu-item:hover,
    /deep/.el-menu-item:active,
    /deep/.el-submenu__title:hover {
      background-color: #f7f9fd;
    }
    /deep/.el-menu-item:hover::after,
    /deep/.el-menu-item:active::after {
      content: '';
      display: block;
      position: absolute;
      height: 16px;
      width: 3px;
      background-color: #f00;
      top: 0;
      bottom: 0;
      margin: auto;
      left: 0;
    }
    &+.main {
      margin-left: 240px;
    }
  }
  .main {
    border-radius: 10px;
    flex: 1;
    overflow: hidden;
  }
}
.Visible {
  /deep/ .el-dialog {
    width: 500px;
    height: 300px;
    position: relative;
    .el-dialog__header {
      border-bottom: 1px solid #ddd;
    }
    .el-dialog__body {
      padding-top: 20px;
    }
    .el-dialog_mian {
      > div {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        > p {
          color: #4a4a4a;
        }
        > button {
          background: #fff;
          border: none;
          color: #e23732;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .el-input__inner {
        height: 30px;
      }
    }
    .el-dialog_footer {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      border-top: 1px solid #dddddd;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      > button {
        box-sizing: bordre-box;
        width: 90px;
        height: 34px;
        border: 1px solid #dddddd;
        border-radius: 5px;
        color: #4a4a4a;
        background: #fff;
        &:nth-child(1) {
          margin-right: 5px;
        }
        &:nth-child(2) {
          margin-left: 5px;
          background: #e23732;
          color: #fff;
          border-color: #e23732;
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}

.el-dialog {
  .submit-img {
    display: flex;
    justify-content: center;
    input {
      width: 120px;
      height: 34px;
      background: #e23732;
      color: #fff;
      margin-top: 20px;
      border-radius: 5px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
