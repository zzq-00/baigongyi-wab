<template>
  <div class='community'>
    <div class='communityNav'>
      <img :src='navData.icon && this.$store.state.imageDomain+navData.icon'>
      <div>
        <h4>{{navData.tagName}}</h4>
        <p>{{navData.description}}</p>
      </div>
    </div>
    <div class='communityMain'>
      <div class="left-content fl" id="NewsToolBox">
        <ul class="top-tab clearfix">
          <li class="fl" v-for='(item,index) in navList' :key='index' :class="{'active': currtentIndex == index}" @click="tabChange(index)">{{item}}</li>
        </ul>
        <articleText v-if='currtentIndex===0'></articleText>
        <curriculum v-if='currtentIndex===1'></curriculum>
        <specialColumn v-if='currtentIndex===2'></specialColumn>
        <questionsAndAnswers v-if='currtentIndex===3'></questionsAndAnswers>
      </div>
      <div class="right-content fr" ref="right-fixed">
        <recommendColumn />
        <recommendCourse />
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/fetch'
import articleText from './article.vue' //文章
import curriculum from './curriculum' //课程
import specialColumn from './specialColumn' //专栏
import questionsAndAnswers from './questionsAndAnswers' //问答
import recommendColumn from '@/components/recommendColumn'
import recommendCourse from '@/components/recommendCourse'
import { ceiling } from '@/assets/js/utils.js'

export default {
  components: {
    articleText,
    curriculum,
    specialColumn,
    questionsAndAnswers,
    recommendColumn,
    recommendCourse
  },
  data() {
    return {
      navList: ['文章', '课程', '专栏', '问答'],
      currtentIndex: 0,
      navData: {},
      imgUrl: '',
      aliUrl: {}
    }
  },
  watch: {
    $route(to, from) {
      this.getDetailsFn(this.$route.query.id)
    }
  },
  mounted() {
    this.getDetailsFn(this.$route.query.id)
    let wrap = this.$refs['right-fixed']
    ceiling(wrap)
  },
  methods: {
    //获取后台图片路径
    getDetailsFn(id = "ebbe50e030b34863af4b08562f8592bd") {
      api.tagId(id).then(res => {
        this.navData = res.data
      })
    },
    tabChange(index) {
      this.currtentIndex = index
    }
  }
}
</script>
<style lang="less" scoped>
.community {
  width: 100%;
  height: 100%;
}

.communityNav {
  width: 100%;
  height: 100px;
  background: #fff;
  margin: 20px 0;
  padding: 20px 20px 0;
  border-radius: 10px;
  position: relative;
  box-sizing: border-box;
  > img {
    position: absolute;
    width: 60px;
    height: 60px;
    left: 20px;
    top: 20px;
    border-radius: 5px;
  }
  > div {
    padding-left: 70px;
    box-sizing: border-box;
    > h4 {
      font-size: 18px;
      color: #4a4a4a;
      padding-top: 8px;
    }
    > p {
      color: #999999;
      padding-top: 16px;
    }
  }
}

.communityMain {
  overflow: hidden;
  .left-content {
    width: 780px;
    background-color: #fff;
    border-radius: 10px;
    min-height: 700px;
    .top-tab {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ddd;
      padding-left: 5px;
      font-size: 16px;
      color: #999;
      > li {
        cursor: pointer;
        padding: 0 16px;
        position: relative;
        &.active {
          color: #4a4a4a;
          &::after {
            content: '';
            display: block;
            width: 20px;
            height: 3px;
            background-color: #e23732;
            position: absolute;
            bottom: 1px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
    .scroll-wrap {
      .article-list {
        padding: 5px 92px 5px 20px;
      }
    }
  }
}

.right-content {
  width: 300px;
  &[data-fixed='fixed'] {
    position: fixed;
    top: 120px;
    margin-left: 800px;
  }
  > div + div {
    margin-top: 20px;
  }
}
</style>

