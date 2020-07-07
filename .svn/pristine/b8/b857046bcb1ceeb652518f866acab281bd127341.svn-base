<template>
  <div class='container  clearfix'>
    <div class='hotMessage_nav'>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in hotMessageNav" :key="index" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class='newsHotDetails_main'>
      <h4>{{detailsData.title}}</h4>
      <div class='message'>
        <p>
          <span>
            <i class="el-icon-time"></i>{{detailsData.publishTime | formatDate}}</span>
          <span>
            <i class="el-icon-view"></i>{{detailsData.watchCount}}</span>
        </p>
      </div>
      <div class='zhaiyao'>摘要：{{detailsData.roundup}}</div>
      <div class='content' v-html='detailsData.content'></div>
      <div class="source">
        <p>来源：{{detailsData.sourceName}}</p>
        <br>
        <p v-if="detailsData.sourceUrl">原文链接：<a :href="detailsData.sourceUrl" target="_blank">{{detailsData.sourceUrl}}</a></p>
      </div>
      <div class='newsHotDetails_label'>
        <p>
          本站系本网编辑转载，转载目的在于传递更多信息，并不代表本网赞同其观点和对其真实性负责。如涉及作品内容、版权和其它问题，请及时与本网联系，我们将根据著作权人的要求，立即更正或者删除有关内容。<br /> 【声明】本站文章版权归原作者所有内容为作者个人观点 本站只提供参考并不构成任何投资及应用建议。本站拥有对此声明的最终解释权。
        </p>
      </div>
      
      <div class='newsHotDetails_comment' id="comment">
          <comment-com   :num="7" ></comment-com>
      </div>
    </div>
    <operateIcon :propData='detailsData' :objType='7' :weixinShareLink='link()' :shoucang='true' @gotoComment='gotoComment' />
            <backtop></backtop>
  </div>
