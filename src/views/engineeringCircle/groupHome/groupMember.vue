<template>
  <div class="group-member">
    <div class="member-search">
      <i class="el-icon-search"></i>
      <!-- <input type="text"> -->
      <input type="text" placeholder="搜索圈内成员" v-model.trim="nickName">
    </div>
    <div class="member-list">
      <div class="clearfix">
        <h4 class="font-18 fl">圈主</h4>
      </div>
      <ul class="clearfix">
        <li class="fl">
          <!-- TODO -->
          <router-link :to="'/myHome/myReply?id='+leader.id" target="_blank">
            <img :src="leader.avatar?$store.state.imageDomain + leader.avatar : require('@/assets/images/err-header-icon01.png')" alt="" width="100%" height="100%">
            <p class="ellipsis font-bold">{{leader.nickName}}</p>
          </router-link>
        </li>
      </ul>
      <div style="height: 30px;"></div>
      <div class="clearfix">
        <h4 class="font-18 fl">成员</h4>
        <span class="fl" style="color: #666;margin: 5px 7px 0;">{{totalCount}}</span>
      </div>
      <ul class="clearfix">
        <li v-for="(item,index) in simpleMembers" :key="index" class="fl">
          <router-link :to="'/myHome/myReply?id='+item.id" target="_blank">
            <img :src="item.avatar?$store.state.imageDomain + item.avatar : require('@/assets/images/err-header-icon01.png')" alt="" width="100%" height="100%">
            <p class="ellipsis font-bold">{{item.nickName}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
export default {
  data() {
    return {
      simpleMembers: [],
      leader: {},
      totalCount: 0,
      nickName: '',
      groupId: this.$route.params.id
    }
  },
  watch: {
    nickName(val, old) {
      if (val) {
        this.getMembersOfTheGroupSearch(val)
      } else {
        this.getMembersOfTheGroup(this.$route.params.id)
      }
    }
  },
  methods: {
    getMembersOfTheGroup(id) {
      api.getMembersOfTheGroup(id).then(res => {
        this.totalCount = res.data.count - 1
        this.leader = res.data.leader
        this.simpleMembers = res.data.simpleMembers
      })
    },
    getMembersOfTheGroupSearch(val) {
      api.getMembersOfTheGroupSearch(this.groupId, val).then(res => {
        this.simpleMembers = res.data.simpleMembers
        this.totalCount = this.simpleMembers.length
      })
    }
  },
  mounted() {
    this.getMembersOfTheGroup(this.$route.params.id)
  }
}
</script>

<style lang="less" scoped>
.group-member {
  margin: 10px 0;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 30px;
  .member-search {
    position: relative;
    .el-icon-search {
      position: absolute;
      font-size: 18px;
      color: #999999;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
    }
    > input {
      color: #333;
      height: 36px;
      width: 412px;
      background-color: #f5f5f5;
      border-radius: 18px;
      border: 0 none;
      padding-left: 38px;
    }
  }
  .member-list {
    margin-top: 20px;
    > ul {
      padding-right: 210px;
      margin-left: -15px;
      > li {
        text-align: center;
        width: 80px;
        height: 75px;
        margin-top: 20px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-bottom: 3px;
        }
      }
    }
  }
}
</style>
