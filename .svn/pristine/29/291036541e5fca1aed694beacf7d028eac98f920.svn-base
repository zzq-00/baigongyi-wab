<template>
  <div>
    <el-dialog title="查看全部回复" :visible.sync="dialogVisible" width="40%">
      <div class="commentReply">
        <img
        @click="openUserCenter(comment.accountId)"
          class="comment_img"
          :src="comment.avatar?$store.state.imageDomain + comment.avatar : require('@/assets/images/err-header-icon01.png')"
          alt
        />
        <div class="comment_main" style="width:100%">
          <div class="username" style="display: flex">
            <span @click="openUserCenter(comment.accountId)">{{comment.nickName}}</span>
            <span>{{comment.commentsTime | commentDate }}</span>
          </div>
          <!-- <p v-html="strReplace(comment.comment)"></p> -->
          <p>{{comment.comment}}</p>
          <div>
            <div style="width:30px;height:30px;overflow:hidden;display:inline-block">
              <img
                v-if="!comment.wasLike"
                @click="likeOperate(comment,12)"
                style="position:relative;left:-12.5px;top:-5.5px;"
                src="@/assets/images/article-zan.png"
                alt
              />
              <img
                v-else
                @click="likeOperate(comment,12)"
                style="position:relative;left:-12.5px;top:-5.5px;"
                src="@/assets/images/article-yizan.png"
                alt
              />
            </div>
            <span style="color:#999">{{comment.likeCount?comment.likeCount:'0'}}</span>
            <span style="color:#EEE"> | </span>
            <span style="cursor:pointer" @click="replycomment(comment,1)">回复</span>
          </div>
          <div
            v-if="comment.id == replyId"
            style="width:100%;border-top:1px solid #EEE;padding:10px 0 0;margin:10px 0 0"
          >
            <el-input type="text" v-model.trim="addReplyParams.commentContent" :placeholder="comment.nickName"></el-input>
            <el-button
              style="float:right;margin:10px 0;"
              type="danger"
              :disabled="!addReplyParams.commentContent.length"
              @click="publishReply()"
            >评 论</el-button>
          </div>
        </div>
      </div>
      <div style="width:100%;height:10px;background:#F7F7F7"></div>
      <el-scrollbar class="scroll-wrap">
        <ul
          v-infinite-scroll="getReplyList"
          infinite-scroll-disabled="disabled"
        >
          <li class="commentReply" v-for="(item,index) in relayList" :key="index">
            <img
            @click="openUserCenter(item.accountId)"
              class="comment_img"
              :src="item.avatar?$store.state.imageDomain + item.avatar : require('@/assets/images/err-header-icon01.png')"
              alt
            />
            <div class="comment_main" style="width:100%;padding-left:10px">
              <div class="username" style="display: flex">
                <span @click="openUserCenter(item.accountId)">{{item.nickName}}</span>
                <span>{{item.replyDate | commentDate }}</span>
              </div>
              <!-- <p v-html="strReplace(item.commentContent)"></p> -->
              <p>{{item.commentContent}}</p>
              <div class="comment_parent" v-if="item.parentId">
                <span style="color:#4A4A4A">@{{item.quoteNickName}}:</span>
                <span v-if="item.quoteDeleteFlag == 1">该评论已删除</span>
                <span v-else style="color:#999999">{{item.quoteCommentContent}}</span>
              </div>
              <div>
                <div style="width:30px;height:30px;overflow:hidden;display:inline-block">
                  <img
                    v-if="!item.wasLike"
                    @click="likeOperate(item,13)"
                    style="position:relative;left:-12.5px;top:-5.5px;"
                    src="@/assets/images/article-zan.png"
                    alt
                  />
                  <img
                    v-else
                    @click="likeOperate(item,13)"
                    style="position:relative;left:-12.5px;top:-5.5px;"
                    src="@/assets/images/article-yizan.png"
                    alt
                  />
                </div>
                <span style="color:#999">{{item.likeCount?item.likeCount:'0'}}</span>
                <span style="color:#EEE"> | </span>
                <span style="cursor:pointer" @click="replycomment(item,2)">回复</span>
                <span style="color:#EEE" v-if="item.accountId == $store.state.userInfo.accountId"> | </span>
                <span
                  style="cursor:pointer"
                  v-if="item.accountId == $store.state.userInfo.accountId"
                  @click="deleteReply2(item.id)"
                >删除</span>
              </div>
              <div
                v-if="item.id == replyId"
                style="width:100%;border-top:1px solid #EEE;padding:10px 0 0;margin:10px 0 0"
              >
                <el-input type="text" v-model.trim="addReplyParams.commentContent" :placeholder="item.nickName"></el-input>
                <el-button
                  style="float:right;margin:10px 0;"
                  type="danger"
                  :disabled="!addReplyParams.commentContent.length"
                  @click="publishReply()"
                >评 论</el-button>
              </div>
            </div>
          </li>
            <p v-if="loading" class="nomore-data">加载中...</p>
          <p v-else-if="noMore" class="nomore-data">没有更多了</p>
        </ul>
        
      </el-scrollbar>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
        <el-dialog
      width="30%"
      title="提示"
      :visible.sync="innerVisible"
      append-to-body
      >
      <div style="text-align:center;margin-bottom:30px;">确认删除此回复？</div>
       <div style="text-align:center;padding-bottom:20px;">
         <el-button @click="innerVisible = false" style="margin-right:30px">取 消</el-button>
        <el-button type="primary" @click="deleteReply(deleteId)">确 定</el-button>
       </div>
    </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/fetch";
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    comment: {
      type: Object
    }
  },
  data() {
    return {
      deleteId:'',
      innerVisible:false,  //删除的弹框
      operating: false, //防止快速点赞取消
      getReplyParams: {
        asc: true,
        pageNum: 1,
        pageSize: 4,
        paramObject: {
          commentId: ""
        }
      },
      totalElement: "",
      replyId: "",
      addReplyParams: {
        commentContent: "",
        commentId: "",
        replyAccountId: ""
      },
      relayList: [],
      loading:false
    };
  },
  computed: {
    disabled() {
      return this.loading || this.noMore;
    },
    noMore() {
      return this.relayList.length >= this.totalElement;
    }
  },
  methods: {
    deleteReply2(id){
       this.innerVisible = true;
       this.deleteId = id;
    },
    //新增回复
    async publishReply() {
      if (this.addReplyParams.commentContent) {
        const res = await api.addReply(this.addReplyParams);
        if (res.code == 200) {
          this.$message({
            message: "回复成功",
            type: "success"
          });
          this.getReplyList(1);
          this.addReplyParams.commentContent = "";
          this.replyId = "";
          this.$emit("getData");
        }
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
        this.getReplyList(1);
        this.$emit("getData");
        this.innerVisible = false;
      }
    },
    replycomment(item, n) {
      if (n == 2) {
        // this.addReplyParams
        this.addReplyParams.commentId = item.commentId;
        this.addReplyParams.parentId = item.id;
      } else {
        if (this.addReplyParams.parentId) {
          delete this.addReplyParams.parentId;
        }
        this.addReplyParams.commentId = item.id;
      }
      this.replyId = item.id;
      this.addReplyParams.replyAccountId = JSON.parse(
        localStorage.getItem("userInfo")
      ).accountId;

    },
    strReplace(str) {
      if(!str) return;
      return str.replace(/\n/g, "<br/>");
    },
    getReplyList(type) {
      if (type) {
        this.relayList = [];
        this.getReplyParams.pageNum = 1;
        this.totalElement = 10;
      }
      
      this.loading = true;
      this.getReplyParams.paramObject.commentId = this.comment.id;
      api.getReplyList(this.getReplyParams).then(res => {
        this.loading = false;
        this.relayList = [...this.relayList, ...res.data.records];
        this.totalElement = res.data.total;
        !this.noMore && this.getReplyParams.pageNum++;
        if(!this.disabled){
          this.getReplyList();
        }
      });
    },
    //点赞
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
        // console.log()
        api
          .likeAdd({ objType: type, objId: item.id })
          .then(res => {
            item.wasLike = true;
            item.likeCount++;
          })
          .finally(() => (this.operating = false));
      }
      this.$emit("getData");
    }
  },
  watch: {
    replyId() {
      this.addReplyParams.commentContent = "";
    },
    dialogVisible() {
      if (!this.dialogVisible) return this.$emit("changedialogVisible");
      this.getReplyList(1);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.el-dialog__body {
  padding: 0;
}
.commentReply {
  border-top: 1px solid #eee;
  padding: 20px;
  display: flex;
  > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .comment_main{
    padding: 14px 0 0 10px;
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
  }

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
.scroll-wrap {
  height: 400px;
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }

}
.nomore-data {
  text-align: center;
  margin: 20px 0 10px;
  color: #999;
}
.comment_img{
  cursor: pointer;
}
</style>