</template>
<script>
import api from '@/fetch'
import operateIcon from '@/components/operateIcon'
import commentCom from '@/components/commentCom'
import backtop from '@/components/backtop'
export default {
  components: {
    operateIcon,
    backtop,
    commentCom
  },
  data() {
    return {
      btnFlag:false,
      textarea: '',
      queryId: '',
      detailsData: {},
      fenxData: {
        id: '',
        num: '',
        path: this.$route.fullPath,
        likeCount: 0
      },
      page: {
        comment: '',
        objId: '',
        objType: 7
      },
      params: {
        pageNum: 1,
        pageSize: 20,
        paramObject: {
          objId: '',
          objType: 7
        }
      },
      hotMessageNav: [
        {
          name: '热点资讯',
          path: '/hotmessage'
        },
        {
          name: '环球资讯'
        }
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollToTop);
    this.queryId = this.$route.params.id
    this.page.objId = this.$route.params.id
    this.$store.commit('getHotmessageData', this.fenxData)
    if (this.$route.query.currentIndex == 0) {
      this.hotMessageNav[1].name = '环球资讯'
    } else if (this.$route.query.currentIndex == 1) {
      this.hotMessageNav[1].name = '行业热点'
    } else if (this.$route.query.currentIndex == 2) {
      this.hotMessageNav[1].name = '建筑前沿'
    } else if (this.$route.query.currentIndex == 3) {
      this.hotMessageNav[1].name = '资质热点'
    } else {
      this.hotMessageNav[1].name = '职场资讯'
    }
    api
      .browseRecord({
        objId: this.queryId,
        objType: 7
      })
      .then(res => {})
    this.getDetailsDataFn()
  },
  methods: {
    strReplace(str) {
      return str.replace(/\n/g, '<br/>')
    },
    gotoComment() {
      window.scrollTo(0, document.getElementById('comment').offsetTop)
    },
    getDetailsDataFn() {
      api.hotNewsId(this.queryId).then(res => {
        this.detailsData = res.data
        this.fenxData.likeCount = this.detailsData.likeCount
        this.detailsData.whetherLike = res.data.wasLike
        this.fenxData.id = this.detailsData.id
      })
    },

    link() {
      return process.env.VUE_APP_M_URL + 'share/hotNews?id=' + this.$route.params.id
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  position: relative;
  h4 {
    font-size: 18px;
    color: #4a4a4a;
    font-weight: 600;
    text-align: center;
    padding-top: 30px;
    padding-bottom: 20px;
    background: #fff;
  }
  .zhaiyao {
    padding-top: 10px;
    color: #333333;
  }
}

.hotMessage_nav {
  height: 40px;
  line-height: 40px;
  /deep/ .el-breadcrumb {
    height: 40px;
    line-height: 40px;
  }
  /deep/ .el-breadcrumb__inner {
    color: #4a4a4a;
    font-weight: 500;
    &:hover {
      color: #e23732;
    }
  }
}

.newsHotDetails_main {
  padding-left: 230px;
  padding-right: 230px;
  padding-bottom: 20px;
  overflow-y: scroll;
  background: #fff;
  flex: 1;
  .message {
    display: flex;
    justify-content: center;
    > span {
      color: #999999;
    }
    > p {
      span {
        color: #999999;
        i {
          color: #999999;
          padding-right: 6px;
        }
        &:nth-child(2) {
          padding-left: 12px;
        }
      }
    }
  }
  .content {
    padding-top: 12px;
  }
}
.source{
  margin-top: 20px;
}
.newsHotDetails_label {
  padding: 22px;
  margin-top: 20px;
  background: #eee;
  width: 598px;
  > p {
    color: #333333;
    line-height: 20px;
  }
}

.newsHotDetails_comment {
  padding-top: 30px;
  width: 100%;
  > p {
    padding-bottom: 10px;
    border-bottom: 1px solid #dddddd;
  }
  > .add_comment {
    padding-top: 20px;
    > div {
      display: flex;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }
      /deep/ .el-textarea__inner {
        height: 120px;
        border: 1px solid #ddd;
        border-radius: 10px;
      }
    }
    p {
      padding-top: 10px;
      display: flex;
      justify-content: flex-end;
      button {
        background: #fff;
        width: 90px;
        height: 34px;
        border: 1px solid #dddddd;
        border-radius: 5px;
        color: #4a4a4a;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  > ul {
    padding-top: 20px;
    padding-bottom: 20px;
    > li {
      border-top: 1px solid #dddddd;
      dl {
        display: flex;
        padding-top: 10px;
        padding-bottom: 20px;
        dt {
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #ccc;
          }
        }
        dd {
          padding-left: 10px;
          flex: 1;
          > div {
            padding-top: 10px;
            display: flex;
            justify-content: space-between;
            p {
              color: #4a4a4a;
              em {
                color: #999999;
                font-style: normal;
                &:nth-child(2) {
                  padding-left: 8px;
                }
              }
            }
          }
          > p {
            padding-top: 12px;
            color: #666666;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.content {
  > p {
    width: 100%;
    height: 100%;
    color: rgba(74, 74, 74, 1);
    font-size: 14px;
    line-height: 25px;
    > img {
      display: block;
      width: 100% !important;
      height: 100% !important;
      padding-bottom: 10px;
    }
  }
}

.pagination {
  text-align: center;
  margin-bottom: 20px;
  .el-pagination .btn-next,
  .el-pagination .btn-prev {
    width: 40px;
    height: 40px;
    padding-right: auto;
    .el-icon-arrow-left:before,
    .el-icon-arrow-right:before {
      font-size: 20px;
    }
  }
  .el-pagination {
    slot {
      span {
        font-size: 20px;
        margin: 6px 20px 0;
        color: #999;
        font-weight: normal;
      }
    }
    .el-pagination__total {
      margin: 6px 0 0 20px;
      font-size: 20px;
      color: #999;
      font-weight: normal;
    }
  }
}
em,
i,
s {
  font-style: normal;
  text-decoration: none;
}
</style>


