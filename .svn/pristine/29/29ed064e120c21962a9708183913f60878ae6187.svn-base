<template>
  <li>
    <!-- 若圈子被后台屏蔽，点击无法跳转到主页。 -->
    <h5 class="ellipsis" @click="(type==='managed' || !groupData.shield) && openLink('/engineering/groupHome/'+groupData.id)">{{groupData.name}}</h5>
    <div class="group-info clearfix">
      <groupHeaderImg class="fl" :groupData="groupData" :type="type" />
      <div class="fl">
        <p>
          {{groupData.description.slice(0, 24)}}
          {{groupData.description.length>24?'...':''}}
        </p>
        <p>
          <span>{{(groupData.count || groupData.membersCount)|formatNumbers}}个成员</span>
          <!-- 我管理的圈子 -->
          <template v-if="type==='managed'">
            <span size="mini" class="red" v-if="groupData.shield" @click="openTips" style="cursor: pointer;">申诉</span>
            <el-button size="mini" class="red" @click="openLink('/engineering/myGroup/managed/'+groupData.id)">
              管理
            </el-button>
          </template>
          <el-button plain size="mini" v-if="groupData.joinStatus && groupData.joinStatus===1" @click="$message.info('申请审核中')">已申请</el-button>
          <el-button plain size="mini" v-else-if="groupData.joinStatus && (groupData.joinStatus===3||groupData.joinStatus===5||groupData.joinStatus===10)">已加入</el-button>
          <template v-else-if="groupData.joinStatus && groupData.joinStatus!=3&&groupData.joinStatus!=5&&groupData.joinStatus!=10">
            <el-button size="mini" class="red" v-if="groupData.type===2" @click="applyToJoin(groupData)">申请</el-button>
            <el-button size="mini" class="red" v-if="groupData.type===1" @click="applyToJoin(groupData)">加入</el-button>
          </template>
        </p>
      </div>
    </div>
  </li>
</template>

<script>
import api from '@/fetch'
import groupHeaderImg from './groupHeaderImg'

export default {
  components: {
    groupHeaderImg
  },
  props: {
    type: String, // joined：已加入的 managed：我管理的
    groupData: Object
  },
  methods: {
    openTips() {
      this.$alert('该圈子已被屏蔽，请拨打400-697-5677联系客服处理', '我要申诉', {
        confirmButtonText: '确定',
        callback: action => {}
      })
    },
    // 申请加入
    async applyToJoin(item) {
      if (!this.$store.state.userInfo.accountId) return this.$router.replace('/login?redirectUrl=' + window.location.href)
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
  }
}
</script>

<style lang="less" scoped>
li {
  width: 295px;
  height: 130px;
  overflow: hidden;
  margin-right: 15px;
  margin-bottom: 15px;
  padding: 13px 16px;
  box-sizing: border-box;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 10px 0px rgba(183, 195, 184, 0.35);
    border-radius: 5px;
  }
  > h5 {
    font-size: 16px;
    cursor: pointer;
  }
  .group-info {
    margin-top: 6px;
    > div:last-child {
      width: 183px;
      margin-left: 10px;
      > p:first-child {
        word-break: break-word;
        font-size: 13px;
        min-height: 38px;
      }
      > p:last-child {
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
