<template>
  <div class='safetySet'>
    <div class='safetySet_nav'>
      安全设置
    </div>
    <div class='safetySet_main'>
      <ul>
        <li>
          <h4>用户账号</h4>
         <div v-if="!show">
           <p>{{userName}}<span style="font-size:14px" v-if="!userNameUpdated"> 待完善</span></p>
            <p v-if="!userNameUpdated">
            修改你的账号
          </p>
         </div>
         <div v-if="show">
           <el-input v-model="newUserName"></el-input>
           <p style="color:red;" v-if="repeat">*该账号已存在，再选一个吧</p>
         </div>
          <button @click='openInput' v-if="!show && userNameUpdated!=1">修改</button>
          <div class="button" v-if="show">
            <button @click='changeUserName' >保存</button>
            <button @click='show = false' >取消</button>
          </div>
        </li>
        <li>
          <h4>登录密码</h4>
          <p>
            安全性高的密码可以使账号更安全。建议您定期更换密码，请设置一个包含字母、数字或符号中至少两项且长度超过6位的密码。
          </p>
          <button @click='loginChangePassword'>修改</button>
        </li>
        <li>
          <h4>支付密码</h4>
          <p>
            建议您定期修改支付密码，提高安全性。
          </p>
          <button @click='payChangePassword'>修改</button>
        </li>
      
        <li>
          <h4>绑定手机</h4>
          <div>
            <p>您已绑定了手机：
              <span>{{$store.state.userInfo.mobile && $store.state.userInfo.mobile.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")}}</span>
            </p>
            <p>您的手机号可以用于登录、找回密码等。</p>
          </div>
          <button @click='bindingChangePassword'>修改</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
import { validatorUser, validatorMobile, validatorPass, validatorCode } from '@/assets/js/validator.js'
export default {
  data () {
    return {
       show:false,
       userName:undefined,
       newUserName:undefined,
       userNameUpdated:1,
       repeat:false
    }
  },
  methods :  {
    //登录 修改 按钮
    loginChangePassword () {
       this.$router.push({path:"/modifyPayPassword",query:{Identification:1}})
    },
    //支付 修改 按钮
    payChangePassword () {
      this.$router.push({path:"/modifyPayPassword",query:{Identification:2}})
    },
    //绑定手机 修改 按钮
    bindingChangePassword () {
      this.$router.push({path:"/modifyPayPassword",query:{Identification:3}})
    },
    changeUserName(){
      if(validatorUser(this.newUserName)){
        api.checkUsername({"userName":this.newUserName}).then(res=>{
          api.updateUserName(this.$store.state.userInfo.accountId,this.newUserName).then(res=>{
          this.$message.success(res.message);
          this.userName = this.newUserName;
          this.show=false;
          this.repeat = false;
          this.userNameUpdated = 1;
          })
        }).catch(err=>{
          console.log(err)
        if(err.code==400){
              this.$message("用户名支持中文、英文、数字、“-”、“_”组合，4~20字符,不能全部是数字");
        }
        })
      }else{
        this.$message("用户名支持中文、英文、数字、“-”、“_”组合，4~20字符,不能全部是数字");
      }
     
    },
    openInput(){
       this.show=true;
      this.newUserName = this.userName;  
    },
    async getUserInfo(){
      let res=await api.getUserInfo(this.$store.state.userInfo.accountId);
      this.userName=res.data.userName;
      this.userNameUpdated=res.data.userNameUpdated;
    }
  },
  mounted(){
    this.getUserInfo();
  }
}
</script>

<style lang="less" scoped>
.safetySet {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 10px 10px 0 0;
}

.safetySet_nav {
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #DDDDDD;
  box-sizing: border-box;
  color: #4A4A4A;
  font-size: 16px;
  padding-left: 20px;
}

.safetySet_main {
  >ul {
    li {
      display: flex;
      height: 90px;
      margin: 20px;
      border: 1px solid #DDDDDD;
      box-sizing: border-box;
      position: relative;
      >h4 {
        padding-top: 22px;
        padding-left:22px;
        color: #4A4A4A;
        font-size: 18px;
      }
      >p,>div {
          width: 400px;
          padding-left: 30px;
          padding-top: 26px;
          color: #666666;
      }
      >div{
        padding-top:24px;
        >p{
            &:nth-child(1){
              span{
                font-size:18px;
                color:#E23732;
              }
            }
            &:nth-child(2){
              padding-top:5px;
            }
        }
      }
      >button {
        position:absolute;
        right:22px;
        width:90px;
        height: 34px;
        color:#fff;
        border-radius: 5px;
        margin-top:-17px;
        top:50%;
        background:#E23732;
        &:hover{
          cursor: pointer;
        }
      }
      >.button{
        padding:0;
        position:absolute;
        right:22px;
        width:200px;
        height: 34px;
        color:#fff;
        margin-top:-17px;
        top:50%;
        button{
           width:90px;
        height: 34px;
        color:#fff;
        border-radius: 5px;
        background:#E23732;
        cursor:pointer;
        &:nth-child(2){
          margin-left:20px;
          background:#FFFFFF;
          color:#4A4A4A;
          border:1px solid #DFE6EC;
        }
      }
      }
    }
  }
}
</style>

