<template>
  <div class="my-wallet">
    <div class="my-wallet-box">
      <p class="title">我的钱包</p>
      <div class="wallet-money">
        <div class="money-box clearfix">
          <div class="data-box fl">
            <p class="data-title">我的账户</p>
            <p class="money-col clearfix">
              <span class="fl">{{walletInfo.totalBalance}}</span>
              <span class="fl">元</span>
              <span class="fl">累计收益{{walletInfo.income}}元</span>
            </p>
            <div class="wallet-money-btn">
              <button @click="$router.push('/myWallet/recharge')">充值</button>
              <button :disabled='walletInfo.balance==0' :class="[walletInfo.balance==0?'no-cursor':'']" @click="$router.push('/myWallet/withdrawal?fristStep=1')">提现</button>
            </div>
          </div>
          <div class="fr">
            <img src="@/assets/images/money-img.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="my-wallet-record clearfix">
      <span class="record-title fl">交易记录：</span>
      <ul class='record-list fl clearfix'>
        <li class="fl" v-for="(item,index) in recordList" :key="index" @click="gotoFlow(item)">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
export default {
  data() {
    return {
      recordList: [
        { name: '充值记录', val: 1 },
        { name: '提现记录', val: 2 },
        { name: '消费记录', val: 3 },
        { name: '收益记录', val: 4 },
        { name: '所有交易', val: 0 }
      ],
      walletInfo: {}
    }
  },
  mounted() {
    this.getwallet()
  },
  methods: {
    getwallet() {
      api.getwallet().then(res => {
        this.walletInfo = res.data
      })
    },
    gotoFlow(item) {
      let routeUrl = this.$router.resolve(`/flowingWater?type=${item.val}`)
      window.open(routeUrl.href, '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
.myWallet {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 150px);
  background: #fff;
  img {
    display: inline-block;
    width: 420px;
    height: 250px;
  }
  h4 {
    color: #3c4250;
    font-size: 26px;
  }
  p {
    margin-top: 23px;
    width: 110px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    color: #ffffff;
    border-radius: 20px;
    background: linear-gradient(to right, #f9ac26, #f33535);
    &:hover {
      cursor: pointer;
    }
  }
}
.my-wallet {
  .my-wallet-box {
    height: 241px;
    background: #fff;
    border-radius: 10px;
    .title {
      padding: 22px 0 13px 20px;
      font-size: 16px;
      line-height: 15px;
      height: 15px;
      color: rgba(74, 74, 74, 1);
      border-bottom: 1px solid #dddddd;
      position: relative;
    }
    .title:after {
      content: '';
      display: inline-block;
      position: absolute;
      bottom: 1px;
      left: 41px;
      right: 0;
      background-color: #e43c31;
      width: 20px;
      height: 3px;
      border-radius: 2px;
    }
    .wallet-money {
      padding: 20px;
      .money-box {
        width: 820px;
        height: 150px;
        border-radius: 10px;
        background: linear-gradient(90deg, rgba(249, 125, 50, 1), rgba(226, 55, 50, 1));
        .data-box {
          padding: 20px;
          .data-title {
            height: 17px;
            line-height: 17px;
            font-size: 18px;
            color: rgba(255, 255, 255, 1);
          }
          .money-col {
            margin-top: 20px;
            span:nth-child(1) {
              font-size: 24px;
              font-weight: bold;
              color: rgba(255, 255, 255, 1);
              height: 21px;
              line-height: 21px;
            }
            span:nth-child(2) {
              font-size: 14px;
              margin: 5px 51px 0 10px;
              color: rgba(255, 255, 255, 1);
              height: 14px;
              line-height: 14px;
            }
            span:nth-child(3) {
              margin-top: 5px;
              height: 14px;
              font-size: 14px;
              color: rgba(255, 255, 255, 1);
              position: relative;
              height: 14px;
              line-height: 14px;
            }
            span:nth-child(3):after {
              content: '';
              display: inline-block;
              position: absolute;
              top: 0px;
              left: -10px;
              right: 0;
              background-color: #fff;
              width: 1px;
              height: 13px;
              border-radius: 2px;
            }
          }
          .wallet-money-btn {
            margin-top: 18px;
            button {
              width: 80px;
              height: 34px;
              background: #e23732;
              color: #fff;
              border-radius: 5px;
              cursor: pointer;
              font-size: 14px;
            }
            button:nth-child(2) {
              margin-left: 10px;
              border: 1px solid #e23732;
              background-color: transparent;
              color: #e23732;
            }
            .no-cursor {
              cursor: not-allowed;
            }
          }
        }
      }
    }
  }
  .my-wallet-record {
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    margin-top: 10px;
    padding: 32px 20px;
    .record-title {
      height: 15px;
      line-height: 15px;
      font-size: 16px;
      color: rgba(74, 74, 74, 1);
      margin-right: 37px;
    }
    .record-list {
      li {
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        color: rgba(226, 55, 50, 1);
        margin-right: 30px;
        position: relative;
        cursor: pointer;
      }
      li:after {
        content: '';
        display: inline-block;
        position: absolute;
        bottom: 2px;
        right: -14px;
        background-color: #666666;
        width: 1.5px;
        height: 11px;
      }
      li:last-child:after {
        width: 0px;
      }
    }
  }
}
</style>

