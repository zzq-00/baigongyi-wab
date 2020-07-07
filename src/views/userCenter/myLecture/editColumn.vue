<!--创建专栏-->
<template>
  <div class="creatColumn">
    <div class="content">
      <div class="title">{{ $route.params.d ? '编辑专栏' : '创建专栏' }} <span class="reject" v-if="$route.name === 'reEditColumn'&&status===1001" @click="openReason">点击查看审核驳回原因</span></div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="top" inline>
        <el-form-item style="display:block;">
          <uploadPic type="column" v-model="ruleForm.image" :description="uploadDesc"></uploadPic>
        </el-form-item>
        <br>
        <el-form-item label="发布专栏角色" prop="accountIdentity">
          <el-select disabled v-model="ruleForm.accountIdentity">
            <el-option :value="1" label="讲师"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专栏名称" prop="name">
          <el-input v-model.trim="ruleForm.name" class="columnName" maxlength="50" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="订阅价格(元)" prop="price">
          <el-input v-model.trim="ruleForm.price" maxlength="15"></el-input>
        </el-form-item>

        <el-form-item ref="upToTimeSel" label="选择更新频率" class="update" prop="upToTime">
          <el-select class="update1" v-model="updateTime1" @change="timeChange">
            <el-option v-for="(time,index) in times1" :key="index" :label="time" :value="time"></el-option>
          </el-select>
          <el-select :disabled="timesDisable" class="update2" v-model="updateTime2" @change="selSecondTime">
            <el-option v-for="time2 in times2" :key="time2" :label="time2" :value="time2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="tagIds">
          <template slot="label">
            专栏标签 <span style="font-size: 12px;color: #999999;">添加标签后，您的专栏将显示在对应标签分区中，方便学员进行检索；标签不分先后</span>
          </template>
          <addTagDialog v-model="confirmTags" />
        </el-form-item>

        <el-form-item label="专栏介绍" prop="description" style="display: block;">
          <Editor v-model="editorContent" @checkFormItem="$refs.ruleForm.validateField('description')" />
        </el-form-item>

        <el-form-item class="button">
          <el-button @click="preview">预览</el-button>
          <el-button @click="saveSraft">存草稿</el-button>
          <el-button type="danger" @click="onSubmit">提交审核</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/Editor.vue'
