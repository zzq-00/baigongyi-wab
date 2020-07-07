<template>
  <div>
    <div class="member-search">
      <i class="el-icon-search"></i>
      <input type="text" placeholder="搜索圈内成员" v-model.trim="nickName">
    </div>
    <div class="member-list">
      <el-table :data="tableData" height="570" size="mini" :header-cell-style="{ backgroundColor: '#F7F8FA' }">
        <el-table-column type="index" label="编号">
        </el-table-column>
        <el-table-column prop="nickName" label="成员昵称">
        </el-table-column>
        <el-table-column label="加入时间">
          <template slot-scope="scope">
            {{scope.row.dateAt | formatDate}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <div slot-scope="scope" class="member-operate clearfix">
            <a class="fl red" href="javascript:;" @click="changeLeader(scope.row)">移交圈主</a>
            <a class="fl red" href="javascript:;" v-if="scope.row.shutUp" @click="memberShutUp(scope.row)">取消禁言</a>
            <a class="fl red" href="javascript:;" v-else @click="memberShutUp(scope.row)">禁言</a>
            <a class="fl red" href="javascript:;" @click="delMember(scope.row)">删除</a>
          </div>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="pagination">
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="1000">
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
import api from '@/fetch'
export default {
  data() {
    return {
      tableData: [],
      groupId: this.$route.params.id,
      nickName: '' //成员名字
    }
  },
  watch: {
    nickName(val, old) {
      if (val) {
        this.getMembersOfTheGroupSearch(val)
      } else {
        this.getMembersOfTheGroup()
      }
    }
  },
  methods: {
    getMembersOfTheGroupSearch(val) {
      api.getMembersOfTheGroupSearch(this.groupId, val).then(res => {
        this.tableData = res.data.simpleMembers
      })
    },
    getMembersOfTheGroup() {
      api.getMembersOfTheGroup(this.groupId).then(res => {
        this.tableData = res.data.simpleMembers
      })
    },
    // 移交圈主
    changeLeader(item) {
      this.$confirm('转移圈主后您将无法管理圈子，是否继续此操作', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api.changeLeader({ groupId: this.groupId, memberId: item.id }).then(res => {
            this.$router.replace('/engineering/myGroup/managed')
          })
        })
        .catch(() => {})
    },
    // 禁言/取消禁言
    async memberShutUp(item) {
      try {
        if (!item.shutUp) {
          await this.$confirm('该用户禁言后，仅可查看内容，不能发言，是否继续此操作', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
        }
        await api.memberShutUp({ groupId: this.groupId, memberId: item.id, shutUp: !item.shutUp })
        item.shutUp = !item.shutUp
      } catch (error) {}
    },
    // 删除成员
    delMember(item) {
      this.$confirm('确定将此成员从圈子中移除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api.delMember({ groupId: this.groupId, memberId: item.id }).then(res => {
            let index = this.tableData.findIndex(its => its.id === item.id)
            this.tableData.splice(index, 1)
          })
        })
        .catch(() => {})
    }
  },
  mounted() {
    this.getMembersOfTheGroup()
  }
}
</script>

<style lang="less" scoped>
.member-search {
  position: relative;
  .el-icon-search {
    position: absolute;
    font-size: 18px;
    color: #999999;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
  }
  > input {
    color: #333;
    height: 36px;
    width: 412px;
    background-color: #f5f5f5;
    border-radius: 18px;
    border: 0 none;
    padding-left: 38px;
  }
}
.member-list {
  border: 1px solid #ebeef5;
  margin-top: 10px;
  .member-operate {
    > a {
      width: 50px;
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
