<template>
  <div class="tag-operate">
    <el-tag :key="index" v-for="(tag,index) in confirmTags" closable disable-transitions @close="handleCloseDia(tag,'confirmTags')">
      {{tag.tagName}}
    </el-tag>
    <div class="add-tag">
      <span @click="addLabel"><i class="el-icon-circle-plus-outline"></i>添加标签（{{confirmTags.length}}/5）</span>
    </div>
    <!-- 添加标签的弹框 -->
    <el-dialog append-to-body title="添加标签" :visible.sync="TagDialogVisible" width="785px" class="label-dialog">
      <div class="dialog-content">
        <div class="have-chosen">
          <p class="dialog-title">
            <span></span>
            <span>已选标签</span>
            <span>{{diaDynamicTags.length}}/5</span>
          </p>
          <div class="label-list">
            <el-tag :key="index" v-for="(item,index) in diaDynamicTags" closable disable-transitions @close="handleCloseDia(item,'diaDynamicTags')">
              {{item.tagName}}
            </el-tag>
          </div>
        </div>
        <div class="all-label">
          <p class="dialog-title">
            <span></span>
            <span>全部标签</span>
            <span>最多可选择5个标签</span>
          </p>
          <div class="label-box">
            <ul class="left-frist">
              <li v-for="(item,index) in firstTag" :key="index" :class="{'active-style': activeTag===item}" @click="selFirstTag(item, index)">
                <span class="red-label"></span>
                <span class="frist-name">
                  {{item.tagName}}
                  <span class="frist-name-have" v-if="computedNum(item.id)>0">{{computedNum(item.id)}}</span>
                </span>
              </li>
            </ul>
            <ul class="right-second" v-if="secondTag.length">
              <li v-for="(item,index) in secondTag" :key="index" :class="{'checked-style': computedActive(item.id)}" @click="changeSecond(item)">
                {{item.tagName}}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="TagDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureLabel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/fetch'

export default {
  props: {
    value: Array
  },
  data() {
    return {
      TagDialogVisible: false, //选择标签的弹框
      allTags: [],
      activeTag: {},
      secondTag: [],
      diaDynamicTags: [], //弹框内已选的标签
      confirmTags: [] // 确认已选的标签
    }
  },
  watch: {
    value: function(val) {
      this.confirmTags = val
    }
  },
  computed: {
    firstTag() {
      return this.allTags.filter(item => !item.parentId)
    }
  },
  methods: {
    // 添加标签
    addLabel() {
      this.TagDialogVisible = true
      this.diaDynamicTags = [...this.confirmTags]
    },
    selFirstTag(firstTag) {
      this.activeTag = firstTag
      this.secondTag = this.allTags.filter(item => item.parentId === firstTag.id)
    },
    computedNum(id) {
      return this.diaDynamicTags.filter(item => item.parentId === id).length
    },
    computedActive(id) {
      return this.diaDynamicTags.find(item => item.id === id)
    },
    // 选择第二级
    changeSecond(its) {
      let tagName = this.activeTag.tagName + '-' + its.tagName
      let newObj = Object.assign({}, its, { tagName })
      let index = this.diaDynamicTags.findIndex(item => item.id == newObj.id)
      if (index !== -1) {
        this.diaDynamicTags.splice(index, 1)
      } else if (this.diaDynamicTags.length < 5) {
        this.diaDynamicTags.push(newObj)
      }
    },
    // 确定标签
    sureLabel() {
      this.confirmTags = [...this.diaDynamicTags]
      this.$emit('input', this.confirmTags)
      this.TagDialogVisible = false
    },
    tagList() {
      api.tagList().then(res => (this.allTags = res.data.records))
    },
    // 删除已选中标签
    handleCloseDia(tag, param) {
      let index = this.$data[param].findIndex(item => item.id == tag.id)
      if (index !== -1) this.$data[param].splice(index, 1)
    }
  },
  mounted() {
    this.tagList()
  }
}
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
    .all-label {
      .label-box {
        height: 449px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(153, 153, 153, 1);
        overflow: hidden;
        .left-frist {
          width: 120px;
          background: #f7f6fb;
          float: left;
          padding-top: 10px;
          height: calc(100% - 10px);
          li {
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            color: rgba(102, 102, 102, 1);
            cursor: pointer;
            .red-label {
              width: 4px;
              height: 14px;
              background: #f33535;
              border-radius: 1px;
              margin-top: 13px;
              display: none;
              position: absolute;
            }
            .frist-name {
              position: relative;
              .frist-name-have {
                position: absolute;
                top: -7px;
                padding: 0 7px;
                height: 15px;
                line-height: 15px;
                background: #fd4040;
                border-radius: 7px;
                color: #fff;
              }
            }
          }
          li:hover {
            color: #f33535;
            .red-label {
              display: block;
            }
          }
          .active-style {
            color: #f33535;
            .red-label {
              display: block;
            }
          }
        }
        .right-second {
          float: left;
          display: flex;
          padding: 12px;
          width: 596px;
          flex-wrap: wrap;
          align-content: flex-start;
          justify-content: flex-start;
          li {
            width: 120px;
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
            margin-top: 10px;
          }
          li:nth-child(1),
          li:nth-child(2),
          li:nth-child(3),
          li:nth-child(4) {
            margin-top: 0;
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
