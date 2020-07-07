<template>
  <div class="getBeans">
    <div class="top">
      <p>{{signModel.totalBean}}</p>
      <span>累计获得青豆</span>
    </div>
    <div class="bottom">
      <div class="tips">
        <span class="topSpan" >签到领豆</span>
        <span class="sign" @click="signAction">{{signTips}}</span>
      </div>
      <div class="list">
        <div class="item" v-for="signDay in listDay">
          <div :class="[signDay.sign?'topDay':'activeTopDay']"  >+{{signDay.name}}</div>
          <div class="bottomDay">{{signDay.name}}天</div>
        </div>
      </div>
    </div>
    <div class="listWrapper" >
      <span ref="NewsToolBox">赚青豆</span>
      <div class="listTask" v-for="task in listTask">
        <img :src="task.taskIcon?$store.state.imageDomain + task.taskIcon : require('@/assets/images/err-header-icon01.png')" />
        <div class="listRight">
          <div class="right" >
            <div class="midItem">
              <div class="item1">{{task.taskName}}</div>
              <div class="item2">
                <span class="item2Content">奖励</span><span class="item2Content" style="color:#F33535;margin-left: 4px;margin-right: 4px"> {{task.taskBean}}</span>
                <span class="item2Content">豆 </span>
                <span class="item2Content" v-if="getType(task)==2" style="margin-left: 4px">/ 次</span>
                <span class="item2Content" v-if="getType(task)==2">，已获得 <span style="color:#F33535 ">{{task.invitedBeansCount}}</span> 豆</span>

                <div v-if="getType(task)==3" class="progress">
                  <div class="topP"><el-progress :percentage="getPercent(task)" :show-text="false"></el-progress></div>
                  <div style="margin-left: 10px"> <span class="item2Content">  {{task.completionsNumber}}/{{task.frequency}} 次</span></div>
                </div>

              </div>

              <div class="item3">{{task.explanation}}</div>
            </div>
            <div  v-if="!task.ifFinish" >
              <el-popover placement="right" trigger="manual" @show="wxShare()" v-model="shareVisible" width="150" v-if="task.objType==9">
                <ul class="share-list"  >
                  <li @click="copyText()" style="font-size: 12px;border-bottom: 1px solid #eee;padding: 9px;">
                    <img src="@/assets/images/lianjie.png" alt="">
                    <span style="vertical-align: middle;margin-left: 8px;cursor: pointer;">复制链接</span>
                  </li>
                  <li style="font-size: 12px;line-height: 30px;padding: 0 9px 9px;">
                    <img src="@/assets/images/weixin.png" alt="">
                    <span style="vertical-align: middle;margin-left: 8px;">微信扫一扫</span>
                    <canvas ref="inviteNew" style="max-width: 74px;max-height: 74px;display: block;margin: 0 auto;"></canvas>
                  </li>
                </ul>
                <div slot="reference" class="rightItem" @click="doTask(task)"> {{task.button}}</div>
              </el-popover>
              <div  class="rightItem" @click="doTask(task)" v-if="task.objType!=9&&task.status!=1"> {{task.button}}</div>
              <div  class="rightItem finish" v-if="task.objType!=9&&task.status==1"> {{task.button}}</div>
            </div>
            <div class="rightItem finish" v-else>
              已完成
            </div>
          </div>
          <div class="separator"></div>
        </div>
      </div>
      <div class="bottomApp">
        <img class="app-images" :src="$store.state.imageDomain + 'images/download/bgy_download.png'" >
        <div class="appTips">扫描二维码下载百工驿APP，更多精彩等着你发现！</div>
      </div>
    </div>

  </div>
</template>

