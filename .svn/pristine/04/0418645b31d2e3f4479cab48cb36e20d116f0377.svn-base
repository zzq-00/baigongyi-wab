<template>
  <div class="personalData">
    <div class="myTeacher_nav">
      <p>个人资料</p>
      <!-- <button @click="$router.push('/editPersonal/'+ $store.state.userInfo.accountId)">修改个人资料</button> -->
    </div>
    <div class="myTeacher_main">
      <!-- <show-personal :data='data'></show-personal> -->
      <div class="showPersonal">
        <ul>
          <div class="title_class" style="margin-top:20px;">
            <span>头像</span>
          </div>
          <li>
            <h4>用户头像</h4>
            <div class="user_img">
                 <img :src="personalData.avatar?$store.state.imageDomain + personalData.avatar : require('@/assets/images/err-header-icon01.png')" alt="用户头像" class="hov" />
                 <div class="user_img_desc">
                    <span v-if="!personalData.avatar" style="color:red;">待完善</span>
              <p>仅支持JPG、PNG、JPEG、BMP格式，文件小于4M</p>
                 </div>
            </div>
               <input ref="uploadimg" type="file" accept="image/*" value='编辑头像' @change="opendialog($event)" style="display:none"/>
                <button @click="openUploadImg">上传</button>
          </li>
          <div class="title_class">
            <span>基本资料</span>
            <el-progress v-if="personalData.completePoint!=100" :percentage="personalData.completePoint" style="display:inline-block;width:calc(100% - 92px)"  :format="format"></el-progress>
          </div>
            <li>
              <h4>昵称</h4>
              <div v-if="!nickShow">
                <span>{{personalData.nickName}}<span v-if="!personalData.nickName||!personalData.nickNameChanged" style="color:red;">待完善</span></span>
                <p v-if="!personalData.nickName">修改你的昵称</p>
              </div>
              <div v-if="nickShow">
                <el-input v-model.trim="newPersonalData.nickName" maxlength="20" show-word-limit></el-input>
              </div>
              <button @click="changeUserInfo('nickname')" v-if="!nickShow">修改</button>
              <div class="button" v-if="nickShow">
                <button @click='changeInfo' >保存</button>
                <button @click='nickShow = false' >取消</button>
              </div>
          </li>
          <li>
            <h4>职位</h4>
            <!-- <p>{{personalData.position}}</p> -->
             <div v-if="!positionShow">
               <span>{{personalData.position}}<span v-if="!personalData.position" style="color:red;">待完善</span></span>
              <p v-if="!personalData.position">填写你的职位</p>
            </div>
             <div  v-if="positionShow">
              <el-input v-model="newPersonalData.position" maxlength="50" show-word-limit></el-input>
            </div>
            <button @click="changeUserInfo('position')" v-if="!positionShow">修改</button>
            <div class="button" v-if="positionShow">
              <button @click='changeInfo' >保存</button>
              <button @click='positionShow = false' >取消</button>
            </div>
          </li>
          <li>
            <h4>公司</h4>
            <!-- <p>{{personalData.company}}</p> -->
             <div v-if="!companyShow">
               <span >{{personalData.company}}<span v-if="!personalData.company" style="color:red;">待完善</span></span>
              <p v-if="!personalData.company">填写你的公司</p>
            </div>
             <div  v-if="companyShow">
              <el-input v-model="newPersonalData.company" maxlength="50" show-word-limit></el-input>
            </div>
            <button @click="changeUserInfo('company')" v-if="!companyShow">修改</button>
            <div class="button" v-if="companyShow">
              <button @click='changeInfo' >保存</button>
              <button @click='companyShow = false' >取消</button>
            </div>
          </li>
          <li>
            <h4 style="margin-top:4px;">个人介绍</h4>
             <div v-if="!introductionShow">
               <span>{{personalData.introduction}}<span v-if="!personalData.introduction" style="color:red;">待完善</span></span>
              <p v-if="!personalData.introduction">填写职业技能、擅长的事情、喜欢的事情等</p>
            </div>
              <div  v-if="introductionShow">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="newPersonalData.introduction" maxlength="300" show-word-limit></el-input>
            </div>
            <button @click="changeUserInfo('introduction')" v-if="!introductionShow">修改</button>
            <div class="button" v-if="introductionShow">
              <button @click='changeInfo' >保存</button>
              <button @click='introductionShow = false' >取消</button>
            </div>
          </li>
        </ul>
        <div id="set-mask" class="changePhoto">
          <el-dialog title="编辑头像" :visible.sync="dialogTableVisible" :close-on-click-modal='false'>
            <div class="hint">
              <p class="font-14">拖动图片调整头像位置</p>
              <p class="font-12">仅支持JPG、PNG、JPEG、BMP格式，文件小于4M</p>
            </div>
            <div class="cropper-img" style="height:380px;">
              <vueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType" :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox" :original="option.original" :autoCrop="option.autoCrop" :fixed="option.fixed" :fixedNumber="option.fixedNumber" :centerBox="option.centerBox" :infoTrue="option.infoTrue" :fixedBox="option.fixedBox" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :maxImgSize="option.maxImgSize" @realTime="realTime"></vueCropper>
            </div>
            <p class="submit-img">
              <label class="againUpload btn btn-orange" for="uploads">重新上传</label>
              <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);" @change="uploadImg($event, 1)" />
              <el-button type="danger" @click="finish('blob')">保存</el-button>
              <!-- <input type="button" class="btn btn-blue" value="保存" @click="finish('blob')"> -->
            </p>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import api from '@/fetch'
