<!--关注的人-->
<template>
  <div class="scroll-wrap">
    <ul v-scroll="getMore" :scroll-disabled="disabled">
      <li class="list" v-for="(item, index) in attentionData" :key='index'>
        <div class="photo">
          <img @click="openUserCenter(item.accountId)" :src="item.avatar?$store.state.imageDomain + item.avatar : require('@/assets/images/err-header-icon01.png')" class="img" />
        </div>
        <div class="info">
          <div>
            <div class="user-name">
              <span class="font-16 font-bold" style="cursor: pointer;" @click="openUserCenter(item.accountId)">{{item.nickName}}</span>
              <el-tooltip effect="dark" content="显示讲师信息" placement="top">
                <el-button class="hintMess" @click="openURL('/teacherHome/'+ item.accountId)" v-if="item.wasTeacher">讲师</el-button>
              </el-tooltip>
            </div>
            <p class="tag" v-show="item.position">
              <span>{{item.position}} </span>
              <span v-show="item.company"> | {{item.company}}</span>
            </p>
            <div class="describe" v-show="item.introduction">{{item.introduction}}</div>
            <div class="tag">
              <i>{{item.answerCount }} 回答</i> <i>{{item.articleCount }} 文章</i> <i>{{item.followersCount }} 关注者</i>
            </div>
          </div>
          <div class="button" v-if="item.accountId !== $store.state.userInfo.accountId">
            <el-button @click="addAttention(item)" type="danger" v-if="item.concernSelfStatus===2">关注</el-button>
            <el-button @click="delAttention(item)" v-else>{{item.concernSelfStatus===1?'已关注':'互相关注'}}</el-button>
          </div>
        </div>
      </li>
    </ul>
    <p v-if="loading" class="nomore-data">加载中...</p>
    <div v-if="!attentionData.length" class="no-data">
      <img src="@/assets/images/No-other.png" alt="">
      <p>暂无{{nowIndex}}</p>
    </div>
    <p v-else-if="noMore" class="nomore-data">没有更多了</p>
  </div>
</template>

<script>
import api from '@/fetch'
export default {
  name: 'Attention',
  props: {
    attentionData: Array,
    noMore: Boolean,
    loading: Boolean,
    nowIndex: String
  },
  computed: {
    disabled() {
      return this.loading || this.noMore
    }
  },
  watch: {
    attentionData: {
      handler(val, oldVal) {
        val.map(item => {
          if (item.introduction) {
            if (this.$route.query.id && item.introduction.length > 80) {
              item.introduction = item.introduction.slice(0, 77) + '...'
            } else if (!this.$route.query.id && item.introduction.length > 56) {
              item.introduction = item.introduction.slice(0, 54) + '...'
            }
          }
        })
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      attentionType: '' // 关注状态
    }
  },
  methods: {
    getMore() {
      this.$emit('getMore')
    },
    // 添加关注
    addAttention(item) {
      api.addAttention({ objId: item.accountId, objType: 6 }).then(res => {
        item.concernSelfStatus = res.data
      })
    },
    // 删除关注
    delAttention(item) {
      api.delAttention({ objId: item.accountId, objType: 6 }).then(res => {
        item.concernSelfStatus = 2
      })
    },
    openURL(url) {
      window.open(url)
    }
  },
  created() {
    this.getMore()
  }
}
</script>

<style lang="less" scoped>
.scroll-wrap {
  overflow: hidden;
  .list {
    position: relative;
    margin: 10px 0;
    box-sizing: border-box;
    display: flex;
    .photo {
      padding-left: 29px;
      padding-right: 11px;
      .img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
    .info {
      flex: 1;
      padding: 10px 29px 10px 0;
      display: flex;
      border-bottom: 1px solid #dddddd;
      min-height: 80px;
      box-sizing: border-box;
      > div:first-child {
        flex: 1;
        .user-name {
          margin-bottom: 8px;
          .hintMess {
            color: #cb860f;
            font-size: 12px;
            padding: 5px 10px;
            margin-left: 10px;
            background-color: #faf3e7;
            border: none;
            transform: translateY(-3px);
          }
        }
        .describe {
          max-height: 38px;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // display: -webkit-box;
          // -webkit-line-clamp: 2;
          // -webkit-box-orient: vertical;
          margin: 13px 0;
          word-break: break-all;
        }
        .tag {
          font-size: 12px;
          color: #999;
          i + i {
            margin-left: 10px;
          }
        }
        .describe {
          color: #666;
        }
      }
    }
  }
}
.nomore-data {
  text-align: center;
  margin: 20px 0 10px;
  color: #999;
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
em,
i,
s {
  font-style: normal;
  text-decoration: none;
}
</style>
