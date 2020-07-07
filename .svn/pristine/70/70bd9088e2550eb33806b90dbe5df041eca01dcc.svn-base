<template>
  <div>
    <!-- <template v-if="loaded"> -->
    <template>
      <div class="circle-introduce">
        <div class="cirle-back"></div>
        <img class="back-box" :src="$store.state.imageDomain +detailsObj.avatar" alt="">
        <div class="circle-content clearfix">
          <div class="fl img-box">
            <img :src="$store.state.imageDomain +detailsObj.avatar" alt="">
            <span class="private" v-if="detailsObj.type==2">私密</span>
          </div>
          <div class="fl" style="position: relative">
            <p>{{detailsObj.name}}</p>
            <p v-if="detailsObj.memberCount">{{detailsObj.memberCount | formatNumbers}}个成员</p>
          </div>
          <p class="fr" style="position: relative;">
            <button @click="openApp" v-if="detailsObj.type==1&&detailsObj.join!=3&&detailsObj.join!=5&&detailsObj.join!=10">加入</button>
            <button @click="openApp" v-if="detailsObj.join==3||detailsObj.join==5||detailsObj.join==10">已加入</button>
            <button @click="openApp" v-if="detailsObj.type==2&&detailsObj.join!=1&&detailsObj.join!=3&&detailsObj.join!=5&&detailsObj.join!=10">申请</button>
            <button @click="openApp" v-if="detailsObj.type==2&&detailsObj.join==1">取消申请</button>
          </p>
          <!-- <button class="fr" @click="openApp" v-if="detailsObj.type==1&&detailsObj.join!=3&&detailsObj.join!=5&&detailsObj.join!=10">加入</button>
          <button class="fr" @click="openApp" v-if="detailsObj.join==3||detailsObj.join==5||detailsObj.join==10">已加入</button>
          <button class="fr" @click="openApp" v-if="detailsObj.type==2&&detailsObj.join!=1&&detailsObj.join!=3&&detailsObj.join!=5&&detailsObj.join!=10">申请</button>
          <button class="fr" @click="openApp" v-if="detailsObj.type==2&&detailsObj.join==1">取消申请</button> -->
        </div>
        <div class="content-introduce">
          圈子简介：{{detailsObj.description}}
        </div>
      </div>
      <div class="tab-box">
        <span :class="{'change-color':changeIndex == index}" v-for="(item,index) in tabList" :key="index" @click="changeNav(index)">{{item}}</span>
      </div>
      <ul class="circle-speak" v-if="detailsObj.type==1||(detailsObj.type==2&&(detailsObj.join==3||detailsObj.join==5||detailsObj.join==10))">
        <!-- type:2私密，1公开 -->
        <li v-for="(item,index) in speakList" :key="index">
          <div class="speakers clearfix">
            <img class="fl" :src="item.avatar?$store.state.imageDomain + item.avatar : require('@/assets/images/err-header-icon01.png')" alt="">
            <div class="speaker-info fl">
              <p>{{item.nickName}}</p>
              <p>{{convertDate(item.publishTime)}}</p>
            </div>
          </div>
          <div class="speaker-content" v-html="item.content" @click="openApp"></div>
          <div class="speaker-ideaImgs" v-if="item.ideaImgs.length>0">
            <ul>
              <li v-for="(it,ins) in item.ideaImgs" :key="ins">
                <img :src="$store.state.imageDomain +it.url" alt="">
              </li>
            </ul>
          </div>
          <div class="operation-list">
            <ul class="clearfix">
              <li class="fl" @click="openApp">
                <i class="like-icon fl"></i>
                <span>{{item.likeCount}}</span>
              </li>
              <li class="fl" @click="openApp">
                <i class="comm-icon fl"></i>
                <span>{{item.commentCount}}</span>
              </li>
              <li class="fl" @click="openApp">
                <i class="share-icon fl"></i>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <div class="footer">
        <p v-if="speakList.length>0" @click="openApp">查看更多</p>
        <p v-else @click="openApp">哎呀，没有更多了...</p>
        <div @click="openApp">App 内打开</div>
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
      shareConfig: {},
      detailsObj: {}, //圈子详情
      tabList: ['全部', '精选'],
      changeIndex: 0,
      speakList: [] //发言列表
    }
  },
  created() {
    document.title = '百工驿-圈子主页'
    window.openApp = this.openApp
  },
  methods: {
    changeNav(index) {
      this.changeIndex = index
      this.getGroupDetail()
    },
    getGroupDetail() {
      api.getGroupDetail(this.$route.query.id).then(res => {
        this.detailsObj = res.data
        this.shareConfig.wechat_title = this.detailsObj.name ? this.detailsObj.name : '百工驿'
        this.shareConfig.wechat_desc = this.detailsObj.description
        this.shareConfig.wechat_images0 = this.$store.state.imageDomain + this.detailsObj.avatar
        // 分享参数
        api.getShareConfig().then(shareConfig => {
          this.shareConfig.appId = shareConfig.data.appId
          this.shareConfig.timestamp = shareConfig.data.timestamp
          this.shareConfig.nonceStr = shareConfig.data.nonceStr
          this.shareConfig.signature = shareConfig.data.signature
          this.shareConfig.url = shareConfig.data.url
          share(this.shareConfig)
        })

        api.allMoments({ groupId: this.detailsObj.id, page: 0, size: 5, type: this.changeIndex + 1 }).then(res => {
          this.speakList = res.data.records
          this.speakList.map(item => {
            if (item.content.length > 125) {
              item.content =
                item.content.slice(0, 125) +
                '...' +
                `<span style="color:#F33535;font-size:0.4rem;margin-left:0.15rem" onclick="openApp">展开全文</span>`
            }
          })
        })
      })
    },
    openApp() {
      openApp()
    },
    convertDate(date) {
      return convertDate(date)
    }
  },
  mounted() {
    this.getGroupDetail()
  }
}
</script>

