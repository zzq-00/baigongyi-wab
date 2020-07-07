<template>
  <div class="seeInformation">
    <div class="examineIng_nav">
      <p>讲师信息</p>
      <button v-if="!isEdit" @click="dialogTableVisible = true">修改讲师信息</button>
      <button v-if="isEdit" @click="dialogTableVisible = true">完善讲师信息</button>
    </div>
    <!-- <p v-if='data.status==1001' @click='openReason'>点击查看审核驳回原因</p> -->
    <ul>
      <li>
        <span>讲师姓名</span>
        <span style="width:calc(100% - 210px);word-break:break-all;">{{data.realName}}</span>
      </li>
      <li>
        <span>讲师头像</span>
        <img
          :src="data.avatar?$store.state.imageDomain + data.avatar : require('@/assets/images/err-header-icon01.png')"
          alt="讲师头像"
          class="hov"
        />
        <!-- <em class='hov' @click='opendialog'>调整头像位置</em> -->
      </li>
      <li>
        <span>注册协议</span>
        <span class="hov" @click="goto">《百工驿讲堂讲师注册协议》</span>
      </li>
      <li>
        <span>身份证明</span>
        <span v-if="data.certificateType==1">中国居民身份证</span>
        <span v-if="data.certificateType==2">护照</span>
      </li>
      <li>
        <span>手持证件正面照</span>
        <span>{{data.certificateFacade ? "已上传" : '未上传'}}</span>
      </li>
      <li>
        <span>手持证件反面照</span>
        <span>{{data.certificateBack ? "已上传" : '未上传'}}</span>
      </li>
      <li>
        <span>资格证书</span>
        <span style="width:calc(100% - 220px);line-height:24px;">{{book1}}{{book2 ? '(照片已上传)':''}}</span>
      </li>
      <li>
        <span style="margin-top:4px;">讲师简介</span>
        <span style="width:calc(100% - 220px);line-height:24px;">{{data.introduction}}</span>
      </li>
    </ul>
    <div class="Visible">
      <el-dialog title="验证身份" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
        <div class="el-dialog_mian">
          <div>
            <p>您已绑定手机号：{{$store.state.userInfo.mobile && $store.state.userInfo.mobile.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")}}</p>
            <!-- <button @click='getCode'>{{buttonText}}</button> -->
            <button class="getCode" v-show="show" @click="getCode">{{yzCode}}</button>
            <button class="getCode" v-show="!show">{{count}} S后重新获取</button>
          </div>
          <el-input v-model="value" placeholder="请输入手机验证码"></el-input>
          <slideVerify
            :verifyVal="verifyVal"
            @getVerify="getVerify"
            v-if="verifyFlag"
            :key="uploadKey"
          ></slideVerify>
        </div>
        <div class="el-dialog_footer">
          <button @click="dialogTableVisible = false">取消</button>
          <button @click="editSubmitFn">确认</button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { VueCropper } from "vue-cropper";
import slideVerify from "../../../components/slideVerify"; // 滑动验证
import api from "@/fetch";
import axios from "axios";
export default {
  components: {
    VueCropper,
    slideVerify
  },
  data() {
    return {
      isEdit: false,
      uploadKey: 1,
      data: {},
      book1: "",
      book2: "",
      verifyFlag: false,
      dialogTableVisible: false,
      value: "",
      moveVerify: false,
      show: true,
      count: 120,
      flag: '',
      yzCode: '获取验证码',
      verifyVal: {
        width: 460,
        height: 30
      }
    };
  },
  mounted() {
    this.myLecturerInfo()
    if (this.$route.query.isPrefect) {
      this.dialogTableVisible = true;
    }
    this.infoWasComplete()
  },
  methods: {
    //判断讲师信息是否完善
    infoWasComplete() {
      let id = JSON.parse(localStorage.getItem("userInfo")).accountId;
      api.infoWasComplete(id).then(res => {
        if (res.data == null || res.data == false) {
          this.isEdit = true;
        }
      });
    },
    openReason() {
      this.$alert(this.data.auditRemark, { confirmButtonText: "确定" });
    },
    myLecturerInfo() {
      api.myLecturerInfo(this.$store.state.userInfo.accountId).then(res => {
        if (res.data) {
          this.data = res.data;
          this.book1 = this.data.qualification.split("&")[0];
          this.book2 = this.data.qualification.split("&")[1];
        }
      });
    },
    goto() {
      let routeUrl = this.$router.resolve({ path: `lookAgreement` });
      window.open(routeUrl.href, "_blank");
    },
    // 滑块验证
    getVerify(resVerify) {
      this.moveVerify = resVerify
      if (resVerify) {
        api
          .getSmsCode({ mobile: this.$store.state.userInfo.mobile })
          .then(res => {
            if (res.code === 200) {
              if (res.code === 200) {
                this.$message({
                  message: "验证码已发送，120s内有效",
                  type: "success"
                });
                const TIME_COUNT = 120;
                if (!this.timer) {
                  this.count = TIME_COUNT;
                  this.show = false;
                  this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                      this.count--;
                      this.yzCode = "重新获取";
                    } else {
                      this.show = true;
                      clearInterval(this.timer);
                      this.timer = null;
                    }
                  }, 1000);
                }
              }
            }
          });
      } else {
        this.$message({
          message: "请拖动验证"
        });
      }
    },
    // 获取验证码
    getCode() {
      //if(this.yzCode == '获取验证码'){
      this.verifyFlag = true;
      this.uploadKey++;
      //   }else{
      //       this.getVerify(true)
      //   }
    },
    editSubmitFn() {
      if (this.value && this.moveVerify) {
        api
          .verifySmsCode({
            mobile: this.$store.state.userInfo.mobile,
            smsVerifyCode: this.value
          })
          .then(res => {
            this.$router.push("/applyTeacher/messageSbmit");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message({
          message: "请输入验证码或拖动验证"
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.seeInformation {
  height: 100%;
  overflow-y: scroll;
  background: #fff;
  border-radius: 10px 10px 0 0;
  > p {
    width: 140px;
    text-align: right;
    padding-top: 20px;
    padding-left: 73px;
    padding-right: 38px;
    color: #e23732;
    &:hover {
      cursor: pointer;
    }
  }
  > ul {
    padding-left: 32px;
    padding-top: 10px;
    > li {
      vertical-align: top;
      display: flex;
      span {
        display: block;
        padding: 15px 0;
        &:nth-child(1) {
          color: #666666;
          width: 98px;
          text-align: right;
          padding-right: 38px;
          font-weight: 500;
          vertical-align: top;
        }
        &:nth-child(2) {
          color: #333333;
          font-weight: 500;
        }
      }
      img {
        display: block;
        width: 120px;
        height: 120px;
        margin-top: 15px;
        margin-bottom: 15px;
        border-radius: 50%;
      }
      em {
        line-height: 140px;
        padding-left: 20px;
        color: #e23732;
        text-decoration: underline;
      }
      .hov {
        &:hover {
          color: #e23732;
          cursor: pointer;
        }
      }
    } // .hov:hover {
    //   cursor: pointer;
    // }
  }
  .examineIng_nav {
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #dddddd;
    background: #fff;
    > p {
      width: 100%;
      color: #4a4a4a;
      font-size: 16px;
      line-height: 50px;
    }
    > button {
      width: 120px;
      height: 34px;
      line-height: 34px;
      background: #e23732;
      color: #fff;
      margin-top: 8px;
      border-radius: 5px;
      &:hover {
        cursor: pointer;
      }
    }
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
em,
i,
s {
  font-style: normal;
  text-decoration: none;
}
</style>

