<template>
  <div class='fillInMessage'>

    <div class='myTeacher_nav'>
      <div>讲师入驻 <div class="reject" v-if="status===1001" @click="openReason">点击查看审核驳回原因</div>
      </div>

      <div>
        <p>
          <em>1</em>
          <span>签订入驻协议</span>
        </p>
        <span></span>
        <p class='agreementFlag'>
          <em>2</em>
          <span>填写资料并提交审核</span>
        </p>
      </div>
    </div>
    <div class='fillInMessage_main'>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" label-position="top" :inline='true' size="small">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="讲师姓名" prop="realName">
              <el-input v-model.trim="ruleForm.realName" placeholder="请输入您的真实姓名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="讲师头像">
              <div class="recommed">请上传本人真实照片。照片jpg/jpeg/png/bmp格式图片，最大4M，要求居中清晰。</div>
              <div class="upload-tx">
                <label for="TX">
                  <span class="iconTx">
                    <i class="el-icon-plus"></i>
                  </span>
                  <p>上传头像</p>
                  <input id="TX" accept="image/*" type="file" @change="onFileChangeTX($event)" />
                </label>
                <img v-if='avatarImg || ruleForm.avatar ? $store.state.imageDomain + ruleForm.avatar : null' :src='avatarImg ? avatarImg : $store.state.imageDomain + ruleForm.avatar' />
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="身份证明" prop="certificateType">
              <el-select v-model="ruleForm.certificateType" placeholder="请选择">
                <el-option label="中国居民身份证" value="1"></el-option>
                <el-option label="护照" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="手持证件正面照">
              <div class="recommed recommedRinght">
                请确保证件姓名、证件号码清晰可见 <br /> 照片支持jpg/jpeg/png/bmp格式图片，最大4M
              </div>
              <div class="upload-tx upload-sfz">
                <label for="TX">
                  <span class="iconTx">
                    <i class="el-icon-plus"></i>
                  </span>
                  <p>手持证件正面照</p>
                  <input id="TX" type="file" accept="image/*" @change="onFileChangeface($event)" />
                </label>
                <img v-if='sfzImg || ruleForm.certificateFacade' :src='sfzImg ? sfzImg : $store.state.imageDomain + ruleForm.certificateFacade' />
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="手持证件反面照">
              <div class="recommed recommedRinght">
                请确保证件姓名、证件号码清晰可见 <br /> 照片支持jpg/jpeg/png/bmp格式图片，最大4M
              </div>
              <div class="upload-tx upload-sfz">
                <label for="ZM">
                  <span class="iconTx">
                    <i class="el-icon-plus"></i>
                  </span>
                  <p>手持证件反面照</p>
                  <input id="ZM" type="file" accept="image/*" @change="onFileChangeCard($event)" />
                </label>
                <img v-if='sffImag || ruleForm.certificateBack' :src='sffImag ? sffImag : $store.state.imageDomain + ruleForm.certificateBack' />
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="资格证书" prop='book'>
              <!-- prop="qualification"-->
              <el-input v-model.trim="ruleForm.book" placeholder="请输入"></el-input>
              <div class="recommed recommedRinght" style='top:90px;'>
                请提交教学能力或专业能力证明，如职称证书、考级证书等（需包含官方证书等有效信息）。 <br /> 照片支持jpg/jpeg/png/bmp格式图片，最大4M，要求居中清晰。
              </div>
              <div class="upload-tx upload-sfz" style='margin-top:11px;'>
                <label for="ZM">
                  <span class="iconTx">
                    <i class="el-icon-plus"></i>
                  </span>
                  <p>上传证书照</p>
                  <input id="ZM" type="file" accept="image/*" @change="onFileChangeCardbook($event)" />
                </label>
                <img v-if='zjImg || ruleForm.qualification' :src='zjImg ? zjImg : $store.state.imageDomain +ruleForm.qualification' />
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="讲师简介" prop="introduction">
              <div class="recommed" style='margin-left:0;margin-top:-10px;'>请清晰、准确、真实地描述您的教学理念、目标服务群体、主要课程方向等，简介内容将会展示在你的课程/专栏主页以供学员参考，100字以内。</div>
              <el-input type="textarea" placeholder="请输入" v-model.trim="ruleForm.introduction" maxlength="100" show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class='fillInMessage_footer'>
      <button class='write' @click='perClick'>上一步</button>
      <button @click="submitForm('ruleForm')">提交审核</button>
    </div>
    <div id='set-mask'>
      <el-dialog title="调整头像位置" :visible.sync="dialogTableVisible" :close-on-click-modal='false'>
        <div class="cropper-img" style='height:380px;'>
          <div>拖动图片调整头像位置</div>
          <p>仅支持JPG、PNG、JPEG、BMP格式，文件小于4M</p>
          <vueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType" :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox" :original="option.original" :autoCrop="option.autoCrop" :fixed="option.fixed" :fixedNumber="option.fixedNumber" :centerBox="option.centerBox" :infoTrue="option.infoTrue" :fixedBox="option.fixedBox" :autoCropWidth="option.autoCropWidth" :autoCropHeight='option.autoCropHeight' :maxImgSize="option.maxImgSize" @realTime="realTime"></vueCropper>
        </div>
        <p class="submit-img">
          <input type="button" class="btn btn-blue" value="保存" @click="finish('blob')">
        </p>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import api from '@/fetch'
