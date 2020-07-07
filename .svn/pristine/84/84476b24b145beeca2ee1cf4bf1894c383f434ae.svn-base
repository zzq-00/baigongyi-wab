<template>
  <div class="tag-operate">
    <el-tag
      :key="index"
      v-for="(tag, index) in confirmTags"
      closable
      disable-transitions
      @close="handleCloseDia(tag, 'confirmTags')"
    >
      {{ tag }}
    </el-tag>
    <div class="add-tag">
      <span @click="addLabel"
        ><i class="el-icon-circle-plus-outline"></i>添加标签（{{
          confirmTags.length
        }}/5）</span
      >
    </div>
    <!-- 添加标签的弹框 -->
    <el-dialog
      append-to-body
      title="添加标签"
      :visible.sync="TagDialogVisible"
      width="785px"
      class="label-dialog"
      :close-on-click-modal="false"
    >
      <div class="dialog-content">
        <div class="have-chosen">
          <p class="dialog-title">
            <span></span>
            <span>已选标签</span>
            <span>{{ diaDynamicTags.length }}/5</span>
          </p>
          <div class="label-list">
            <el-tag
              :key="index"
              v-for="(item, index) in diaDynamicTags"
              closable
              disable-transitions
              @close="handleCloseDia(item, 'diaDynamicTags')"
            >
              {{ item }}
            </el-tag>
          </div>
        </div>
        <div class="custom-label">
          <p class="dialog-title">
            <span></span>
            <span>自定义标签</span>
          </p>
          <input ref="el-el-input" class="el-el-input" type="text" maxlength=20 @input="tagName">
          <div v-if="wordlength!= 0" style="position:absolute;bottom:10px;left:260px;z-index:1;width:14px;line-height:14px;text-align:center;border-radius:50%;border:1px solid #333;font-size:12px" @click="clearable">x</div>
          <div style="position:absolute;bottom:10px;left:290px;">{{wordlength}}/20</div>
          <el-button type="primary" @click="addCustomLabel">添加</el-button>
        </div>
        <div class="all-label">
          <p class="dialog-title">
            <span></span>
            <span>推荐标签</span>
            <span>最多可选择5个标签</span>
          </p>
          <div class="label-box">
            <ul class="right-second">
              <li
                v-for="(item, index) in allTags"
                :key="index"
                :class="{ 'checked-style': computedActive(item.labelName) }"
                @click="chooseTag(item)"
              >
                {{ item.labelName }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sureLabel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/fetch";

export default {
  props: {
    value: Array,
    areaId: String
  },
  data() {
    return {
      wordlength:0,//输入框的字数限制
      TagDialogVisible: false, //选择标签的弹框
      allTags: [],
      activeTag: {},
      diaDynamicTags: [], //弹框内已选的标签
      confirmTags: [], // 确认已选的标签,
      customLabel: undefined,
      areaId: ""
    };
  },
  watch: {
    value: function(val) {
      this.confirmTags = val;
    },
    areaId: function(val) {
      this.tagList();
    }
  },
  methods: {
    // 添加标签
    addLabel() {
      if (!this.areaId) return this.$message.warning("请先选择分区");
      this.TagDialogVisible = true;
      this.diaDynamicTags = [...this.confirmTags];
    },
    computedActive(data) {
      return this.diaDynamicTags.find(item => item === data);
    },
    // 选择
    chooseTag(data) {
      if (this.diaDynamicTags.length >= 5)
        return this.$message.warning("最多添加5个标签");
      if (!this.diaDynamicTags.includes(data.labelName)) {
        this.diaDynamicTags.push(data.labelName);
      }
    },
    tagName(e){
      let word = $.trim(e.target.value);
      this.$refs["el-el-input"].value = word;
      this.wordlength = word.length;
      this.customLabel = word
    },
    clearable(e){
      this.wordlength = 0;
      e.target.offsetParent.children[1].value = ''
    },
    // 确定标签
    sureLabel() {
      this.confirmTags = [...this.diaDynamicTags];
      this.$emit("input", this.confirmTags);
      this.customLabel = undefined;
      this.TagDialogVisible = false;
    },
    tagList() {
      if (!this.areaId) return;
      api.yivideoAreaRecommendTags(this.areaId).then(res => {
        this.allTags = res.data;
      });
    },
    // 删除已选中标签
    handleCloseDia(tag, param) {
      let index = this.$data['diaDynamicTags'].indexOf(tag);
      if (index !== -1) this.$data['diaDynamicTags'].splice(index, 1);
    },
    addCustomLabel() {
      if (!this.customLabel) return this.$message.warning("请输入标签名称");
      if (this.diaDynamicTags.length >= 5)
        return this.$message.warning("最多添加5个标签");
      if (this.diaDynamicTags.includes(this.customLabel))
        return this.$message.warning("请勿添加重复标签");
      this.diaDynamicTags.push(this.customLabel);
      this.wordlength = 0;
      this.$refs["el-el-input"].value = ''
      this.$message.success("添加成功");
      this.customLabel = undefined;
    },
    cancel() {
      this.customLabel = undefined;
      this.TagDialogVisible = false;
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.tag-operate {
  position: relative;
  .el-tag {
    margin-right: 10px;
  }
  .add-tag {
    color: #e23732;
    > span {
      cursor: pointer;
      > i {
        margin-right: 5px;
      }
    }
  }
}
.label-dialog {
  /deep/.el-dialog__header {
    border: 1px solid #dddddd;
    .el-dialog__title {
      font-size: 16px;
      color: #4a4a4a;
    }
  }
  /deep/.el-dialog__body {
    padding: 0;
  }
  /deep/.el-dialog__footer {
    padding: 9px 0 7px 0;
    text-align: center !important;
    border: 1px solid #ddd;
    .dialog-footer {
      .el-button {
        width: 89px;
      }
    }
  }
  .dialog-content {
    padding: 10px 20px;
    .dialog-title {
      margin-bottom: 12px;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      span:nth-child(1) {
        width: 4px;
        height: 14px;
        background: #f33535;
        margin-right: 6px;
      }
      span:nth-child(2) {
        height: 14px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 14px;
        margin-right: 10px;
      }
      span:nth-child(3) {
        height: 14px;
        font-size: 14px;
        line-height: 14px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
    .label-list {
      min-height: 1px;
      margin-bottom: 10px;
    }
    .custom-label {
      position:relative;
      margin-bottom: 12px;
      .el-el-input{
        line-height: 32px;
        padding:0;
        border:1px solid #DCDFE6;
        color:#606266;
        font-size: inherit;
        box-sizing:border-box;
        padding:0 70px 0 15px;
        width:325px;
        margin-right:20px;
      }
      /deep/ .el-input {
        width: 50%;
        margin-right: 20px;
      }
    }
    .all-label {
      .label-box {
        height: 300px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(153, 153, 153, 1);
        overflow: hidden;
        .right-second {
          float: left;
          display: flex;
          padding: 12px;
          width: 596px;
          flex-wrap: wrap;
          align-content: flex-start;
          justify-content: flex-start;
          li {
            padding: 0 20px;
            text-align: center;
            height: 40px;
            line-height: 40px;
            background: #f3f3f5;
            border-radius: 2px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            margin-right: 10px;
            cursor: pointer;
            margin-bottom: 10px;
          }
          .checked-style {
            color: #f33535;
            background-color: #fbf0f1;
          }
        }
      }
    }
  }
}
/deep/ .el-tag {
  height: 30px;
  line-height: 30px;
  border: none;
  border-radius: 2px;
  background: #f3f3f3;
  color: #333333;
  margin-right: 10px;
  margin-bottom: 10px;
  .el-tag__close {
    color: #e23732;
  }
  .el-tag__close:hover {
    background-color: #e23732;
    color: #fff;
  }
}
</style>
