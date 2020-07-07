<template>
  <div class="group-joined">
    <template v-if="groupList.length">
      <ul class="clearfix">
        <groupListCom class="fl" v-for="(item,index) in groupList" :key="index" :groupData="item" type="managed" />
      </ul>
      <div class="pagination">
        <el-pagination :page-sizes="pageSizes" :page-size="params.size" :current-page="params.page" @size-change="handleSizeChange" @current-change="handleCurrentChange" background layout="total, sizes, prev, pager, next, jumper" :total="totalData">
        </el-pagination>
      </div>
    </template>
    <div v-else class="no-data">
      <img src="@/assets/images/No-other.png" alt="">
      <p>暂无圈子</p>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
import groupListCom from '../components/groupListCom'

export default {
  components: {
    groupListCom
  },
  data() {
    return {
      params: {
        page: 1,
        size: 10,
        type: 2, // 1.我加入的 2.我管理的 3. 我的申请(圈子申请) 4.我的申请(加入申请)
        userId: this.$store.state.userInfo.accountId
      },
      pageSizes: [10, 20, 30, 40, 50, 100],
      totalPages: 0,
      totalData: 0,
      groupList: []
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        let page = val.query.page ? +val.query.page : 1
        let size = val.query.size ? +val.query.size : 10
        this.params.page = page > 0 ? (this.totalPages && page > this.totalPages ? this.totalPages : page) : 1
        this.params.size = this.pageSizes.includes(size) ? size : 10
        this.getJoiningGroups()
      },
      immediate: true
    }
  },
  methods: {
    getJoiningGroups() {
      api.getJoiningGroups(this.params).then(res => {
        this.groupList = res.data.records
        this.totalData = res.data.total
      })
    },
    handleSizeChange(val) {
      this.$router.replace(`?page=${1}&size=${val}`)
    },
    handleCurrentChange(val) {
      this.$router.replace(`?page=${val}&size=${this.params.size}`)
    }
  }
}
</script>

<style lang="less" scoped>
.group-joined {
  background-color: #fff;
  padding: 12px 20px;
  min-height: 700px;
  > ul {
    min-height: 730px;
  }
}
.pagination {
  text-align: right;
  margin: 10px 0;
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
</style>
