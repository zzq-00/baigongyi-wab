<template>
  <div class="my-wallet" >
    <div class="my-wallet-box">
      <p class="title">我的青豆</p>
      <div class="wallet-money">
        <div class="money-box clearfix">
          <div class="content">
            <div class="c1">
              <div class="dou-icon"/>
              <p class="bean">我的青豆</p>
            </div>
            <div class="c2">
              <span><b>{{userInfoData.totalBean}}</b></span>
              <p @click="showBeanTips">青豆说明</p>
            </div>

            <div class="c3">
              <span class="btn1"  @click="getBean">领取青豆</span>
              <span class="btn2"  @click="getGoods">兑换礼品</span>
            </div>

          </div>
        </div>
      </div>

    <div class="my-wallet-record clearfix">
      <div class="tabChange clearfix">
        <span v-for="(item,index) in tabsColumn" :key="index" @click="toggleTabs(index)" :class="{active:index==nowIndex}">{{item}}
        </span>
      </div>
      <ul class='record-list fl clearfix'>
        <li class="fl" :class="{active:active==item.val}" v-for="(item,index) in recordList" :key="index" @click="changeType(item)">{{item.name}}</li>
      </ul>
      <div class="table" style="margin-top: 30px">
        <el-table
          :data="tableData"
          :header-cell-style="{
                          'font-size':'14px',
                         'background-color': '#F4F5F9','color':'#999999'}"

          stripe
          style="width: 100%">

          <el-table-column
            prop="createTime"
            label="时间"
            width="180">

          </el-table-column>
          <el-table-column
            prop="methodsType"
            label="业务"
            width="180">
            <template slot-scope="scope">
              <p> {{ scope.row.methodsType==1?"收入":"支出" }}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="来源/用途">
            <template slot-scope="scope">
              <p><span style="color: #333333;font-size: 14px">{{ scope.row.comment }}</span></p>
              <p><span style="color: #666666;font-size: 12px">{{scope.row.grantType==1?'青豆任务奖励':'青豆活动奖励'}}</span></p>
            </template>
          </el-table-column>
          <el-table-column
            prop="inOrOutBean"
            :label="label"
           >

            <template slot-scope="scope">
              <span> {{ scope.row.methodsType==1?"+":"-" }}</span><span>
              {{scope.row.inOrOutBean}}
            </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-size="params.pageSize" layout="sizes,prev,pager,next, total,jumper" :total="allData.total">

        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="青豆说明"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <p>
1、什么是青豆？<br>

青豆是由百工驿平台提供的奖励服务，仅限百工驿平台内使用；不可用于其他平台的产品或
服务；不可转赠；不支持提现。<br>
2、青豆怎么获得？<br>

1）签到赠送<br>
2）完成青豆任务赠送<br>
3）参加平台活动赠送<br>
3、青豆有效期是多少？<br>

青豆暂不存在有效期限制，请合理、放心使用。如有变动，平台将另行通知。<br>
4、如何使用青豆？<br>

青豆可用于青豆商城的礼品兑换等服务，确认兑换服务后，系统将从账户青豆余额扣除对应
数值的青豆。</p>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>



  </div>
</template>

