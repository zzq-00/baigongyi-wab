<template>
  <div class="entry-login">
    <div class="header">
      <div class="logo">
        <a href="/" class="fl">
          <img src="@/assets/images/logo214-49.png" alt="">
        </a>
      </div>
      <div class="list font-14 gray" v-show="currentPath!=='/login'">
        <span>已有账号，
          <a href="javascript:;" class="red">去登录</a>
        </span>
        <span>|</span>
        <a href="javascript:;" class="gray">返回首页</a>
      </div>
    </div>
    <div class="contain">
      <el-card class="login">
        <div class="loginTab">
          <span v-for="(item,index) in tabsName" :key="index" @click="toggleTabs(index)" :class="{active:index==nowIndex}">{{item}}
          </span>
        </div>
        <div class="form">
          <el-form :model="ruleForm" :rules="loginRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="loginName" v-if="nowIndex===1">
              <el-input type="text" v-model.trim="ruleForm.loginName" placeholder="请输入用户账号或手机号"></el-input>
            </el-form-item>
            <el-form-item prop="mobile" v-else-if="nowIndex===0">
              <el-input type="text" v-model.trim="ruleForm.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item class="password" prop="password" v-if="nowIndex===1">
              <el-input :type="typePass" v-model.trim="ruleForm.password" placeholder="请输入密码" @keyup.native.enter="login"></el-input>
              <div class="closeeyes">
                <img @click='lookPassword' v-if='!lookPW' src="@/assets/images/closeEyes.png" alt="">
                <img @click='lookPassword' v-if='lookPW' src='@/assets/images/liulan.png' />
              </div>
            </el-form-item>
            <el-form-item class="code" prop="smsVerifyCode" v-else-if="nowIndex===0">
              <el-input type="text" class="inputCode" v-model.trim="ruleForm.smsVerifyCode" placeholder="请输入验证码" @keyup.native.enter="login"></el-input>
              <!-- <el-button class="getCode" :disabled='isDisabled' @click="sendCode">{{buttonText}}</el-button> -->
              <el-button class="getCode" :disabled='isDisabled' v-show="show" @click="sendCode">{{yzCode}}</el-button>
              <el-button class="getCode" :disabled='isDisabled' v-show="!show">{{count}} S后重新获取</el-button>
            </el-form-item>
            <el-form-item class="loginButton">
              <el-button type="danger" class="button" @click="login" :disabled="loginIsdisable">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="other-option fr font-14">
          <router-link to="/forgetPassword" class="gray">忘记密码</router-link>
          <span>|</span>
          <router-link to="/register" class="red">注册</router-link>
        </div>
      </el-card>
    </div>
    <div class="footer">
      <div class="copyright font-12 gray">
        <p>Copyright(©)2017上海青矩互联网科技有限公司 版权所有</p>
        <p>沪ICP备16015426号-1</p>
      </div>
    </div>
  </div>
</template>

