<template>
  <div class="preivewColumn">
    <div class="course">
      <div class="cover">
        <img :src="$store.state.imageDomain +columnDetail.image" alt="" style="width: 280px;height: 210px;">
      </div>
      <div class="info">
        <div class="courseInfo">
          <h3 class="title font-18">{{columnDetail.name}}</h3>
          <div class="other font-14 gray">
            <span>观看：<i>0</i> 次</span>
            <span> | </span>
            <span>讲师：<i>{{$store.state.userInfo.realName}}</i></span>
            <span> | </span>
            <span>{{columnDetail.upToTime}}</span>
          </div>
        </div>
        <div class="price font-16">
          <i :class="columnDetail.price > 0 ? 'red' : 'purple'">{{columnDetail.price>0 ? '&yen;'+columnDetail.price : '免费' }}</i>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="leftcontent">
        <div class="toggleTab">
          <span class="active">专栏介绍</span>
          <span style="cursor: not-allowed;">课程目录</span>
          <span style="cursor: not-allowed;">评论</span>
        </div>
        <div class="middle">
          <div class="introduce" v-if="nowIndex===0">
            <div v-html="handleHtml(columnDetail.description)" class="answer-details"></div>
          </div>
          <div class="catalog" v-else-if="nowIndex===1">
          </div>
          <div class="comment" v-else></div>
        </div>
      </div>
      <div class="rightContent">
        <div class="teacher">
          <h3 class="font-16">讲师简介</h3>
          <div class="teaInfo">
            <div class="photo">
              <img @click="openTeacherHome($store.state.userInfo.accountId)" :src="$store.state.userInfo.teacherAvatar?$store.state.imageDomain + $store.state.userInfo.teacherAvatar : require('@/assets/images/err-header-icon01.png')" alt="">
              <span @click="openTeacherHome($store.state.userInfo.accountId)" class="name font-16">{{$store.state.userInfo.realName}}</span>
            </div>
            <span @click="openTeacherHome($store.state.userInfo.accountId)" class="gray goto">查看主页<i class="el-icon-arrow-right"></i></span>
          </div>
          <div class="motto">{{$store.state.userInfo.teacherIntroduction}}</div>
        </div>
        <div class="subscribe">
          <p>订阅须知</p>
          <ul>
            <li>
              1、订阅成功后即可随时观看订阅内容
            </li>
            <li>
              2、请关注专栏更新时间，及时查看最新课程
            </li>
            <li>
              3、虚拟物品与服务购买后概不退换，请悉知
            </li>
          </ul>
        </div>
        <div class="download">
          <img class="qr" :src="$store.state.imageDomain + 'images/download/bgy_download.png'" alt="">
          <div class="downPro">
            <p>扫码下载百工驿APP</p>
            <p>工程人都在用的分享交流神器</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
import { mapState } from 'vuex'
export default {
  name: 'PreivewColumn',
  data() {
    return {
      nowIndex: 0
    }
  },
  computed: {
    ...mapState(['columnDetail'])
  }
}
</script>

<style lang="less" scoped>
.preivewColumn {
  .course {
    height: 250px;
    border-radius: 10px;
    margin-top: 20px;
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    .info {
      height: 100%;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      .courseInfo {
        .title {
          font-weight: 700;
          margin-bottom: 10px;
        }
        .other {
          vertical-align: middle;
          span:nth-child(2n) {
            padding: 0 5px;
          }
        }
      }
    }
  }
  .container {
    margin-top: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .leftcontent {
      width: 780px;
      background-color: #fff;
      border-radius: 10px;
      margin-bottom: 20px;
      .toggleTab {
        position: relative;
        height: 50px;
        padding: 20px 0 0 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        color: #999;
        span + span {
          margin-left: 20px;
        }
        .active {
          position: relative;
          color: #4a4a4a;
          font-size: 18px;
          font-weight: 400;
        }
        .active::after {
          content: '';
          display: inline-block;
          position: absolute;
          bottom: -6px;
          left: 0px;
          right: 0;
          margin: auto;
          height: 3px;
          width: 24px;
          background-color: #e43c31;
        }
      }
      .middle {
        // padding: 20px 20px 0 20px;
        // height: cacl(100vh);
        .introduce {
          padding: 20px 20px 20px 20px;
          p {
            color: #666;
            line-height: 18px;
          }
        }
        .catalog {
          width: 100%;
          height: 100vh;
          ol {
            position: relative;
            a {
              padding: 0 20px;
              display: block;
              height: 50px;
              list-style-type: decimal;
              list-style-position: inside;
              display: flex;
              justify-content: space-between;
              align-items: center;
              span > img {
                margin-left: 30px;
              }
            }
            a:hover {
              background-color: #fef4f4;
              color: #e23732;
            }
          }
        }
        .comment {
          height: 100vh;
        }
      }
    }

    .rightContent {
      width: 300px;
      .teacher {
        width: 300px;
        height: 150px;
        border-radius: 10px;
        background-color: #fff;
        box-sizing: border-box;
        padding: 15px 8px 15px 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        color: #4a4a4a;
        .teaInfo {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          .goto {
            cursor: pointer;
          }
          .photo {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            > img {
              width: 60px;
              height: 60px;
              border-radius: 50%;
            }
            .name {
              cursor: pointer;
              margin-left: 10px;
              font-weight: bold;
              font-weight: bold;
              width: 120px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .motto {
          color: #666;
          width: 260px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .subscribe {
        margin-top: 20px;
        padding: 19px 30px 17px 20px;
        background: rgba(255, 255, 255, 1);
        border-radius: 10px;
        width: 250px;
        height: 124px;
        font-size: 14px;
        color: #666666;
        line-height: 18px;
        p {
          margin-bottom: 12px;
          font-size: 16px;
          color: #4a4a4a;
        }
      }
      .download {
        width: 300px;
        border-radius: 10px;
        box-sizing: border-box;
        background-color: #fff;
        margin-top: 20px;
        padding: 20px 0 20px 20px;
        .downPro {
          display: inline-block;
          vertical-align: middle;
          margin-left: 5px;
          p {
            height: 20px;
            line-height: 20px;
          }
        }
      }
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
