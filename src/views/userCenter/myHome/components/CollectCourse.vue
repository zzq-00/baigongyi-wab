<template>
  <div>
    <div class="batch-manage" v-if="$route.fullPath==='/myHome/myCollect'&&showBatch">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="margin-right: 30px;">全选</el-checkbox>
      <el-button @click="batchCancelCollect">取消收藏</el-button>
      <el-button @click="showBatch = false">退出批量管理</el-button>
    </div>
    <div class="batch-manage" v-if="$route.fullPath==='/myHome/myCollect'&&!showBatch&&collectData.length">
      <el-button @click="showBatch = true">批量管理</el-button>
    </div>
    <div class="scroll-wrap">
      <ul class="course-list" v-scroll="getMore" :scroll-disabled="disabled">
        <li v-for="(item,index) in collectData" :key="index">
          <el-checkbox v-if="$route.fullPath==='/myHome/myCollect'&&showBatch" :key="updateKey" :checked="checkAll" @change="handleCheckedChange(item.id)" style="margin: 45px 10px 0 0;"></el-checkbox>
          <div class="info-box">
            <img :src="$store.state.imageDomain + item.image" alt="" class="course-img">
      
            <div class="course-info">
              <h5 class="ellipsis course-title font-16">
                <a href="javascript:;" @click="gotoDetails(item)">
                  <span v-if="isDelete(item)" style="color:#f33535">【已删除】</span>
                  <span style="color:#f33535" v-if="isDown(item)">【已下架】</span>
                  {{item.name || item.title}}</a>
              </h5>
              <p class="course-time">{{item.auditTime | formatDate}}</p>
              <p class="course-type">
                <span v-if="tabActive === '收藏的专栏'">{{item.upToTime}}</span>
                <span v-else>{{item.type===1?'音频':'视频'}}</span>
              </p>
              <p class="font-16" :class="[item.price==0?'purple':'red']">{{item.price==0?'免费':'&yen;'+item.price}}</p>
              <div class="cancel-btn fr" v-if="!showBatch&&isOwn">
                <el-button @click="collectOperate(item,index)">取消收藏</el-button>
              </div>
            </div>
          </div>

        </li>
      </ul>
      <p v-if="loading" class="nomore-data">加载中...</p>
      <div v-else-if="!collectData.length" class="no-data">
        <img src="@/assets/images/No-courses.png" alt="" v-if="tabActive=='收藏的课程'">
        <img src="@/assets/images/No-column.png" alt="" v-else>
        <p>暂无{{tabActive=='收藏的课程'?'课程':'专栏'}}</p>
      </div>
      <p v-else-if="noMore" class="nomore-data">没有更多了</p>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
export default {
  props: {
    collectData: Array,
    noMore: Boolean,
    loading: Boolean,
    tabActive: String
  },
  data() {
    return {
      showBatch: false,
      isIndeterminate: false,
      checkAll: false,
      checkedArr: [],
      updateKey: 1 // 用来更新全选时el-checkbox的选中状态
    }
  },
  computed: {
    disabled() {
      return this.loading || this.noMore
    },
    objType() {
      if (this.tabActive === '收藏的课程') {
        return 1
      } else if (this.tabActive === '收藏的专栏') {
        return 2
      }
    },
    isOwn() {
      if (this.$route.query.id) {
        return this.$route.query.id === this.$store.state.userInfo.accountId
      }
      return true
    }
  },
  methods: {
    isDelete(v){
       if(v.deleteFlag == 1){
          return true
       }
       return false;
    },
    isDown(v){
       if(v.deleteFlag == 0){
            if(v.status == 2001 ||v.undercarriageStatus){
              return true;
            }
            if(v.status == 1000){
              return true;
            }
       }
       return false;
    },
    // 收藏取消收藏
    collectOperate(item, index) {
      api.cancelCollect({ objType: this.objType, objId: item.id }).then(res => {
        this.$emit('getNewData', item)
      })
    },
    // 全选
    handleCheckAllChange(val) {
      this.updateKey++
      this.checkedArr = []
      if (val) {
        this.collectData.forEach(item => {
          this.checkedArr.push({ objId: item.id, objType: this.objType })
        })
      }
      this.isIndeterminate = false
    },
    // 单选
    handleCheckedChange(value) {
      let obj = { objId: value, objType: this.objType }
      let index = this.checkedArr.findIndex(item => item.objId === obj.objId)
      if (index === -1) {
        this.checkedArr.push(obj)
      } else {
        this.checkedArr.splice(index, 1)
      }
      let checkedCount = this.checkedArr.length
      this.checkAll = checkedCount === this.collectData.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.collectData.length
    },
    // 批量取消收藏
    batchCancelCollect() {
      if (!this.checkedArr.length) return this.$message.warning('请选中要取消' + this.tabActive)
      this.$confirm(
        `您已勾选${this.checkedArr.length}门${this.tabActive == '收藏的课程' ? '课程' : '专栏'}，是否确认取消收藏？`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          api.batchCancelCollect(this.checkedArr).then(res => {
            this.$emit('getNewData', this.checkedArr)
            this.checkAll = false
            this.isIndeterminate = false
            this.updateKey++
            this.checkedArr = []
            this.$store.commit('setFollow', !this.$store.state.cancelStatus)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    getMore() {
      this.$emit('getMore')
    },
    gotoDetails(v) {
      if (this.tabActive === '收藏的课程') {
        if(v.deleteFlag == 1){
          this.$message('该课程已删除，无法查看详情')
          return
        }
        if(v.undercarriageStatus || v.status == 1000){
          this.$message('该课程已下架，无法查看详情')
          return
        }
        window.open('/courseDetail/' + v.id)
      } else if (this.tabActive === '收藏的专栏') {
        if(v.deleteFlag == 1){
          this.$message('该专栏已删除，无法查看详情')
          return
        }
        if(v.status== 2001 || v.status == 1000){
          this.$message('该专栏已下架，无法查看详情')
          return
        }
        window.open('/columnDetail/' + v.id)
      }
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.batch-manage {
  padding: 10px 20px;
}
.course-list {
  padding: 5px 0 5px 20px;
  > li {
    display: flex;
    & + li {
      margin-top: 10px;
    }
    .info-box {
      display: flex;
      flex: 1;
      > img {
        width: 200px;
        height: 118px;
        border-radius: 5px;
        margin-right: 20px;
      }
      > .course-info {
        min-height: 109px;
        flex: 1;
        padding: 10px 20px 10px 0;
        border-bottom: 1px solid #dddddd;
        overflow: hidden;
        width: 100px; /* 有这个宽度，h5标题宽度才不继续涨 */
        position: relative;
        .course-time {
          color: #999;
          margin: 5px 0 8px;
        }
        .course-type {
          margin-bottom: 18px;
          > span {
            font-size: 12px;
            color: #666;
            background-color: #f2f2f2;
            padding: 4px 10px;
            border-radius: 3px;
          }
        }
        .course-status{
            margin-top:27px;
            > span{
               background-color: #f2f2f2;
            padding: 4px 10px;
            border-radius: 3px;
            }
        }
        .cancel-btn {
          position: absolute;
          bottom: 10px;
          right: 20px;
          text-align: right;
        }
      }
    }
  }
}
.nomore-data {
  text-align: center;
  margin: 20px 0 10px;
  color: #999;
}
.no-data {
  text-align: center;
  padding: 20px 0;
  background-color: #fff;
  p {
    height: 14px;
    line-height: 14px;
    font-size: 15px;
    color: rgba(188, 188, 196, 1);
    text-align: center;
  }
}
</style>
