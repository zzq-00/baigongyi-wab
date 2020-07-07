<template>
  <div id="cropper">
    <!-- 裁剪图片 -->
    <el-dialog
      title="裁剪图片"
      :visible.sync="showCropper"
      top="6vh"
      width="50%"
      height="600"
      class="cropper-dialog"
      center
    >
      <vue-cropper
        id="corpper"
        ref="cropper"
        :class="{ 'corpper-warp': showCropper }"
        v-bind="cropper"
      />
      <div v-if="showCropper" class="cropper-button">
        <el-button
          class="cancel-btn"
          size="small"
          @click.native="cancel"
          >取消</el-button
        >
        <el-button
          size="small"
          type="primary"
          :loading="loading"
          @click="upload"
          >完成</el-button
        >
      </div>
    </el-dialog>
    <div class="upload-content">
        <div class="title-tips" :class="{'flex': type!=='hasButton'}">
        <h5><span>*</span> {{description.title}}</h5>
        <p>{{description.desc}}</p>
        </div>
        <label for="img-upload" class="input-wrap">
        <div class="img-box" :style="{'width:': description.width, 'height': description.height}">
            <div class="icon-holder" v-if="!imageUrl">
            <i :class="[type==='hasButton'?'el-icon-plus gray':'el-icon-circle-plus red']"></i>
            <p v-show="type!=='hasButton'">上传{{type==='course'?'课程':'专栏'}}主页图</p>
            </div>
            <img v-else :src="$store.state.imageDomain + imageUrl" alt="" width="100%" height="100%">
        </div>
        <span class="el-button el-button--danger el-button--small" v-show="type==='hasButton'" type="danger" style="width: 100%;">上传</span>
        </label>
        <form ref="file-input-form">
          <input type="file" ref="file-input" accept="image/*" id="img-upload" @change="selectFile" v-show="false">
        </form>
    </div>
  </div>
