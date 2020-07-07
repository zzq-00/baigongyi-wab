<template>
  <div class="my-group">
    <div class="silder">
      <div class="group-title">我的圈子</div>
      <el-menu router :default-active="sliderIndex">
        <el-menu-item index="/engineering/myGroup/joined">我加入的</el-menu-item>
        <el-menu-item index="/engineering/myGroup/managed">我管理的</el-menu-item>
        <el-submenu index="/myApply">
          <template slot="title">我的申请</template>
          <el-menu-item index="/engineering/myGroup/applyJoin">加入申请</el-menu-item>
          <el-menu-item index="/engineering/myGroup/applyGroup">圈子申请</el-menu-item>
        </el-submenu>
        <el-menu-item index="/engineering/myGroup/published">发布</el-menu-item>
        <el-menu-item index="/engineering/myGroup/commented">评论</el-menu-item>
      </el-menu>
    </div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
export default {
  components: {},
  data() {
    return {
      sliderIndex: this.$route.path
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style lang="less" scoped>
.my-group {
  padding-top: 20px;
  display: flex;
  overflow: hidden;
  align-items: flex-start;
  .silder {
    width: 220px;
    padding-bottom: 130px;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    position: fixed;
    top: 120px;
    .group-title {
      height: 50px;
      background: linear-gradient(90deg, rgba(255, 0, 10, 1), rgba(255, 95, 8, 1));
      font-size: 18px;
      color: #fff;
      line-height: 50px;
      padding-left: 20px;
    }
    /deep/.el-menu {
      border: none;
    }
    /deep/.el-menu-item,
    /deep/.el-submenu__title {
      position: relative;
      height: 48px;
      line-height: 48px;
    }
    /deep/.el-menu-item:focus,
    /deep/.el-menu-item:hover,
    /deep/.el-menu-item:active,
    /deep/.el-submenu__title:hover {
      background-color: #f7f9fd;
    }
    /deep/.el-menu-item:hover::after,
    /deep/.el-menu-item:active::after {
      content: '';
      display: block;
      position: absolute;
      height: 16px;
      width: 3px;
      background-color: #f00;
      top: 0;
      bottom: 0;
      margin: auto;
      left: 0;
    }
  }
  .main {
    border-radius: 10px;
    flex: 1;
    margin-left: 240px;
    overflow: hidden;
  }
}
</style>
