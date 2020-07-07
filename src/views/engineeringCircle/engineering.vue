<template>
  <div class='engineering' :key="currentIndex">
    <ul class='engineering_left'>
      <li v-for='(item,index) in menuList' :key='index' :class="{active:currentIndex==item}" @click="$router.replace('?currentIndex='+item)">
        {{item}}
      </li>
    </ul>
    <div class='engineering_right'>
      <!-- 未登录时，圈子显示列表页，范围是全部圈子，排序是优先显示后台推荐的圈子，其它圈子按照成员数量排序 -->
      <div class="list-content" v-if="!this.$store.state.userInfo.accountId && this.currentIndex === '圈子'">
        <ul class="clearfix" v-if="groupList.length">
          <groupListCom class="fl" v-for="(item,index) in groupList" :key="index" :groupData="item" />
        </ul>
        <div v-else class="no-data">
          <img src="@/assets/images/No-other.png" alt="">
          <p>暂无圈子</p>
        </div>
      </div>
      <template v-else>
        <div class='engineering_box_left'>
          <template v-if="currentIndex === '圈子'">
            <div class="engineering_box_group" v-if="announcement.content">
              <span class="red">公告：</span>
              {{announcement.content || '暂无公告'}}
              <a v-if="announcement.webUrl" :href="announcement.webUrl" target="_blank" rel="noopener noreferrer">查看详情</a>
            </div>
          </template>
          <div class='engineering_box_left_top' v-else>
            <!-- 发布想法 -->
            <ideaPublishCom @publishFinish="() => updataKey++" VueEmojiHeight="68" />
          </div>

          <div class="engineering_box_left_bottom">
            <ideaListCom :key="updataKey" :type="type" />
          </div>
        </div>
        <div class='engineering_box_right'>
          <template v-if="currentIndex === '圈子'">
            <myGroupHome />
            <groupViewed />
            <applyGroup />
            <groupRecommend />
          </template>
          <bestUser v-else></bestUser>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
import ideaPublishCom from '@/components/ideaPublishCom'
import ideaListCom from '@/components/ideaListCom'
import bestUser from '@/components/bestUser'
import myGroupHome from './components/myGroupHome'
import groupViewed from './components/groupViewed'
import applyGroup from './components/applyGroup'
import groupRecommend from './components/groupRecommend'
import groupListCom from './components/groupListCom'

export default {
  components: {
    ideaPublishCom,
    ideaListCom,
    bestUser,
    myGroupHome,
    groupViewed,
    applyGroup,
    groupRecommend,
    groupListCom
  },
  data() {
    return {
      updataKey: 1,
      currentIndex: '',
      menuList: ['最新', '热门', '关注', '圈子'],
      type: 'idea',
      announcement: {},
      groupList: [],
      params: {
        pageNum: 1,
        pageSize: 100,
        paramObject: {
          recommend: true
        }
      }
    }
  },
  watch: {
    '$route.query.currentIndex': {
      handler: function(val) {
        this.currentIndex = val || '最新'
        if (val === '圈子') {
          this.type = 'groupsMoment' // 圈内发言
          !this.$store.state.userInfo.accountId ? this.getListByRegion() : this.groupAnnouncement()
        } else {
          this.type = 'idea' // 圈内发言
        }
      },
      immediate: true
    }
  },
  methods: {
    // 获取公告
    groupAnnouncement() {
      api.groupAnnouncement().then(res => (this.announcement = res.data || {}))
    },
    // 获取首页未登录时圈子列表
    getListByRegion() {
      api.getListByRegion(this.params).then(res => {
        this.groupList = res.data.records
      })
    }
  }
}
</script>

<style lang="less" scoped>
.engineering {
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
}

.engineering_left {
  width: 100px;
  position: fixed;
  top: 120px;
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

.engineering_right {
  flex: 1;
  overflow: hidden;
  margin-left: 120px;
  display: flex;
  align-items: flex-start;
  .engineering_box_left {
    flex: 1;
    overflow: hidden;
    margin-right: 20px;
    .engineering_box_group {
      background-color: #fcf8eb;
      border: 1px solid #fbde8f;
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 10px;
      > a {
        color: #338ef5;
        text-decoration: underline;
      }
    }
    .engineering_box_left_top {
      border-radius: 10px;
      background-color: #fff;
      padding: 20px 20px 8px;
      margin-bottom: 10px;
    }
    .engineering_box_left_bottom {
      border-radius: 10px;
      overflow: hidden;
    }
  }
  .engineering_box_right {
    width: 300px;
    > div + div {
      margin-top: 10px;
    }
  }
  .list-content {
    padding: 20px;
    flex: 1;
    background-color: #fff;
    border-radius: 10px;
    min-height: 600px;
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
