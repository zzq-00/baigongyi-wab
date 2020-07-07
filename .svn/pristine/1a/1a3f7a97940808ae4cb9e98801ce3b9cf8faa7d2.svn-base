<template>
  <div>
    <div class="base-info">
      <groupHeaderImg :groupData="groupDetail" />
      <div>
        <h5>{{groupDetail.name}}</h5>
        <p>{{groupDetail.memberCount | formatNumbers}}个成员</p>
      </div>
    </div>
    <div class="manage-content">
      <ul class="nav-list">
        <li v-for="(item, index) in tabList" :key="index" :class="{active: activeTab===item}" @click="$router.replace('?activeTab='+item)">
          <a href="javascript:;">{{item}}</a>
        </li>
      </ul>
      <div class="manage-features">
        <keep-alive>
          <manageBaseInfo v-if="activeTab==='基本信息'" :groupDetail="groupDetail" />
        </keep-alive>
        <manageMember v-if="activeTab==='成员管理'" />
        <manageApplication v-if="activeTab==='处理申请'" />
        <manageOther v-if="activeTab==='其它'" />
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
import groupHeaderImg from '../components/groupHeaderImg'
import manageBaseInfo from './components/manageBaseInfo'
import manageMember from './components/manageMember'
import manageApplication from './components/manageApplication'
import manageOther from './components/manageOther'
export default {
  components: {
    groupHeaderImg,
    manageBaseInfo,
    manageMember,
    manageApplication,
    manageOther
  },
  data() {
    return {
      tabList: ['基本信息', '成员管理', '处理申请', '其它'],
      activeTab: '基本信息',
      groupDetail: {}
    }
  },
  watch: {
    '$route.query.activeTab': {
      handler: function(val) {
        if (val) this.activeTab = val
      },
      immediate: true
    }
  },
  methods: {
    getGroupDetail(id) {
      api.getGroupDetail(id).then(res => {
        this.groupDetail = res.data
        if (this.groupDetail.shield) this.tabList = ['基本信息', '成员管理', '其它']
      })
    }
  },
  mounted() {
    this.getGroupDetail(this.$route.params.id)
  }
}
</script>

<style lang="less" scoped>
.base-info {
  background-color: #fff;
  padding: 11px 21px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  > div:last-child {
    margin-left: 10px;
    > h5 {
      margin-bottom: 10px;
    }
  }
}
.manage-content {
  border-radius: 10px;
  margin-top: 10px;
  background-color: #fff;
  min-height: 700px;
  .nav-list {
    color: #999;
    font-size: 16px;
    height: 50px;
    border-bottom: 1px solid #dddddd;
    display: flex;
    align-items: center;
    > li {
      margin: 0 20px;
      position: relative;
      &.active {
        color: #4a4a4a;
        &::after {
          content: '';
          width: 20px;
          height: 3px;
          background-color: #e23732;
          position: absolute;
          bottom: -14px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
  .manage-features {
    padding: 10px 20px;
  }
}
</style>
