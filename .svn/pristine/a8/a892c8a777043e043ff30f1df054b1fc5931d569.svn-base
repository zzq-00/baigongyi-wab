<template>
  <div class="information">
    <ul class="left-content">
      <li @click="tabChange(item)" :class="{active: activeTab===item.name}" v-for="(item, index) in tabItem" :key="index">
        {{item.name}}{{item.unreadCount>0?'（'+item.unreadCount+'）':''}}
      </li>
    </ul>
    <div class="right-content">
      <div class="information-title">
        <p class="font-16">{{activeTab}}</p>
      </div>
      <div class="scroll-wrap" :key="updateKey">
        <ul class="information-content" v-scroll="innerMsgList" :scroll-disabled="disabled">
          <li v-for="(item, index) in infoList" :key="index">
            <p>{{item.messageTextDto.messageText}}</p>
            <p class="gray">{{item.createTime | formatDate}}</p>
            <p>
              <span class="red" v-if="item.wasSkip" @click="viewInfo(item)">查看</span>
              <span class="red" @click="delInfo(item)">删除</span>
            </p>
          </li>
        </ul>
        <p v-if="loading" class="nomore-data">加载中...</p>
        <div v-else-if="!infoList.length" class="no-data">
          <img src="@/assets/images/No-other.png" alt="">
          <p>暂无消息</p>
        </div>
        <p v-else-if="noMore" class="nomore-data">没有更多了</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      params: {
        pageNum: 1,
        pageSize: 20
      },
      totalNums: 1,
      infoList: [],
      loading: false,
      updateKey: 1,
      linkArr: [
        { type: 1, name: '课程', url: '/courseDetail/', requestDetail: 'getCourseDetail', requireId: true },
        { type: 2, name: '专栏', url: '/columnDetail/', requestDetail: 'getColumnDetail', requireId: true },
        { type: 3, name: '文章', url: '' },
        { type: 4, name: '问答', url: '/questionsDetails/', requestDetail: 'questionDetails', requireId: true },
        { type: 5, name: '直播', url: '' },
        { type: 6, name: '用户', url: '/myHome/myReply?id=', requireId: true },
        { type: 7, name: '热点资讯', url: '' },
        { type: 8, name: '讲师', url: '' },
        { type: 9, name: '回答', url: '/myReplyDetails/', requestDetail: 'answerDetails', requireId: true },
        { type: 10, name: '想法', url: '' },
        { type: 11, name: '充值', url: '' },
        { type: 12, name: '提现', url: '/withdrawDeatils/', requireId: true },
        { type: 13, name: '专栏课程', url: '/myLecture/courseMessage/', requestDetail: 'getColumnDetail', requireId: true },
        { type: 14, name: '专栏列表', url: '/myLecture?activeIndex=1' },
        { type: 15, name: '课程列表', url: '/myLecture?activeIndex=0' },
        { type: 16, name: '圈子想法', url: '' },
        { type: 17, name: '圈子主页', url: '/engineering/groupHome/', requestDetail: 'getGroupDetail', requireId: true },
        { type: 18, name: '加入申请', url: '/engineering/myGroup/applyJoin' },
        { type: 19, name: '圈子申请', url: '/engineering/myGroup/applyGroup' },
        { type: 20, name: '屏蔽圈子', url: '' }
      ]
    }
  },
  computed: {
    ...mapState({
      tabItem: 'informationCount'
    }),
    activeTab: function() {
      return this.$route.query.activeTab || '业务消息'
    },
    disabled() {
      return this.loading || this.noMore
    },
    noMore() {
      return this.infoList.length >= this.totalNums
    }
  },
  methods: {
    tabChange(item) {
      this.totalNums = 1
      this.params.pageNum = 1
      this.infoList = []
      this.$router.replace('/information?activeTab=' + item.name)
      this.innerMsgList()
    },
    innerMsgList() {
      // 1业务类型 2系统类型
      let type = this.activeTab === '业务消息' ? 1 : 2
      this.loading = true
      api.innerMsgList(type, this.params).then(res => {
        this.loading = false
        this.totalNums = res.data.total
        this.infoList = [...this.infoList, ...res.data.records]
        !this.noMore && this.params.pageNum++
      })
    },
    async viewInfo(item) {
      let type = item.messageTextDto.objType
      let matchItem = this.linkArr.find(item => item.type === type)
      try {
        let id = matchItem.requireId ? item.messageTextDto.objId : ''
        // 有些链接跳转之前需要获取该信息所涉及内容的最新状态
        // 如果接口返回404，需要catch error提示
        if (matchItem.requestDetail) {
          let { data } = await api[matchItem.requestDetail](id)

          if (matchItem.requestDetail === 'getGroupDetail') {
            // data为null说明圈子已解散，data.shield说明圈子已屏蔽
            if (!data) throw { msg: '该圈子已解散' }
            if (data.shield) throw { msg: '该圈子已被屏蔽' }
          } else if (data.status && data.status != 1002) {
            // 1002专栏或课程已发布
            throw { code: 4040 }
          }
        }
        window.open(matchItem.url + id)
      } catch (error) {
        if (error.code) {
          this.$message.error('该' + matchItem.name + (error.code === 404 ? '已删除' : '已下架'))
        } else if (error.msg) {
          this.$message.error(error.msg)
        }
      }
    },
    // 删除消息
    delInfo(item) {
      this.$confirm('是否删除当前消息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api.innerMsgDelete(item.id).then(res => {
            let index = this.infoList.findIndex(element => element.id === item.id)
            this.infoList.splice(index, 1)
            this.totalNums -= 1
            this.updateKey++
            if (!this.infoList.length) {
              this.params.pageNum = 1
              this.innerMsgList()
            }
          })
        })
        .catch(() => {})
    }
  },
  created() {
    this.innerMsgList()
  }
}
</script>

<style lang="less" scoped>
.information {
  margin-top: 20px;
  min-height: calc(100vh - 160px);
  .left-content {
    width: 140px;
    position: fixed;
    top: 120px;
    > li {
      cursor: pointer;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #fff;
      border-radius: 6px;
      margin-bottom: 6px;
      &.active {
        background-color: #e23732;
        color: #fff;
      }
    }
  }
  .right-content {
    margin-left: 160px;
    border-radius: 10px;
    background-color: #fff;
    .information-title {
      height: 50px;
      padding: 0 20px;
      border-bottom: 1px solid #dddddd;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .information-content {
      padding-left: 40px;
      > li {
        display: flex;
        align-items: center;
        line-height: 20px;
        border-bottom: 1px solid #eeeeee;
        padding: 11px 0;
        padding-right: 10px;
        > p {
          &:first-child {
            flex: 1;
            margin-right: 50px;
            word-break: break-word;
          }
          &:last-child {
            flex: 0 0 140px;
            text-align: right;
            > span {
              margin: 0 10px;
              position: relative;
              cursor: pointer;
              & + span {
                &::before {
                  content: '';
                  width: 1px;
                  height: 12px;
                  background-color: #999;
                  position: absolute;
                  top: 50%;
                  left: -10px;
                  transform: translateY(-50%);
                }
              }
            }
          }
        }
      }
    }
  }
}
.no-data {
  text-align: center;
  padding: 20px 0;
  background-color: #fff;
  p {
    height: 14px;
    line-height: 14px;
    font-size: 15px;
    color: rgba(188, 188, 196, 1);
    text-align: center;
  }
}
.nomore-data {
  text-align: center;
  margin: 10px 0;
  color: #999;
}
</style>