import axios from 'axios'
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      dialogTableVisible: false,
      dataKey: {},
      personalData: {}, // 个人资料
      newPersonalData:{},
      nickShow:false,
      positionShow:false,
      companyShow:false,
      introductionShow:false,
      imgurl: '',
      imgFile: '',
      // percentage:0,
      option: {
        img: '', // 赋值报错
        outputSize: 0.8, // 剪切后的图片质量（0.1-1）
        full: false, // 输出原图比例截图 props名full
        outputType: 'jpeg', // 裁剪生成图片的格式
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        autoCropWidth: 300,
        autoCropHeight: 300,
        centerBox: true,
        maxImgSize: 3000
      }
    }
  },
  created() {
    this.getuserInfo()
    this.getAliyunKey();
  },
  methods: {
    format(){
      return  '完成进度：'+this.personalData.completePoint+'%';
    },
    openUploadImg(){
        this.$refs.uploadimg.click();
    },
    // 个人信息
    async getuserInfo() {
      const res = await api.getUserInfo(this.$store.state.userInfo.accountId)
      console.log(res)
      this.personalData = res.data
      let userInfo = JSON.parse(window.localStorage.userInfo)
      userInfo.avatar = this.personalData.avatar
      this.$store.commit('setUser', userInfo)
    },
    opendialog(e) {
      const files = e.target.files[0]
      const { name, size } = files
      let type = name.split('.')[1] 
      type = type.toLowerCase();
      if (type !== 'jpg' && type !== 'jpeg' && type !== 'jpeg' && type !== 'png' && type !== 'bmp') {
        this.$message({
          message: '照片jpg/jpeg/png/bmp格式图片!'
        })
        return false
      }
      if (size / 1024 / 1024 > 4) {
        this.$message({
          message: '照片最大4M!'
        })
        return false
      }
      this.dialogTableVisible = true;
      var _this = this;
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        _this.option.img = data;
      };
      reader.readAsArrayBuffer(file);
    },
    // 获取阿里云的授权码
    getAliyunKey(up, filename, ret) {
      api.aliyunConfig().then(res => {
        this.dataKey = res.data
      })
    },
    // 获取日期
    getDateFn() {
      var date = new Date()
      var Y = date.getFullYear()
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
      return Y + M + D + '/'
    },
    // 随机生成32位数字 字母组合的字符串
    generateUUID() {
      var d = new Date().getTime()
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
      })
      return uuid
    },
    // 上传图片（点击上传按钮）
    async finish(type) {
      let _this = this
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob(data => {
          const ossUrl = this.dataKey.host
          var policyText = {
            expiration: this.dataKey.expiration, // 设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
            conditions: [
              ['content-length-range', 0, 1048576000] // 设置上传文件的大小限制
            ]
          }
          const Base64 = require('js-base64').Base64
          var policyBase64 = Base64.encode(JSON.stringify(policyText))

          var bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, this.dataKey.accessKeySecret, { asBytes: true })
          var signature = Crypto.util.bytesToBase64(bytes)
          const sendData = new FormData()
          const renderNum = this.generateUUID()
          sendData.append('key', `images/${this.getDateFn()}${renderNum}.jpeg`)
          sendData.append('OSSAccessKeyId', this.dataKey.accessKeyId)
          sendData.append('signature', signature)
          sendData.append('x-oss-security-token', this.dataKey.securityToken)
          sendData.append('policy', policyBase64)
          sendData.append('success_action_status', 200) // 指定返回的状态码
          sendData.append('file', data)
          this.imgurl = `images/${this.getDateFn()}${renderNum}.jpeg`
          axios
            .post(ossUrl, sendData)
            .then(resd => {
              api.userAvatar({ avatar: this.imgurl }).then(res => {
                if (res.code === 200) {
                  this.$message({
                    message: '更换头像成功!',
                    type: 'success'
                  })
                  this.dialogTableVisible = false
                  this.option.img = ''
                  this.getuserInfo()
                }
              })
            })
            .catch(err => {
            })
        })
      }
    },
    // 选择本地图片
    uploadImg(e, num) {
      this.dialogTableVisible = true
      var _this = this
      // 上传图片
      var file = e.target.files[0]
      _this.fileName = file.name
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        this.$message({
          message: '图片类型必须是.gif,jpeg,jpg,png,bmp中的一种',
          type: 'error'
        })
        return false
      }
      var reader = new FileReader()
      reader.onload = e => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        _this.option.img = data;
      }
      reader.readAsArrayBuffer(file)
    },
    // 实时预览函数
    realTime(data) { },
    changeUserInfo(type){
      this.newPersonalData = {};
      this.nickShow = this.positionShow = this.companyShow = this.introductionShow =false;
       if(type == 'nickname'){
         this.newPersonalData.changedColumn = 1;
         this.$set(this.newPersonalData,'nickName',this.personalData.nickName)
         this.nickShow = true;
       }else if(type == 'position'){
         this.newPersonalData.changedColumn = 2;
         this.$set(this.newPersonalData,'position',this.personalData.position)
         this.positionShow = true;
       }else if(type == 'company'){
         this.newPersonalData.changedColumn = 3;
         this.$set(this.newPersonalData,'company',this.personalData.company)
         this.companyShow = true;
       }else if(type == 'introduction'){
         this.newPersonalData.changedColumn = 4;
         this.$set(this.newPersonalData,'introduction',this.personalData.introduction)
         this.introductionShow = true;
       }
    },
    changeInfo(){
      if(this.newPersonalData.hasOwnProperty("nickName")){
          if(!this.newPersonalData.nickName){
               return this.$message("用户昵称不能为空")
          }
      }
       api.updateUserInfo(this.newPersonalData).then(res=>{
            this.$message.success("修改成功");
            this.getuserInfo();
            if(this.newPersonalData.hasOwnProperty("nickName")){
                this.personalData.nickName = this.newPersonalData.nickName;
                this.nickShow = false;
            }else if(this.newPersonalData.hasOwnProperty('company')){
                this.personalData.company = this.newPersonalData.company;
                this.companyShow = false;
            }else if(this.newPersonalData.hasOwnProperty('position')){
                this.personalData.position = this.newPersonalData.position;
                this.positionShow = false;
            }else if(this.newPersonalData.hasOwnProperty('introduction')){
                this.personalData.introduction = this.newPersonalData.introduction;
                this.introductionShow = false;
            }
       })
    }
  }
}
</script>

