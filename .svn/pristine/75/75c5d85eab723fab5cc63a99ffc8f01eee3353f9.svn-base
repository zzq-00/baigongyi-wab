<!-- 提现详情 -->
<template>
  <div class="withdraw-details">
    <ul>
      <li class="clearfix">
        <span class="fl">时间</span>
        <span class="fl">{{detailsInfo.applyTime | formatDate('hasSecond')}}</span>
      </li>
      <li class="clearfix">
        <span class="fl">流水号</span>
        <span class="fl">{{detailsInfo.serialNumber}}</span>
      </li>
      <li class="clearfix">
        <span class="fl">提现金额</span>
        <span class="fl" v-if="detailsInfo.applyAmount">{{detailsInfo.applyAmount}}元</span>
      </li>
      <li class="clearfix">
        <span class="fl">支付宝姓名</span>
        <span class="fl">{{detailsInfo.alipayUsername}}</span>
      </li>
      <li class="clearfix">
        <span class="fl">支付宝账号</span>
        <span class="fl">{{detailsInfo.alipayAccount}}</span>
      </li>
      <li class="clearfix">
        <span class="fl">状态</span>
        <span class="fl" style="color:#E23732" v-if="detailsInfo.finalStatus=='1000'">进行中</span>
        <span class="fl" style="color:#FFA200" v-if="detailsInfo.finalStatus=='1001'">失败</span>
        <span class="fl" style="color:#5DC183" v-if="detailsInfo.finalStatus=='1002'">成功</span>
        <span class="fl" style="color:#BFCCCF" v-if="detailsInfo.finalStatus=='1003'">驳回</span>
      </li>
      <!-- 进行中没有下列信息 -->
      <li class="clearfix" v-if="detailsInfo.finalStatus!='1000'">
        <!-- 进行中没有 -->
        <span class="fl">备注信息</span>
        <span class="fl">{{detailsInfo.remark}}</span>
      </li>
      <li class="clearfix" v-if="detailsInfo.finalStatus!='1000'">
        <!-- 进行中没有 -->
        <span class="fl">处理时间</span>
        <span class="fl">{{detailsInfo.auditTime | formatDate('hasSecond')}}</span>
      </li>
      <li class="clearfix" v-if="detailsInfo.finalStatus=='1002'">
        <!-- 成功有 -->
        <span class="fl">付款时间</span>
        <span class="fl">{{detailsInfo.financeTime | formatDate('hasSecond')}}</span>
      </li>
      <li class="clearfix" v-if="detailsInfo.finalStatus=='1001'">
        <!-- 失败有 -->
        <span class="fl">理由</span>
        <span class="fl">系统异常</span>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/fetch'
export default {
  watch: {},
  data() {
    return {
      detailsInfo: {}
    }
  },
  methods: {
    withdrawalDetail() {
      api.withdrawalDetail(this.$route.params.id).then(res => {
        this.detailsInfo = res.data
      })
    }
  },
  mounted() {
    this.withdrawalDetail()
  }
}
</script>

<style lang="less" scoped>
.withdraw-details {
  width: 1100px;
  margin-top: 26px;
  background: #fff;
  border-radius: 10px;
  min-height: calc(100vh - 162px);
  ul {
    padding: 33px 20px 0;
    li {
      margin-bottom: 34px;
      font-size: 14px;
      line-height: 22px;
      span:nth-child(1) {
        width: 70px;
        text-align: justify;
        text-align-last: justify;
        color: #999999;
        margin-right: 34px;
      }
      span:nth-child(2) {
        color: #333333;
        max-width: calc(1100px - 144px);
      }
    }
  }
}
</style>
