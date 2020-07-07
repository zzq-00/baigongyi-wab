<<template>
  <div class='paySubmitPassword'>
      <div class='paySubmitPassword_nav'>
          <p>{{$route.query.set?'设置支付密码':'修改支付密码'}}</p>
            <div>
                <p>
                    <em>1</em>
                    <span>验证身份</span>
                </p>
                <span></span>
                <p>
                    <em>2</em>
                    <span>重置支付密码</span>
                </p>
                <span></span>
                <p class='redBorder'>
                    <em>3</em>
                    <span>完成</span>
                </p>
            </div>
      </div>
      <div class='paySubmitPassword_main'>
         <h4>设置6位数字支付密码</h4>
         <div class="input-box">
                <div class="input-content">
                    <input v-model.number="val0" ref="val0" maxlength="1" pattern="[0-9]*" @keydown.8="deleteNumber('val0','val0')" @keyup="changeNumber($event,'val0','val1',val0)" :type="typeVal" placeholder="" style="color:#606266" autofocus="autofocus">
                    <input v-model.number="val1" ref="val1" maxlength="1" pattern="[0-9]*" @keydown.8="deleteNumber('val1','val0')" @keyup="changeNumber($event,'val1','val2',val0)" :type="typeVal" placeholder="" style="color:#606266">
                    <input v-model.number="val2" ref="val2" maxlength="1" pattern="[0-9]*" @keydown.8="deleteNumber('val2','val1')" @keyup="changeNumber($event,'val2','val3',val0)" :type="typeVal" placeholder="" style="color:#606266">
                    <input v-model.number="val3" ref="val3" maxlength="1" pattern="[0-9]*" @keydown.8="deleteNumber('val3','val2')" @keyup="changeNumber($event,'val3','val4',val0)" :type="typeVal" placeholder="" style="color:#606266">
                    <input v-model.number="val4" ref="val4" maxlength="1" pattern="[0-9]*" @keydown.8="deleteNumber('val4','val3')" @keyup="changeNumber($event,'val4','val5',val0)" :type="typeVal" placeholder="" style="color:#606266">
                    <input v-model.number="val5" ref="val5" maxlength="1" pattern="[0-9]*" @keydown.8="deleteNumber('val5','val4')" @keyup="changeNumber($event,'val5','val5',val0)" :type.number="typeVal" placeholder="" style="color:#606266">
                </div>
                <img src='@/assets/images/liulanjin.png' alt='' v-if='!imgFlag' @click='showPassword'>
                <img src='@/assets/images/liulan.png' alt='' v-if='imgFlag' @click='showPassword'>
         </div>
         <div class="item_error">{{valueError}}</div>
         <button @click='paySubmit'>提交</button>
         <div class='tips'>
            <p>1、避免使用连续或重复的数字，类似"123456"、"112233" </p>
            <p>2、避免使用手机号、证件号中的连续数字</p>
         </div>
      </div>
  </div>
