<template>
  <div>
    <div class="apply-list">
      <el-table :data="tableData" height="570" size="mini" :header-cell-style="{ backgroundColor: '#F7F8FA' }">
        <el-table-column type="index" label="编号">
        </el-table-column>
        <el-table-column prop="name" label="成员昵称">
        </el-table-column>
        <el-table-column prop="reason" label="申请理由">
        </el-table-column>
        <el-table-column prop="date" label="申请时间">
          <template slot-scope="scope">
            {{scope.row.applyAt | formatDate}}
          </template>
        </el-table-column>
        <el-table-column label="处理结果">
          <!-- status -1、从未加入 1、审核中 2、驳回 3、通过 4、申请撤销 5、圈子已公开 6、圈子已屏蔽 7、退出申请 8、驳回完成 9、圈子已解散 10、原圈主自动加入 -->
          <div slot-scope="scope">
            <span v-if="scope.row.status==='1'">未处理</span>
            <span v-else-if="scope.row.status==='2'" style="color: #FFB502;">驳回
              <el-popover placement="right" width="200" trigger="hover" :content="scope.row.reject" v-if="scope.row.reject">
                <i class="el-icon-question red" slot="reference"></i>
              </el-popover>
            </span>
            <span v-else-if="scope.row.status==='3'" style="color: #1A86FF;">通过</span>
          </div>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.status==='1'" class="apply-operate clearfix">
              <a class="fl red" href="javascript:;" @click="handleApplying(scope.row, 3)">通过</a>
              <a class="fl red" href="javascript:;" @click="handleApplying(scope.row, 2)">驳回</a>
            </div>
          </template>
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
      tableData: [],
      totalData: 0,
      params: {
        groupId: this.$route.params.id,
        page: 1,
        size: 10
      }
    }
  },
  methods: {
    getApplyInfo() {
      api.getApplyInfo(this.params).then(res => {
        this.totalData = res.data.total
        this.tableData = res.data.records
      })
    },
    handleSizeChange(val) {
      this.params.page = 1
      this.params.size = val
      this.getApplyInfo()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getApplyInfo()
    },
    async handleApplying(item, status) {
      let promptObj = {}
      if (status === 2) {
        promptObj = await this.$prompt('请填写驳回原因（最多100字）', '驳回原因', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: val => val === null || val.length <= 100,
          inputErrorMessage: '字数不超过100'
        })
      }
      api
        .handleApplying({
          applyId: item.id,
          groupId: item.groupId,
          reviewerId: this.$store.state.userInfo.accountId,
          status: status,
          reason: promptObj.value || ''
        })
        .then(res => {
          this.getApplyInfo()
        })
    }
  },
  mounted() {
    this.getApplyInfo()
  }
}
</script>

<style lang="less" scoped>
.apply-list {
  border: 1px solid #ebeef5;
  margin-top: 10px;
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
