<template>
  <div class="group-header" :title="groupData.name">
    <!-- 若圈子被后台屏蔽，点击无法跳转到主页。 -->
    <img :src="groupData.avatar && $store.state.imageDomain + groupData.avatar" alt="" width="100%" height="100%" @click="(type==='managed' || !groupData.shield) && openLink('/engineering/groupHome/'+groupData.id)">
    <!-- 屏蔽 -->
    <img src="@/assets/images/pingbi.png" alt="已屏蔽" title="已屏蔽" class="shield" v-if="groupData.shield">
    <!-- 1：公开 2：私密 -->
    <span v-if="groupData.type===2">私密</span>
    <!-- 私密圈子没有分享功能 -->
  </div>
</template>

<script>
export default {
  props: {
    type: String, // joined：已加入的 managed：我管理的
    groupData: Object
  }
}
</script>

<style lang="less" scoped>
.group-header {
  width: 70px;
  height: 70px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  > span {
    position: absolute;
    background-color: #1b1b1b;
    color: #fff;
    top: 0;
    right: 0;
    font-size: 12px;
    border-bottom-left-radius: 5px;
    padding: 0 3px;
  }
  .shield {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