<style lang="less" scoped>
.personalData {
  overflow: hidden;
}

.myTeacher_nav {
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #dddddd;
  background:#fff;
  border-radius:10px 10px 0 0;
  >p {
    color: #4a4a4a;
    font-size: 16px;
  }
  >button {
    width: 120px;
    height: 34px;
    background: #e23732;
    color: #fff;
    margin-top: 8px;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
    }
  }
  >div {
    display: flex;
    box-sizing: border-box;
    >p {
      >em {
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
        font-style:normal;
      }
      >span {
        font-weight: 500;
        color: #333333;
        padding-left: 10px;
        display: inline-block;
        margin-top: 14px;
        line-height: 22px;
      }
    }
    .redBorder {
      em {
        border: 1px solid #e23732;
        color: #e23732;
        background: #fff;
        font-style:normal;
      }
    }
    >span {
      display: inline-block;
      height: 2px;
      width: 40px;
      background: #666666;
      margin: 24px 10px 0;
    }
  }
}

.myTeacher_main {
  flex: 1;
  background: #fff;
  .showPersonal {
  >ul {
    overflow: hidden;
    .title_class{
      padding-left:20px;
      span{
         color: #4A4A4A;
         font-size: 18px;
         font-weight:bold;
         margin-right:20px;
      }
      /deep/.el-progress-bar{
        margin-left:30px;
        margin-right:20px;
        padding:0;
         width:calc(100% - 192px);
      }
    }
    li {
      display: flex;
      min-height: 90px;
      margin: 20px;
      border: 1px solid #DDDDDD;
      box-sizing: border-box;
      position: relative;
      >h4 {
        width:100px;
        padding-top: 22px;
        padding-left:22px;
        color: #4A4A4A;
        font-size: 18px;
      }

      >div{
        width:400px;
        padding:24px 0;
        span{
         width:400px;display:inline-block;line-height:24px
        }
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
        /deep/.el-input__inner{
          padding-right:46px;
        }
        /deep/.el-textarea__inner{
          width:400px;
          line-height: 24px;
          font-size: 14px;
        }
      }
      .user_img{
        padding-top:12px;
        display: flex;
        img{
          width:62px;
          height:62px;
          border-radius:50%;
        }
        .user_img_desc{
           padding:10px 0 0 10px;
        }
      }
      >button {
        position:absolute;
        right:22px;
        width:90px;
        height: 34px;
        color:#fff;
        border-radius: 5px;
        
        top:28px;
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
      
        top:28px;
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
    .changePhoto {
      /deep/.el-dialog__title {
        font-size: 16px;
      }
      /deep/.el-dialog__header {
        border-bottom: 1px solid #ddd;
      }
      /deep/.el-dialog__body {
        padding: 20px 20px;
      }
      .hint {
        p:first-child {
          font-weight: 400;
          color: #4a4a4a;
        }
        p:last-child {
          color: #999;
          margin: 10px 0 20px 0;
        }
      }
      .submit-img {
        text-align: center;
        margin-top: 10px;
        .againUpload {
          display: inline-block;
          width: 90px;
          height: 34px;
          line-height: 34px;
          text-align: center;
          border: 1px solid #ddd;
          border-radius: 5px;
          margin-right: 10px;
        }
        /deep/.el-button {
          padding: 0;
          width: 90px;
          height: 34px;
          line-height: 34px;
          text-align: center;
          border-radius: 5px;
        }
      }
    }
}
}
em, i, s {
  font-style: normal;
  text-decoration: none;
}
</style>