<script>
import api from '@/fetch'
import getBeans from "../../../router/getBeans";
export default {
  data() {
    return {
      loading: false,
      dialogVisible:false,
      nowIndex:0,
      active:0,
      tabsColumn: ['青豆明细', '兑换记录'],
      recordList: [
        { name: '全部', val: 0 },
        { name: '收入', val: 1 },
        { name: '支出', val: 2 },
      ],
      label:"收入/支出",
      walletInfo: {},
      params: {
        asc: false,
        // orderBy: 'publish_time', // watch_count阅读量排序  publish_time发布时间排序
        pageNum: 1,
        pageSize: 10,
        paramObject: {
          accountId:'',
          methodsType:''
        }
      },
      tableData: [],
      allData:{},
    }
  },
  props: {
    userInfoData: Object
  },
  computed: {
    noMore() {
      return this.tableData.length >= this.totalNum
    }
  },
  watch: {
    params: {
      handler: 'getBeanlist',
      deep: true
    }
  },
  mounted() {
    this.getBeanlist();
  },
  methods: {
    handleSizeChange(val){
      this.params.pageSize=val;
    },
    handleCurrentChange(currentPage){
       this.params.pageNum = currentPage
    },
    changeType(item) {
      this.active=item.val;
      this.params.pageNum=1;
      this.params.paramObject.methodsType=item.val;
      if(item.val==0){
        this.label='收入/支出';
      }else {
        this.label=item.name;
      }
    },
    showBeanTips(){
      this.dialogVisible=true;
    },
    getBean(){
      this.$router.push('/getBeans')
    },
    getGoods(){
      this.$message({
        message: '功能暂未开放',
        type: 'warning'
      });
    },
    // tab栏切换
    toggleTabs(index) {
      if(index==1){
        this.$message({
          message: '功能暂未开放',
          type: 'warning'
        });
        return;
      }
      this.nowIndex = index
    },
    // 青豆明细
    getBeanlist() {
      this.params.paramObject.accountId = this.$store.state.userInfo.accountId
      this.loading = true
      api.myBeansList(this.params).then(res => {
        this.loading = false
        this.tableData = res.data.records
        this.allData=res.data;
      })
    },
  }
}
</script>

<style lang="less" scoped>
.my-wallet {
  .my-wallet-box {
    padding-bottom: 60px;
    background: #fff;
    border-radius: 10px;

    // 分页
    .pagination {
      margin: 20px 0 30px;
      text-align: center;

    }
    .title {
      padding: 22px 0 13px 20px;
      font-size: 16px;
      line-height: 15px;
      height: 15px;
      color: rgba(74, 74, 74, 1);
      border-bottom: 1px solid #dddddd;
      position: relative;
    }

    .wallet-money {
      padding: 20px;
      .money-box {
        width: 820px;
        height: 120px;
        border-radius: 10px;
        background: linear-gradient(90deg, #B2B9C4, #FDFDFE);
        .content{
          display: flex;
          align-items: flex-end;
          padding: 14px;
          .c1{
            .dou-icon {
              width: 71px;
              height: 71px;
              background-image: url("~@/assets/images/dou.png");
              background-size: cover;
              background-position: center center;
              background-repeat: no-repeat;
              margin-right: .09rem;
            }
            p{
              text-align: center;
              font-size: 12px;
              color: #FFFFFF;
            }
          }
          .c2{
            margin-left: 24px;
            span{
              color: #333333;
              font-size: 26px;
            }
            p{
              color: #178FFF;
              font-size: 14px;
              text-decoration:underline;
              cursor: pointer;

            }
          }
          .c3{
            margin-left: auto;
            margin-bottom: 8px;
            span{
              padding: 8px 16px 8px 16px;
              color: #FFFFFF;
              cursor: pointer;
            }
            .btn1{
              border-radius: 10px;
              background: linear-gradient(90deg, #FF9352, #F33535);
            }
            .btn2{
              border-radius: 10px;
              background: linear-gradient(90deg, #9857F9, #5272FF);
              margin-left: 10px;
            }
          }

        }

      }
    }
  }
  .my-wallet-record {
    background: rgba(255, 255, 255, 1);
    padding: 0px 20px;


    .tabChange {
      font-size: 16px;
      padding: 0px 20px 9px 20px;
      border-bottom: 1px solid #dddddd;
      cursor: pointer;
      margin-bottom: 20px;
      span:first-child {
        margin-right: 20px;
      }
      .active {
        position: relative;
        color: #e43c31;
      }
      .active::after {
        content: '';
        display: inline-block;
        position: absolute;
        bottom: -10px;
        left: 19px;
        height: 3px;
        width: 24px;
        background-color: #e43c31;
        border-radius: 2px;
      }
    }


    .record-title {
      height: 15px;
      line-height: 15px;
      font-size: 16px;
      color: rgba(74, 74, 74, 1);
      margin-right: 37px;
    }
    .record-list {
      margin-bottom: 10px;
      .active{
        border-radius: 20px;
        background-color: #1890FF;
        color: #FFFFFF;
      }
      li {
        padding: 12px 22px;
        font-size: 14px;
        color: #666666;
        position: relative;
        cursor: pointer;
      }

    }
  }
}


</style>

