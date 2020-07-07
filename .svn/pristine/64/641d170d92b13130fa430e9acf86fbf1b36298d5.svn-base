<template>
  <div class="recently-viewed">
    <div class="component-title">
      <span>最近加入</span>
    </div>
    <ul class="group-list" v-if="memberList.length">
      <li v-for="(item,index) in memberList" :key="index">
        <router-link :to="'/myHome/myReply?id='+item.id" target="_blank">
          <img :src="item.avatar?$store.state.imageDomain + item.avatar : require('@/assets/images/err-header-icon01.png')" alt="" width="100%" height="100%">
          <p class="ellipsis">{{item.nickName}}</p>
        </router-link>
      </li>
    </ul>
    <div v-else class="no-data">
      <img src="@/assets/images/No-other.png" alt="">
      <p>暂无成员</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    memberList: Array
  },
}
</script>

<style lang="less" scoped>
.recently-viewed {
  background-color: #fff;
  border-radius: 10px;
  padding: 13px 17px;
  .component-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 16px;
  }
  .group-list {
    display: flex;
    flex-wrap: wrap;
    > li {
      flex: 0 0 25%;
      text-align: center;
      margin-bottom: 10px;
      min-width: 0;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-bottom: 3px;
      }
    }
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
}
</style>
