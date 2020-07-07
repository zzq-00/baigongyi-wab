<template>
  <div class="container clearfix">
    <div class="left-content fl">
      <div class="clearfix user-info">
        <img class="fl header-img" @click="openUserCenter(articleData.accountId)" :src="articleData.avatar?$store.state.imageDomain + articleData.avatar : require('@/assets/images/err-header-icon01.png')" alt="" width="40px" height="40px">
        <div class="fl">
          <span @click="openUserCenter(articleData.accountId)" style="cursor: pointer;">{{articleData.nickName}}</span>
          <br>
          <span>{{articleData.publishTime | formatDate}}</span>
          <span><i class="el-icon-view"></i> {{articleData.watchCount}}</span>
        </div>
        <span class="fr" style="line-height:40px;cursor:pointer;color:#f33535;" v-if="articleData.status == 2" @click="openShieldReason">查看屏蔽原因</span>
      </div>
      <div class="article-detail">
        <h1>
          <span v-if="articleData.type == 2">(转载)</span>
        {{(articleData.status == 2 ? "【已屏蔽】" : "") + articleData.title}}
        </h1>
        <p class="summary">摘要：{{articleData.description}}</p>
        <div style="min-height:300px" v-html="handleHtml(articleData.content)"></div>
        <div class="sourceUrl">
          <div class="notes" style="color:#7A859B">编辑于{{articleData.updateTime}}</div>
          <div class="notes" v-if="articleData.type==2" style="color:#7A859B">原文链接：{{articleData.sourceUrl}}</div>
          <div class="statement">【声明】转载内容均为"百工驿"平台用户自行上传并发布，仅代表作者个人观点，与本网无关。原创内容，版权所有，转载请注明来源</div>
        </div>
      </div> 
      <div class="article-comment" ref="comment">
        <comment-com   :num="3" ></comment-com>
        <!-- <div class="scroll-wrap">
          <ul class="comment-list" v-scroll="getCommentList" :scroll-disabled="disabled">
            <li v-for="(item, index) in commentList" :key="index">
              <img class="header-img" @click="openUserCenter(item.accountId)" :src="item.avatar?$store.state.imageDomain + item.avatar : require('@/assets/images/err-header-icon01.png')" alt="" width="40px" height="40px">
              <div>
                <div class="clearfix">
                  <span class="fl" @click="openUserCenter(item.accountId)" style="cursor: pointer;">{{item.nickName}}</span>

                  <span class="fr time">{{item.commentsTime | commentDate}}</span>
                </div>
                <p style="word-break: break-word;" v-html="strReplace(item.comment)"></p>
              </div>
            </li>
          </ul>
          <p v-if="loading" class="nomore-data">加载中...</p>
          <p v-if="noMore" class="nomore-data">没有更多了</p>
        </div> -->
      </div>
    </div>
    <div class="right-content fr">
      <div class="about-author">
        <div class="font-16">关于作者</div>
        <div>
          <img @click="$router.push('/myHome/myReply?id='+articleData.accountId)" class="header-img cursor-pointer" :src="authorData.avatar?$store.state.imageDomain + authorData.avatar : require('@/assets/images/err-header-icon01.png')" alt="" width="60px" height="60px">
          <div>
            <p @click="$router.push('/myHome/myReply?id='+articleData.accountId)" class="ellipsis font-bold cursor-pointer">{{authorData.nickName}}</p>
            <p class="gray ellipsis">{{authorData.introduction}}</p>
          </div>
          <template v-if="userInfo.accountId !== articleData.accountId">
            <!-- 1 已关注 2 无关注 3互相关注 -->
            <el-button @click="addAttention(authorData)" type="danger" v-if="authorData.concernStatus===2">关注</el-button>
            <el-button @click="delAttention(authorData)" type="info" v-else>{{authorData.concernStatus===1?'已关注':'互相关注'}}</el-button>
          </template>
        </div>
        <div>
          <span>
            <span class="font-16 font-bold">{{authorData.likeCount}}</span>
            <br>
            <span class="font-12 gray">获赞</span>
          </span>
          <span>
            <span class="font-16 font-bold">{{authorData.watchCount}}</span>
            <br>
            <span class="font-12 gray">文章被阅读</span>
          </span>
        </div>
      </div>
      <recommendColumn />
      <recommendCourse />
        <backtop></backtop>
    </div>
    <operateIcon :propData='articleData' :objType='3' :showShare="articleData.status != 2" :weixinShareLink='link()' @gotoComment='gotoComment' @getNewCount="getAuthorDetails()" />
  </div>
</template>

