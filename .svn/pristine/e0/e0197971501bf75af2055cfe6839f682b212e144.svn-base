<template>
  <div class="comment">
    <!-- <div class="commentText" v-if="!self&&canComment">
      <img :src="$store.state.userInfo.accountId&&$store.state.userInfo.avatar ? $store.state.imageDomain + $store.state.userInfo.avatar : require('@/assets/images/err-header-icon01.png')" alt="">
      <div class="textarea">
        <el-input type="textarea" v-model.trim="addcommentParams.comment"></el-input>
        <button @click="publishComment">评论</button>
      </div>
    </div>-->
    <div class="newsHotDetails_comment" v-loading="operating">
      <div class="add_comment">
        <div>
          <img
            class="header-img"   @click="openUserCenter($store.state.userInfo.accountId)"
            :src="$store.state.userInfo&&$store.state.userInfo.avatar?$store.state.imageDomain + $store.state.userInfo.avatar : require('@/assets/images/err-header-icon01.png')"
            alt
          />
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model.trim="addcommentParams.comment"
          ></el-input>
        </div>
        <p>
          <el-button
            type="danger"
            :disabled="!addcommentParams.comment.length"
            @click="publishComment()"
          >评 论</el-button>
        </p>
      </div>
    </div>
    <div class="comment_count">
      <span
        style="font-size:16px;font-family:Microsoft YaqiHei;font-weight:bold;"
      >{{totalElement}}条评论</span>
      <ul>
        <li :class="{comment_type:comment_type == 'new'}" @click="commentType('new',1)">最新</li>
        <li> | </li>
        <li :class="{comment_type:comment_type == 'hot'}" @click="commentType('hot',2)">热门</li>
      </ul>
    </div>
    <el-scrollbar class="scroll-wrap" :style="{height:CommentList.length>5?'500px':''}">
        <ul
        class="commentlist"
         v-infinite-scroll="getCommentList"
         infinite-scroll-disabled="disabled"
      >
        <li class="list" v-if="CommentList.length" v-for="(item,index) in CommentList" :key="index">
          <img
           @click="openUserCenter(item.accountId)"
            :src="item.avatar?$store.state.imageDomain + item.avatar : require('@/assets/images/err-header-icon01.png')"
            alt
          />
          <div class="userPublish">
            <div class="username">
              <span   @click="openUserCenter(item.accountId)">{{item.nickName}}</span>
              <!-- | commentDate -->
              <span>{{item.commentsTime | commentDate }}</span>
            </div>
            <!-- <p v-html="strReplace(item.comment)"></p> -->
            <p>{{item.comment}}</p>
            <div>
              <div style="width:30px;height:30px;overflow:hidden;display:inline-block">
                <img
                  v-if="!item.wasLike"
                  @click="likeOperate(item,12)"
                  style="position:relative;left:-12.5px;top:-5.5px;"
                  src="@/assets/images/article-zan.png"
                  alt
                />
                <img
                  v-else
                  @click="likeOperate(item,12)"
                  style="position:relative;left:-12.5px;top:-5.5px;"
                  src="@/assets/images/article-yizan.png"
                  alt
                />
              </div>
              <span style="color:#999">{{item.likeCount?item.likeCount:'0'}}</span>
              <span style="color:#EEE"> | </span>
              <span style="cursor:pointer" v-if="item.id == replyId" @click="replyId = ''">取消回复</span>
              <span style="cursor:pointer" v-else @click="replycomment(item,1)">回复</span>
              <span style="color:#EEE" v-if="item.accountId == $store.state.userInfo.accountId"> | </span>
              <span
                style="cursor:pointer"
                v-if="item.accountId == $store.state.userInfo.accountId"
                @click="deleteSomeData(item.id,12)"
              >删除</span>
            </div>
            <div
              v-if="item.id == replyId"
              style="width:100%;border-top:1px solid #EEE;padding:10px 0 0;margin:10px 0 0"
            >
              <el-input
                type="text"
                 v-model.trim="addReplyParams.commentContent"
                :placeholder="item.nickName"
              ></el-input>
              <el-button
                style="float:right;margin:10px 0;"
                type="danger"
                :disabled="!addReplyParams.commentContent.length"
                @click="publishReply()"
              >评 论</el-button>
            </div>
            <!-- 评论的回复 -->
            <ul class="comment_reply" v-if="item.replyCommentCount != 0">
              <div v-for="(v,i) in item.replyCommentRecordDtos" :key="i" style="display:flex">
                <img
                  class="reply_img"
                   @click="openUserCenter(v.accountId)"
                  :src="v.avatar?$store.state.imageDomain + v.avatar : require('@/assets/images/err-header-icon01.png')"
                  alt
                />
                <div style="padding:10px 10px 0 10px;width:100%;">
                  <div class="username">
                    <span  @click="openUserCenter(v.accountId)">{{v.nickName}}</span>
                    <!-- | commentDate -->
                    <span>{{v.replyDate | commentDate }}</span>
                  </div>
                  <!-- <p v-html="strReplace(v.commentContent)"></p> -->
                  <p>{{v.commentContent}}</p>
                  <div class="comment_parent" v-if="v.parentId">
                    <span style="color:#4A4A4A">@{{v.quoteNickName}}:</span>
                    <span v-if="v.quoteDeleteFlag == 1">该评论已删除</span>
                    <span style="color:#999999" v-else>{{v.quoteCommentContent}}</span>
                  </div>
                  <div>
                    <div style="width:30px;height:30px;overflow:hidden;display:inline-block">
                      <img
                        v-if="!v.wasLike"
                        @click="likeOperate(v,13)"
                        style="position:relative;left:-12.5px;top:-5.5px;"
                        src="@/assets/images/article-zan.png"
                        alt
                      />
                      <img
                        v-else
                        @click="likeOperate(v,13)"
                        style="position:relative;left:-12.5px;top:-5.5px;"
                        src="@/assets/images/article-yizan.png"
                        alt
                      />
                    </div>
                    <span style="color:#999">{{v.likeCount?v.likeCount:'0'}}</span>
                    <span style="color:#EEE"> | </span>
                    <span style="cursor:pointer" v-if="v.id == replyId" @click="replyId = ''">取消回复</span>
                    <span style="cursor:pointer" v-else @click="replycomment(v,2)">回复</span>
                    <span style="color:#EEE" v-if="v.accountId == $store.state.userInfo.accountId"> | </span>
                    <span
                      style="cursor:pointer"
                      v-if="v.accountId == $store.state.userInfo.accountId"
                      @click="deleteSomeData(v.id,13)"
                    >删除</span>
                  </div>
                  <div
                    v-if="v.id == replyId"
                    style="width:100%;border-top:1px solid #EEE;padding:10px 0 0;margin:10px 0 0"
                  >
                    <el-input
                      type="text"
                      v-model.trim="addReplyParams.commentContent"
                      :placeholder="v.nickName"
                    ></el-input>
                    <el-button
                      style="float:right;margin:10px 0;"
                      type="danger"
                      :disabled="!addReplyParams.commentContent.length"
                      @click="publishReply()"
                    >评 论</el-button>
                  </div>
                </div>
              </div>
              <div
                v-if="item.replyCommentCount > 2"
                style="cursor:pointer;border-top:1px solid #EEE;margin-top:10px;padding-top:10px;font-size:14px;font-family:Microsoft YaHei;font-weight:400;color:#E23732"
                @click="seeAllReply(item)"
              >查看{{item.replyCommentCount}}条回复</div>
            </ul>    
          </div>
        </li> 
        <p v-if="loading" class="nomore-data">加载中...</p>
        <p v-else-if="noMore" class="nomore-data">没有更多了</p>
      </ul>
    </el-scrollbar>
    <commentReply :dialogVisible="dialogVisible" :comment="comment" @changedialogVisible="dialogVisible=false" @getData="getCommentList(1)"></commentReply>
    <el-dialog title="提示" :visible.sync="dialogVisible2" width="30%">
       <span v-if="deleteData.type == '12'">确认删除此条评论？</span>
      <span v-if="deleteData.type == '13'">确认删除此条回复？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" v-if="deleteData.type == '12'" @click="deletecomment(deleteData.id)">确 定</el-button>
        <el-button type="primary" v-if="deleteData.type == '13'" @click="deleteReply(deleteData.id)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/fetch";
