<template>
  <div class="group_content">
    <ul class='group_left' ref="left-fixed">
      <li v-for='(item,index) in menuList' :key='index' :class="{active:currentIndex==item}" @click='currentIndexFn(item)'>
        {{item}}
      </li>
    </ul>
    <div class='group_center'>
      <div class='group_center_top'>
        <!-- 发布圈子 -->
        <ideaPublishCom @publishFinish="publishFinish" VueEmojiHeight="68" type="groupWithId" :groupDetail="groupDetail" />
      </div>

      <div class="group_center_bottom">
        <ideaListCom :key="updataKey" type="groupWithId" :groupDetail="groupDetail" />
      </div>
    </div>
    <div class='group_right'>
      <recentlyJoin :memberList="memberList" />
      <div class="apply-group" v-if="groupDetail.join==='3'||groupDetail.join==='5'||groupDetail.join==='10'">
        <router-link :to="'/engineering/groupHome/'+$route.params.id+'/groupMember'" class="red">查看全部{{totalMemberNum}}个成员</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
import ideaPublishCom from '@/components/ideaPublishCom'
import ideaListCom from '@/components/ideaListCom'
import recentlyJoin from '../components/recentlyJoin'
import { ceiling } from '@/assets/js/utils.js'

export default {
  components: {
    ideaPublishCom,
    ideaListCom,
    recentlyJoin
  },
  props: {
    groupDetail: Object
  },
  data() {
    return {
      updataKey: 1,
      currentIndex: this.$route.query.currentIndex || '全部',
      menuList: ['全部', '精选'],
      params: {
        groupId: this.$route.params.id,
        page: 1,
        size: 10,
        type: 1 // 1.全部 2.精选
      },
      memberList: [],
      totalMemberNum: 0
    }
  },
  methods: {
    // 发布成功
    publishFinish() {
      this.updataKey++
    },
    currentIndexFn(index) {
      this.updataKey++
      this.currentIndex = index
      this.$router.replace('?currentIndex=' + index)
    },
    getRecentMembersOfTheGroup() {
      api.getRecentMembersOfTheGroup(this.$route.params.id, 12).then(res => {
        this.totalMemberNum = res.data.count
        this.memberList = res.data.simpleMembers
      })
    }
  },
  mounted() {
    this.getRecentMembersOfTheGroup()
    let wrap = this.$refs['left-fixed']
    ceiling(wrap)
  }
}
</script>

<style lang="less" scoped>
.group_content {
  display: flex;
  margin-top: 10px;
  align-items: flex-start;
  .group_left {
    width: 100px;
    &[data-fixed='fixed'] {
      position: fixed;
      top: 120px;
      & + .group_center {
        margin-left: 120px;
      }
    }
    > li {
      cursor: pointer;
      height: 40px;
      line-height: 40px;
      color: #333333;
      background-color: #ffffff;
      text-align: center;
      border-radius: 6px;
      margin-bottom: 6px;
      &.active {
        background-color: #e23732;
        color: #fff;
      }
    }
  }
  .group_center {
    flex: 1;
    overflow: hidden;
    margin: 0 20px;
    .group_center_top {
      border-radius: 10px;
      background-color: #fff;
      padding: 20px 20px 8px;
    }
    .group_center_bottom {
      border-radius: 10px;
      margin-top: 10px;
      overflow: hidden;
    }
  }
  .group_right {
    width: 300px;
    position: sticky;
    top: 120px;
    > div + div {
      margin-top: 10px;
    }
    .apply-group {
      text-align: center;
      background-color: #fff;
      border-radius: 10px;
      padding: 13px 0;
    }
  }
}
</style>
