<template>
  <div class="recently-viewed">
    <div class="component-title">
      <span>最近浏览</span>
      <router-link to="/engineering/groupList">
        全部<i class="el-icon-arrow-right"></i>
      </router-link>
    </div>
    <ul class="group-list" v-if="groupList.length">
      <li v-for="(item,index) in groupList" :key="index">
        <groupHeaderImg :groupData="item" />
      </li>
    </ul>
    <div class="no-data" v-else>
      <img src="@/assets/images/No-other.png" alt="">
      <p>暂无浏览</p>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
import groupHeaderImg from './groupHeaderImg'

export default {
  components: {
    groupHeaderImg
  },
  data() {
    return {
      groupList: []
    }
  },
  created() {
    api.myRecentGroups(9).then(res => (this.groupList = res.data))
  }
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
  }
  .group-list {
    display: flex;
    flex-wrap: wrap;
    > li {
      margin-right: 10px;
      margin-bottom: 10px;
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
