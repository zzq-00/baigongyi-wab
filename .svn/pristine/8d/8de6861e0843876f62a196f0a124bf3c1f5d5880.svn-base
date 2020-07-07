<template>
  <div class="scroll-wrap">
    <ul class="article-list" v-scroll="loadArticle" :scroll-disabled="disabled">
      <li v-for='(item,index) in listData' :key='index'>
        <img :src="$store.state.imageDomain + item.image" alt="" width="200px" @click="gotoDetail('/article/list/' + item.id)">
        <div>
          <h5 class="ellipsis">
            <router-link :to="'/article/list/'+item.id" target="_blank">{{item.title}}</router-link>
          </h5>
          <p>{{item.description}}</p>
          <div class="operational">
            <span @click="gotoDetail('/article/list/' + item.id + '#comment')" id='hov'>{{item.nickName + (item.publishTime ? ' | '+item.publishTime.slice(0,16) : '')}}</span>
            <div>
              <span @click="likeOperate(item)">
                <img v-if="item.whetherLike" src="@/assets/images/yizan.png" alt="">
                <img v-else src="@/assets/images/zan.png" alt="">
                <em>{{item.likeCount}}</em>
              </span>
              <span @click="gotoDetail('/article/list/' + item.id + '#comment')">
                <img src="@/assets/images/pinglun.png" alt="">
                <em> {{item.commentCount}}</em>
              </span>
              <span @click="collectOperate(item)">
                <img v-if="item.whetherToCollect" src="@/assets/images/yishoucang.png" alt="">
                <img v-else src="@/assets/images/shoucang.png" alt="">
                <em class='shoucang'>{{item.whetherToCollect?'已收藏':'收藏'}}</em>
              </span>
              <el-popover placement="bottom" trigger="click" @show="wxShare(item.id)" width="150">
                <ul class="share-list">
                  <li @click="copyText(item.id)" style="font-size: 12px;border-bottom: 1px solid #DDDDDD;padding-bottom: 9px;">
                    <img src="@/assets/images/lianjie.png" alt="">
                    <span style="vertical-align: middle;margin-left: 8px;cursor: pointer;">复制链接</span>
                  </li>
                  <li style="font-size: 12px;line-height: 30px">
                    <img src="@/assets/images/weixin.png" alt="">
                    <span style="vertical-align: middle;margin-left: 8px;">微信扫一扫</span>
                    <canvas :ref="'canvas'+item.id" style="max-width: 74px;max-height: 74px;display: block;margin: 0 auto;"></canvas>
                  </li>
                </ul>
                <span slot="reference">
                  <img src="@/assets/images/share.png" alt="">
                  <em style='width:30px;padding-right:0px;'>分享</em>
                </span>
              </el-popover>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <p v-if="loading" class="nomore-data">加载中...</p>
    <div v-else-if="!listData.length" class="no-data">
      <img src="@/assets/images/No-article.png" alt="">
      <p>暂无文章</p>
    </div>
    <p v-else-if="noMore" class="nomore-data">没有更多了</p>
  </div>
</template>
<script>
import api from '@/fetch'
import QRCode from 'qrcode'
export default {
  data() {
    return {
      loading: false,
      totals: 0,
      params: {
        asc: false,
        keywords: '',
        pageNum: 1,
        pageSize: 10
      },
      listData: [],
      operating: false,
      objType: 3 //文章
    }
  },
  computed: {
    noMore() {
      return this.listData.length >= this.totals
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  watch: {
    $route(to, from) {
      this.listData = []
      this.params.pageNum = 1;
      this.getListData(this.$route.query.id)
    }
  },
  mounted() {
    this.getListData(this.$route.query.id)
  },
  methods: {
    getListData(id = "ebbe50e030b34863af4b08562f8592bd") {
      this.loading = true
      this.params.keywords = id
      api.tagsArticleList(this.params).then(res => {
        this.loading = false
        this.listData = this.listData.concat(res.data.records)
        this.listData.forEach((item, index) => {
          if (item.nickName.length >= 5) {
            item.nickName = item.nickName.substring(0, 5) + '...'
          } else {
            item.nickName = item.nickName
          }
        })
        this.totals = res.data.total
        !this.noMore && this.params.pageNum++
      })
    },
    loadArticle() {
      this.getListData(this.$route.query.id)
    },
    //点赞
    likeOperate(item) {
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
    //评论
    gotoDetail(url) {
      window.open(url)
    },
    // 收藏
    collectOperate(item) {
      if (item.whetherToCollect) {
        api.cancelCollect({ objType: this.objType, objId: item.id }).then(res => {
          item.whetherToCollect = false
        })
      } else {
        api.addCollect({ objType: this.objType, objId: item.id }).then(res => {
          item.whetherToCollect = true
        })
      }
    },
    // 复制链接
    copyText(id) {
      let text = `${window.location.origin}/article/list/${id}`
      var textarea = document.createElement('textarea') //创建input对象
      var currentFocus = document.activeElement //当前获得焦点的元素
      var toolBoxwrap = document.getElementById('NewsToolBox') //将文本框插入到NewsToolBox这个之后
      toolBoxwrap.appendChild(textarea) //添加元素
      textarea.value = text
      textarea.focus()
      if (textarea.setSelectionRange) {
        textarea.setSelectionRange(0, textarea.value.length) //获取光标起始位置到结束位置
      } else {
        textarea.select()
      }
      try {
        var flag = document.execCommand('copy') //执行复制
      } catch (eo) {
        var flag = false
      }
      toolBoxwrap.removeChild(textarea) //删除元素
      currentFocus.focus()
      return flag ? this.$message.success('链接复制成功') : this.$message.warning('链接复制失败，请手动复制地址栏T_T')
    },
    // 微信分享
    wxShare(id) {
      var weixinShareLink = process.env.VUE_APP_M_URL + 'share/article?id=' + id
      QRCode.toCanvas(this.$refs['canvas' + id][0], weixinShareLink, error => {
        if (error) console.error(error)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.article-list {
  padding: 5px 32px 5px 20px;
  > li {
    padding: 15px 0;
    display: flex;
    align-items: center;
    #hov {
      &:hover {
        cursor: pointer;
      }
    }
    > img {
      height: 118px;
      margin-right: 20px;
      border-radius: 5px;
      &:hover {
        cursor: pointer;
      }
    }
    > div {
      flex: 1;
      overflow: hidden;
      > h5 {
        font-size: 16px;
        margin-bottom: 5px;
      }
      > p {
        color: #666666;
        line-height: 20px;
        margin-bottom: 22px;
        height: 40px;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      > .operational {
        caret-color: #999999;
        display: flex;
        justify-content: space-between;
        > div {
          > span {
            cursor: pointer;
            vertical-align: middle;
            // padding-left: 28px;
          }
          em {
            font-style: normal;
            vertical-align: middle;
            margin-left: 3px;
            display: inline-block;
            width: 40px;
            padding-right: 3px;
          }
          .shoucang {
            width: 60px;
          }
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

