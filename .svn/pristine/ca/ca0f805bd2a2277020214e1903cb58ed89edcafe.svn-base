<template>
  <div class="recently-viewed">
    <div class="component-title">
      <span>圈子推荐</span>
      <router-link to="/engineering/groupList">
        全部<i class="el-icon-arrow-right"></i>
      </router-link>
    </div>
    <ul class="group-list">
      <li v-for="(item,index) in groupList" :key="index">
        <groupHeaderImg :groupData="item" />
        <div class="group-info">
          <h5>
            <a href="javascript:;" @click="!item.shield && openLink('/engineering/groupHome/'+item.id)">{{item.name}}</a>
          </h5>
          <div>
            <p>{{item.membersCount | formatNumbers}}个成员</p>
            <el-button plain size="mini" v-if="item.joinStatus===1">已申请</el-button>
            <el-button plain size="mini" v-else-if="item.joinStatus===3||item.joinStatus===5||item.joinStatus===10">已加入</el-button>
            <template v-else-if="item.joinStatus!=3&&item.joinStatus!=5&&item.joinStatus!=10">
              <el-button size="mini" class="red" v-if="item.type===2" @click="applyToJoin(item)">申请</el-button>
              <el-button size="mini" class="red" v-if="item.type===1" @click="applyToJoin(item)">加入</el-button>
            </template>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/fetch'
import groupHeaderImg from './groupHeaderImg'
export default {
  components: {
    groupHeaderImg
  },
  data() {
    return {
      params: {
        pageNum: 1,
        pageSize: 10,
        paramObject: {
          recommend: true
        }
      },
      groupList: []
    }
  },
  methods: {
    getListByRegion() {
      api.getListByRegion(this.params).then(res => {
        this.groupList = res.data.records
      })
    },
    // 申请加入
    async applyToJoin(item) {
      try {
        let promptObj = {}
        if (item.type === 2) {
          promptObj = await this.$prompt('申请理由（最多100字）', '申请加入圈子', {
            closeOnClickModal: false,
            closeOnPressEscape: false,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValidator: val => !!val && val.trim().length > 0 && val.length <= 100,
            inputErrorMessage: '理由不能为空并且不超过100'
          })
        } else {
          await this.$confirm('加入圈子参与互动，是否加入？', '提示', {
            closeOnClickModal: false,
            closeOnPressEscape: false,
            confirmButtonText: '加入圈子',
            cancelButtonText: '取消',
            type: 'warning'
          })
        }
        api
          .applyGroup({ groupId: item.id, memberId: this.$store.state.userInfo.accountId, reason: promptObj.value || '' })
          .then(res => {
            if (item.type === 1) return (item.joinStatus = 3)
            item.joinStatus = 1
            this.$message.success('申请成功，请等待圈主审核')
          })
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.getListByRegion()
  }
}
</script>

<style lang="less" scoped>
.recently-viewed {
  background-color: #fff;
  border-radius: 10px;
  padding: 13px 17px;
  .component-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .group-list {
    > li {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      .group-info {
        flex: 1;
        margin-left: 10px;
        > div {
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
