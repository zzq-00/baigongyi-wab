<template>
  <div class="writeAnswer-page">
    <p class="writeAnswer-titles">{{$route.query.editOrNew=='new'?'写回答':'修改回答'}}</p>
    <div class="mains-content">
      <div class="writeAnswer-main">
        <p class="main-question-title">{{questionDetailsObj.title}}</p>
        <div class="main-questions-details" v-html="questionDetailsObj.stripHtmlContent" v-if="!desOpen"></div>
        <div v-html="handleHtml(questionDetailsObj.questionContent)" class="main-questions-details" v-if="questionDetailsObj.stripHtmlContent.length <= 125||desOpen">
        </div>
        <p class="writer-title">
          <span>*</span>
          请输入回答：
        </p>
        <Editor v-model="answerContent" />
      </div>
    </div>

    <div class="page-footer">
      <button @click="releaseAnswer()">发布</button>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
import Editor from '@/components/Editor.vue'

export default {
  components: {
    Editor
  },
  data() {
    return {
      questionDetailsObj: {
        stripHtmlContent: ''
      },
      desOpen: false, //是否展开描述
      answerContent: '', //回答
      loginaccountId: '',
      questionAnswerDtObj: {}, //问答
      isLocked: true
    }
  },
  watch: {},
  created() {
    window.expandDescription = this.expandDescription
  },
  computed: {},
  methods: {
    // 展开描述
    expandDescription(val) {
      val == 1 ? (this.desOpen = true) : (this.desOpen = false)
    },
    questionDetails() {
      api.questionDetails(this.$route.params.id).then(res => {
        this.questionDetailsObj = res.data.question
        if (this.questionDetailsObj.stripHtmlContent) {
          if (this.questionDetailsObj.stripHtmlContent.length > 125) {
            this.questionDetailsObj.stripHtmlContent =
              this.questionDetailsObj.stripHtmlContent.substring(0, 125) +
              '...' +
              `<span class="open-span" style='color: rgba(226, 55, 50, 1);cursor:pointer;margin-left:7px;' onclick="expandDescription('1')"}>展开描述<img src=${require('../../assets/images/Open.png')} alt="" style="margin-left:5px;"></span>`
            this.questionDetailsObj.questionContent =
              this.questionDetailsObj.questionContent +
              `<p style="text-align:right"><span style='color: rgba(226, 55, 50, 1);cursor:pointer;margin-left:7px;margin-right:10px;' onclick="expandDescription('2')">收起描述<img src=${require('../../assets/images/Retract.png')} alt="" style="margin-left:5px;display:inline-block;"></span><p>`
          } else {
            this.desOpen = true
          }
        }
      })
    },
    answerDetails() {
      api.answerDetails(this.$route.params.id).then(res => {
        this.questionDetailsObj = res.data.question
        this.questionAnswerDto = res.data.questionAnswerDto
        this.answerContent = this.questionAnswerDto.answerContent
        if (this.questionDetailsObj.stripHtmlContent) {
          if (this.questionDetailsObj.stripHtmlContent.length > 125) {
            this.questionDetailsObj.stripHtmlContent =
              this.questionDetailsObj.stripHtmlContent.substring(0, 125) +
              '...' +
              `<span class="open-span" style='color: rgba(226, 55, 50, 1);cursor:pointer;margin-left:7px;' onclick="expandDescription('1')"}>展开描述<img src=${require('../../assets/images/Open.png')} alt="" style="margin-left:5px;"></span>`
            this.questionDetailsObj.questionContent =
              this.questionDetailsObj.questionContent +
              `<p style="text-align:right"><span style='color: rgba(226, 55, 50, 1);cursor:pointer;margin-left:7px;margin-right:10px;' onclick="expandDescription('2')">收起描述<img src=${require('../../assets/images/Retract.png')} alt="" style="margin-left:5px;"></span><p>`
          } else {
            this.desOpen = true
          }
        }
      })
    },
    releaseAnswer() {
      if (!this.isLocked) return
      this.isLocked = false
      let strReplace = this.handleHtml(this.answerContent)
      if (strReplace.length) {
        let data = {
          answerContent: strReplace,
          id: this.$route.query.editOrNew == 'edit' ? this.questionAnswerDto.id : '', //问答id
          questionId: this.$route.query.editOrNew == 'edit' ? this.questionDetailsObj.id : this.$route.params.id
        }
        api
          .saveOrUpdateAnswer(data)
          .then(res => {
            // 跳转到我的主页 我的回答详情
            if (res.data) {
              this.$router.push(`/myReplyDetails/${res.data.id}`)
            } else {
              this.$message({
                message: '未获取到用户id',
                type: 'warning'
              })
              this.isLocked = true
            }
          })
          .catch(res => {
            this.isLocked = true
          })
      } else {
        this.$message.warning('请输入回答')
        this.isLocked = true
      }
    }
  },
  mounted() {
    if (this.$route.query.editOrNew == 'edit') {
      this.answerDetails()
    } else {
      this.questionDetails()
    }
    if (window.localStorage.userInfo) {
      this.loginaccountId = JSON.parse(window.localStorage.getItem('userInfo')).accountId
    }
  }
}
</script>
<style lang="less" scoped>
.writeAnswer-page {
  margin: 21px 0 29px 0;
  background-color: #fff;
  height: calc(100vh - 170px);
  .writeAnswer-titles {
    padding: 22px 0 12px 20px;
    height: 16px;
    border-bottom: 1px solid #dddddd;
    font-size: 16px;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
  }
  .mains-content {
    overflow: auto;
    .writeAnswer-main {
      width: 640px;
      margin: 0 auto;
      height: calc(100vh - 292px);
      margin-bottom: 20px;
      .main-question-title {
        line-height: 20px;
        font-size: 18px;
        font-weight: bold;
        color: rgba(74, 74, 74, 1);
        margin: 22px 0 17px 0;
      }
      .main-questions-details {
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 19px;
        margin-bottom: 20px;
        .more-descrtion {
          font-weight: 400;
          color: rgba(226, 55, 50, 1) !important;
        }
        .open-span {
          background: url(../../assets/images/Open.png) no-repeat center right;
        }
      }
      .writer-title {
        height: 15px;
        line-height: 15px;
        font-size: 14px;
        font-weight: 400;
        color: #4a4a4a;
        margin: 22px 0 10px 0;
        span {
          color: #e23732;
        }
      }
    }
  }
  .page-footer {
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #ddd;
    text-align: center;
    background-color: #fff;
    button {
      width: 90px;
      height: 34px;
      line-height: 34px;
      background: #e23732;
      border-radius: 5px;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
</style>
