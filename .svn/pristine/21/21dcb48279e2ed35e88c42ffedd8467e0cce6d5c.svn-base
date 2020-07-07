<template>
  <div class="entry-forget">
    <div class="header">
      <div class="logo">
        <a href="/" class="fl">
          <img src="@/assets/images/logo214-49.png" alt="">
        </a>
      </div>
      <div class="list font-14 gray">
        <span>已有账号，
          <router-link to="/login" class="red">去登录</router-link>
        </span>
        <span>|</span>
        <router-link to="/index" class="gray">返回首页</router-link>
      </div>
    </div>
    <div class="content">
      <el-card class="forget">
        <div class="text">找回密码</div>
        <div class="form">
          <el-form :model="ruleForm" :rules="forgetRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="mobile">
              <el-input type="text" v-model.trim="ruleForm.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item class="code" prop="smsVerifyCode">
              <el-input class="inputCode" v-model.trim="ruleForm.smsVerifyCode" placeholder="请输入验证码"></el-input>
              <!-- <el-button class="getCode" :disabled='isDisabled' @click="sendCode">{{buttonText}}</el-button> -->
              <el-button class="getCode" v-show="show" @click="sendCode">{{yzCode}}</el-button>
              <el-button class="getCode" v-show="!show">{{count}} S后重新获取</el-button>
            </el-form-item>
            <!-- 添加key值 是因为 重新获取验证码的时候 滑动认证 会重头开始 -->
            <slide-verify @getVerify="getVerify" :verifyVal='verifyVal' v-if='verifyFlag' :key="uploadKey"></slide-verify>
            <el-form-item class="password" prop="password">
              <el-input :type="passType" v-model.trim="ruleForm.password" placeholder="密码(6-20位)"></el-input>
              <div class="closeeyes">
                <!-- <img @mousedown="showPassword" @mouseleave="closePassword" src="@/assets/images/closeEyes.png" alt=""> -->
                <img @click='lookPassword' v-if='!lookPW' src="@/assets/images/closeEyes.png" alt="">
                <img @click='lookPassword' v-if='lookPW' src='@/assets/images/liulan.png' />
              </div>
            </el-form-item>
            <el-form-item class="checkPass" prop="newPassword">
              <el-input class="password" :type="checkPasstype" v-model.trim="ruleForm.newPassword" placeholder="请再次输入密码"></el-input>
              <div class="closeeyes">
                <!-- <img @mousedown="showPassword2" @mouseleave="closePassword2" src="@/assets/images/closeEyes.png" alt=""> -->
                <img @click='lookPassword2' v-if='!lookPW2' src="@/assets/images/closeEyes.png" alt="">
                <img @click='lookPassword2' v-if='lookPW2' src='@/assets/images/liulan.png' />
              </div>
            </el-form-item>

            <el-form-item class="forgetButton">
              <el-button type="danger" class="button" @click="confirmChange('ruleForm')" :disabled="IsFordisable">确认修改</el-button>
            </el-form-item>
          </el-form>
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
import { validatorMobile, validatorPass, validatorCode } from '@/assets/js/validator.js'
import slideVerify from '@/components/slideVerify'
import api from '@/fetch'
export default {
  name: 'ForgetPassword',
  components: {
    slideVerify
  },
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空 '))
      } else {
        if (validatorMobile(value)) {
          api
            .checkMobile(value)
            .then(res => {
              callback(new Error('手机号未被注册'))
              return false
            })
            .catch(err => {
              if (/^1[3456789]\d{9}$/.test(value) != true) {
                callback(new Error('请输入正确的手机号'))
                return false
              } else {
                callback()
                return true
              }

            })
        } else {
          callback(new Error('请输入正确的手机号'))
          return false
        }
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (validatorPass(value)) {
          callback()
          return true
        } else {
          callback(new Error('请输入6-20位字母数字混合密码'))
          return false
        }
      }
    }
    const validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
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
      uploadKey: 1,
      ruleForm: {
        mobile: null,
        smsVerifyCode: null, // 短信验证码
        password: null,
        newPassword: null,
        slideVerify: false // 滑块验证
      },
      verifyVal: {
        width: 360,
        height: 30
      },
      lookPW: false,
      lookPW2: false,
      isDisabled: false,
      verifyFlag: false,
      show: true,
      count: 120,
      flag: '',
      yzCode: '获取验证码',
      passType: 'password',
      checkPasstype: 'password',
      IsFordisable: true,
      // 表单验证
      forgetRules: {
        mobile: [{ required: true, validator: validateMobile }],
        password: [{ required: true, validator: validatePass }],
        newPassword: [{ required: true, validator: validateCheckPass, trigger: 'blur' }],
        smsVerifyCode: [{ required: true, validator: validateCode }]
      }
    }
  },
  methods: {
    // // 显示密码
    // showPassword() {
    //   this.passType = 'text'
    // },
    // showPassword2() {
    //   this.checkPasstype = 'text'
    // },
    // // 隐藏密码
    // closePassword() {
    //   this.passType = 'password'
    // },
    // closePassword2() {
    //   this.checkPasstype = 'password'
    // },
    lookPassword() {
      if (this.lookPW) {
        this.lookPW = false
        this.passType = 'password'
      } else {
        this.lookPW = true
        this.passType = 'text'
      }
    },
    lookPassword2() {
      if (this.lookPW2) {
        this.lookPW2 = false
        this.checkPasstype = 'password'
      } else {
        this.lookPW2 = true
        this.checkPasstype = 'text'
      }
    },
    // 滑块验证
    getVerify(resVerify) {
      this.ruleForm.slideVerify = resVerify
      if (resVerify) {
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
                  this.count--;
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
    // 获取验证码
    sendCode() {
      const reg = /^1[13456789]\d{9}$/
      if (validatorMobile(this.ruleForm.mobile)) {
        // this.verifyFlag = true;
        api
          .checkMobile(this.ruleForm.mobile)
          .then(res => {
            this.$message({
              message: '手机号未被注册'
            })
            return false
          })
          .catch(err => {
            // if(this.yzCode == '获取验证码'){
               this.uploadKey++
               this.verifyFlag = true;
            // }else{
            //    this.getVerify(true)
            // }
          })
      } else {
        this.$message({
          message: '请先输入正确的手机号'
        })
      }
      // try {
      //   const reg = /^1[13456789]\d{9}$/
      //   if (this.ruleForm.mobile && reg.test(this.ruleForm.mobile) && this.ruleForm.slideVerify) {
      //     const res = await api.getSmsCode({ mobile: this.ruleForm.mobile })
      //     if (res.code === 200) {
      //       this.$message({
      //         message: '验证码已发送，120s内有效',
      //         type: 'success'
      //       })
      //       const TIME_COUNT = 120
      //       if (!this.timer) {
      //         this.count = TIME_COUNT
      //         this.show = false
      //         this.timer = setInterval(() => {
      //           if (this.count > 0 && this.count <= TIME_COUNT) {
      //             this.count--
      //           } else {
      //             this.show = true
      //             clearInterval(this.timer)
      //             this.timer = null
      //           }
      //         }, 1000)
      //       }
      //     }
      //   } else {
      //     this.$message({
      //       message: '请先输入正确的手机号并且滑动验证'
      //     })
      //   }
      // } catch (error) {
      //   console.log(error)
      // }
    },
    confirmChange(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.forgetPwd(this.ruleForm).then(res => {
              api
              .passLogin({
                loginName: this.ruleForm.mobile,
                password: this.ruleForm.newPassword
              })
              .then(res => {
                window.localStorage.token = res.data.token
                this.$store.commit('setUser', res.data)
                this.$route.query.redirectUrl ? location.replace(this.$route.query.redirectUrl) : location.replace('/')
              })
            this.$message({
              message: '密码修改成功',
              type: 'success'
            })
            // this.$router.push('/login')
          })
        }
      })
    }
  },
  watch: {
    ruleForm: {
      handler(newVal, oldVal) {
        var vals = validatorMobile(this.ruleForm.mobile) && validatorPass(this.ruleForm.password) && validatorPass(this.ruleForm.newPassword) && validatorCode(this.ruleForm.smsVerifyCode) && this.ruleForm.slideVerify
        if (vals) {
          this.IsFordisable = false
        } else {
          this.IsFordisable = true
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.entry-forget {
  width: 1100px;
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
  .content {
    height: 600px;
    background-color: #fff;
    .forget {
      width: 360px;
      height: 550px;
      margin: 0 auto;
      padding-top: 50px;
      box-shadow: none;
      border: none;
      .text {
        text-align: center;
        margin-bottom: 50px;
        font-size: 16px;
        font-weight: 800;
      }
      .closeeyes {
        position: absolute;
        top: 0;
        right: 10px;
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
        .inputCode {
          position: relative;
          /deep/ .el-input__inner {
            padding-right: 100px;
            box-sizing: border-box;
          }
        }
        .getCode {
          // color:#666;
          position: absolute;
          top: 10px;
          right: 15px;
        }
      }
      .forgetButton {
        margin-top: 60px;
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
  /deep/ .el-form {
    .checkPass,
    .password {
      position: relative;
    }
    .el-input__inner {
      padding-right: 30px;
      box-sizing: border-box;
    }
    .closeeyes {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
