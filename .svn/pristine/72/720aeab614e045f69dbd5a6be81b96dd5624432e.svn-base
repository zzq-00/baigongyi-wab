<template>
  <div class='group'>
    <template v-if="leaderCanSee">
      <div class="group_title">
        <el-main class="clearfix" style="height: 100%;">
          <div class="group_summary fl">
            <h3>{{groupDetail.name}}</h3>
            <div class="clearfix">
              <groupHeaderImg class="fl" :groupData="groupDetail" />
              <p class="fl">{{groupDetail.description}}</p>
            </div>
          </div>
          <div class="group_info fl">
            <ul>
              <li class="clearfix">
                <span class="fl">圈主</span>
                <router-link :to="'/myHome/myReply?id='+groupDetail.leaderId" target="_blank">
                  <span class="fl ellipsis" style="color: #913E01;width: 210px;">：{{groupDetail.leaderName}}</span>
                </router-link>
              </li>
              <li class="clearfix">
                <span class="fl">创建时间</span>
                <span class="fl">：{{groupDetail.createTime | formatDate('noTime')}}</span>
              </li>
              <li class="clearfix">
                <span class="fl">成员</span>
                <span class="fl">：{{groupDetail.memberCount | formatNumbers}}</span>
              </li>
            </ul>
            <div class="group_operate" id="NewsToolBox" v-if="!groupDetail.shield">
              <span class="operate_btn" v-if="groupDetail.join === '1'" @click="delApplyInfo(groupDetail)">取消申请</span>
              <span class="operate_btn" v-else-if="(groupDetail.join === '3'||groupDetail.join === '5'||groupDetail.join === '10') && !groupDetail.leader" @click="delMember">退出圈子</span>
              <template v-else-if="groupDetail.join!=='3'&&groupDetail.join!=='5'&&groupDetail.join!=='10'">
                <span class="operate_btn danger" v-if="groupDetail.type === 2" @click="applyToJoin(groupDetail)">申请加入</span>
                <span class="operate_btn danger" v-if="groupDetail.type === 1" @click="applyToJoin(groupDetail)">加入</span>
              </template>

              <el-popover placement="bottom" trigger="click" @show="wxShare" width="150">
                <ul class="share-list">
                  <li @click="copyText" style="font-size: 12px;border-bottom: 1px solid #DDDDDD;padding: 9px;">
                    <img src="@/assets/images/lianjie.png" alt="">
                    <span style="vertical-align: middle;margin-left: 8px;cursor: pointer;">复制链接</span>
                  </li>
                  <li style="font-size: 12px;line-height: 30px;padding: 0 9px 9px;">
                    <img src="@/assets/images/weixin.png" alt="">
                    <span style="vertical-align: middle;margin-left: 8px;">微信扫一扫</span>
                    <div style="text-align: center;">
                      <img :src="erCode" alt="" width="74px" height="74px">
                    </div>
                  </li>
                </ul>
                <span class="operate_btn" style="margin-left: 10px;" slot="reference">分享</span>
              </el-popover>
            </div>
          </div>
        </el-main>
      </div>
      <el-main>
        <router-view :groupDetail="groupDetail" />
      </el-main>
    </template>
    <p v-else style="font-size: 20px;text-align: center;margin-top: 50px;">该圈子已被屏蔽</p>
  </div>
</template>

<script>
import api from '@/fetch'
import QRCode from 'qrcode'
import groupHeaderImg from '../components/groupHeaderImg'

export default {
  components: {
    groupHeaderImg
  },
  data() {
    return {
      groupId: this.$route.params.id,
      groupDetail: {},
      erCode: ''
    }
  },
  computed: {
    leaderCanSee() {
      if (this.groupDetail.shield) return this.groupDetail.leader
      return true
    }
  },
  methods: {
    getGroupDetail() {
      api.getGroupDetail(this.groupId).then(res => {
        this.groupDetail = res.data
        this.groupDetail.shield && this.$message.warning('该圈子已被屏蔽')
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
            if (item.type === 1) return (item.join = '3')
            item.join = '1'
            this.$message.success('申请成功，请等待圈主审核')
          })
      } catch (error) {
        console.log(error)
      }
    },
    // 撤销申请
    delApplyInfo(item) {
      api.delApplyInfo(item.id).then(res => (item.join = '-1'))
    },
    // 删除成员/退出圈子
    delMember() {
      this.$confirm('是否退出当前圈子？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api.delMember({ groupId: this.groupId, memberId: this.$store.state.userInfo.accountId }).then(res => {
            this.getGroupDetail()
          })
        })
        .catch(() => {})
    },
    // 复制链接
    copyText() {
      let text = window.location.href
      var textarea = document.createElement('textarea') //创建input对象
      var currentFocus = document.activeElement //当前获得焦点的元素
      var toolBoxwrap = document.getElementById('NewsToolBox') //将文本框插入到NewsToolBox这个之后
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
      var weixinShareLink
      let id = this.$route.params.id
      weixinShareLink = process.env.VUE_APP_M_URL + 'share/circle?id=' + id
      QRCode.toDataURL(weixinShareLink)
        .then(url => (this.erCode = url))
        .catch(err => console.error(err))
    }
  },
  mounted() {
    this.getGroupDetail()
  }
}
</script>

<style lang="less" scoped>
.group_title {
  height: 160px;
  background: linear-gradient(270deg, rgba(249, 208, 65, 1), rgba(226, 55, 50, 1));
  .group_summary {
    color: #fff;
    > h3 {
      font-size: 22px;
      padding: 20px 0 10px;
    }
    > .clearfix {
      > p {
        font-size: 13px;
        width: 705px;
        margin-left: 10px;
        margin-right: 15px;
        line-height: 20px;
        word-break: break-word;
      }
    }
  }
  .group_info {
    border-left: 1px solid #e08d2f;
    margin-top: 60px;
    padding-left: 20px;
    position: relative;
    width: 300px;
    box-sizing: border-box;
    > ul {
      > li {
        color: #333;
        margin-bottom: 5px;
        > span:first-child {
          width: 62px;
          text-align-last: justify;
        }
      }
    }
    .group_operate {
      cursor: pointer;
      position: absolute;
      right: 0;
      bottom: 0;
      .operate_btn {
        padding: 3px 8px;
        border: 1px solid #e08d2f;
        border-radius: 5px;
        & + a {
          margin-left: 10px;
        }
        &.danger {
          color: #fff;
          background-color: #f33535;
          border-color: #f33535;
        }
      }
    }
  }
}
</style>
