<template>
  <div id="article" class="main">
    <template v-if="loaded">
      <div class="author">
        <div>
          <div
            class="avatar fl"
            :style="{
              backgroundImage:
                'url(' +
                (article.avatar
                  ? $store.state.imageDomain + article.avatar
                  : require('@/assets/images/err-header-icon01.png')) +
                ')'
            }"
          ></div>
          <div class="author-name fl">
            <span>{{ article.nickName }}</span
            ><br />
            <span class="date">{{ convertDate(article.publishTime) }}</span>
            <span class="date">丨</span>
            <span class="date">阅读&nbsp;{{ article.watchCount }}</span>
          </div>
        </div>
        <div class="watch-btn" @click="openApp">关注</div>
      </div>
      <div class="title">{{ article.title }}</div>
      <div class="desc">摘要：{{ article.description }}</div>
      <div class="content" v-html="article.content"></div>
      <div class="separate-line"></div>
      <div class="comment">
        <div class="comm-label">评论（{{ article.commentCount }}条）</div>
        <div class="comm-write" @click="openApp">写评论...</div>
        <ul>
          <li v-for="(comment, index) in comments" :key="index">
            <div
              class="avatar"
              :style="{
                backgroundImage:
                  'url(' +
                  (comment.avatar
                    ? $store.state.imageDomain + comment.avatar
                    : require('@/assets/images/err-header-icon01.png')) +
                  ')'
              }"
            ></div>
            <div
              class="comm-box"
              :class="{ 'comm-box_line': index != comments.length - 1 }"
            >
              <div class="comm-author">
                <span class="comm-author-name">{{ comment.nickName }}</span>
                <span class="comm-date">{{
                  convertDate(comment.commentsTime)
                }}</span>
              </div>
              <div class="comm-content">{{ comment.comment }}</div>
            </div>
          </li>
        </ul>
        <div
          style="text-align: center;"
          v-if="commentTotal > 0 && commentTotal != comments.length"
        >
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
          <span>{{ article.likeCount }}</span>
        </div>
        <div class="like-comm-count_box" @click="openApp">
          <i class="comm-icon"></i>
          <span>{{ article.commentCount }}</span>
        </div>
        <div class="like-comm-count_box" @click="openApp">
          <i class="collect-icon"></i>
          <span>{{ article.whetherToCollect ? "已收藏" : "收藏" }}</span>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
require("@/assets/style/share.css");
require("@/assets/js/lib-flexible/index.min.js");

import api from "@/fetch";
import { openApp, convertDate, share } from "@/assets/js/shareUtil.js";
export default {
  data() {
    return {
      loaded: false,
      articleId: "",
      article: {},
      commentTotal: 0,
      comments: [],
      commentParam: {
        pageNum: 1,
        pageSize: 3,
        paramObject: {
          objId: "",
          objType: 3
        }
      },
      shareConfig: {}
    };
  },
  async created() {
    document.title = "百工驿-文章";
    let _this = this;
    _this.articleId = _this.$route.query.id;
    _this.commentParam.paramObject.objId = _this.articleId;
    let { data: _article } = await api.viewArticle(_this.articleId);
    _this.article = _article;

    _this.shareConfig.wechat_title = _article.title;
    _this.shareConfig.wechat_desc = _article.description;
    _this.shareConfig.wechat_images0 =
      _this.$store.state.imageDomain + _article.image;
    // 分享参数
    let { data: _shareConfig } = await api.getShareConfig();
    _this.shareConfig.appId = _shareConfig.appId;
    _this.shareConfig.timestamp = _shareConfig.timestamp;
    _this.shareConfig.nonceStr = _shareConfig.nonceStr;
    _this.shareConfig.signature = _shareConfig.signature;
    _this.shareConfig.url = _shareConfig.url;
    share(_this.shareConfig);
    // 评论列表
    api.getCommentList(_this.commentParam).then(function(res) {
      _this.comments = res.data.records;
      _this.commentTotal = res.data.total;
      _this.loaded = true;
    });
  },
  methods: {
    loadMorecomments() {
      if (this.comments.length == this.commentTotal) return;
      this.commentParam.pageNum++;
      api.getCommentList(this.commentParam).then(res => {
        this.comments = this.comments.concat(res.data.records);
      });
    },
    openApp() {
      openApp();
    },
    convertDate(date) {
      return convertDate(date);
    }
  }
};
</script>

<style lang="less"></style>
