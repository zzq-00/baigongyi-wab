<template>
  <div>
    <div class="batch-manage" v-if="$route.path==='/myHome/myCollect'&&showBatch">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="margin-right: 30px;">全选</el-checkbox>
      <el-button @click="batchCancelCollect">取消收藏</el-button>
      <el-button @click="showBatch = false">退出批量管理</el-button>
    </div>
    <div class="batch-manage" v-if="$route.path==='/myHome/myCollect'&&!showBatch&&listData.length&&isOwn">
      <el-button @click="showBatch = true">批量管理</el-button>
    </div>
    <div class="scroll-wrap" id="NewsToolBox">
      <ul class="article-list" v-scroll="getMore" :scroll-disabled="disabled">
        <li v-for="(item,index) in listData" :key="index" style="position:relative">
          <el-checkbox  v-if="$route.path==='/myHome/myCollect'&&showBatch" :key="updateKey" :checked="checkAll" @change="handleCheckedChange(item.id)" style="margin: 45px 10px 0 0;float:left"></el-checkbox>
          <div style="float:left;width:200px;height:118px;position:relative">
            <!-- <img :src="$store.state.imageDomain + item.image" alt="" width="200px" :style="{'pointer-events': (item.status == 2 && item.accountId != $store.state.userInfo.accountId) ? 'none' : 'default'}" @click="viewDetail(item)"> -->
             <img :src="item.image?$store.state.imageDomain + item.image: require('@/assets/images/noimg.png')" alt="" width="200px" :style="{'pointer-events': (item.status == 2 && item.accountId != $store.state.userInfo.accountId) ? 'none' : 'default'}" @click="viewDetail(item)">
            <div class="long_time">{{formatDuring(item.duration)}}</div>
          </div>

          <div class="yivideo-right" :style="[{height:downline()?'172px':'120px'},{'border-bottom':downline()?'1px solid #F1F1F1':''},{width:showBatch?'calc(100% - 240px)':'calc(100% - 220px)'}]">
           <div class="video_main">
              <h5 class="ellipsis">
              <a href="javascript:;" @click="viewDetail(item)" style="color: #333;">         
                <span  style="color: #f33535;" v-if="deleteFlag(item)">【已删除】</span>
                <span style="color: #f33535;" v-if="downFlag(item)">【已下架】</span>
                <span style="color: #f33535" v-if="hideFlag(item)">【已屏蔽】</span>
                {{item.title}}</a> 
            </h5>
              <!-- 作者 时间 -->
              <div class="video_description" v-if="$route.fullPath!='/myVideo'" @click="openUserCenter(item.accountId)">{{item.nickName}}</div>
              <div class="author-time" v-if="item.status === 2000 && $route.fullPath=='/myVideo'" style="margin-top:80px">
                <span v-if="!isOwn" class="ellipsis" style="cursor: pointer;max-width: 120px;" @click="openUserCenter(item.accountId)">{{item.nickName}} </span>
                <span v-if="$route.path=='/myHome/myArticle/draftArt'">{{item.updateTime | formatDate}}</span>
                <span v-else>{{item.createTime | formatDate}}</span>
              </div>
              <div class="author-time" v-else-if="item.status !== 2000 &&$route.fullPath=='/myVideo'">
                <span v-if="!isOwn" class="ellipsis" style="cursor: pointer;max-width: 120px;" @click="openUserCenter(item.accountId)">{{item.nickName}} </span>
                <span v-if="item.status == 1002 && item.hideFlag == 0">{{item.publishTime | formatDate}}</span>
                <span v-if="item.status == 1001 && item.hideFlag == 0" style="color:#F33535;cursor:pointer" @click="seeRes(item)">审核驳回,点击查看驳回原因</span>
                <span v-if="item.status == 1000 && item.hideFlag == 0" style="color:#EF980F">审核中</span>
                <span v-if="item.hideFlag == 1" style="color:#F33535;cursor:pointer" @click="seeRes(item)">已被管理员屏蔽,点击查看屏蔽原因</span>
              </div>
               <div class="operational" v-if="showOperation(item)">
                 <!-- <div class="operational" v-if="item.status != 2000 || (item.auditType ==1&&item.status == 1002)"> -->
                <span style="width: 53px;">
                  <img src="@/assets/images/seeCount.png" alt="">
                  <em>{{item.watchCount | formatNumbers}}</em>
                </span>
                <span style="width: 53px;" @click="likeOperate(item)">
                  <img v-if="item.whetherLike" src="@/assets/images/yizan.png" alt="">
                  <img v-else src="@/assets/images/zan.png" alt="">
                  <em>{{item.likeCount | formatNumbers}}</em>
                </span>
                <span  style="width: 53px;" @click="viewDetail(item)">
                  <img src="@/assets/images/pinglun.png" alt="">
                  <em>{{item.commentCount | formatNumbers}}</em>
                </span>
                <span  style="width: 62px;" @click="collectOperate(item)">
                  <img v-if="item.whetherToCollect"  src="@/assets/images/yishoucang.png" alt="">
                  <img v-else src="@/assets/images/shoucang.png" alt="">
                  <em>{{item.collectCount | formatNumbers}}</em>
                </span>
              </div>
            <!-- </div> -->
           
           </div>
           <div class="collect-button" style="padding-top: 0;border-top: 0;" v-if="$route.fullPath=='/myHome/myCollect'">
              <el-button @click="collectOperate(item, 'fromMyCollect')">取消收藏</el-button>
            </div>
                <div class="collect-button" v-if="isOwn&&$route.path=='/myHome/myYiVideo'&&item.hideFlag == 0" >
              <el-button v-if="item.status != 1000" @click="reEditArticle(item)">编辑</el-button>
              <el-button v-if="item.status != 1000" @click="deleteArticle(item)">删除</el-button>
            </div>
            <div class="edit-button" v-if="isOwn&&$route.path=='/myVideo'&&item.hideFlag == 0" >
              <el-button v-if="item.status != 1000" @click="reEditArticle(item)">编辑</el-button>
              <el-button v-if="item.status != 1000" @click="deleteArticle(item)">删除</el-button>
            </div>
            <div class="edit-button" v-if="isOwn &&$route.path!=='/myHome/myCollect'&& item.hideFlag == 1" >
              <el-button @click="dialogVisible2 = true">申诉</el-button>
            </div>
          </div>
        </li>
      </ul>
      <p v-if="loading" class="nomore-data">加载中...</p>
      <div v-else-if="!listData.length" class="no-data">
        <img src="@/assets/images/No-live.png" alt="">
        <p>暂无驿视频</p>
      </div>
      <p v-else-if="noMore" class="nomore-data">没有更多了</p>
    </div>
    <el-dialog
     :title="result.hideFlag == 1?'屏蔽原因':'驳回原因'"
     :visible.sync="dialogVisible"
     width="30%"
      :before-close="handleClose">
  <span>{{result.res}}</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
     :visible.sync="dialogVisible2"
     width="30%"
      :before-close="handleClose" align="center">
  <span>