<script>
import api from "@/fetch";
import yivideoNavbar from "@/components/yivideoNavbar.vue";
import swiperComponents from "@/components/swiperComponents.vue";
import yivideoRecommendList from "@/components/yivideoRecommendList.vue";
import QRCode from 'qrcode'
export default {
  components: {
    yivideoNavbar,
    swiperComponents,
    yivideoRecommendList
  },
  data() {
    return {
      shareVisible:false,
      listTask: {},
      signTips:"签到",
      sliderData: [],
      signModel:{
        signDay:0,
        hasSign:false,
        totalBean:0
      },
      listDay:[{name:1,sign:false},{name:2,sign:false},{name:3,sign:false},{name:4,sign:false},{name:5,sign:false},{name:6,sign:false},{name:7,sign:false}],
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    doTask(task){
      if(task.objType==9){
        this.shareVisible=!this.shareVisible;
      }else{
        this.$router.push(task.webTarget);
      }
    },
    getPercent(task){
      return (task.completionsNumber/task.frequency)*100;
    },
    getType(task){
      if(task.frequency==null){
        return 2;
      }else if(task.frequency==1){
        return 1;
      }else if(task.frequency>1){
        return 3
      }
    },

     showTips(text1, text2) {
      var dom= document.getElementById("beans-message");
      if(dom){
        return;
      }
  let newElement = $(
    `<div id="beans-message" style="padding: 25px 77px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);background-color:rgba(27,27,27,0.8);color: #fff;border-radius:8px;text-align: center;">
      <p style="font-size: 16px;margin-bottom: 5px;">${text1}</p>
      <p>${text2}</p>
    </div>`
  )
  $('#app').append(newElement)
  setTimeout(() => {
    $("#beans-message").fadeTo("slow", 0.01, function () {
      $(this).remove()
    })
  }, 2000);
},

    signAction(){
      if(this.signModel.hasSign){
        this.showTips('今日已签到','明天继续领青豆哦');
      }else {
        api.beanSignIn(this.params).then(res => {
          this.signTips="已签到";
          this.signModel.signDay+=1;
          this.signModel.hasSign=true;
          this.signModel.totalBean+=res.data;
          this.changeSignDay(this.signModel.signDay);
        })
      }
    },
    // 发布按钮
    publish() {
      this.$router.push(
        this.$store.state.userInfo.accountId ? "/yivideo/publish" : "/login"
      );
    },
    getTasks(){
      api.getBeanTaskList(this.params).then(res => {
        //  objType 11为分享 web端不显示分享任务
        this.listTask=res.data.dtos.filter(item => item.objType!=11) ;
        this.signModel.signDay=res.data.cumulativeSignNum;
        this.signModel.hasSign=res.data.ifFinish;
        this.signModel.totalBean=res.data.totalBean;
        if(res.data.ifFinish){
          this.signTips="已签到";
        }
        this.changeSignDay(this.signModel.signDay);
      })
    },
    changeSignDay(totalDay){
      this.listDay.forEach(function (day) {
        if(totalDay+1>day.name){
          day.sign=true;
        }
      })
    },
  // 复制链接
  copyText() {
    var id=this.$store.state.userInfo.accountId;
    let text = location.href.replace(this.$route.path,'')+ '/register?id=' + id

    var textarea = document.createElement('textarea') //创建input对象
    var currentFocus = document.activeElement //当前获得焦点的元素
    var toolBoxwrap = this.$refs.NewsToolBox //将文本框插入到NewsToolBox这个之后
    toolBoxwrap.appendChild(textarea) //添加元素
    textarea.value = text
    textarea.focus()
    if (textarea.setSelectionRange) {
      textarea.setSelectionRange(0, textarea.value.length) //获取光标起始位置到结束位置
    } else {
      textarea.select()
    }
    try {
      var flag = document.execCommand('copy') //执行复制
    } catch (eo) {
      var flag = false
    }
    toolBoxwrap.removeChild(textarea) //删除元素
    currentFocus.focus()
    return flag ? this.$message.success('链接复制成功') : this.$message.warning('链接复制失败')
  },
  // 微信分享
  wxShare() {
    var id=this.$store.state.userInfo.accountId;
    var wxShareLink = process.env.VUE_APP_M_URL+ 'share/userRegistration?id=' + id
    var canvas = document.querySelector('canvas')
    QRCode.toCanvas(canvas, wxShareLink, error => {
      if (error) console.error(error)
    })
  },

  }

};
</script>
<style lang="less" scoped>
.getBeans {
  width: 1100px;
  margin: 21px 0;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 22px 230px ;
  .top{
    padding-top: 20px;
    padding-bottom: 30px;
    background: linear-gradient(90deg, #FF9352, #F33535);
    text-align: center;
    p{
      color: #FFFFFF;
      font-size: 34px;
    }
    span{
      color: #FFFFFF;
      font-size: 12px;
    }
  }
  .bottom{
    padding-bottom: 16px;
    margin-bottom: 22px;
    margin-top: -10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: #FFFFFF;
      .tips{
        padding-top: 20px;
        margin-left: 20px;
        margin-right: 10px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        span{
           text-align: center;
          height: 34px;
          line-height: 34px;

        }
        .topSpan{
          font-weight: 600;
          font-size: 16px;
        }
        .sign{
          cursor: pointer;
          width: 66px;
          height: 34px;
          color: #FFFFFF;
          font-size: 14px;
          font-weight: bold;
          background-position: center center;
          background-repeat: no-repeat;
          background-image: url("~@/assets/images/btn_sign.png");
        }
      }
    .list{
      display: flex;justify-content: space-between;
      margin-left: 76px;
      margin-right: 76px;
      .item{
        .topDay{
          padding: 7px;
          font-size: 11px;
          font-weight: bold;
          color: #FFFFFF;
          background-color: #FFE596;
          border-radius: 90px;
        }
        .activeTopDay{
          padding: 7px;
          font-size: 11px;
          font-weight: bold;
          color: #FFFFFF;
          background-color: #FD9A16;
          border-radius: 90px;
        }
        .bottomDay{
          text-align: center;
        }
      }
    }
  }
  .listWrapper{
    margin-left: 21px;
    span{
      color: #333333;
      font-size: 16px;
      font-weight: 600;
    }
    .listTask{
      margin-top: 20px;
      display: flex;
      img{
        width: 34px;
        height: 34px;
        border-radius: 90px;
        margin-right: 10px;
      }
      .listRight{
        width: 100%;
        .right{
          justify-content: space-between; /* 横向中间自动空间 */
          align-content: space-between;  /* 竖向中间自动空间 */
          display: flex;
          margin-bottom: 15px;
          .midItem{
            .item1{
              font-size: 15px;
              font-weight: 600;
              color: #333333;
              margin-bottom: 4px;
            }
            .item2{
              margin-bottom: 8px;
              font-size: 13px;
              color: #4A4A4A;
              display: flex;
              height: 14px;
              line-height: 14px;
              .item2Content{
                color: #666666;
                font-size: 13px;
              }
              .progress{
                display: flex;
                margin-left: 8px;
                .topP{
                  width: 100px;
                  margin: auto;
                }
              }
            }
            .item3{
              color: #999999;
              font-size: 13px;
            }
          }
          .rightItem{
            color: #F33535;
            font-size: 13px;
            background-color:#F2F3F4 ;
            border-radius: 15px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
            padding-left: 10px;
            padding-right: 10px;
          }
          .finish{
            color: #666666;
          }
        }
        .separator{
          height: 1px;
          background-color: #DDDDDD;
        }
      }

    }
    .bottomApp{
      margin-top: 50px;
      text-align: center;
      .appTips{
        font-size: 16px;
        font-weight: bold;
        color: #333333;
      }
      .app-images {
        margin-bottom: 22px;
        width: 100px;
        height: 100px;
        background-color: #fff;
        box-shadow: 0px 0px 10px 0px rgba(166, 171, 167, 0.35);
      }
    }


  }
}
</style>
