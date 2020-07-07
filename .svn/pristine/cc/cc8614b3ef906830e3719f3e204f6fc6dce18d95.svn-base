<template>
  <div>
    <el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="圈子名称" prop="name">
        <el-input v-model.trim="ruleForm.name" maxlength="20" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="圈子头像" prop="avatar">
        <label for="img-upload" class="input-wrap">
          <div class="img-box">
            <div class="icon-holder" v-if="!imageUrl">
              <i class='el-icon-circle-plus red'></i>
              <p>上传头像</p>
            </div>
            <img v-else :src="$store.state.imageDomain + imageUrl" alt="" width="100%" height="100%">
          </div>
        </label>
        <input type="file" ref="file-input" accept="image/*" id="img-upload" @change="uploadFile" v-show="false">
      </el-form-item>
      <el-form-item label="圈子简介" prop="description">
        <el-input type="textarea" v-model.trim="ruleForm.description" :autosize="{minRows: 5}" maxlength="200" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="圈子类型" prop="type">
        <template slot="label">圈子类型
          <el-popover placement="right" width="300" trigger="hover">
            <div style="padding: 16px 22px;">
              <h5>公开圈子</h5>
              <p>百工驿所有用户可见，用户可以查看圈内部分发言，用户加入无需审核。</p>
              <h5>私密圈子</h5>
              <p>百工驿所有用户可见，用户需加入圈子才可看到圈内发言，用户加入需要审核。</p>
            </div>
            <span slot="reference" class="red" style="font-size: 12px;margin-left: 5px;"><i class="el-icon-question"></i>圈子类型说明</span>
          </el-popover>
        </template>
        <el-radio-group v-model="ruleForm.type">
          <el-radio :label="1">公开圈子</el-radio>
          <el-radio :label="2">私密圈子</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="圈子分区" prop="belong">
        <el-radio-group v-model="ruleForm.belong">
          <el-radio v-for="(item, index) in belongList" :key="index" :label="item.id">{{item.name}}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '@/fetch'
import uploadImg from '@/mixins/uploadImg.js'

export default {
  props: {
    groupDetail: Object
  },
  data() {
    var checkName = async (rule, value, callback) => {
      if (!value) return callback(new Error('请填写圈子名称'))
      if (!/^[\u4e00-\u9fa5\w-]{2,20}$/.test(value)) {
        return callback(new Error('名称支持中文、英文、数字“-”“_”组合，2~20字符'))
      }
      // true:没有重 false:重了
      let { data: isRepeat } = await api.groupNamePredicate({ groupId: this.ruleForm.id, groupName: value })
      return isRepeat ? callback() : callback(new Error('圈子名称重复，请更改'))
    }
    return {
      imageUrl: '',
      ruleForm: {
        id: '',
        avatar: '',
        belong: '',
        description: '',
        name: '',
        type: 1 // 类型 1：公开 2：私密
      },
      rules: {
        name: [
          { required: true, message: '请填写圈子名称', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        description: [
          { required: true, message: '圈子简介不能为空', trigger: 'blur' },
          { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
        ],
        avatar: [{ required: true, message: '上传圈子头像', trigger: 'change' }],
        type: [{ required: true, message: '请选择类型', trigger: 'change' }],
        belong: [{ required: true, message: '请选择分区', trigger: 'change' }]
      },
      belongList: []
    }
  },
  watch: {
    imageUrl: function(val) {
      this.$set(this.ruleForm, 'avatar', val)
      if (val.length) this.$refs.ruleForm.clearValidate('avatar')
    },
    groupDetail: function(val) {
      if (val.id) {
        let { avatar, belong, description, id, name, type } = val
        this.ruleForm = { avatar, belong, description, id, name, type }
        this.imageUrl = avatar
      }
    }
  },
  mixins: [uploadImg],
  methods: {
    submitForm() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          if (this.ruleForm.id) {
            api.addGroupRecord(this.ruleForm).then(res => {
              this.$message.success('提交成功')
              this.$router.push('/engineering/myGroup/applyGroup')
            })
          } else {
            api.createGroup(this.ruleForm).then(res => {
              this.$message.success('提交成功')
              this.$router.push('/engineering/myGroup/applyGroup')
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    regionList() {
      api.regionList({ pageNum: 1, pageSize: 100 }).then(res => {
        this.belongList = res.data.records
      })
    }
  },
  mounted() {
    this.regionList()
  }
}
</script>

<style lang="less" scoped>
.input-wrap {
  display: block;
  width: 120px;
}
.img-box {
  height: 120px;
  border: 1px solid #ddd;
  background-color: #eeeeee;
  border-radius: 10px;
  box-sizing: border-box;
  text-align: center;
  position: relative;
  .icon-holder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    > i {
      font-size: 28px;
    }
    > p {
      line-height: 1;
    }
  }
}
/deep/ .el-form--label-top .el-form-item__label {
  padding-bottom: 0;
}
</style>