请联系客服进行申诉，联系电话：<br/>

400-697-5677</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import api from '@/fetch'
import QRCode from 'qrcode'

export default {
  props: {
    listData: Array,
    noMore: Boolean,
    loading: Boolean,
    isOwn: false
  },
  data() {
    return {
      dialogVisible2:false,//申诉的弹框
      dialogVisible:false,//驳回和屏蔽原因的弹框
      result:{},//驳回或者屏蔽的原因及状态
      objType: 15, // COURSE(1, "课程"),COLUMN(2, "专栏"),ARTICLE(3, "驿视频"),QUESTION(4, "问答"),LIVE(5, "直播"),PERSON(6, "用户"),HOT_NEWS(7, "热点资讯"),LECTURER(8, "讲师"),ANSWER(9, "回答"),IDEA(10, "想法"),
      operating: false,
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
    }
  },
  mounted () {
  },
  methods: {
    //判断是否屏蔽
    hideFlag(item){
       if(item.hideFlag ==1){
           return true;
       }
       return false
    },
    //收藏和主页我的驿视频按钮在下边，并且有一条横线
    downline(){
      if(this.$route.fullPath=='/myHome/myCollect'){
        return true;
      }
      if(this.$route.fullPath=='/myHome/myYiVideo'){
          return true;
      }
      return false;
    },
    //判断是否下架
    downFlag(item){
      if(this.$route.fullPath!=='/myHome/myCollect'){
       return false;
      }
      if(item.status == 1000){
        return true;
      }
      if(item.status == 1001){
        return true;
      }
      return false;
    },
    deleteFlag(item){
      if(item.deleteFlag == 1){
        return true;
      }
      return false;
    },
    //处理时长
        formatDuring(second) {
      var m =
        Math.floor((second / 60) % 60) < 10
          ? "0" + Math.floor((second / 60) % 60)
          : Math.floor((second / 60) % 60);
      var s =
        Math.floor(second % 60) < 10
          ? "0" + Math.floor(second % 60)
          : Math.floor(second % 60);
      return m + ":" + s;
    },
    // 全选
    handleCheckAllChange(val) {
      this.updateKey++
      this.checkedArr = []
      if (val) {
        this.listData.forEach(item => {
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
      this.checkAll = checkedCount === this.listData.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.listData.length
    },
    // 批量取消收藏
    batchCancelCollect() {
      if (!this.checkedArr.length) return this.$message.warning('请选中要取消收藏的驿视频')
      this.$confirm(`您已勾${this.checkedArr.length}选个驿视频，是否取消收藏`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api.batchCancelCollect(this.checkedArr).then(res => {
            this.$emit('getNewData', this.checkedArr)
            this.checkAll = false
            this.isIndeterminate = false
            this.updateKey++
            this.checkedArr = []
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
    // 重新编辑
    reEditArticle(item) {
      if(item.recommend == 1){
       this.$confirm("您的视频已被管理员推荐至首页，编辑信息将取消推荐资格，是否确认编辑？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
           this.$router.push('/yivideo/publish/' + item.id);
           return 
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      }else{
        this.$router.push('/yivideo/publish/' + item.id)
      }
    },
    // 删除
    deleteArticle(item) {
      this.$confirm(item.status ==2000?"删除后不可恢复，是否确认删除":"视频删除后，相关数据及评论信息也将一并删除，是否确认删除？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api.deleteYivideo(item.id).then(res => {
            this.$emit('getNewData', item)
            this.$message.success('删除成功')
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    //判断展示不展示播放次数，点赞，收藏等
    showOperation(item){
      //草稿
        if(item.status == 2000){
           return false;
        }
        //初次
        if(item.auditType ==1&&item.status != 1002){
          return false;
        }
        //删除
        if(item.deleteFlag == 1){
          return false;
        }
        //屏蔽
        if(item.hideFlag == 1){
          return false;
        }
        return true;
    },
    // 点赞
    likeOperate(item) {
      if(item.status==2000)   return this.$message('该驿视频还未编辑完善，无法点赞')   //草稿没详情
      if(item.status ==1000&&this.$route.fullPath =='/myHome/myCollect') return this.$message("该驿视频已下架，无法点赞")
      if(item.status==1000)   return this.$message('该驿视频正在审核，无法点赞')  //审核中。无法查看详情
      // if(data.status ==1000&&this.isOwn) return this.$message("该驿视频已下架，无法查看详情")
      if(item.status ==1001&&this.$route.fullPath =='/myHome/myCollect') return this.$message("该驿视频已下架，无法点赞")
      if(item.status==1001)   return this.$message('该驿视频审核被驳回，无法点赞')  
      if(item.deleteFlag == 1) return this.$message('该驿视频已删除，无法点赞')
      if(item.hideFlag == 1){
         return this.$message("该驿视频已被屏蔽，无法点赞")
      } 
      if (this.operating) return
      this.operating = true
      if (item.whetherLike) {
        api
          .likeDelete(this.objType, item.id)
          .then(res => {
            item.whetherLike = false
            item.likeCount--
          })
          .finally(() => (this.operating = false))
      } else {
        api
          .likeAdd({ objType: this.objType, objId: item.id })
          .then(res => {
            item.whetherLike = true
            item.likeCount++
          })
          .finally(() => (this.operating = false))
      }
    },
    // 收藏
    collectOperate(item, type) {
      if(item.status==2000)   return this.$message('该驿视频还未编辑完善，无法收藏')   //草稿没详情
      if(item.status ==1000&&this.$route.fullPath =='/myHome/myCollect') return this.$message("该驿视频已下架，无法收藏")
      if(item.status==1000)   return this.$message('该驿视频正在审核，无法收藏')  //审核中。无法查看详情
      // if(data.status ==1000&&this.isOwn) return this.$message("该驿视频已下架，无法查看详情")
      if(item.status ==1001&&this.$route.fullPath =='/myHome/myCollect') return this.$message("该驿视频已下架，无法收藏")
      if(item.status==1001)   return this.$message('该驿视频审核被驳回，无法收藏')  
      if(item.deleteFlag == 1) return this.$message('该驿视频已删除，无法收藏')
      if(item.hideFlag == 1){
         return this.$message("该驿视频已被屏蔽，无法收藏")
      } 
      if (item.whetherToCollect) {
        api.cancelCollect({ objType: this.objType, objId: item.id }).then(res => {
          type === 'fromMyCollect' && this.$emit('getNewData', item) // 我的主页收藏要传过去
          item.whetherToCollect = false
          // 防止跟批量管理收藏冲突
          this.checkedArr = []
          this.checkAll = false
          this.updateKey++
          item.collectCount--
        })
      } else {
        api.addCollect({ objType: this.objType, objId: item.id }).then(res => {
          item.whetherToCollect = true
          item.collectCount++
        })
      }
    },
    viewDetail(data) {
      if(data.status==2000)   return this.$message('该驿视频还未编辑完善，无法查看详情')   //草稿没详情
      if(data.status ==1000&&this.$route.fullPath =='/myHome/myCollect') return this.$message("该驿视频已下架，无法查看详情")
      if(data.status==1000)   return this.$message('该驿视频正在审核，无法查看详情')  //审核中。无法查看详情
      // if(data.status ==1000&&this.isOwn) return this.$message("该驿视频已下架，无法查看详情")
      if(data.status ==1001&&this.$route.fullPath =='/myHome/myCollect') return this.$message("该驿视频已下架，无法查看详情")
      if(data.status==1001)   return this.$message('该驿视频审核被驳回，无法查看详情')  
      if(data.deleteFlag == 1) return this.$message('该驿视频已删除，无法查看详情')
      if(data.hideFlag == 1){
         return this.$message("该驿视频已被屏蔽，无法查看详情")
      } 
      if (this.$route.path === '/myHome/myYiVideo') return this.$router.push('/yivideo/detail/' + data.id)
      window.open('/yivideo/detail/' + data.id)
    },
    openURL(url) {
      window.open(url)
    },
    seeRes(v){
      this.dialogVisible = true;
      this.result = v;
      if(v.hideFlag==1){
        api.yivideoShield(v.id).then(res=>{
          this.$set(this.result,'res',res.data.shieldReason)
        })
      }else{
        api.yivideoTurnDown(v.id).then(res=>{
            this.$set(this.result,'res',res.data.rejectReason)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.batch-manage {
  padding: 10px 20px 0;
}
.scroll-wrap {
  .article-list {
    padding: 5px 20px;
    > li {
      padding: 10px 0;
      // display: flex;
      // align-items: flex-start;
      overflow: hidden;
      .yivideo-right{
        float:right;
        display:flex;
        position:relative;
        width:calc(100% - 220px);
      }
      .long_time{
        position:absolute;
        bottom:10px;
        right:8px;
        color:#FFF;
      }
      > img {
        cursor: pointer;
        height: 118px;
        margin-right: 20px;
        border-radius: 5px;
      }
      > div {
        flex: 1;
        width: 100px; /* 有这个宽度，h5标题宽度才不继续涨 */
        overflow: hidden;
        > h5 {
          font-size: 16px;
          margin-bottom: 5px;
        }
        > p {
          color: #666666;
          line-height: 20px;
          margin-bottom: 30px;
          height: 40px;
          word-wrap: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        // > .other-info {
        //   color: #999999;
        //   display: flex;
        //   align-items: center;
        .video_description{
          cursor:pointer;
          font-size:14px;
          font-weight:400;
          font-family:PingFang SC;
          color:#999;
          margin-top:20px;
        }
          .author-time {
            color: #999999;
            flex: 1;
            overflow: hidden;
            height: 14px;
            margin-top:20px;
            > span {
              float: left;
              padding: 0 8px;
              line-height: 100%;
              &:first-child {
                padding-left: 0;
              }
              & + span {
                border-left: 1px solid #ccc;
              }
            }
          }
          .operational {
            cursor:pointer;
            color: #999999;
            overflow: hidden;
            margin-top:40px;
            > span {
              float: left;
              // cursor: pointer;
              margin-left: 10px;
               &:first-child {
                margin-left: 0;
              }
              img + em {
                font-style: normal;
                vertical-align: middle;
                margin-left: 3px;
              }
            }
          }
        // }
        .collect-button{
          position: absolute;
          bottom:12px;
          right:10px;
          >.el-button{
            &:first-child{
              border:1px solid #666;
              color:#666;
            }
            &:nth-child(2){
              border:1px solid #E23732;
              color:#E23732;
            }
          }
        }
        .edit-button {
          position: absolute;
          bottom:40px;
          right:10px;
          >.el-button{
            &:first-child{
              border:1px solid #666;
              color:#666;
            }
            &:nth-child(2){
              border:1px solid #E23732;
              color:#E23732;
            }
          }
        }
      }
    }
  }
}
.nomore-data {
  text-align: center;
  padding: 20px 0 10px;
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
