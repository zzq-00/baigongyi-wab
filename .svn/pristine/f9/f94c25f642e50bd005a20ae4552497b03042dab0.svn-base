<!-- 百工社区 -->
<template>
  <div class="index-bgcommunity">
    <div class="bgcommunity-title">
      <span class="bgcommunity-color">百工社区</span>
    </div>
    <div class="bgcommunity-img-list clearfix">
      <div class="img-box fl" @click="goto('咨询/管理')">
        <p class="titles">咨询/管理</p>
        <p class="describe">与梦想对接，原来您可以更优秀</p>
      </div>
      <div class="img-box fl" @click="goto('工程施工')">
        <p class="titles">工程施工</p>
        <p class="describe">特别的工程，<br>只为特别的你</p>
      </div>
      <div class="img-box fl">
        <div @click="goto('机电设备')">
          <p class="titles">机电设备</p>
          <p class="describe">精工铸造品质，创新成就未来</p>
        </div>
        <div @click="goto('科技前沿')">
          <p class="titles">科技前沿</p>
          <p class="describe">科技改变世界，创新引领潮流</p>
        </div>
      </div>
      <div class="img-box fl" @click="goto('地产开发')">
        <p class="titles">地产开发</p>
        <p class="describe">居住，<br>与城市同步</p>
      </div>
    </div>
    <div class="bgcommunity-classification">
      <ul class="classification-list">
        <li class="classification-list-li" v-for="(i,index) in communityClassification" :key="index">
          <p class="classification-name clearfix">
            <span class="fl" @click="goto(i.name)">{{i.name}}</span>
            <span class="fl">{{i.describe}}</span>
          </p>
          <img :src="i.coverImg" alt="" srcset="">
          <ul class="classification-article-list fr">
            <li v-for="(item,index) in i.obj" :key="index">
              <span></span>
              <span>[{{item.titleTypeName}}]</span>
              <span @click="gotoDetails(item)" v-if="item.titleType==2||item.titleType==3">{{item.name}}</span>
              <span @click="gotoDetails(item)" v-if="item.titleType==1||item.titleType==4">{{item.title}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  components: {},
  props: {
    bgyCommunityObj: Object,
    tasList: Array
  },
  data() {
    return {
      communityClassification: [],
      newtasList: []
    }
  },
  watch: {
    bgyCommunityObj: {
      //深度监听，可监听到对象、数组的变化
      handler(newVal, old) {
        // 文章titleType1，专栏titleType2，课程titleType3，问答titleType4
        let arrs
        let obj
        if (newVal.hangye) {
          arrs = []
          obj = JSON.parse(JSON.stringify(newVal.hangye))
          // 课程
          if (obj.courses.length > 0) {
            this.$set(obj.courses[0], 'titleType', 3)
            this.$set(obj.courses[0], 'titleTypeName', '课程')
            arrs.push(obj.courses[0])
          }
          // 专栏
          if (obj.column.length > 0) {
            this.$set(obj.column[0], 'titleType', 2)
            this.$set(obj.column[0], 'titleTypeName', '专栏')
            arrs.push(obj.column[0])
          }
          // 文章
          if (obj.article.length > 0) {
            this.$set(obj.article[0], 'titleType', 1)
            this.$set(obj.article[0], 'titleTypeName', '文章')
            arrs.push(obj.article[0])
          }
          // 问答
          if (obj.questions.length > 0) {
            this.$set(obj.questions[0], 'titleType', 4)
            this.$set(obj.questions[0], 'titleTypeName', '问答')
            arrs.push(obj.questions[0])
          }
          this.communityClassification.push({
            name: '行业综合',
            describe: '一站式捕捉最新工程视角',
            coverImg: require('@/assets/images/industry.png'),
            obj: arrs
          })
        }
        if (newVal.baigong) {
          arrs = []
          obj = JSON.parse(JSON.stringify(newVal.baigong))

          // 课程
          if (obj.courses.length > 0) {
            this.$set(obj.courses[0], 'titleType', 3)
            this.$set(obj.courses[0], 'titleTypeName', '课程')
            arrs.push(obj.courses[0])
          }
          // 专栏
          if (obj.column.length > 0) {
            this.$set(obj.column[0], 'titleType', 2)
            this.$set(obj.column[0], 'titleTypeName', '专栏')
            arrs.push(obj.column[0])
          }
          // 文章
          if (obj.article.length > 0) {
            this.$set(obj.article[0], 'titleType', 1)
            this.$set(obj.article[0], 'titleTypeName', '文章')
            arrs.push(obj.article[0])
          }
          // 问答
          if (obj.questions.length > 0) {
            this.$set(obj.questions[0], 'titleType', 4)
            this.$set(obj.questions[0], 'titleTypeName', '问答')
            arrs.push(obj.questions[0])
          }
          this.communityClassification.push({
            name: '百工博览',
            describe: '丰富文化内涵，成就梦想舞台',
            coverImg: require('@/assets/images/bgexpo.png'),
            obj: arrs
          })
        }
      },
      deep: true
      // immediate: true
    },
    tasList: {
      handler(val, oldVal) {
        if (val) {
          this.newtasList = val
        }
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    goto(val) {
      let same = this.newtasList.find(data => data.tagName == val)
      let routeUrl = this.$router.resolve({ path: `/community`, query: { id: same.id } })
      window.open(routeUrl.href, '_blank')
    },
    gotoDetails(item) {
      let paths
      switch (item.titleType) {
        case 1:
          paths = '/article/list'
          break
        case 2:
          paths = '/columnDetail'
          break
        case 3:
          paths = '/courseDetail'
          break
        case 4:
          paths = '/questionsDetails'
          break
        default:
          break
      }
      let routeUrl = this.$router.resolve({ path: `${paths}/${item.id}` })
      window.open(routeUrl.href, '_blank')
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.index-bgcommunity {
  margin-top: 46px;
  .bgcommunity-title {
    padding-bottom: 12px;
    border-bottom: 1px solid #f8e7e6;
    .bgcommunity-color {
      display: inline-block;
      height: 25px;
      line-height: 25px;
      font-size: 24px;
      font-weight: bold;
      color: rgba(228, 61, 48, 1);
      padding-top: 0;
      padding-bottom: 0;
      position: relative;
    }
    .bgcommunity-color::before {
      content: '';
      display: block;
      height: 3px;
      width: 100%;
      position: absolute;
      bottom: -13px;
      left: 0;
      background-color: rgba(228, 61, 48, 1);
    }
  }
  .bgcommunity-img-list {
    margin-top: 24px;
    .img-box {
      margin-right: 24px;
      .titles {
        height: 24px;
        line-height: 24px;
        font-size: 22px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        text-shadow: 0px 4px 12px rgba(0, 0, 0, 0.16);
      }
      .describe {
        font-size: 16px;
        color: rgba(255, 255, 255, 1);
        text-shadow: 0px 4px 12px rgba(0, 0, 0, 0.16);
      }
    }
    .img-box:nth-child(1) {
      width: 308px;
      height: 256px;
      background: url('../assets/images/Community1.png') no-repeat center center;
    }
    .img-box:nth-child(2) {
      width: 206px;
      height: 256px;
      background: url('../assets/images/Community2.png') no-repeat center center;
    }
    .img-box:nth-child(3) {
      width: 308px;
      div {
        height: 116px;
      }
      div:nth-child(1) {
        margin-bottom: 25px;
        background: url('../assets/images/Community3.png') no-repeat center center;
      }
      div:nth-child(2) {
        background: url('../assets/images/Community4.png') no-repeat center center;
      }
    }
    .img-box:nth-child(4) {
      width: 206px;
      height: 256px;
      margin-right: 0px;
      background: url('../assets/images/Community5.png') no-repeat center center;
    }
    .img-box:nth-child(1),
    .img-box:nth-child(2),
    .img-box:nth-child(4) {
      cursor: pointer;
      .titles {
        margin-top: 83px;
        text-align: center;
      }
      .describe {
        margin-top: 11px;
        text-align: center;
      }
    }
    .img-box:nth-child(3) {
      div {
        cursor: pointer;
      }
      .titles {
        padding: 44px 0 13px 21px;
        // text-align: center;
      }
      .describe {
        margin-left: 21px;
        line-height: 17px;
        // text-align: center;
      }
    }
  }
  .bgcommunity-classification {
    margin-top: 35px;
    .classification-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .classification-list-li {
        width: 538px;
        .classification-name {
          margin-bottom: 16px;
          span:nth-child(1) {
            height: 18px;
            line-height: 18px;
            font-size: 18px;
            font-weight: bold;
            color: rgba(38, 38, 38, 1);
            margin-right: 10px;
            cursor: pointer;
          }
          span:nth-child(2) {
            margin-top: 5px;
            height: 14px;
            font-size: 14px;
            color: rgba(140, 140, 140, 1);
            line-height: 14px;
            width: 278px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        img {
          width: 185px;
          height: 119px;
          border-radius: 8px;
        }
        .classification-article-list {
          margin-top: 2px;
          li {
            height: 15px;
            line-height: 15px;
            vertical-align: middle;
            margin-bottom: 17px;
            span {
              display: inline-block;
              font-size: 14px;
              vertical-align: middle;
            }
            span:nth-child(1) {
              width: 6px;
              height: 6px;
              background: rgba(228, 61, 48, 1);
              margin-right: 11px;
            }
            span:nth-child(2) {
              color: #e43d30;
              margin-right: 3px;
            }
            span:nth-child(3) {
              color: #262626;
              width: 278px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              cursor: pointer;
            }
            span:nth-child(3):hover {
              color: #e43d30;
            }
          }
          li:nth-child(4) {
            margin-bottom: 0;
          }
        }
      }
      .classification-list-li:nth-child(3),
      .classification-list-li:nth-child(4) {
        margin-top: 23px;
      }
    }
  }
}
</style>
