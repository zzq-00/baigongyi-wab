<!-- 提现 -->
<template>
  <div class="withdrawal-pages">
    <div class="withdrawal-info clearfix">
      <img src="@/assets/images/tish.png" alt="" class="fl">
      <p class="fl">
        可提现余额<span>&yen;{{withdrawalInfo.availableAmount}}</span>,
        流水号：{{withdrawalInfo.serialNumber}}
      </p>
    </div>
    <div class="withdrawal-form">
      <div class="withdrawal-header clearfix">
        <span class="fl">提取余额到支付宝</span>
        <button class="fr" @click="$router.push(`/flowingWater?type=2`)">提现记录</button>
      </div>
      <div class="form-box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" hide-required-asterisk label-width="91px" class="demo-ruleForm">
          <div v-if="fristStep==1">
            <el-form-item label="支付宝姓名" prop="alipayUsername">
              <el-input v-model.trim="ruleForm.alipayUsername" style="width:260px;"></el-input>
            </el-form-item>
            <el-form-item label="支付宝账号" prop="alipayAccount">
              <el-input v-model.trim="ruleForm.alipayAccount" style="width:260px;"></el-input>
            </el-form-item>
            <el-form-item label="提现金额" prop="applyAmount">
              <el-input v-model.trim="ruleForm.applyAmount" style="width:260px;"></el-input>
              <span style="margin-left:10px;">元</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm','one')">下一步</el-button>
            </el-form-item>
          </div>
          <div v-else class="info-box">
            <el-form-item label="支付宝信息">
              <p class="zfb-info">{{ruleForm.alipayUsername}}</p>
              <p class="zfb-info">{{ruleForm.alipayAccount}}</p>
            </el-form-item>
            <el-form-item label="提现金额">
              <p class="apply-money">
                <span>{{ruleForm.applyAmount}}</span>元
              </p>
            </el-form-item>
            <el-form-item label="支付密码">
              <div class="clearfix">
                <vuePayPwd class="fl" :class="[!withdrawalInfo.hasPayPassword?'disabled-input':'']" :isCursor="isCursor" :pwdWidth="300" :pwdHeight="38" :getPassword="payPw">
                </vuePayPwd>
                <span class="fl forget-pas">
                  <a @click="gotoset()">
                    {{withdrawalInfo.hasPayPassword?'忘记密码？':'设置密码'}}
                  </a>
                </span>
              </div>
              <p class="tips" :class="[passwordLength?'error-tips':'']">{{withdrawalInfo.hasPayPassword?'请输入6位支付密码':'请设置支付密码'}}</p>
              <div class="btn-row">
                <span @click="extract()" :disabled="isLocked">确认提现</span>
                <span @click="gotoBack()">返回修改</span>
              </div>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
