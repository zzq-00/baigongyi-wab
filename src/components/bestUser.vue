<template>
  <div class="fabulous-right">
    <p class="fabulous-title">最赞用户</p>
    <ul class="fabulous-list-box">
      <li v-for="(its,index) in fabulousUser" :key="index">
        <img @click="openUserCenter(its.accountId)" :src="its.avatar?$store.state.imageDomain + its.avatar : require('@/assets/images/err-header-icon01.png')" alt="">
        <div class="user-info">
          <p class="users">
            <span class="user-name" @click="openUserCenter(its.accountId)">{{its.nickName}}</span>
            <span class="user-more" @click="openUserCenter(its.accountId)">了解更多</span>
          </p>
          <p class="user-introduce">{{its.introduction}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/fetch'
export default {
  props: {
    type: String
  },
  components: {},
  data() {
    return {
      fabulousUser: [] //最赞用户列表
    }
  },
  watch: {},
  computed: {},
  methods: {
    getFavoriteUser() {
      api.ideaBestLikePeople().then(res => {
        this.fabulousUser = res.data
      })
    }
  },
  mounted() {
    this.getFavoriteUser()
  }
}
</script>
<style lang="less" scoped>
.fabulous-right {
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  padding-top: 20px;
  padding-left: 20px;
  .fabulous-title {
    height: 17px;
    line-height: 17px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(74, 74, 74, 1);
  }
  .fabulous-list-box {
    padding: 10px 0;
    li {
      height: 90px;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        float: left;
        margin-top: 10px;
      }
      .user-info {
        margin-left: 10px;
        margin-top: 20px;
        display: inline-block;
        position: relative;
        .users {
          .user-name {
            cursor: pointer;
            display: inline-block;
            max-width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 18px;
            line-height: 15px;
            font-size: 14px;
            font-weight: bold;
            color: rgba(74, 74, 74, 1);
          }
          .user-more {
            float: right;
            width: 62px;
            height: 15px;
            line-height: 16px;
            font-size: 13px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            background: url(../assets/images/more.png) no-repeat center right;
            background-size: 5px;
          }
          .user-more:hover {
            color: #e23732;
            cursor: pointer;
            background: url(../assets/images/morehover.png) no-repeat center right;
            background-size: 5px;
          }
        }
        .user-introduce {
          margin-top: 8px;
          width: 192px;
          height: 15px;
          line-height: 15px;
          font-size: 13px;
          font-weight: 400;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .user-info:after {
        position: absolute;
        content: '';
        display: block;
        height: 1px;
        width: 210px;
        background-color: #eee;
        left: 0px;
        bottom: -20px;
      }
    }
  }
}
</style>