<style lang="less">
.circle-introduce {
  padding: 0.4rem;
  z-index: 1;
  overflow: hidden;
  position: relative;
  .cirle-back {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 0;
  }
  .back-box {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    filter: blur(9px);
  }
  .circle-content {
    // z-index: -1;
    .img-box {
      position: relative;
      img {
        display: block;
        width: 1.73rem;
        height: 1.73rem;
        border-radius: 10/75rem;
        border: 2/75rem solid #fff;
      }
      .private {
        display: block;
        background-color: #000000;
        border-radius: 2/75rem 10/75rem 2/75rem 10/75rem;
        padding: 0 0.1rem;
        height: 0.35rem;
        line-height: 0.35rem;
        text-align: center;
        color: #ffffff;
        font-size: 0.24rem;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
    > div {
      margin-left: 0.27rem;
      > p {
        color: #fff;
      }
      p:nth-child(1) {
        padding-top: 0.4rem;
        margin-bottom: 0.23rem;
        font-size: 0.39rem;
        // height: 0.39rem;
        width: 4.6rem;
      }
      p:nth-child(2) {
        font-size: 0.32rem;
      }
    }
    button {
      margin-top: 0.56rem;
      // width: 1.6rem;
      height: 0.8rem;
      line-height: 0.8rem;
      background: #f33535;
      border-radius: 30/75rem;
      font-size: 0.37rem;
      color: #fff;
      padding: 0 0.4rem;
    }
  }
  .content-introduce {
    margin-top: 0.44rem;
    font-size: 0.29rem;
    line-height: 0.45rem;
    color: #fff;
    position: relative;
  }
}
.tab-box {
  height: 0.33rem;
  text-align: center;
  border-bottom: 1px solid #dddddd;
  background: #fff;
  padding: 0.32rem 2.71rem 0.35rem;
  span {
    float: left;
    font-size: 0.37rem;
    color: #333;
    height: 0.37rem;
    line-height: 0.37rem;
  }
  span:nth-child(1) {
    // margin-right: 3rem;
  }
  span:nth-child(2) {
    float: right;
  }
  .change-color {
    color: #f33535;
    position: relative;
  }
  .change-color:after {
    content: '';
    display: block;
    width: 0.27rem;
    height: 0.08rem;
    position: absolute;
    bottom: -0.24rem;
    left: 0.25rem;
    background-color: #f33535;
    border-radius: 4px;
  }
}
.circle-speak {
  > li {
    background: #fff;
    margin-bottom: 0.21rem;
    padding: 0.33rem 0.4rem 0.2rem;
    .speakers {
      img {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
      }
    }
    .speaker-info {
      padding-top: 0.1rem;
      margin-left: 0.27rem;
      p:nth-child(1) {
        height: 0.32rem;
        line-height: 0.32rem;
        font-size: 0.32rem;
        color: #666666;
      }
      p:nth-child(2) {
        margin-top: 0.15rem;
        height: 0.25rem;
        line-height: 0.25rem;
        font-size: 0.25rem;
        color: #999999;
      }
    }
    .speaker-content {
      margin-top: 0.28rem;
      color: #333333;
      font-size: 0.4rem;
      line-height: 0.56rem;
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
    .operation-list {
      padding-top: 0.27rem;
      ul {
        li {
          display: inline-block;
          width: 2.9rem;
          height: 0.5rem;
          line-height: 0.5rem;
          margin-right: 0.05rem;
          span {
            float: left;
            color: #666666;
            font-size: 0.29rem;
          }
        }
      }
    }
  }
}
.footer {
  padding: 0.28rem 0 0.6rem;
  text-align: center;
  background: #fff;
  p {
    font-size: 0.4rem;
    height: 0.4rem;
    line-height: 0.4rem;
    color: #f33535;
    margin-bottom: 0.31rem;
  }
  div {
    display: inline-block;
    background: linear-gradient(-90deg, rgba(226, 56, 49, 1), rgba(254, 189, 47, 1));
    width: 2.53rem;
    height: 0.88rem;
    line-height: 0.88rem;
    font-size: 0.35rem;
    color: #fff;
    border-radius: 32/75rem;
    margin-top: 1px;
    text-align: center;
  }
}
</style>