import vuePayPwd from '@/components/vuePayPwd' // 支付密码插件
export default {
  watch: {},
  data() {
    var checkAmount = (rule, value, callback) => {
      let abc
      if (value.indexOf('.') != -1 && value.length > 2) {
        abc = value.slice(2, 3)
      }
      if (value === '') {
        callback(new Error('请输入提现金额'))
      } else if (value <= 0 || abc == 0) {
        callback(new Error('提现金额不能小于0.1'))
      } else if (!/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(value)) {
        callback(new Error('提现金额为数字，且最多包含两位小数'))
      } else if (value > this.withdrawalInfo.availableAmount) {
        callback(new Error('提现金额不能大于可提现余额'))
      } else {
        callback()
      }
    }
    return {
      withdrawalInfo: {},
      ruleForm: {
        alipayUsername: '', //支付宝姓名
        alipayAccount: '', //支付宝账号
        applyAmount: '', //申请提现金额
        payPassword: '', //支付密码
        serialNumber: '', //提现流水号
        serialTime: '', //提现流水单创建时间
        type: 2 //提现方式，2为支付宝
      },
      rules: {
        alipayUsername: [{ required: true, message: '请输入支付宝姓名', trigger: 'blur' }],
        alipayAccount: [{ required: true, message: '请输入支付宝账号', trigger: 'blur' }],
        applyAmount: [{ validator: checkAmount, trigger: 'blur' }]
      },
      fristStep: 1,
      isCursor: true, //是否开启光标
      temporaryPassword: '',
      passwordLength: false,
      isLocked: true
    }
  },
  components: {
    vuePayPwd
  },
  watch: {
    $route() {
      this.fristStep = this.$route.query.fristStep
    }
  },
  methods: {
    gotoset() {
      window.localStorage.withdrawalInfo = JSON.stringify(this.ruleForm)
      let url = this.$route.path + `?fristStep=2`
      this.$router.push(`/modifyPayPassword?Identification=2${this.withdrawalInfo.hasPayPassword ? '' : '&set=sets'}&url=${url}`)
    },
    withdrawal() {
      api.withdrawal().then(res => {
        this.withdrawalInfo = res.data
      })
    },
    submitForm(formName, val) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (val == 'one') {
            this.fristStep = 2
            window.localStorage.withdrawalInfo = JSON.stringify(this.ruleForm)
            this.$router.push({ query: { fristStep: 2 } })
          }
        } else {
          return false
        }
      })
    },
    payPw(pw) {
      if (pw.length == 6) {
        this.temporaryPassword = pw
        this.passwordLength = false
      } else {
        this.temporaryPassword = ''
      }
    },
    extract() {
      if (!this.isLocked) return
      this.isLocked = false
      if (this.temporaryPassword.length == 6) {
        this.ruleForm.serialTime = this.withdrawalInfo.serialTime
        this.ruleForm.serialNumber = this.withdrawalInfo.serialNumber
        this.ruleForm.payPassword = this.temporaryPassword
        api
          .withdrawalApply(this.ruleForm)
          .then(res => {
            this.$router.push('/myWallet')
          })
          .catch(res => {
            this.isLocked = true
          })
      } else {
        this.passwordLength = true
        this.isLocked = true
      }
    },
    gotoBack() {
      this.fristStep = 1
      this.$router.push({ query: { fristStep: 1 } })
    }
  },
  mounted() {
    this.withdrawal()
    this.fristStep = this.$route.query.fristStep
    if (this.fristStep == 2) {
      this.ruleForm = JSON.parse(window.localStorage.withdrawalInfo)
    } else {
      localStorage.removeItem('withdrawalInfo')
    }
  }
}
</script>

<style lang="less" scoped>
.withdrawal-pages {
  width: 1100px;
  .withdrawal-info {
    margin-top: 22px;
    img {
      margin-right: 6px;
    }
    p {
      height: 16px;
      line-height: 16px;
      font-size: 14px;
      color: #999999;
      span {
        font-size: 16px;
        color: #e23732;
      }
    }
  }
  .withdrawal-form {
    background: #fff;
    border-radius: 10px;
    margin-top: 12px;
    height: calc(100vh - 150px);
    .withdrawal-header {
      padding: 0 20px;
      border-bottom: 1px solid #dddddd;
      > span {
        margin-top: 21px;
        font-size: 16px;
        color: #4a4a4a;
        line-height: 16px;
      }
      > button {
        cursor: pointer;
        width: 90px;
        height: 34px;
        background: #e23732;
        border-radius: 5px;
        color: #fff;
        margin: 7px 0 9px;
      }
      > button:hover {
        background: #f56c6c;
      }
    }
    .form-box {
      padding: 58px 20px 0 112px;
      /deep/.el-form {
        .el-form-item__label {
          font-size: 14px;
          color: #4a4a4a;
          padding-right: 21px;
          text-align: justify;
          text-align-last: justify;
        }
        .el-form-item {
          margin-bottom: 57px;
        }
        .info-box {
          .el-form-item {
            margin-bottom: 38px;
          }
          .zfb-info {
            word-break: break-all;
          }
        }
      }
      // /deep/.vuePayPwd {
      //   .pwd-wrap {
      //     li {
      //       height: 25px !important;
      //       line-height: 25px !important;
      //     }
      //   }
      // }
      /deep/.disabled-input {
        pointer-events: none;
        ul {
          li {
            background: rgba(242, 242, 242, 1);
          }
        }
      }
      .apply-money {
        span {
          font-size: 18px;
          color: #e23732;
          margin-right: 10px;
        }
      }
      .forget-pas {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        margin-left: 22px;
        color: #0066cc;
        cursor: pointer;
      }
      .tips {
        margin-top: 10px;
        height: 15px;
        line-height: 15px;
        font-size: 14px;
        color: rgba(213, 212, 212, 1);
      }
      .error-tips {
        color: #e23732;
      }
      .btn-row {
        margin-top: 43px;
        span:nth-child(1) {
          display: inline-block;
          text-align: center;
          width: 100px;
          height: 34px;
          background: #e23732;
          color: #fff;
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer;
        }
        span:nth-child(2) {
          display: inline-block;
          height: 15px;
          line-height: 15px;
          font-size: 14px;
          margin: 22px 0 0 9px;
          color: #0066cc;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
