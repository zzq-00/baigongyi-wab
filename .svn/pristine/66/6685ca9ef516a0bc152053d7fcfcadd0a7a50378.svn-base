<template>
  <div class="nav-list">
    <div class="nav-main" @mouseleave="activeIndex=0">
      <ul class="one-menu">
        <li class="one-menu-li" :class="[activeIndex==index?'active-color':'']" @mouseenter="activeIndex=index" v-for="(item,index) in navList" :key="index" @click="activeIndex=index">
          <router-link :to="item.links">{{item.name}}</router-link>
          <span class="img-triangle" v-if="index==4"></span>
          <!-- (nowHover==3||activeIndex==3)&& -->
          <ul class="child-box" v-if="activeIndex==4&&item.childMenu" @mouseleave="activeIndex=0">
            <li v-for="(i,is) in item.childMenu" :key="is">
              <span @click="goto(i.tagName)">{{i.tagName}}</span>
              <!-- <router-link :to="i.childLinks"></router-link> -->
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
    tasList: Array
  },
  data() {
    return {
      newtasList: [],
      activeIndex: 0,
      nowHover: 0,
      navList: [
        { name: '首页', links: '/' },
        { name: '讲堂', links: '/lectureRoom' },
        { name: '直播', links: '/livetv' },
        { name: '驿视频', links: '/yivideo/recommend' },
        {
          name: '百工社区',
          links: '/',
          childMenu: []
        },
        { name: '热点资讯', links: '/hotmessage' },
        { name: '工程圈', links: '/engineering' },
        { name: '文章', links: '/article/list' },
        { name: '问答', links: '/questions' }
      ]
    }
  },
  watch: {
    tasList: {
      handler(val, oldVal) {
        if (val) {
          this.newtasList = val
          this.navList[4].childMenu = this.newtasList.filter(item => !item.parentId)
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
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.nav-list {
  height: 47px;
  line-height: 47px;
  background: rgba(228, 61, 48, 1);
  .nav-main {
    width: 1100px;
    margin: 0 auto;
    .one-menu {
      .one-menu-li {
        padding: 0 13px;
        display: inline-block;
        font-size: 16px;
        color: rgba(255, 255, 255, 1);
        height: 100%;
        position: relative;
        > a:hover {
          color: #fff;
        }
        .img-triangle {
          margin-left: 9px;
          display: inline-block;
          width: 8px;
          height: 4px;
          background: url('../assets/images/up.png');
          background-size: cover;
          transition: all 0.4s;
          vertical-align: middle;
          cursor: pointer;
        }
        .child-box {
          position: absolute;
          left: -10px;
          z-index: 3;
          width: 194px;
          height: 134px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 10px 0px rgba(166, 171, 167, 0.35);
          padding: 27px 33px;
          display: flex;
          flex-wrap: wrap;
          li {
            margin-bottom: 15px;
            height: 15px;
            line-height: 15px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            > span:hover {
              cursor: pointer;
              color: rgba(228, 61, 48, 1);
            }
          }
          li:nth-child(1),
          li:nth-child(3),
          li:nth-child(5),
          li:nth-child(7),
          li:nth-child(9) {
            width: 67px;
            margin-right: 59px;
          }
        }
      }
      .one-menu-li:hover {
        background-color: #ff584b;
        .img-triangle {
          transform: rotate(-180deg);
          background-size: cover;
        }
      }
      .active-color {
        font-weight: bold;
        background-color: #ff584b;
      }
    }
  }
}
</style>
