<!-- 我的钱包-流水明细 -->
<template>
  <div class="flowing-water">
    <p class="flowing-water-title">流水明细</p>
    <div class="fliter-box">
      <ul class="filter-time clearfix">
        <span class="labels fl">时间：</span>
        <div class="date-filter fl">
          <el-date-picker :picker-options="pickerOptionStart" value-format='yyyy-MM-dd' v-model="value1" :clearable='false' type="date" placeholder="选择日期" @change="changeTime('其他',-2)">
          </el-date-picker>
          <span class="division">-</span>
          <el-date-picker :picker-options="pickerOptionEnd" value-format='yyyy-MM-dd' v-model="value2" :clearable='false' type="date" placeholder="选择日期" @change="changeTime('其他',-2)">
          </el-date-picker>
        </div>
        <span class=" time-span this-month fl" :class="{ 'business-style': timeIndex==-1 }" @click="changeTime(-1)">本月</span>
        <span class="time-span fl">最近：</span>
        <li class="fl" :class="{ 'business-style': timeIndex==index }" v-for="(item,index) in dateList" :key='index' @click="changeTime(index)">{{item}}</li>
      </ul>
      <ul class="filter-business">
        <span class="labels filter-title">业务：</span>
        <li :class="{ 'business-style': businessIndex==index }" v-for="(item,index) in businessList" :key='index' @click="changeBusiness(item,index)">{{item}}</li>
      </ul>
      <ul class="filter-status">
        <span class="labels filter-title">状态：</span>
        <li :class="{ 'business-style': statusIndex==index }" v-for="(item,index) in statusList" :key='index' @click="changeStatus(index)">{{item}}</li>
      </ul>
      <p class="filter-btn" v-if="!senior">
        <span @click="senior=true">高级筛选</span>
        <img src="@/assets/images/filter-pull.png" alt="" srcset="">
      </p>
      <div class="filter-money clearfix" v-if="senior">
        <span class="labels fl">金额：</span>
        <div class="filter-input fl clearfix" ref="box" @click="blursureDia">
          <input type="text" @keyup="clearNoNum(money1,'money1')" placeholder="" v-model="money1" @focus="sureDia=true">
          <span>-</span>
          <input type="text" @keyup="clearNoNum(money2,'money2')" placeholder="" v-model="money2" @focus="sureDia=true">
          <p class="money-sure" v-if="sureDia">
            <button type="primary" @click="sureMoney">确定</button>
            <button @click="deleteMoney">清除</button>
          </p>
        </div>
      </div>
      <div class="filter-word clearfix" v-if="senior">
        <span class="labels fl">关键词：</span>
        <div class="filter-input fl">
          <input type="text" class="word-input" placeholder="输入摘要、备注、流水号、课程、专栏、视频名称" v-model="keyWord">
        </div>
      </div>
      <p class="filter-btn" v-if="senior">
        <span @click="senior=false">基本筛选</span>
        <img src="@/assets/images/filter-retract.png" alt="" srcset="">
      </p>
    </div>
    <div class="data-box">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="时间" width="160">
          <template slot-scope="scope">
            <span>{{scope.row.serialTime | formatDate('hasSecond')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="业务" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.action==1">充值</span>
            <span v-if="scope.row.action==2">提现</span>
            <span v-if="scope.row.action==3">消费</span>
            <span v-if="scope.row.action==4">收益</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="摘要 | 流水号 | 描述" width="370">
          <template slot-scope="scope">
            <span class="summary-type">{{scope.row.summary}}</span>
            <p class="serialNumber-style" v-if="scope.row.serialNumber">
              <span>流水号:</span>
              {{scope.row.serialNumber}}</p>
            <p>
              <span v-if="scope.row.action==3||scope.row.action==4" v-html="scope.row.describe"></span>
              <span v-if="scope.row.action==2">{{scope.row.descriptionForUser}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="incomeOrExpend" label="收入 | 支出" width="140">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1000" style="color:#E23732">进行中</span>
            <span v-if="scope.row.status==1001" style="color:#BFCCCF">失败</span>
            <span v-if="scope.row.status==1002" style="color:#5DC183">成功</span>
            <span v-if="scope.row.status==1003" style="color:#5DC183">驳回</span>
          </template>
        </el-table-column>
        <el-table-column prop="currentTotalAmount" label="余额">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="scope.row.action==2">
              <a :href="`/withdrawDeatils/${scope.row.id}`" target="_blank" rel="noopener noreferrer" style="color:#E23732">详情</a>
            </el-button>
            <span v-else>-</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-turning">
      <el-button class="el-icon-arrow-left" @click="pageTurn('-')"></el-button>
      <span>第&nbsp;{{params.pageNum}}/{{dataPages==0||dataPages==null?1:dataPages}}&nbsp;页</span>
      <el-button class="el-icon-arrow-right" @click="pageTurn('+')"></el-button>
      <span>共{{dataTotal}}条</span>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
export default {
  components: {},
  data() {
    return {
      pickerOptionStart: {
        disabledDate: time => {
          return this.dealDisabledStart(time)
        }
      },
      pickerOptionEnd: {
        disabledDate: time => {
          return this.dealDisabledEnd(time)
        }
      },
      dateList: ['3个月', '6个月', '一年', '全部'],
      businessList: ['全部', '充值', '提现', '消费', '收益'],
      statusList: ['全部', '进行中', '成功', '失败'],
      timeIndex: -2,
      businessIndex: 0,
      statusIndex: 0,
      value1: '',
      value2: '',
      money1: '',
      money2: '',
      keyWord: '', //关键词
      nowDate: '', //今天
      nowMonth: '', //本月1日
      senior: false,
      tableData: [],
      dataTotal: '', //数据总条数
      dataPages: '', //数据总页码
      params: {
        condition: {
          action: 0, //业务类型，1代表充值，2代表提现，3代表消费，4代表收益
          beginDate: '', //开始日期
          endDate: '', //结束日期
          keywords: '', //关键词
          maxAmount: null, //最大金额
          minAmount: null, //最小金额
          sortType: 1, //排序，1为创建时间倒序
          status: null //状态，1000为进行中，1001为失败，1002为成功, 1003驳回
        },
        pageNum: 1,
        pageSize: 10
      },
      sureDia: false
    }
  },
  watch: {
    keyWord(val, old) {
      this.params.condition.keywords = val
    },
    params: {
      handler: function(val, oldVal) {
        if (val) {
          console.log(val, 'valsss')
          this.walletDetailList()
        }
      },
      deep: true
    },
    value1(val, oldVal) {
      if (val) {
        this.dealDisabledEnd(new Date(val))
      }
    },
    value2(val, oldVal) {
      if (val) {
        this.dealDisabledStart(new Date(val))
      }
    }
  },
  computed: {},
  created() {
    window.expandDescription = this.expandDescription
  },
  methods: {
    expandDescription(type, val) {
      // 1课程、2专栏
      let routeUrl
      if (type == 1) {
        routeUrl = this.$router.resolve(`/courseDetail/${val}`)
      } else if (type == 2) {
        routeUrl = this.$router.resolve(`/columnDetail/${val}`)
      }
      window.open(routeUrl.href, '_blank')
    },
    dealDisabledStart(time) {
      let starttime = new Date(this.value2).getTime()
      return time.getTime() > starttime
    },
    dealDisabledEnd(time) {
      let starttime = new Date(this.value2).getTime()
      // 这里算出时间差的毫秒数
      let day = this.getDaysBetween(this.value1, this.value2) * 24 * 3600 * 1000
      let dateRegion = starttime - day
      // 这里减8.64e7的作用是,让今天的日期可以选择,如果不减的话,今天的日期就不可以选择,判断中写<= 也是没用的,一天的毫秒数就是8.64e7
      return time.getTime() > Date.now() || time.getTime() < dateRegion - 8.64e7
    },
    // 计算两个时间之间的时间差
    getDaysBetween(dateString1, dateString2) {
      var startDate = Date.parse(dateString1)
      var endDate = Date.parse(dateString2)
      var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000)
      return days
    },
    pageTurn(val) {
      if (val == '+' && this.params.pageNum < this.dataPages) {
        this.params.pageNum++
      } else if (val == '-' && this.params.pageNum > 1) {
        this.params.pageNum--
      }
    },
    clearNoNum(val, name) {
      if (val) {
        val = val.replace(/[^\d.]/g, '') //清除“数字”和“.”以外的字符
        val = val.replace(/\.{2,}/g, '.') //只保留第一个. 清除多余的
        val = val
          .replace('.', '$#$')
          .replace(/\./g, '')
          .replace('$#$', '.')
        val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') //只能输入两个小数
        if (val.indexOf('.') < 0 && val != '') {
          //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          val = String(parseFloat(val))
        }
        this[name] = val
      }
    },
    blursureDia(e) {
      if (!this.$refs.box.contains(e.target)) {
        /* 关闭元素 */
        this.money1 = this.params.condition.minAmount
        this.money2 = this.params.condition.maxAmount
        this.sureDia = false
      }
    },
    // 确定金额
    sureMoney() {
      this.sureDia = false
      if (this.money1 || this.money2) {
        if (Number(this.money1) <= Number(this.money2)) {
          this.params.condition.minAmount = this.money1
          this.params.condition.maxAmount = this.money2
        } else if (Number(this.money1) > Number(this.money2)) {
          const one = (this.params.condition.minAmount = this.money2)
          const two = (this.params.condition.maxAmount = this.money1)
          this.money1 = one
          this.money2 = two
        }
      }
    },
    // 清除金额
    deleteMoney() {
      this.sureDia = false
      this.money1 = this.money2 = this.params.condition.minAmount = this.params.condition.maxAmount = null
    },
    walletDetailList() {
      api.walletDetailList(this.params).then(res => {
        this.tableData = res.data.records
        this.dataTotal = res.data.total
        this.dataPages = res.data.pages
        this.tableData.map((item, index) => {
          if (
            item.summary == '购买课程' ||
            item.summary == '购买专栏' ||
            item.summary == '课程分成' ||
            item.summary == '专栏分成'
          ) {
            let name
            if (item.action == 3) {
              name = item.descLecturerName
            } else if (item.action == 4) {
              name = item.descUsername
            }
            item.describe = `<span style="color: #333333;margin-right:3px;">${name}</span>${
              item.action == 4 ? `<span style='margin:0 3px;'>购买</span>` : ''
            }<span style='margin-left:3px;color:#217AFF;text-decoration:underline;cursor:pointer' onclick="expandDescription(
            ${item.descObjType},
            '${item.descObjId}')">${item.descObjName}</span>`
          }
        })
      })
    },
    changeTime(index) {
      this.timeIndex = index
      switch (index) {
        case -1:
          this.value1 = this.nowMonth
          this.value2 = this.nowDate
          break
        case 0:
          this.value1 = this.getPreMonth(this.nowDate, 3)
          this.value2 = this.nowDate
          break
        case 1:
          this.value1 = this.getPreMonth(this.nowDate, 6)
          this.value2 = this.nowDate
          break
        case 2:
          this.value1 = this.getPreMonth(this.nowDate, 12)
          this.value2 = this.nowDate
          break
        case 3:
          this.value1 = ''
          this.value2 = this.nowDate
          break
        default:
          break
      }
      this.params.condition.beginDate = this.value1
      this.params.condition.endDate = this.value2
      this.$router.push({
        query: {
          type: this.$route.query.type,
          statusType: this.$route.query.statusType,
          timeType: index
        }
      })
    },
    changeBusiness(item, index) {
      this.params.condition.action = this.businessIndex = index
      this.$router.push({
        query: {
          type: index,
          statusType: this.$route.query.statusType,
          timeType: this.$route.query.timeType
        }
      })
    },
    changeStatus(index) {
      this.statusIndex = index
      let statusCode
      switch (index) {
        case 0:
          statusCode = null
          break
        case 1:
          statusCode = 1000
          break
        case 2:
          statusCode = 1002
          break
        case 3:
          statusCode = 1001
          break
        default:
          break
      }
      this.params.condition.status = statusCode
      this.$router.push({
        query: {
          type: this.$route.query.type,
          statusType: index,
          timeType: this.$route.query.timeType
        }
      })
    },
    getPreMonth(date, num) {
      let arr = date.split('-')
      let year = arr[0] //获取当前日期的年份
      let month = arr[1] //获取当前日期的月份
      let day = arr[2] //获取当前日期的日
      let days = new Date(year, month, 0)
      days = days.getDate() //获取当前日期中月的天数
      let year2 = year
      let month2 = parseInt(month) - num
      if (month2 <= 0) {
        //代表上一年
        year2 = parseInt(year2) - 1
        month2 = 12 + month2 //因为month2是负数所以要加
      }
      let day2 = day
      let days2 = new Date(year2, month2, 0)
      days2 = days2.getDate()
      if (day2 > days2) {
        day2 = days2
      }
      if (month2 < 10) {
        month2 = '0' + month2
      }
      let t2 = year2 + '-' + month2 + '-' + day2
      return t2
    },
    getdates() {
      let date = new Date()
      let year = date.getFullYear() //得到年份
      let month = date.getMonth() + 1 //获取当前月份(0-11,0代表1月)
      let day = date.getDate() //获取当前日(1-31)
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      this.params.condition.beginDate = this.value1 = this.nowMonth = year + '-' + month + '-' + '01'
      this.params.condition.endDate = this.value2 = this.nowDate = year + '-' + month + '-' + day
    }
  },
  mounted() {
    this.getdates() //获取当前日期
    this.businessIndex = this.params.condition.action = this.$route.query.type
    this.changeStatus(this.$route.query.statusType ? Number(this.$route.query.statusType) : 0)
    this.changeTime(this.$route.query.timeType ? Number(this.$route.query.timeType) : -2)
    document.addEventListener('click', this.blursureDia)
  },
  // 清除click监听
  beforeDestroy() {
    document.removeEventListener('click', this.blursureDia)
  }
}
</script>
<style lang="less" scoped>
.flowing-water {
  width: 1100px;
  margin-top: 20px;
  background: #fff;
  border-radius: 10px;
  padding-bottom: 76px;
  .flowing-water-title {
    padding: 22px 0 13px 20px;
    font-size: 16px;
    line-height: 15px;
    height: 15px;
    color: rgba(74, 74, 74, 1);
    border-bottom: 1px solid #dddddd;
    position: relative;
  }
  .flowing-water-title:after {
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
  .fliter-box {
    margin: 20px;
    background: #f7f8fa;
    padding: 0px 0 0 20px;
    ul {
      border-bottom: 1px solid #e6e8eb;
      li {
        display: inline-block;
        cursor: pointer;
        color: #666666;
        padding: 6px 12px;
        font-size: 14px;
        height: 14px;
        line-height: 15px;
        margin-left: -5px;
      }
      .business-style {
        background: #dbe3f2;
        border-radius: 20px;
      }
    }
    .filter-time {
      height: 14px;
      padding-top: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #e6e8eb;
      .division {
        margin: 0 13px;
      }
      /deep/.el-input__prefix,
      /deep/.el-input__suffix {
        display: none;
      }
      /deep/.el-input__inner {
        padding: 0 3px 0px 3px;
        height: 19px;
        line-height: 19px;
        border: none;
        border-bottom: 1px solid #666666;
        background-color: transparent;
        font-size: 14px;
        color: #999999;
        border-radius: 0 !important;
      }
      /deep/.el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 100px;
      }
      .date-filter {
        margin-right: 0;
        margin-top: -3px;
        display: inline-block;
      }
      .time-span {
        font-size: 14px;
        height: 14px;
        line-height: 14px;
        margin-right: 10px;
      }
      .this-month {
        position: relative;
        margin-right: 8px;
        cursor: pointer;
        padding: 3px 5px;
        margin-top: -3px;
        margin-left: 29px;
      }
      .this-month:after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 4px;
        right: -4px;
        background-color: #666666;
        width: 1px;
        height: 12px;
      }
      li {
        margin-top: -6px;
        margin-right: 20px;
      }
    }
    .fliter-box,
    .filter-business,
    .filter-status {
      padding-top: 10px;
      padding-bottom: 10px;
      height: 26px;
      li {
        text-align: center;
        margin-right: 30px;
      }
    }
    .filter-status {
      li:nth-of-type(2) {
        margin-right: 17px;
      }
    }
    .labels {
      height: 13px;
      line-height: 13px;
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
      width: 57px;
    }
    .filter-title {
      width: 60px;
      display: inline-block;
    }
    .filter-money,
    .filter-word {
      padding-top: 15px;
      border-bottom: 1px solid #e6e8eb;
      padding-bottom: 15px;
      .filter-input {
        margin-top: -2px;
        position: relative;
        span {
          margin: 0 12px;
        }
        input {
          width: 90px;
          font-size: 14px;
          border: none;
          border-bottom: 1px solid #666666;
          background-color: transparent;
          padding: 0 2px 1px 2px;
          color: #999999;
        }
        .word-input {
          width: 500px;
        }
        .money-sure {
          display: inline-block;
          position: absolute;
          width: 200px;
          top: -5px;
          button {
            margin-left: 16px;
            padding: 3px 10px;
            font-size: 12px;
            // height: 20px;
            cursor: pointer;
          }
          button:nth-child(1) {
            background: #e43c31;
            color: #fff;
          }
          button:nth-child(2) {
            background: #fff;
            border: 1px solid #666;
          }
        }
      }
    }
    .filter-btn {
      padding: 8px 22px 12px 0;
      text-align: right;
      height: 14px;
      vertical-align: middle;
      span {
        vertical-align: middle;
        margin-right: 6px;
        cursor: pointer;
      }
      img {
        vertical-align: middle;
        cursor: pointer;
      }
    }
  }
  .data-box {
    margin: 0 20px;
    border: 1px solid #dddddd;
    /deep/.el-table {
      th {
        height: 50px;
        padding: 0 !important;
        background: #f7f8fa;
        color: #999999;
        font-size: 14px;
      }
    }
    .summary-type {
      color: #666;
      padding-right: 10px;
      border-right: 1px solid #666;
      margin-right: 10px;
    }
    .serialNumber-style {
      display: inline-block;
      line-height: 14px;
      font-size: 14px;
      span {
        display: inline-block;
        line-height: 14px;
      }
      span:nth-child(1) {
        color: #999999;
      }
      span:nth-child(2) {
        color: #666666;
      }
    }
  }
  .page-turning {
    text-align: right;
    padding-right: 20px;
    margin-top: 11px;
    font-size: 14px;
    /deep/.el-button--small {
      padding: 0;
      width: 16px;
      height: 16px;
    }
    span:nth-of-type(1) {
      margin: 0 11px;
    }
    span:nth-of-type(2) {
      margin-left: 11px;
    }
  }
}
</style>
