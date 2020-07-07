<template>
  <div class="idea-com" :key="updataKey">
    <VueEmoji ref="emoji" width="100%" :height="VueEmojiHeight" @input="onInput" />
    <div class="idea-publish">
      <div class="emoji-img">
        <span class="red span-emoji">
          表情
        </span>
        <el-popover placement="bottom" trigger="manual" v-model="uploadImgVisible">
          <ul class="img-list">
            <li v-for="(item,index) in imageList" :key="index">
              <el-image style="width: 100%; height: 100%" :src="$store.state.imageDomain + item.url" :preview-src-list="srcList">
              </el-image>
              <i class="el-icon-close" @click="delCurrent(item.url)"></i>
            </li>
            <li v-if="showAddIcon">
              <div class="el-icon-plus add-img" @click="$refs['file-input'].click()"></div>
            </li>
          </ul>
          <span class="red span-img" @click="showUpload" slot="reference">图片</span>
        </el-popover>
      </div>
      <el-button type="primary" @click="ideaAdd" :disabled="groupDetail.shield">发 布</el-button>
      <input type="file" multiple ref="file-input" accept="image/*" @change="uploadFile" v-show="false">
    </div>
  </div>
</template>

<script>
import VueEmoji from 'emoji-vue'
import uploadImg from '@/mixins/uploadImg.js'
import api from '@/fetch'

export default {
  props: {
    VueEmojiHeight: {
      default: '108'
    },
    type: {
      default: 'idea'
    },
    groupDetail: {
      type: Object,
      default: {}
    }
  },
  components: {
    VueEmoji
  },
  data() {
    return {
      uploadImgVisible: false,
      ideaText: '',
      imageUrl: '',
      imageList: [],
      updataKey: 1
    }
  },
  watch: {
    imageUrl: function(val) {
      // objType 想法=10 圈子=11
      let objType = this.type === 'idea' ? 10 : 11
      let imgObj = { objType, previewUrl: val, url: val }
      this.showAddIcon && this.imageList.push(imgObj)
    },
    imageList: function() {
      this.uploadImgVisible = !!this.imageList.length
    }
  },
  computed: {
    showAddIcon: function() {
      return this.imageList.length < 9
    },
    srcList: function() {
      return this.imageList.map(item => this.$store.state.imageDomain + item.url)
    }
  },
  mixins: [uploadImg],
  methods: {
    onInput(event) {
      this.ideaText = event.data.trim()
    },
    clearTextarea() {
      this.$refs.emoji.clear()
    },
    showUpload() {
      if (!this.uploadImgVisible && this.showAddIcon) return this.$refs['file-input'].click()
      this.uploadImgVisible = !this.uploadImgVisible
    },
    delCurrent(url) {
      let index = this.imageList.findIndex(item => item.url === url)
      this.imageList.splice(index, 1)
    },
    // 发布想法，圈子
    async ideaAdd() {
      if (this.ideaText == '' && !this.imageList.length) return this.$message.warning('请填写您的想法')
      if (this.ideaText && this.ideaText.length > 1000) return this.$message.warning('想法不要大于1000字')
      try {
        if (this.type === 'idea') {
          await api.ideaAdd({ content: this.ideaText, ideaImgs: this.imageList })
        } else if (this.type === 'groupWithId') {
          if (this.groupDetail.shutUp) return this.$message.warning('您已被禁言')
          let joinStatus
          if (this.groupDetail.join !== '3' && this.groupDetail.join !== '5' && this.groupDetail.join !== '10') {
            joinStatus = await this.applyToJoin(this.groupDetail)
            if (!joinStatus) return
          }
          if (joinStatus === '审核中') return this.$message.success('申请审核中...')
          await api.addMoment({
            accountId: this.$store.state.userInfo.accountId,
            content: this.ideaText,
            groupId: this.$route.params.id,
            ideaImgs: this.imageList
          })
        }
        this.ideaText = ''
        this.imageList = []
        this.updataKey++
        this.$emit('publishFinish')
      } catch (error) {}
    },
    // 申请加入圈子
    async applyToJoin(item) {
      try {
        let promptObj = {}
        if (item.type === 2) {
          promptObj = await this.$prompt('加入圈子参与互动，是否申请加入（最多100字）', '申请加入圈子', {
            closeOnClickModal: false,
            closeOnPressEscape: false,
            confirmButtonText: '申请加入',
            cancelButtonText: '取消',
            inputValidator: val => !!val && val.trim().length > 0 && val.length <= 100,
            inputErrorMessage: '字数不超过100'
          })
        } else {
          await this.$confirm('加入圈子参与互动，是否加入？', '提示', {
            closeOnClickModal: false,
            closeOnPressEscape: false,
            confirmButtonText: '加入圈子',
            cancelButtonText: '取消',
            type: 'warning'
          })
        }
        await api.applyGroup({ groupId: item.id, memberId: this.$store.state.userInfo.accountId, reason: promptObj.value || '' })
        if (item.type === 1) {
          item.join = '3'
          return '已加入'
        } else {
          item.join = '1'
          return '审核中'
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    let emojiVueDom = document.getElementsByClassName('emoji-vue-textarea')
    // emojiVueDom[1].setAttribute('contenteditable', 'plaintext-only')
    emojiVueDom[0].setAttribute('placeholder', '说出你的想法...')
    emojiVueDom[0].setAttribute('maxLength', 1000)
  }
}
</script>

<style lang="less" scoped>
.idea-com {
  .idea-publish {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    .emoji-img {
      .red {
        padding-left: 21px;
        margin-right: 30px;
        position: relative;
        cursor: pointer;
        &.span-emoji {
          background: url(~@/assets/images/biaoqing.png) no-repeat left/16px auto;
        }
        &.span-img {
          background: url(~@/assets/images/tupian.png) no-repeat left/16px auto;
        }
        &:focus {
          outline: none;
        }
      }
    }
  }
  /deep/ .emoji-picker-container {
    width: 100% !important;
  }
  /deep/ .emoji-wysiwyg-editor {
    padding-right: 6px;
    background-color: #f6f6f7;
    box-sizing: border-box;
    border: 0 none;
    border-radius: 5px;
    &:focus {
      outline: none;
    }
  }
  /* 把原版的emoji样式隐藏在下面😂 */
  /deep/ .emoji-picker-icon {
    top: initial;
    bottom: -48px;
    left: 0;
    width: 50px;
    opacity: 0;
  }
}
.img-list {
  max-width: 258px;
  overflow: hidden;
  > li {
    float: left;
    width: 80px;
    height: 80px;
    padding: 3px 3px;
    position: relative;
    .add-img {
      width: 76px;
      height: 76px;
      line-height: 76px;
      text-align: center;
      color: #ccc;
      border: 2px dashed #ddd;
      font-size: 22px;
      font-weight: bold;
    }
    .el-icon-close {
      cursor: pointer;
      display: none;
      color: #000;
      position: absolute;
      right: 3px;
      top: 3px;
      font-size: 20px;
      background-color: rgba(255, 255, 255, 0.6);
    }
    &:hover {
      .el-icon-close {
        display: block;
      }
    }
  }
}
</style>