</template>
<script>
import api from '@/fetch'
export default {
  data() {
    return {
      val0: '',
      val1: '',
      val2: '',
      val3: '',
      val4: '',
      val5: '',
      typeVal: 'password',
      elError: true,
      imgFlag: false,
      valueError: '请输入6位支付密码',
      verification: ''
    }
  },
  mounted() {
    this.verification = this.$route.query.verification
  },
  methods: {
    changeNumber(e, inputValue, nextItem, code) {
      // 键盘抬起时$event，当前input，下一个input
      if (e.keyCode !== 8 && (code || code == '0') && this[inputValue].toString().slice(-1)) {
        this.$nextTick(() => {
          this.$refs[nextItem].focus() // 截取当前值最后一位，跳到下一个input
          this[inputValue] = this[inputValue].toString().slice(-1)
        })
        //验证码提示
        if (this.val0 && this.val1 && this.val2 && this.val3 && this.val4 && this.val5) {
          this.elError = false
        } else {
          this.elError = true
        }
      }
    },
    deleteNumber(inputValue, previousItem) {
      // 键盘按下时$event，当前input，上一个input
      if (this[inputValue].length > 0) {
        // 当前有值，清空之
        this[inputValue] = ''
      } else {
        // 当前没有值，光标跳转到上一个input，并清空该input值
        this.$nextTick(() => {
          this.$refs[previousItem].focus()
          this[previousItem] = ''
          this[inputValue] = ''
        })
      }
      //验证码提示
      if (this.val0 && this.val1 && this.val2 && this.val3 && this.val4 && this.val5) {
        this.elError = false
      } else {
        this.elError = true
      }
    },
    showPassword() {
      if (this.imgFlag) {
        this.imgFlag = false
        this.typeVal = 'password'
      } else {
        this.imgFlag = true
        this.typeVal = 'text'
      }
    },
    isRealNum(val) {
      // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
      if (val === '' || val == null) {
        return false
      }
      if (!isNaN(val)) {
        return true
      } else {
        return false
      }
    },
    paySubmit() {
      //api.infoPaypassword
      let reg = /^[0-9]*$/g
      if (this.val0 && this.val1 && this.val2 && this.val3 && this.val4 && this.val5) {
        if (
          this.isRealNum(this.val0) &&
          this.isRealNum(this.val1) &&
          this.isRealNum(this.val2) &&
          this.isRealNum(this.val3) &&
          this.isRealNum(this.val4) &&
          this.isRealNum(this.val5)
        ) {
          api
            .infoPaypassword({
              newPassword: this.val0 + this.val1 + this.val2 + this.val3 + this.val4 + this.val5,
              verifyCode: this.verification
            })
            .then(res => {
              if (this.$route.query.url) {
                this.$router.push({ path: this.$route.query.url })
              } else {
                this.$router.push({ path: '/modifiedSuccess', query: { Identification: 2 } })
              }
            })
        } else {
          this.$message({
            message: '请输入数值的支付密码'
          })
        }
      } else {
        this.$message({
          message: '请输入完整的支付密码'
        })
      }
      // } else {
      //     this.$message({
      //         message: "请输入正确的短信验证码",
      //     });
      // }
    }
  }
}
</script>
<style lang="less" scoped>
.paySubmitPassword {
  width: 100%;
  height: 100vh;
  background: #fff;
  margin-top: 20px;
  border-radius: 10px 10px 0 0;
}

.paySubmitPassword_nav {
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #dddddd;
  background: #fff;
  border-radius: 10px 10px 0 0;
  > p {
    color: #4a4a4a;
    font-size: 16px;
    line-height: 50px;
  }
  > div {
    display: flex;
    box-sizing: border-box;
    > p {
      > em {
        width: 21px;
        height: 21px;
        border: 1px solid #e23732;
        border-radius: 50%;
        color: #ffffff;
        display: inline-block;
        background: #e23732;
        margin-top: 14px;
        line-height: 22px;
        text-align: center;
        font-style: normal;
      }
      > span {
        font-weight: 500;
        color: #333333;
        padding-left: 10px;
        display: inline-block;
        margin-top: 14px;
        line-height: 22px;
      }
    }
    > span {
      display: inline-block;
      height: 2px;
      width: 40px;
      background: #000000;
      margin: 24px 10px 0;
    }
  }
  .redBorder {
    em {
      border: 1px solid #e23732;
      color: #e23732;
      background: #fff;
      font-style: normal;
    }
  }
}

.paySubmitPassword_main {
  width: 500px;
  margin: 0 auto;
  padding-top: 64px;
  box-sizing: border-box;
  > h4 {
    color: #4a4a4a;
    padding-bottom: 20px;
  }
  .input-box {
    display: flex;
    height: 45px;
    img {
      width: 20px;
      height: 20px;
      display: block;
      margin-left: 20px;
      margin-top: 12px;
      box-sizing: border-box;
    }
  }
  .input-content {
    width: 300px;
    height: 45px;
    border: 1px solid #bcbcbc;
    box-sizing: border-box;
    border-radius: 2px;
    > input {
      margin-top: 10px;
      height: 25px;
      width: 16.666%;
      text-align: center;
      border: none;
      border-right: 1px solid #bcbcbc;
      box-sizing: border-box;
      &:last-child {
        border: none;
      }
    }
  }
  .item_error {
    color: #d5d4d4;
    padding-top: 10px;
  }
  > button {
    width: 110px;
    height: 34px;
    background: #e23732;
    border-radius: 5px;
    color: #fff;
    margin-top: 40px;
  }
  .tips {
    padding-top: 55px;
    p {
      color: #999999;
      line-height: 20px;
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