</template>
<script>
// 截图图片组件
import { VueCropper } from 'vue-cropper'
import axios from 'axios'
import api from "@/fetch";
export default {
  props: {
    type: String,
    value: String,
    description: Object,
    fixedNumber: Array,
    cropperImg: String
  },
  components: {
    VueCropper
  },
  data() {
    return {
      imageUrl: '',
      fileSuffix: ['.jpg', '.jpeg', '.png', '.bmp'],
      // 图片截图
      loading: false,
      showCropper: false,
      cropper: {
        img: "",
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'png', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: this.fixedNumber[0], // 默认生成截图框宽度
        autoCropHeight: this.fixedNumber[1], // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: this.fixedNumber, // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      }
    };
  },
  watch: {
    value: function(val) {
      this.imageUrl = val;
    },
    cropperImg: function(val) {
      if(val) {
        this.cropper.img = val;
        this.showCropper = true;
      }
    }
  },
  methods: {
    async selectFile(e) {
      const file = e.target.files[0];
      const fileType = this.get_suffix(file.name)
      if (!this.fileSuffix.includes(fileType)) {
        // 重置input
        this.$refs['file-input-form'].reset()
        return this.$message.warning('仅支持jpg/jpeg/png/bmp格式图片')
      }
      const maxsize = this.description ? this.description.maxsize : 4
      if (file.size / 1024 / 1024 > maxsize) {
        // 重置input
        this.$refs['file-input-form'].reset()
        return this.$message.warning('图片最大' + maxsize + 'M')
      }
      try {
        // 读取文件
        const src = await this.readFile(file);
        this.cropper.img = src;
        this.showCropper = true;
      } catch (error) {
        console.log(error);
      }
    },
    readFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
          const data = e.target.result;
          resolve(data);
        };
        reader.onerror = () => {
          const err = new Error("读取图片失败");
          reject(err.message);
        };

        reader.readAsDataURL(file);
      });
    },
    cancel() {
      this.showCropper = false
      // 重置input
      this.$refs['file-input-form'].reset()
    },
    upload() {
      this.$refs.cropper.getCropBlob(imgRes => {
        this.uploadCropperFile(imgRes);
      });
    },
    
    async uploadCropperFile(blob) {
      // 因为截图后的图片格式为png，所以这里写死了
      let fileType = '.png'
      // 获取阿里云数据
      let { data: dataKey } = await api.aliyunConfig()
      let ossUrl = dataKey.host
      let policyText = {
        expiration: dataKey.expiration, // 设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
        conditions: [
          ['content-length-range', 0, 1048576000] // 设置上传文件的大小限制
        ]
      }
      let Base64 = require('js-base64').Base64
      let policyBase64 = Base64.encode(JSON.stringify(policyText))
      let bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, dataKey.accessKeySecret, { asBytes: true })
      let signature = Crypto.util.bytesToBase64(bytes)
      let sendData = new FormData()
      let renderNum = this.generateUUID()
      let path = `images/${this.getDateFn()}/${renderNum}${fileType}`
      sendData.append('key', path)
      sendData.append('OSSAccessKeyId', dataKey.accessKeyId)
      sendData.append('signature', signature)
      sendData.append('x-oss-security-token', dataKey.securityToken)
      sendData.append('policy', policyBase64)
      sendData.append('success_action_status', 200) // 指定返回的状态码
      sendData.append('file', blob)
      try {
        // 重新创建一个axios实例
        let uploadAxios = axios.create()
        // 开始上传
        this.loading = true;
        uploadAxios.post(ossUrl, sendData).then(res => {
          // 显示上传后的效果
          this.imageUrl = path
          // 值回传给父组件
          this.$emit('cropperedImg', path)
          // 重置input
          this.$refs['file-input-form'].reset()
          this.showCropper = false;
          this.loading = false;
        })
      } catch (error) {
        console.log(error)
        this.showCropper = false;
        this.loading = false;
        // 重置input
        this.$refs['file-input-form'].reset()
        this.$message.error('图片上传失败')
      }
    },
    
    // 获取日期
    getDateFn() {
      let date = new Date()
      let Y = date.getFullYear()
      let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return  Y + M + D
    },
    // 获取后缀名
    get_suffix(filename) {
      let pos = filename.lastIndexOf('.')
      return pos != -1 ? filename.substring(pos).toLowerCase() : ''
    },
    // 随机生成32位数字 字母组合的字符串
    generateUUID() {
      let d = new Date().getTime()
      let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
      })
      return uuid
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ #corpper {
  height: 400px;
  background-image: none;
  background: #fff;
  z-index: 1002;
  .cropper-modal {
    background: none;
  }
}
.cropper-dialog {
  height: 800px;
  text-align: center;
  .el-dialog__header {
    padding-top: 15px;
  }
  .el-dialog--center .el-dialog__body {
    padding-top: 0;
    padding-bottom: 15px;
  }
  .el-dialog {
    text-align: center;
  }
}
.cropper-button {
  z-index: 1003;
  text-align: center;
  margin-top: 20px;
  .el-button {
    font-size: 16px;
    cursor: pointer;
    text-align: center;
  }
  .cancel-btn {
    color: #373737;
  }
  .el-button:last-child {
    margin-left: 100px;
  }
}
.custom-upload {
  .tips {
    margin-top: 10px;
    color: red;
    font-size: 12px;
  }
  .clear-margin-top {
    margin-top: 0;
  }
}
.upload-content {
  width: 100%;
  box-sizing: border-box;
  .title-tips {
    &.flex {
      display: flex;
      align-items: center;
      > p {
        margin-top: 0;
        margin-left: 10px;
      }
    }
    > h5 {
      font-weight: normal;
      > span {
        color: #e23732;
      }
      & + p {
        color: #999;
        font-size: 12px;
        margin-top: 10px;
        line-height: 24px;
      }
    }
  }
  .input-wrap {
    display: block;
    width: 278px;
  }
  .img-box {
    width: 100%;
    height: 208px;
    border: 1px solid #ddd;
    background-color: #eeeeee;
    border-radius: 10px;
    box-sizing: border-box;
    margin: 10px 0 30px 0;
    text-align: center;
    position: relative;
    img{
      border-radius: 10px;
    }
    .icon-holder {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      > p {
        margin-top: 10px;
      }
      > i {
        font-size: 30px;
      }
    }
    & + p {
      width: 280px;
      height: 34px;
      line-height: 34px;
      color: #fff;
      background-color: #e23732;
      border-radius: 5px;
      text-align: center;
    }
  }
}
</style>