<script>
import { validatorUser, validatorMobile, validatorPass, validatorCode, validatorUserTel } from '@/assets/js/validator.js'
import api from '@/fetch'
export default {
  name: 'Login',
  data () {
    const validateUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户账号或手机号不能为空 '))
      } else {
        if (validatorUserTel(value)) {
          callback()
          return true
        } else {
          callback(new Error('格式不正确'))
          return false
        }
      }
    }
    const validateMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空 '))
      } else {
        if (validatorMobile(value)) {
          callback()
          return true
        } else {
          callback(new Error('请输入正确的手机号'))
          return false
        }
      }
    }
    // const validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入密码'))
    //   } else {
    //     if (validatorPass(value)) {
    //       callback()
    //       return true
    //     } else {
    //       callback(new Error('请输入6-20位字母数字混合密码'))
    //       return false
    //     }
    //   }
    // }
    const validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'))
      } else {
        if (validatorCode(value)) {
          callback()
          return true
        } else {
          callback(new Error('请输入正确的验证码'))
          return false
        }
      }
    }
    return {
      currentPath: this.$route.path,
      tabsName: ['免密码登录', '账号密码登录'],
      nowIndex: 0,
      typePass: 'password',
      loginIsdisable: true,
      isDisabled: false,
      show: true,
      count: 120,
      flag: '',
      yzCode: '获取验证码',
      timer: null,
      ruleForm: {
        loginName: '',
        mobile: '',
        password: '',
        smsVerifyCode: ''
      },
      lookPW: false,
      loginRules: {
        loginName: [{ required: true, validator: validateUser }],
        mobile: [{ required: true, validator: validateMobile }],
        // password: [{ required: true, validator: validatePass }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        smsVerifyCode: [{ required: true, validator: validateCode }]
      }
    }
  },
  watch: {
    ruleForm: {
      handler (newVal, oldVal) {
        if (this.nowIndex === 1) {
          this.loginIsdisable = true
          // validatorPass(this.ruleForm.password)
          if (validatorUserTel(this.ruleForm.loginName) && this.ruleForm.password) {
            this.loginIsdisable = false
          } else {
            this.loginIsdisable = true
          }
        } else {
          this.loginIsdisable = true
          if (validatorMobile(this.ruleForm.mobile) && validatorCode(this.ruleForm.smsVerifyCode)) {
            this.loginIsdisable = false
          } else {
            this.loginIsdisable = true
          }
        }
      },
      // deep属性对对象进行深度监听
      deep: true,
      immediate: true
    }
  },
  methods: {
    toggleTabs (index) {
      this.$refs.ruleForm.resetFields()
      this.nowIndex = index
    },
    lookPassword () {
      if (this.lookPW) {
        this.lookPW = false
        this.typePass = 'password'
      } else {
        this.lookPW = true
        this.typePass = 'text'
      }
    },
    // 获取验证码
    sendCode () {
      const reg = /^1[13456789]\d{9}$/
      if (reg.test(this.ruleForm.mobile)) {
        api.getSmsCode({ mobile: this.ruleForm.mobile }).then(res => {
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
        })
      }
    },
    login () {
      this.$refs.ruleForm.validate(isOk => {
        if (isOk) {
          if (this.nowIndex === 1) {
            api
              .passLogin({
                loginName: this.ruleForm.loginName,
                password: this.ruleForm.password
              })
              .then(res => {
                this.$store.commit('setUser', res.data)
                window.localStorage.token = res.data.token
                this.$route.query.redirectUrl ? location.replace(this.$route.query.redirectUrl) : location.replace('/')
              })
          } else {
            api
              .mobileLogin({
                mobile: this.ruleForm.mobile,
                smsVerifyCode: this.ruleForm.smsVerifyCode
              })
              .then(res => {
                this.$store.commit('setUser', res.data)
                window.localStorage.token = res.data.token
                this.$route.query.redirectUrl ? location.replace(this.$route.query.redirectUrl) : location.replace('/')
              })
          }
        }
      })
    }
  },
  computed: {}
}
</script>

<style lang="less" scoped>
.entry-login {
  width: 460px;
  height: 100vh;
  .header {
    height: 50px;
    margin: 100px 0 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .logo {
      width: 214px;
      height: 100%;
      img {
        width: 214px;
        height: 49px;
      }
    }
    .list {
      :nth-child(2) {
        padding: 0 20px;
      }
    }
  }

  .footer {
    margin: 20px 0;
    .copyright {
      p {
        text-align: center;
        &:nth-child(2) {
          padding-top: 5px;
        }
      }
    }
  }
  .contain {
    // background-color: #fff;
    width: 460px;
    .login {
      width: 460px;
      height: 340px;
      padding: 0 50px;
      box-sizing: border-box;
      background-color: #fff;
      .loginTab {
        cursor: pointer;
        position: relative;
        text-align: center;
        font-size: 16px;
        font-weight: 800;
        margin-bottom: 30px;
        margin-top: 30px;
        span {
          margin-top: 30px;
        }
        span:first-child {
          padding-right: 80px;
        }
        .active {
          position: relative;
          color: #e43c31;
        }
        .active::after {
          content: '';
          display: inline-block;
          position: absolute;
          bottom: -10px;
          left: 26px;
          height: 3px;
          width: 35px;
          background-color: #e43c31;
        }
      }
      .loginTab::after {
        content: '';
        position: absolute;
        top: 5px;
        left: 10px;
        right: 0px;
        margin: auto;
        height: 16px;
        width: 2px;
        background-color: #666;
      }
      .form {
        .password {
          position: relative;
          .closeeyes {
            position: absolute;
            top: 0;
            right: 10px;
          }
        }
        .code {
          /deep/.el-button {
            border: none;
            outline: none;
            padding: 0;
            width: auto;
            span {
              font-size: 14px;
            }
          }
        }
        .loginButton {
          margin-top: 30px;
        }
        .inputCode {
          position: relative;
        }
        .getCode {
          // color:#666;
          position: absolute;
          top: 15px;
          right: 20px;
        }
      }
      .other-option {
        span {
          margin: 0 15px;
        }
      }
    }
    /deep/.el-card.is-always-shadow,
    /deep/.el-card.is-hover-shadow:focus,
    /deep/.el-card.is-hover-shadow:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    }
  }
}
</style>