import axios from 'axios'
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      rejectReason: '暂无',
      status: -100,
      ruleForm: {
        avatar: '',
        certificateBack: '',
        certificateFacade: '',
        certificateType: '',
        introduction: '',
        qualification: '',
        realName: '',
        book: ''
      },
      avatarImg: '',
      sfzImg: '',
      sffImag: '',
      zjImg: '',
      rules: {
        realName: [{ required: true, message: '请输入讲师姓名', trigger: 'blur' }],
        certificateType: [{ required: true, message: '请选择身份证明', trigger: 'change' }],
        introduction: [{ required: true, message: '请输入讲师简介', trigger: 'blur' }],
        book: [{ required: true, message: '请上传资格证书和填写证书名', trigger: 'blur' }]
      },
      files: '',
      dataKey: {},
      g_dirname: '',
      dialogTableVisible: false,
      arrData: [],
      option: {
        img: '',
        // img: this.data.avatar, //赋值报错
        outputSize: 0.8, //剪切后的图片质量（0.1-1）
        full: false, //输出原图比例截图 props名full
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
  mounted() {
    this.getAliyunKey()
    this.getDateFn() // 获取年月日
    this.myLecturerInfo()
  },
  methods: {
    openReason() {
      this.$alert(this.rejectReason, { confirmButtonText: '确定' })
    },
    myLecturerInfo() {
      api.myLecturerInfo(this.$store.state.userInfo.accountId).then(res => {
        if (res.data) {
          this.status = res.data.status
          this.rejectReason = res.data.auditRemark
          this.arrData.push(res.data)
          if (this.arrData.lenght != 0) {
            this.ruleForm.avatar = this.arrData[0].avatar
            this.ruleForm.id = this.arrData[0].id
            this.ruleForm.certificateBack = this.arrData[0].certificateBack
            this.ruleForm.certificateFacade = this.arrData[0].certificateFacade
            this.ruleForm.certificateType = this.arrData[0].certificateType.toString()
            this.ruleForm.introduction = this.arrData[0].introduction
            this.ruleForm.realName = this.arrData[0].realName
            this.ruleForm.qualification = this.arrData[0].qualification && this.arrData[0].qualification.split('&')[1]
            this.ruleForm.book = this.arrData[0].qualification && this.arrData[0].qualification.split('&')[0]
          }
        }
      })
    },
    // 获取后缀名
    get_suffix(filename) {
      let pos = filename.lastIndexOf('.')
      return pos != -1 ? filename.substring(pos).toLowerCase() : ''
    },
    // 获取阿里云的授权码
    getAliyunKey(up, filename, ret) {
      api.aliyunConfig().then(res => (this.dataKey = res.data))
    },
    // 上一步
    perClick() {
      if (
        this.ruleForm.avatar ||
        this.ruleForm.certificateBack ||
        this.ruleForm.certificateFacade ||
        this.ruleForm.certificateType ||
        this.ruleForm.introduction ||
        this.ruleForm.realName ||
        this.ruleForm.qualification
      ) {
        this.$confirm('您将离开当前页面，离开后，已填信息将不做保留，是否确认离开？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          this.$router.push('/applyTeacher/agreement')
        })
      } else {
        this.$router.push('/applyTeacher/agreement')
      }
    },
    // 获取日期
    getDateFn() {
      var date = new Date()
      var Y = date.getFullYear()
      var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return Y + M + D
    },
    // 随机生成32位数字 字母组合的字符串
    generateUUID() {
      var d = new Date().getTime()
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
      })
      return uuid
    },
    upLoadFn(e, num) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      const file = files[0]
      const { name, size } = file
      const type = this.get_suffix(file.name)
      if (type !== '.jpg' && type !== '.jpeg' && type !== '.png' && type !== '.bmp') {
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
      const reader = new window.FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        if (num === 1) {
          this.avatarImg = e.target.result
        } else if (num === 2) {
          this.sfzImg = e.target.result
        } else if (num === 3) {
          this.sffImag = e.target.result
        } else if (num === 4) {
          this.zjImg = e.target.result
        }
      }
      const renderNum = this.generateUUID()
      sendData.append('key', `images/${this.getDateFn()}/${renderNum}${type}`)
      sendData.append('OSSAccessKeyId', this.dataKey.accessKeyId)
      sendData.append('signature', signature)
      sendData.append('x-oss-security-token', this.dataKey.securityToken)
      sendData.append('policy', policyBase64)
      sendData.append('success_action_status', 200) // 指定返回的状态码
      sendData.append('file', file)
      axios.post(ossUrl, sendData).then(res => {
        if (num === 1) {
          this.ruleForm.avatar = `images/${this.getDateFn()}/${renderNum}${type}`
        } else if (num === 2) {
          this.ruleForm.certificateFacade = `images/${this.getDateFn()}/${renderNum}${type}`
        } else if (num === 3) {
          this.ruleForm.certificateBack = `images/${this.getDateFn()}/${renderNum}${type}`
        } else if (num === 4) {
          this.ruleForm.qualification = `images/${this.getDateFn()}/${renderNum}${type}`
        }
      })
    },
    // 头像上传图片
    onFileChangeTX(e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      const file = files[0]
      const { name, size } = file
      const type = this.get_suffix(file.name)
      if (type !== '.jpg' && type !== '.jpeg' && type !== '.png' && type !== '.bmp') {
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
      this.dialogTableVisible = true
      var _this = this
      var reader = new FileReader()
      reader.onload = e => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        _this.option.img = data
      }
      reader.readAsArrayBuffer(file)
    },
    finish(type) {
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
          const reader = new window.FileReader()
          reader.readAsDataURL(data)
          reader.onload = e => {
            this.avatarImg = e.target.result
          }
          const renderNum = this.generateUUID()
          sendData.append('key', `images/${this.getDateFn()}${renderNum}.jpeg`)
          sendData.append('OSSAccessKeyId', this.dataKey.accessKeyId)
          sendData.append('signature', signature)
          sendData.append('x-oss-security-token', this.dataKey.securityToken)
          sendData.append('policy', policyBase64)
          sendData.append('success_action_status', 200) // 指定返回的状态码
          sendData.append('file', data)
          axios.post(ossUrl, sendData).then(res => {
            this.ruleForm.avatar = `images/${this.getDateFn()}${renderNum}.jpeg`
            this.dialogTableVisible = false
          })
        })
      }
    },
    realTime(data) {},
    // 上传资格证书
    onFileChangeCardbook(e) {
      this.upLoadFn(e, 4)
    },
    // 上传身份证 正面
    onFileChangeface(e) {
      this.upLoadFn(e, 2)
    },
    // 上传身份证 反面
    onFileChangeCard(e) {
      this.upLoadFn(e, 3)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            this.ruleForm.avatar &&
            this.ruleForm.certificateFacade &&
            this.ruleForm.certificateBack &&
            this.ruleForm.qualification
          ) {
            this.$confirm('审核期间，信息不可修改，请确认您当前填写的资料信息准确无误', '提示', {
              confirmButtonText: '确认提交',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.ruleForm.qualification = this.ruleForm.book + '&' + this.ruleForm.qualification
              delete this.ruleForm.book
              if (this.arrData.length != 0 && this.arrData[0].status == 1001) {
                this.ruleForm.id = this.arrData[0].id
                api.lecturerUpdata(this.ruleForm).then(res => {
                  if (res.code == 200) {
                    this.$message({
                      message: '讲师入驻成功!',
                      type: 'success'
                    })
                    // this.$emit('subMitClickChild', true)
                    this.$router.push('/applyTeacher/examineIng')
                  }
                })
              } else {
                api.lecturerData(this.ruleForm).then(res => {
                  if (res.code == 200) {
                    this.$message({
                      message: '讲师入驻成功!',
                      type: 'success'
                    })
                    //this.$emit('subMitClickChild', true)
                    this.$router.push('/applyTeacher/examineIng')
                  }
                })
              }
            })
          } else {
            this.$message('还有图片未上传！')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.fillInMessage {
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  /deep/ .el-form {
    .el-form-item__label {
      line-height: 14px;
      padding-bottom: 12px !important;
    }
    .el-form-item__label:before {
      margin-right: 2px;
      color: #e23732;
    }
    .el-input {
      width: 260px;
      height: 30px;
    }
    .el-input__inner {
      border-radius: 0;
    }
    .el-form-item {
      position: relative;
      width: 100%;
    }
    .el-textarea__inner {
      height: 150px;
    }
    .recommed {
      font-size: 12px;
      color: #999999;
      margin-top: -35px;
      margin-left: 80px;
    }
    .recommedRinght {
      position: absolute;
      left: 150px;
      top: 50px;
      width: 280px;
      line-height: 24px;
    }
    .upload-tx {
      width: 120px;
      height: 120px;
      position: relative;
      > label {
        display: block;
        width: 100%;
        height: 120px;
        background: #dddddd;
        border: 1px solid #eeeeee;
        border-radius: 10px;
        position: relative;
        > .iconTx {
          display: inline-block;
          width: 28px;
          height: 28px;
          background: #e23732;
          color: #fff;
          border-radius: 50%;
          text-align: center;
          line-height: 28px;
          position: absolute;
          left: 50%;
          margin-left: -14px;
          top: 42px;
        }
        > input {
          width: 100%;
          height: 120px;
          background: red;
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          z-index: 99;
          &:hover {
            cursor: pointer;
          }
        }
        > p {
          position: absolute;
          color: #4a4a4a;
          top: 80px;
          left: 32px;
        }
      }
      > img {
        width: 100%;
        height: 120px;
        border-radius: 10px;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    .upload-sfz {
      width: 200px;
      > label {
        > p {
          left: 51px;
        }
      }
    }
  }
}
.myTeacher_nav {
  .reject {
    margin-left: 20px;
    color: #e23732;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
  }
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
    .redBorder {
      em {
        border: 1px solid #e23732;
        color: #e23732;
        background: #fff;
        font-style: normal;
      }
    }
    > span {
      display: inline-block;
      height: 2px;
      width: 40px;
      background: #666666;
      margin: 24px 10px 0;
    }
  }
}
#set-mask {
  position: relative;
  /deep/.el-dialog {
    width: 550px !important;
    height: 595px !important;
    border-radius: 10px !important;
    .el-dialog__body {
      padding-top: 0px;
      border-top: 1px solid #dddddd;
    }
    .cropper-img {
      > div {
        padding-top: 20px;
        color: #4a4a4a;
      }
      > p {
        color: #999999;
        padding-top: 10px;
        padding-bottom: 20px;
      }
    }
    .submit-img {
      height: 50px;
      width: 100%;
      border-top: 1px solid #dddddd;
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      > input {
        width: 90px;
        height: 34px;
        background: #e23732;
        color: #fff;
        border-radius: 5px;
      }
    }
  }
}

.fillInMessage_main {
  flex: 1 auto;
  padding: 20px 32px;
  background: #fff;
}

.fillInMessage_footer {
  width: 100%;
  height: 50px;
  border-top: 1px solid #dddddd;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 90px;
    height: 34px;
    color: #fff;
    background: #e23732;
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid #e23732;
    &:nth-child(2) {
      margin-left: 5px;
    }
    &:hover {
      cursor: pointer;
    }
  }
  .write {
    background: #fff;
    border: 1px solid #dddddd;
    color: #4a4a4a;
    margin-right: 5px;
  }
}
em,
i,
s {
  font-style: normal;
  text-decoration: none;
}
</style>
