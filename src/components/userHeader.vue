<template>
  <div class="userInfo">
    <div class="headerInfo">
      <div class="info">
        <img :src="userInfoData.avatar?$store.state.imageDomain + userInfoData.avatar : require('@/assets/images/err-header-icon01.png')" class="img">
        <div class="text">
          <div>
            <div class="nameInfo">
              <span class="name">{{userInfoData.nickName}}</span>
              <el-tooltip class="item" effect="dark" content="查看讲师信息" placement="top">
                <el-button class="hintMess" v-show="userInfoData.wasTeacher" @click='gotoTeach'>讲师</el-button>
              </el-tooltip>
            </div>
            <div class="introduction">
              <p class="clearfix">
                <span class="fl" v-show="userInfoData.position">职位：</span>
                <span class="fl" v-show="userInfoData.position">{{userInfoData.position}}</span>
              </p>
              <p class="clearfix">
                <span class="fl" v-show="userInfoData.company">公司：</span>
                <span class="fl" v-show="userInfoData.company">{{userInfoData.company}}</span>
              </p>
            </div>
          </div>
          <div class="introduction">
            <p class="clearfix">
              <span class="fl" v-show="userInfoData.introduction">简介：</span>
              <span class="fl" v-show="userInfoData.introduction">{{userInfoData.introduction}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="userButton" v-if="isOwn">
        <el-button @click="$router.push('/personalData')">编辑个人资料</el-button>
      </div>
      <div class="userButton follow-btn" v-else>
        <button class="already" v-if="userInfoData.concernStatus==1" @click="follow('1',)">已关注</button>
        <button class="not" v-if="userInfoData.concernStatus==2" @click="follow('2',)">关注</button>
        <button class="already" v-if="userInfoData.concernStatus==3" @click="follow('3',)">互相关注</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
export default {
  name: 'headerInfo',
  props: {
    userInfoData: Object
  },
  data() {
    return {
      loginaccountId: ''
    }
  },
  computed: {
    isOwn() {
      if (this.$route.query.id) {
        return this.$route.query.id === this.$store.state.userInfo.accountId
      }
      return true
    }
  },
  methods: {
    // 关注
    follow(val) {
      // val:1:已关注;2:关注;3:互相关注;
      if (!this.loginaccountId) {
        let routeUrl = this.$router.resolve('/login')
        window.open(routeUrl.href, '_blank')
      } else {
        let objId = this.$route.query.id
        let objType = 6
        if (val == 1 || val == 3) {
          api.delAttention({ objId: objId, objType: objType }).then(res => {
            this.userInfoData.concernStatus = 2
          })
        } else if (val == 2) {
          api.addAttention({ objId: objId, objType: objType }).then(res => {
            this.userInfoData.concernStatus = res.data
          })
        }
      }
    },
    gotoTeach () {
      if (this.isOwn) {
        this.$router.push('/teacherHome/' + this.loginaccountId)
      } else {
        this.$router.push('/teacherHome/' + this.$route.query.id)
      }
    },
  },
  mounted() {
    if (window.localStorage.userInfo) {
      this.loginaccountId = this.$store.state.userInfo.accountId
    }
  }
}
</script>

<style lang="less" scoped>
.userInfo {
  padding: 20px 19px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  .headerInfo {
    display: flex;
    justify-content: space-between;
    .info {
      flex: 1;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        display: block;
      }
      .text {
        flex:1;
        // height: 100px;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        > div {
          width: 100%;
        }
        .nameInfo {
          margin-bottom: 10px;
        }
        .name {
          font-size: 18px;
          color: #4a4a4a;
        }
        .hintMess {
          color: #cb860f;
          font-size: 12px;
          padding: 5px 10px;
          margin-top: -5px;
          margin-left: 10px;
          background-color: #faf3e7;
          border: none;
        }
        .introduction {
          font-size: 14px;
          color: #999;
          p {
            span:nth-child(2) {
              width: calc(100% - 42px);
              word-wrap: break-word;
              line-height: 20px;
            }
          }
        }
      }
    }
    .userButton {
      /deep/.el-button {
        width: 110px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        border: 1px solid rgba(226, 55, 50, 1);
        background: rgba(255, 255, 255, 1);
        border-radius: 5px;
        color: rgba(226, 55, 50, 1);
        padding: 0;
      }
    }
    .follow-btn {
      button {
        font-size: 12px;
        width: 90px;
        height: 34px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(153, 153, 153, 1);
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
      }
      button:hover {
        border: 1px solid #e23732;
        color: #e23732;
      }
    }
  }
}
</style>
