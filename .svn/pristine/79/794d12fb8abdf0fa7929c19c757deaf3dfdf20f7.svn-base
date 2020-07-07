<template>
  <div class="agreement">
    <ul class="tab-list">
      <li v-for="(item, index) in list" :key="index">
        <router-link :to="item.url">{{item.name}}</router-link>
      </li>
    </ul>
    <el-scrollbar class="scroll-wrap">
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { name: '用户协议', url: '/agreement/user' },
        { name: '讲师入驻协议', url: '/agreement/lecturer' },
        { name: '圈子使用协议', url: '/agreement/circle' }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.agreement {
  display: flex;
  margin-top: 20px;
  align-items: flex-start;
  position: relative;
  .tab-list {
    width: 240px;
    background-color: #fff;
    font-size: 16px;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 6px;
    > li {
      height: 40px;
      line-height: 40px;
    }
  }
  .scroll-wrap {
    height: calc(100vh - 140px);
    flex: 1;
    overflow: hidden;
    margin-left: 20px;
    border-radius: 10px;
    background-color: #fff;
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
  .router-link-exact-active,
  .router-link-active {
    color: #e23732;
  }
}
</style>