import commentReply from "./commentReply";
export default {
  name: "CommentCom",
  props: {
    num: Number,
    thisid:'',
    self: false,
    canComment: true //是否可以评论
  },
  components: {
    commentReply
  },
  watch: {
    replyId() {
      this.addReplyParams.commentContent = "";
      // if(this.addReplyParams.parentId){
      //   alert(1);
      //   delete this.addReplyParams.parentId
      // }
    },
    comment_type() {
      this.getCommentList(1);
    }
  },
  data() {
    return {
      dialogVisible2: false, //删除的弹框
      deleteData:{
        id:'',
        type:''
      },
      loading: false,
      placeholderNname: "",
      replyId: "",
      dialogVisible: false, //查看所有回复的弹框
      comment: "", //查看某条评论的所有回复，用于弹框组件
      comment_type: "new", //最新和热门的切换
      CommentList: [], // 评论列表
      // totalPages: 0, // 总页数
      totalElement: 0, // 评论加回复总条数
      total:5,//评论总条数
      // 评论列表
      getcommentParams: {
        asc: true,
        pageNum: 1,
        pageSize: 5,
        paramObject: {
          recommendFlag: 1,
          objId: this.$route.params.id,
          objType: 1
        }
      },
      // 新增评论
      addcommentParams: {
        comment: "", // 评论内容
        objId: this.$route.params.id, // 对象id
        objType: 1 // 1.课程2。专栏 5.直播
      },
      //新增回复
      addReplyParams: {
        commentContent: "",
        commentId: "",
        replyAccountId: ""
      },
      operating: false //防止点赞过快
    };
  },
  created() {
    if(this.thisid){  
      this.getcommentParams.paramObject.objId = this.thisid;
      this.addcommentParams.objId = this.thisid;
    }
    this.num
      ? (this.addcommentParams.objType = this.num)
      : (this.addcommentParams.objType = 1);
    this.num
      ? (this.getcommentParams.paramObject.objType = this.num)
      : (this.getcommentParams.paramObject.objType = 1);
    this.getCommentList(1);
  },
  computed: {
    disabled() {
      return this.loading || this.noMore;
    },
    noMore() {
      return this.total == 0;
    }
  },
  methods: {
    commentType(type, n) {
      this.comment_type = type;
      this.getcommentParams.paramObject.recommendFlag = n;
    },
    replycomment(item, n) {
      this.placeholderNname = item.nickName;
      if (n == 2) {
        this.addReplyParams.commentId = item.commentId;
        this.addReplyParams.parentId = item.id;
      } else {
        delete this.addReplyParams.parentId;
        this.addReplyParams.commentId = item.id;
      }
      this.replyId = item.id;
      this.addReplyParams.replyAccountId = JSON.parse(
        localStorage.getItem("userInfo")
      ).accountId;
    },
    //查看所有回复
    seeAllReply(item) {
      this.comment = item;
      this.dialogVisible = true;
    },
    strReplace(str) {
      if(!str) return;
      return str.replace(/\n/g, "<br/>");
    },
    //发布回复
    async publishReply() {
      if (!this.$store.state.userInfo.accountId) {
        this.$router.push('/login')
        return
      }
      if (this.addReplyParams.commentContent) {
        const res = await api.addReply(this.addReplyParams);
        this.$message({
          message: "回复成功",
          type: "success"
        });
        this.getCommentList(1);
        this.addReplyParams.commentContent = "";
        // this.$emit("getTotal", this.totalElement);
        this.replyId = "";
      } else {
        this.$message("请先输入回复内容！");
      }
    },
    //删除回复
    async deleteReply(id) {
      const res = await api.delReply(id);
      if (res.code == 200) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.getCommentList(1);
        // this.$emit("getTotal", this.totalElement);
        this.dialogVisible2 = false;
      }
    },
    // 发布评论
    async publishComment() {
       if (!this.$store.state.userInfo.accountId) {
        this.$message('未登录')
        setTimeout(()=>{
            this.$router.push('/login')
        },1000)
         return
      }
      // 新增评论
      if (this.addcommentParams.comment) {
        const res = await api.addComment(this.addcommentParams);
        this.$message({
          message: "评论成功",
          type: "success"
        });
        this.getCommentList(1);
        this.addcommentParams.comment = "";
        // this.$emit("getTotal", this.totalElement);
      } else {
        this.$message("请先输入评论内容！");
      }
    },
    // 评论   type表示是否是滚动触发的刷新
    async getCommentList(type) {
      if (type) {
        this.CommentList = [];
        this.getcommentParams.pageNum = 1;
        this.getcommentParams.pageSize = 5;
      }
      this.loading = true;
      const res = await api.getCommentList(this.getcommentParams);
      if (res.code == 200) {
        this.loading = false;
      }
      this.CommentList = [...this.CommentList, ...res.data.records];
      this.getcommentParams.pageNum = res.data.current;
      this.getcommentParams.pageSize = res.data.size;
      // this.totalPages = res.data.pages;
      this.total =res.data.records.length;
      this.totalElement = res.data.total;
      this.$store.commit("getCommentNum", res.data.total);
      !this.noMore && this.getcommentParams.pageNum++;
    },
    //删除
    deleteSomeData(id,type){
       this.dialogVisible2 = true;
       this.deleteData.id = id;
       this.deleteData.type = type;
    },
    async deletecomment(id) {
      const res = await api.delComment(id);
      if (res.code == 200) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.getCommentList(1);
        // this.$emit("getTotal", this.totalElement);
        this.dialogVisible2 = false;
      }
    },
    likeOperate(item, type) {
      if (this.operating) return;
      this.operating = true;
      if (item.wasLike) {
        api
          .likeDelete(type, item.id)
          .then(res => {
            item.wasLike = false;
            item.likeCount--;
          })
          .finally(() => (this.operating = false));
      } else {
        api
          .likeAdd({ objType: type, objId: item.id })
          .then(res => {
            item.wasLike = true;
            item.likeCount++;
          })
          .finally(() => (this.operating = false));
      }
    }
  }
};
</script>

