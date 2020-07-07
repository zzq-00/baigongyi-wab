<template>
  <div id="idea" class="main">
    <template v-if="loaded">
      <div class="author">
        <div>
          <div class="avatar fl" :style="{backgroundImage: 'url('+ (idea.avatar ? $store.state.imageDomain + idea.avatar : require('@/assets/images/err-header-icon01.png')) +')'}"></div>
          <div class="author-name fl">
            <span>{{idea.nickName}}</span><br>
            <span class="date">{{convertDate(idea.momentDate)}}</span>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="idea-content">{{idea.content}}</div>
        <div class="speaker-ideaImgs" v-if="idea.pics.length>0">
          <ul>
            <li v-for="(it,ins) in idea.pics" :key="ins">
              <img :src="$store.state.imageDomain +it.url" alt="">
            </li>
          </ul>
        </div>
        <div class="circle-name clearfix">
          <div class="fl"> {{idea.groupName}}</div>
        </div>
      </div>
      <div class="comment">
        <div class="comm-label">评论（{{idea.commentCount}}条）</div>
        <div class="comm-write" @click="openApp">写评论...</div>
        <ul>
          <li v-for="(comment, index) in comments" :key="index">
            <div class="avatar" :style="{backgroundImage: 'url('+ (comment.avatar ? $store.state.imageDomain + comment.avatar : require('@/assets/images/err-header-icon01.png')) +')'}"></div>
            <div class="comm-box" :class="{'comm-box_line' : index != comments.length - 1}">
              <div class="comm-author">
                <span class="comm-author-name">{{comment.nickName}}</span>
                <span class="comm-date">{{convertDate(comment.commentsTime)}}</span>
              </div>
              <div class="comm-content">{{comment.comment}}</div>
            </div>
          </li>
        </ul>
        <div style="text-align: center;" v-if="commentTotal > 0 && commentTotal != comments.length">
          <span class="more-btn" @click="loadMorecomments">查看更多评论>></span>
        </div>
        <div v-else class="noMore">哎呀，没有更多了...</div>
      </div>
      <div class="app-open">
        <div class="app-open-btn" @click="openApp">App内打开</div>
      </div>
      <div class="separate-line"></div>
      <div class="like-comm-count">
        <div class="like-comm-count_box" @click="openApp">
          <i class="like-icon"></i>
          <span>{{idea.likeCount}}</span>
        </div>
        <div class="like-comm-count_box" @click="openApp">
          <i class="comm-icon"></i>
          <span>{{idea.commentCount}}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script type="text/javascript">
require('@/assets/style/share.css')
require('@/assets/js/lib-flexible/index.min.js')

import api from '@/fetch'
import { openApp, convertDate, share } from '@/assets/js/shareUtil.js'
export default {
  data() {
    return {
      loaded: false,
      idea: {
        ideaImgs: []
      },
      commentTotal: 0,
      comments: [],
      commentParam: {
        pageNum: 1,
        pageSize: 10,
        paramObject: {
          objId: '',
          objType: 11
        }
      },
      shareConfig: {}
    }
  },
  async created() {
    document.title = '百工驿-圈子'
    let _this = this
    _this.ideaId = _this.$route.query.id
    _this.commentParam.paramObject.objId = _this.ideaId
    let { data: _idea } = await api.getMomentDetail(_this.ideaId)
    _this.idea = _idea

    // _this.shareConfig.wechat_title = _idea.content ? _idea.content : '百工驿'
    _this.shareConfig.wechat_title = _idea.nickName + '的发言'
    _this.shareConfig.wechat_desc = _idea.content
    _this.shareConfig.wechat_images0 =
      _this.$store.state.imageDomain + (_idea.pics.length > 0 ? _idea.pics[0].url : +'images/baigongyi.png')
    // 分享参数
    let { data: _shareConfig } = await api.getShareConfig()
    _this.shareConfig.appId = _shareConfig.appId
    _this.shareConfig.timestamp = _shareConfig.timestamp
    _this.shareConfig.nonceStr = _shareConfig.nonceStr
    _this.shareConfig.signature = _shareConfig.signature
    _this.shareConfig.url = _shareConfig.url
    share(_this.shareConfig)
    // 评论列表
    api.getCommentList(_this.commentParam).then(function(res) {
      _this.comments = res.data.records
      _this.commentTotal = res.data.total
      _this.loaded = true
    })
  },
  methods: {
    loadMorecomments() {
      if (this.comments.length == this.commentTotal) return
      this.commentParam.pageNum++
      api.getCommentList(this.commentParam).then(res => {
        this.comments = this.comments.concat(res.data.records)
      })
    },
    openApp() {
      openApp()
    },
    convertDate(date) {
      return convertDate(date)
    }
  }
}
</script>

<style lang="less">
.idea-content {
  white-space: pre-wrap;
  word-wrap: break-word;
}
.speaker-ideaImgs {
  ul {
    margin-top: 0.12rem;
    display: flex;
    width: calc(100% + 0.16rem);
    flex-wrap: wrap;
    li {
      width: 2.96rem;
      height: 2.96rem;
      margin-right: 0.16rem;
      margin-top: 0.16rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.circle-name {
  div {
    height: 0.67rem;
    line-height: 0.67rem;
    background: #f2f3f4;
    border-radius: 25/75rem;
    padding: 0 0.24rem;
    margin-top: 0.29rem;
    color: #f33535;
    font-size: 0.35rem;
  }
}
</style>