<script>
let backTop=document.querySelector(".back-top");
import api from '@/fetch'
import recommendColumn from '@/components/recommendColumn'
import recommendCourse from '@/components/recommendCourse'
import operateIcon from '@/components/operateIcon'
import backtop from '@/components/backtop'
import commentCom from '@/components/commentCom'
export default {
  components: {
    recommendColumn,
    recommendCourse,
    operateIcon,
    backtop,
    commentCom
  },
  data() {
    return {
      articleData: {},
      authorData: {},
      commentList: [],
      commentParams: {
        comment: '',
        objId: this.$route.params.id,
        objType: 3
      },
      listParams: {
        asc: true,
        pageNum: 1,
        pageSize: 10,
        paramObject: {
          objId: this.$route.params.id,
          objType: 3
        }
      },
      totalComment: 1,
      userInfo: this.$store.state.userInfo,
      loading: false,
      btnFlag:false
    }
  },
  computed: {
    noMore() {
      return this.commentList.length >= this.totalComment
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  methods: {
    strReplace(str) {
      return str.replace(/\n/g, '<br/>')
    },
    // 文章详情
    async viewArticle() {
      let { data: articleData } = await api.viewArticle(this.$route.params.id)
      this.articleData = articleData
      let  date = new Date(articleData.updateTime);
      let year = date.getFullYear();
      let  month = date.getMonth() + 1;
      let day = date.getDate();
      this.articleData.updateTime=year+'-'+month+'-'+day
      this.getAuthorDetails()
    },
    async getAuthorDetails() {
      // 作者详情
      let { data: authorData } = await api.getAuthorDetails(this.articleData.accountId)
      this.authorData = authorData
    },
    // 添加评论
    // addComment() {
    //   if (this.commentParams.comment.length === 0) return this.$message.warning('请填写评论')
    //   if (this.commentParams.comment.length > 1000) return this.$message.warning('评论不得超过1000字')
    //   api.addComment(this.commentParams).then(res => {
    //     this.$message({
    //       message: '评论成功',
    //       type: 'success'
    //     })
    //     this.commentList = []
    //     this.listParams.pageNum = 1
    //     this.getCommentList()
    //     this.articleData.commentCount++
    //     this.commentParams.comment = ''
    //   })
    // },
    // 评论列表
    // getCommentList() {
    //   this.loading = true
    //   api.getCommentList(this.listParams).then(res => {
    //     this.loading = false
    //     this.commentList = [...this.commentList, ...res.data.records]
    //     this.totalComment = res.data.total
    //     !this.noMore && this.listParams.pageNum++
    //   })
    // },
    // 添加关注
    addAttention(authorData) {
      api.addAttention({ objId: this.articleData.accountId, objType: 6 }).then(res => (authorData.concernStatus = res.data))
    },
    delAttention(authorData) {
      api.delAttention({ objId: this.articleData.accountId, objType: 6 }).then(res => (authorData.concernStatus = 2))
    },
    gotoComment() {
      window.scrollTo(0, this.$refs['comment'].offsetTop)
    },
    link() {
      return process.env.VUE_APP_M_URL + 'share/article?id=' + this.$route.params.id
    },
    openShieldReason() {
      this.$alert(this.articleData.shieldRecord.shieldReason, { confirmButtonText: '确定' })
    },
  },
  mounted() {
    
    if (this.$route.hash === '#comment') {
      setTimeout(this.gotoComment, 1000)
    } else {
      window.scrollTo(0, 0)
    }
    this.viewArticle()
  }
}
</script>

<style lang="less" scoped>
.container {
  margin: 21px auto 29px;
  min-height: 800px;
  position: relative;
  .left-content {
    width: 780px;
    background-color: #fff;
    border-radius: 10px;
    min-height: 700px;
    padding: 20px 70px 20px 80px;
    box-sizing: border-box;
    .user-info {
      > div {
        margin-top: 5px;
        > span:not(:first-child) {
          color: #99999999;
          font-size: 12px;
          margin-right: 30px;
        }
      }
    }
    .article-detail {
      position:relative;
      min-height: 300px;
      > h1 {
        font-size: 22px;
        margin: 10px 0 15px;
      }
      .summary {
        color: #666;
        word-break: break-all;
        margin-bottom: 15px;
        text-align: justify;
        line-height: 22px;
      }
      .sourceUrl{
         .notes{
          font-size:14px;
          font-family:PingFang SC;
          font-weight:400;
          color:#7A859B;
          line-height:22px;
         }
         .statement{
           background:#F2F2F2;
           padding:20px 15px;
           font-size:14px;
           font-family:PingFang SC;
           font-weight:400;
         }
      }
    }
    .article-comment {
      > div:first-child {
        line-height: 30px;
        // border-bottom: 1px solid #dddddd;
      }
      .user-comment {
        margin-top: 20px;
        > div:first-child {
          display: flex;
          .header-img {
            margin-right: 10px;
          }
        }
        > div:last-child {
          text-align: right;
          margin-top: 10px;
        }
      }
    }
    .scroll-wrap {
      .comment-list {
        margin-top: 20px;
        padding-right: 10px;
        > li {
          display: flex;
          .header-img {
            margin-top: 7px;
          }
          > div {
            padding: 15px 0;
            border-top: 1px solid #dddddd;
            flex: 1;
            .time {
              color: #999;
              font-size: 12px;
            }
            > p {
              margin-top: 7px;
            }
          }
        }
      }
    }
  }
  .right-content {
    width: 300px;
    > div + div {
      margin-top: 20px;
    }
    .about-author {
      width: 100%;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 10px;
      padding: 15px 20px;
      > div {
        &:nth-child(2) {
          margin-top: 7px;
          display: flex;
          align-items: center;
          > div {
            flex: 1;
            overflow: hidden;
            > p + p {
              width: 95%;
              margin-top: 10px;
            }
          }
        }
        &:last-child {
          display: flex;
          align-items: center;
          justify-content: space-around;
          border-top: 1px solid #ddd;
          margin-top: 10px;
          padding-top: 18px;
          text-align: center;
        }
      }
    }
  }
  .header-img {
    border-radius: 50%;
    margin-right: 10px;
  }
}
.nomore-data {
  text-align: center;
  margin: 20px 0 10px;
  color: #999;
}

</style>