<style lang="less" scoped>
.comment {
  padding: 20px 20px 0 20px;
  min-height: calc(100vh - 520px);
  .commentText {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 20px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: none;
    }
    .textarea {
      > button {
        margin-top: 10px;
        background: #fff;
        width: 90px;
        height: 32px;
        border: 1px solid #dddddd;
        color: #4a4a4a;
        border-radius: 5px;
        &:hover {
          cursor: pointer;
        }
      }
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-end;
      /deep/.el-textarea {
        .el-textarea__inner {
          margin-left: 10px;
          width: 670px;
          height: 120px;
        }
      }
    }
  }
  .newsHotDetails_comment {
    margin-top: 5px;
    margin-left: 20px;
    padding-top: 12px;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    padding-bottom: 20px;
    position: relative;
    > .add_comment {
      padding-right: 18px;
      > div {
        display: flex;
      }
      > p {
        padding-top: 10px;
        text-align: right;
        > .el-button {
          width: 90px;
        }
      }
    }
  }
  .comment_count {
    display: flex;
    justify-content: space-between;
    line-height: 45px;
    padding-left: 20px;
    > ul {
      .comment_type {
        color: red;
      }
      li {
        display: inline;
        cursor: pointer;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
      }
    }
  }
  .commentlist {
    // height: 501px;
    // overflow: auto;
    padding: 0 20px 20px 20px;
    li {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 20px;
      > img {
        cursor:pointer;
        margin-top: 10px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .userPublish {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin-left: 10px;
        padding: 26px 0 0 10px;
        width: 100%;
        p {
          word-break: break-all;
          width: 100%;
          color: #666;
        }
        .username {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          span:first-child {
            cursor:pointer;
            color: #4a4a4a;
          }
          span:last-child {
            color: #999;
          }
        }
        .comment_reply {
          padding: 10px 0 10px 10px;
          margin-top: 10px;
          width: 100%;
          background: #fafafa;
          .reply_img {
            cursor:pointer;
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          .comment_parent {
            border-left: 3px solid #eee;
            padding: 7px 10px;
            margin: 5px 0;
            span {
              font-size: 15px;
              font-family: PingFang SC;
              font-weight: 400;
            }
          }
        }
      }
    }
  }
  .header-img {
    cursor:pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .scroll-wrap {
    // overflow:auto;
    // height:500px;
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    /deep/.is-horizontal {
      // display: none;
    }
  }
}
em,
i,
s {
  font-style: normal;
  text-decoration: none;
}
.nomore-data {
  text-align: center;
  margin: 20px 0 10px;
  color: #999;
}
</style>
