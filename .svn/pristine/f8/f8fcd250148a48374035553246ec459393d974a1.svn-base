import api from '@/fetch'
import axios from 'axios'
export default {
  data() {
    return {
      dateNow: '',
      imgFileSuffix: ['.jpg', '.jpeg', '.png', '.bmp'],
      imageUrl: '',
      imgUploading: false
    }
  },
  methods: {
    // 获取日期
    getDateFn() {
      let date = new Date()
      let Y = date.getFullYear()
      let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.dateNow = Y + M + D
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
    },
    async uploadFile(event, type) {
      let files = event.target.files || event.dataTransfer.files
      if (!files.length) return
      for (let index = 0; index < files.length; index++) {
        let file = files[index]
        let fileType = this.get_suffix(file.name)
        if (!this.imgFileSuffix.includes(fileType)) {
          this.$refs['file-input'].value = ''
          return this.$message.warning('仅支持jpg/jpeg/png/bmp格式图片')
        }
        let maxsize = this.description ? this.description.maxsize : 4
        if (file.size / 1024 / 1024 > maxsize) {
          this.$refs['file-input'].value = ''
          return this.$message.warning('图片最大' + maxsize + 'M')
        }
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
        let path = `images/${this.dateNow}/${renderNum}${fileType}`
        sendData.append('key', path)
        sendData.append('OSSAccessKeyId', dataKey.accessKeyId)
        sendData.append('signature', signature)
        sendData.append('x-oss-security-token', dataKey.securityToken)
        sendData.append('policy', policyBase64)
        sendData.append('success_action_status', 200) // 指定返回的状态码
        sendData.append('file', file)
        this.imgUploading = true
        try {
          await axios.post(ossUrl, sendData)
          /* 富文本需要拼接ossUrl */
          this.imageUrl = type !== 'forEditor' ? path : ossUrl + path
          type !== 'forEditor' && this.$emit('input', path)
        } catch (error) {
          this.$message.error('图片上传失败')
        }
        this.imgUploading = false
      }
      this.$refs['file-input'].value = ''
    }
  },
  mounted() {
    this.getDateFn()
  }
}
