<template>
  <div class="group-list">
    <div class="nav-content">
      <!-- <ul class="nav-list">
        <li v-for="(item, index) in tabList" :key="index" :class="{active: activeTab===item.id}" @click="selTab(item)">
          <a href="javascript:;">{{item.name}}</a>
        </li>
      </ul> -->
      <el-tabs v-model="activeTab" @tab-click="selTab(activeTab)">
        <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.name" :name="item.id"></el-tab-pane>
      </el-tabs>

    </div>
    <div class="list-content">
      <ul class="clearfix" v-if="groupList.length">
        <groupListCom class="fl" v-for="(item,index) in groupList" :key="index" :groupData="item" />
      </ul>
      <div v-else class="no-data">
        <img src="@/assets/images/No-other.png" alt="">
        <p>暂无圈子</p>
      </div>
    </div>
    <div class="pagination">
      <el-pagination :page-sizes="pageSizes" :page-size="params.pageSize" :current-page="params.pageNum" @size-change="handleSizeChange" @current-change="handleCurrentChange" background layout="total, sizes, prev, pager, next, jumper" :total="totalData">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
import groupListCom from './components/groupListCom'

export default {
  components: {
    groupListCom
  },
  data() {
    return {
      activeName: { name: '推荐', id: '1' },
      tabList: [],
      activeTab: '1',
      params: {
        pageNum: 1,
        pageSize: 12,
        paramObject: {
          recommend: true
        }
      },
      pageSizes: [12, 24, 36, 48, 60, 100],
      totalData: 0,
      groupList: []
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.activeTab = val.query.activeTab || '1'
        let page = val.query.page ? +val.query.page : 1
        let size = val.query.size ? +val.query.size : 12
        this.params.pageNum = page > 0 ? (this.totalPages && page > this.totalPages ? this.totalPages : page) : 1
        this.params.pageSize = this.pageSizes.includes(size) ? size : 12
        if (this.activeTab === '1') {
          this.params.paramObject = { recommend: true }
        } else if (this.activeTab === '2') {
          this.params.paramObject = { isNew: true }
        } else {
          this.params.paramObject = { belongId: this.activeTab }
        }
        this.getListByRegion()
      },
      immediate: true
    }
  },
  methods: {
    selTab(item) {
      this.$router.replace('?activeTab=' + item)
    },
    getListByRegion() {
      api.getListByRegion(this.params).then(res => {
        this.groupList = res.data.records
        this.totalData = res.data.total
        this.totalPages = Math.ceil(this.totalData / this.params.pageSize)
      })
    },
    regionList() {
      api.regionList({ pageNum: 1, pageSize: 100 }).then(res => {
        res.data.records.unshift({ name: '推荐', id: '1' }, { name: '新圈', id: '2' })
        this.tabList = res.data.records
      })
    },
    handleSizeChange(val) {
      this.$router.replace(`?activeTab=${this.activeTab}&page=${1}&size=${val}`)
      this.params.pageNum = 1
      this.params.pageSize = val
    },
    handleCurrentChange(val) {
      this.$router.replace(`?activeTab=${this.activeTab}&page=${val}&size=${this.params.pageSize}`)
      this.params.pageNum = val
    }
  },
  created() {
    this.regionList()
  }
}
</script>

<style lang="less" scoped>
.group-list {
  border-radius: 10px;
  margin: 21px auto 29px;
  background-color: #fff;
  .nav-content {
    /deep/.el-tabs__header {
      padding: 0 20px;
    }
    /deep/.el-tabs__nav-next,
    /deep/.el-tabs__nav-prev {
      line-height: 50px;
    }
    /deep/.el-tabs__item {
      height: 50px;
      line-height: 50px;
    }
  }
  .nav-list {
    color: #999;
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    display: flex;
    border-bottom: 1px solid #dddddd;
    > li {
      flex: 0 0 auto;
      padding: 0 20px;
      position: relative;
      &.active {
        color: #4a4a4a;
        &::after {
          content: '';
          width: 20px;
          height: 3px;
          background-color: #e23732;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
  .list-content {
    min-height: 650px;
    padding: 20px;
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
.pagination {
  text-align: right;
  padding: 20px;
}
</style>