import addTagDialog from '@/components/addTagDialog.vue'
import UploadPic from '@/utils/uploadPic'
import api from '@/fetch'
export default {
  components: {
    Editor,
    UploadPic,
    addTagDialog
  },
  data() {
    return {
      editorContent: '',
      rejectReason: '',
      status: -100,
      uploadDesc: {
        title: '专栏主页图',
        desc: '可上传jpg/jpeg/png/bmp格式图片，建议分辨率为900x506，最大4M',
        maxsize: 4
      },
      times1: ['每月', '每周', '每天'],
      times2: [],
      updateTime1: '',
      updateTime2: '',
      timesDisable: false,
      ruleForm: {
        image: '',
        accountIdentity: 1, // 发布者身份
        name: '',
        price: '',
        upToTime: '',
        tagIds: '',
        description: ''
      },
      rules: {
        accountIdentity: [{ required: false, message: '请选择专栏角色', trigger: 'change' }],
        name: [{ required: true, message: '请填写专栏名称', trigger: 'blur' }],
        price: [
          {
            required: true,
            message: '请填写正确的订阅价格,保留两位小数',
            pattern: /(^[\d]|^[1-9][\d]*)($|[\.][\d]{0,2}$)/,
            trigger: 'blur'
          }
        ],
        upToTime: [{ required: true, message: '请选择更新频率', trigger: 'change' }],
        tagIds: [{ required: true, message: '请选择专栏标签', trigger: 'change' }],
        description: [{ required: true, message: '请填写专栏介绍', trigger: 'blur' }]
      },
      confirmTags: []
    }
  },
  watch: {
    $route: {
      handler: function(val) {
        if (val.name === 'reEditColumn') {
          this.getColumnDetail(val.params.id)
        } else if (val.name === 'createColumn') {
          this.ruleForm = {
            image: '',
            accountIdentity: 1, // 发布者身份
            name: '',
            price: '',
            upToTime: '',
            tagIds: '',
            description: ''
          }
          this.editorContent = ''
          this.confirmTags = []
        }
      },
      immediate: true
    },
    editorContent: function(val) {
      this.ruleForm.description = this.handleHtml(val)
    },
    confirmTags: function(val) {
      this.$set(this.ruleForm, 'tagIds', val.map(item => item.id).join(','))
      if (val.length) this.$refs.ruleForm.clearValidate('tagIds')
    }
  },
  methods: {
    openReason() {
      this.$alert(this.rejectReason, { confirmButtonText: '确定' })
    },
    // 更新时间
    timeChange(val) {
      if (val === '每月') {
        this.timesDisable = false
        this.times2 = []
        this.updateTime2 = ''
        for (let i = 1; i <= 28; i++) {
          this.times2.push(i + '号')
        }
      } else if (val === '每周') {
        this.timesDisable = false
        this.times2 = []
        this.updateTime2 = ''
        var num = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        for (let i = 0; i <= num.length - 1; i++) {
          this.times2.push(num[i])
        }
      } else {
        this.times2 = []
        this.updateTime2 = ''
        this.timesDisable = true
        this.ruleForm.upToTime = this.updateTime1
      }
    },
    selSecondTime() {
      this.ruleForm.upToTime = this.updateTime1 + this.updateTime2
      this.$refs['upToTimeSel'].clearValidate()
    },
    // 预览
    preview() {
      if (!this.ruleForm.image) return this.$message.warning('请上传专栏主页图')
      this.$refs.ruleForm.validate(isOk => {
        if (isOk) {
          this.$store.commit('previewColumn', this.ruleForm)
          window.open('/previewColumn')
        } else {
          return false
        }
      })
    },
    // 存为草稿
    async saveSraft() {
      if (!this.ruleForm.image) return this.$message.warning('请上传专栏主页图')
      this.$refs.ruleForm.validate(async isOk => {
        if (isOk) {
          const res = await api.saveColumn(this.ruleForm)
          if (res.code === 200) {
            this.$router.push('/myLecture?activeIndex=' + 1)
          }
        }
      })
    },
    // 提交审核
    async onSubmit() {
      if (!this.ruleForm.image) return this.$message.warning('请上传专栏主页图')
      this.$refs.ruleForm.validate(async isOk => {
        if (isOk) {
          const res = await api.publishColumn(this.ruleForm)
          if (res.code === 200) {
            this.$router.push('/myLecture?activeIndex=' + 1)
          }
        }
      })
    },
    // 编辑专栏 获取数据
    async getColumnDetail() {
      const {
        data: { id, image, accountIdentity, name, price, upToTime, columnTagList, description, remark, status, lecturerInfo }
      } = await api.getColumnDetail(this.$route.params.id)
      this.editorContent = description
      this.ruleForm = { id, image, accountIdentity, name, price, upToTime }
      this.rejectReason = remark
      this.status = status
      // this.confirmTags = columnTagList
      //   .map(item => {
      //     return item.children.map(its => {
      //       its.tagName = item.tagName + '-' + its.tagName
      //       return its
      //     })
      //   })
      //   .flat()
      columnTagList.map(item => {
        item.children.map(items => {
          this.confirmTags.push({
            id: items.id,
            createTime: items.createTime,
            updateTime: items.createTime,
            tagName: item.tagName + '-' + items.tagName,
            icon: items.icon,
            description: items.description,
            sortNumber: items.sortNumber,
            parentId: item.id,
            children: []
          })
        })
      })
      this.updateTime1 = upToTime.slice(0, 2)
      this.timeChange(this.updateTime1)
      this.updateTime2 = upToTime.slice(2)
    }
  }
}
</script>

<style lang="less" scoped>
.creatColumn {
  .content {
    background-color: #fff;
    border-radius: 10px;
    .title {
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      border-bottom: 1px solid #ddd;
      box-sizing: border-box;
      .reject {
        margin-left: 20px;
        color: #e23732;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
}
.content {
  .ask {
    font-size: 12px;
    color: #ccc;
    line-height: 18px;
  }
  .el-form {
    padding: 10px 90px 10px 30px;
    /deep/.el-form-item {
      margin-bottom: 18px;
      .el-form-item__content {
        .el-input {
          width: auto;
          width: 260px;
        }
        .columnName {
          width: 560px;
        }
        .update1,
        .update2 {
          .el-input {
            width: 120px;
            margin-right: 20px;
          }
        }
        .tag1 + .tag2 {
          margin-left: 40px;
        }
      }
      .addTag {
        margin-bottom: 22px;
        // position: relative;
        img {
          margin-left: 10px;
        }
      }
    }
    .update {
      margin-left: 28px;
    }
    .button {
      margin-left: 230px;
      /deep/.el-button {
        width: 90px;
        height: 34px;
      }
    }
  }
  /deep/.el-form--label-top {
    .el-form-item__label {
      padding: 0px !important;
      line-height: 30px !important;
    }
  }
}
</style>
