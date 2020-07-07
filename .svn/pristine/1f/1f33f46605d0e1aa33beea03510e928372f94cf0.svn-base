<template>
  <div class="apply-join">
    <div class="apply-list">
      <el-table :data="tableData" height="765" size="mini" :header-cell-style="{ backgroundColor: '#F7F8FA' }">
        <el-table-column type="index" label="编号">
        </el-table-column>
        <el-table-column label="圈子名称">
          <template slot-scope="scope">
            <img src="@/assets/images/pingbi.png" alt="已屏蔽" title="已屏蔽" v-if="scope.row.shield" width="20px" height="20px" style="margin-right: 5px;">
            <a href="javascript:;" @click="!scope.row.shield && openNewLink(scope.row)">{{scope.row.name}}</a>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" width="170">
          <template slot-scope="scope">
            {{scope.row.applyDate | formatDate}}
          </template>
        </el-table-column>
        <el-table-column prop="date" label="审核状态" width="130">
          <!-- status -1、从未加入 1、审核中 2、驳回 3、通过 4、申请撤销 5、圈子已公开 6、圈子已屏蔽 7、退出申请 8、驳回完成 9、圈子已解散 10、原圈主自动加入 -->
          <div slot-scope="scope">
            <span v-if="scope.row.statusCode==='2'" style="color: #FFB502;">驳回
              <el-popover placement="right" width="200" trigger="hover" :content="scope.row.reject" v-if="scope.row.reject">
                <i class="el-icon-question red" slot="reference"></i>
              </el-popover>
            </span>
            <span v-else-if="scope.row.statusCode==='3'" style="color: #1A86FF;">通过</span>
            <span v-else>{{scope.row.status}}</span>
          </div>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination :page-sizes="pageSizes" :page-size="params.size" :current-page="params.page" @size-change="handleSizeChange" @current-change="handleCurrentChange" background layout="total, sizes, prev, pager, next, jumper" :total="totalData">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
export default {
  data() {
    return {
      params: {
        page: 1,
        size: 10,
        type: 4, // 1.我加入的 2.我管理的 3. 我的申请(圈子申请) 4.我的申请(加入申请)
        userId: this.$store.state.userInfo.accountId
      },
      pageSizes: [10, 20, 30, 40, 50, 100],
      totalPages: 0,
      totalData: 0,
      tableData: []
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
        this.totalData = res.data.total
        this.totalPages = Math.ceil(this.totalData / this.params.size)
        this.tableData = res.data.records
      })
    },
    handleSizeChange(val) {
      this.$router.replace(`/engineering/myGroup/applyJoin?page=${1}&size=${val}`)
    },
    handleCurrentChange(val) {
      this.$router.replace(`/engineering/myGroup/applyJoin?page=${val}&size=${this.params.size}`)
    },
    openNewLink(item) {
      if (item.statusCode === '6') return this.$message.warning('该圈子已被屏蔽')
      if (item.statusCode === '9') return this.$message.warning('该圈子已解散')
      this.openLink('/engineering/groupHome/' + item.id)
    }
  },
  mounted() {}
}
</script>

<style lang="less" scoped>
.apply-join {
  padding: 10px 20px;
  background-color: #fff;
}
.apply-list {
  border: 1px solid #ebeef5;
  .apply-operate {
    > a {
      padding-right: 10px;
      line-height: 1;
      &:not(:first-child) {
        padding-left: 10px;
        border-left: 1px solid #e43d30;
      }
    }
  }
}
.pagination {
  text-align: right;
  margin: 10px 0;
}
</style>
