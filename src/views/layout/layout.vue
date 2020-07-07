<template>
  <el-container class='section'>
    <el-header height="100px">
      <div class="layoutHeader">
        <div class="header clearfix">
          <a href="/" class="fl"><img class="web-logo" src="@/assets/images/logo214-49.png" alt=""></a>
          <div class='search fl'>
            <div class='input'>
              <img src='@/assets/images/search-line.png' />
              <input type="text" ref="boxinput" @focus.stop="getHistory" v-model.trim="searchWord" placeholder="搜索你感兴趣的内容" @keyup.enter="searchFun" />
            </div>
            <button @click.stop="searchFun">搜索</button>
            <div class="search-history" v-show="searchDia" ref="hbox" @click.stop="blursureDia">
              <div class="history-box">
                <span>搜索历史</span>
                <span @click="empty">清空</span>
              </div>
              <ul class="history-list">
                <li v-for="(item,index) in searchHistory" :key="index">
                  <span @click.stop="selection(item,index)">{{item}}</span>
                  <div class="icon-box" @click.stop="deleteword(index)">
                    <img src="@/assets/images/close-icon.png" alt="" class="close-icons">
                    <img src="@/assets/images/closehover-icon.png" alt="" class="closehover-icons">
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="link fr">
            <div class='app fl'>
              <a href="javascript:;">百工驿App
                <img :src="$store.state.imageDomain + 'images/download/bgy_download.png'">
              </a>
            </div>
            <div class="info-center fl" v-if="$store.state.userInfo.accountId">
              <el-popover placement="top" width="150" trigger="click" popper-class="muens-ul">
                <ul class="menu-info">
                  <li v-for="(item, index) in tabItem" :key="index">
                    <a :href="`/information?activeTab=${item.name}`" target="_blank" rel="noopener noreferrer">{{item.name}}
                      <span class="counts" v-if="item.unreadCount>0">{{item.unreadCount>0?item.unreadCount:'' |  formatNumbers}}</span>
                    </a>
                  </li>
                </ul>
                <div slot="reference">
                  <el-badge :is-dot="hasUnreadCount">
                    消息中心
                  </el-badge>
                </div>
              </el-popover>
            </div>
            <!-- 已登录 -->
            <div class="user fl" v-if="$store.state.userInfo.accountId">
              <!-- 头像 -->
              <el-popover placement="top" width="150" trigger="click" popper-class="muens-ul">
                <ul class="menus">
                  <p style="border-bottom: 1px solid #eeeeee;">
                    <a href="/myHome/myReply" target="_blank" rel="noopener noreferrer">{{$store.state.userInfo.nickName}}</a>
                  </p>
                  <li>
                    <a href="/userCenter" target="_blank" rel="noopener noreferrer">我的主页</a>
                  </li>
                  <li>
                    <a href="/myWallet" target="_blank" rel="noopener noreferrer">我的钱包</a>
                  </li>
                  <li>
                    <a href="/personalData" target="_blank" rel="noopener noreferrer">账号管理</a>
                  </li>
                  <p style="border-top: 1px solid #eeeeee;" @click='onLogout'>退出登录</p>
                </ul>
                <div slot="reference" style="cursor: pointer;">
                  <img src="@/assets/images/user.png" alt="" width="18px" height="18px">
                  <span style="padding: 0 5px;">个人中心</span>
                  <img src='@/assets/images/pull.png'>
                </div>
              </el-popover>
            </div>
            <!-- 未登录 -->
            <div class="gologin" v-else>
              <router-link to="/login">登录</router-link>
              <router-link to="/register" class="red">免费注册</router-link>
            </div>
          </div>
        </div>
        <div class="nav fl" @mouseleave="current=0">
          <el-menu :default-active="defaultActive" active-text-color="#E23732" text-color="#4A4A4A" mode="horizontal" @select="handleSelect">
            <el-menu-item :index="item.links" v-for="(item,index) in navList" :key="index">
<<<<<<< .mine
              <span @mouseenter="current=index">{{item.name}}</span>
              <!-- <ul class="child-box" v-if="current==3&&item.childMenu" @mouseleave="current=0">
||||||| .r2657
              <span @mouseenter="current=index">{{item.name}}</span>
              <ul class="child-box" v-if="current==3&&item.childMenu" @mouseleave="current=0">
=======
              <span @mouseenter="current=index" style="height:100%;display:block">{{item.name}}</span>
              <ul class="child-box" v-if="current==4&&item.childMenu" @mouseleave="current=0">
>>>>>>> .r5728
                <li v-for="(i,is) in item.childMenu" :key="is">
                  <span @click="goto(i.id)">{{i.tagName}}</span>
                </li>
              </ul> -->
            </el-menu-item>
          </el-menu>
        </div>
        <div class="publish fr">
          <router-link :to="$store.state.userInfo.accountId?'/article/publishArticle':'/login'">
            发文章
          </router-link>
          <router-link :to="$store.state.userInfo.accountId?'/yivideo/publish':'/login'">
            发视频
          </router-link>
          <router-link :to="$store.state.userInfo.accountId?'/askingQuestions':'/login'">
            提问题
          </router-link>
          <a href="javascript:;" @click="editIdea">
            写想法
          </a>
        </div>
      </div>
    </el-header>
    <div style="height: 100px"></div>
    <router-view name="fullScreen" v-if="$route.path.indexOf('/engineering/groupHome') !== -1" />
    <el-main v-else>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import footerComponents from '@/components/footerComponents.vue'
import api from '@/fetch'
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    footerComponents
  },
  data () {
    return {
      current: 0,
      searchWord: null,
      flag: false,
      activeTag: null,
      user: {
        name: '', // 用户昵称
        photo: '' // 用户头像
      },
      nowHover: 0,
      navList: [
        { name: '首页', links: '/' },
        { name: '讲堂', links: '/lectureRoom' },
        { name: '直播', links: '/livetv' },
<<<<<<< .mine
        // {
        //   name: '百工社区',
        //   links: '/community',
        //   menu: true,
        //   childMenu: []
        // },
||||||| .r2657
        {
          name: '百工社区',
          links: '/community',
          menu: true,
          childMenu: []
        },
=======
        { name: '驿视频', links: '/yivideo/recommend' },
        {
          name: '百工社区',
          links: '/community',
          menu: true,
          childMenu: []
        },
>>>>>>> .r5728
        { name: '热点资讯', links: '/hotmessage' },
        { name: '学习圈', links: '/engineering' },
        { name: '文章', links: '/article/list' },
        { name: '问答', links: '/questions' }
      ],
      searchHistory: [],
      searchDia: false //搜索框
    }
  },
  computed: {
    ...mapState({
      hasUnreadCount (state) {
        return !!state.informationCount.filter(item => item.unreadCount > 0).length
      },
      tabItem: 'informationCount'
    }),
    defaultActive: function () {
      if (this.$route.fullPath.includes('livetv')) return '/livetv'
      if (this.$route.fullPath.includes('courseDetail')) return '/lectureRoom'
      if (this.$route.fullPath.includes('columnDetail')) return '/lectureRoom'
      if (this.$route.fullPath.includes('engineering')) return '/engineering'
      if (this.$route.fullPath.includes('yivideo')) return '/yivideo/recommend'
      return this.$route.path
    }
  },
<<<<<<< .mine
  mounted () {
||||||| .r2657
  mounted() {
=======
  watch: {
    searchHistory: {
      handler(val, oldval) {
        let arr = val.length > 5 ? val.slice(0, 5) : val
        window.localStorage.setItem('searchHistory', arr)
      }
    },
    '$route.query.searchWord': {
      handler: function(val, oldVal) {
        this.searchWord = val
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
>>>>>>> .r5728
    this.getTagsList()
    document.addEventListener('click', this.blursureDia)
  },
  // 清除click监听
  beforeDestroy() {
    document.removeEventListener('click', this.blursureDia)
  },
  methods: {
    ...mapMutations(['setIdeaDialog']),
    blursureDia(e) {
      if (!this.$refs.hbox.contains(e.target) && !this.$refs.boxinput.contains(e.target)) {
        /* 关闭元素 */
        this.searchDia = false
      }
    },
    // 清空历史记录
    empty() {
      this.searchHistory = []
    },
    // 选中历史关键词
    selection(item, index) {
      this.searchDia = false
      this.searchHistory.splice(index, 1)
      this.searchHistory.unshift(item)
      this.searchWord = item
      this.$router.push({ path: '/searchPage', query: { searchWord: this.searchWord } })
    },
    // 删除关键词
    deleteword(index) {
      this.searchHistory.splice(index, 1)
    },
    // 输入框获取焦点
    getHistory() {
      if (window.localStorage.searchHistory) {
        this.searchDia = true
        this.searchHistory = window.localStorage.searchHistory.split(',')
      }
    },
    // 搜索
    searchFun () {
      if (this.searchWord) {
        if (this.searchWord != this.searchHistory[0]) {
          if (this.searchHistory.indexOf(this.searchWord) != -1) {
            let sameIndex = this.searchHistory.findIndex(data => data == this.searchWord)
            this.searchHistory.splice(sameIndex, 1)
          }
          this.searchHistory.unshift(this.searchWord)
          this.searchHistory = this.searchHistory.length > 5 ? this.searchHistory.slice(0, 5) : this.searchHistory
          window.localStorage.setItem('searchHistory', this.searchHistory)
        }
        this.$router.push({ path: '/searchPage', query: { searchWord: this.searchWord } })
        this.searchDia = false
      }
    },
    editIdea () {
      if (!this.$store.state.userInfo.accountId) return this.$router.replace('/login?redirectUrl=' + window.location.href)
      this.setIdeaDialog(true)
    },
    handleSelect (index, indexPath) {
      if (this.$route.fullPath == index) {
        this.$router.go(0)
      }
      // console.log(index)
      if (index != '/community') {
        this.$router.push(index)
      }
      //  return this.$router.push('/community?id=' + this.navList[3].childMenu[0].id)
    },
    goto (val) {
      this.$router.push({ path: '/community', query: { id: val } })
      // window.open(routeUrl.href, '_blank')
    },
    getTagsList () {
      const arr = []
      api.tagList().then(res => {
        this.navList[4].childMenu = res.data.records.filter(item => !item.parentId)
      })
    },
    menuListFn () {
      this.dialogTableVisible = true
    },
    checkTag (index, item) {
      this.$router.push({ path: '/community', query: { id: item.id } })
    },
    // 退出登录
    onLogout () {
      this.$confirm('确定退出?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        closeOnClickModal: false
      })
        .then(() => {
          window.localStorage.clear()
          window.location.href = '/index'
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
<<<<<<< .mine
    },
    // 切换路径
    handleCommand (command) {
      this.$router.push(command)
||||||| .r2657
    },
    // 切换路径
    handleCommand(command) {
      this.$router.push(command)
=======
>>>>>>> .r5728
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  position: relative;
  .el-header {
    padding: 0;
    background-color: #fff;
    box-shadow:0px 0px 4px 0px rgba(57, 63, 58, 0.35);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 666;
    .layoutHeader {
      width: 1100px;
      margin: 0 auto;
      .header {
        padding-top: 10px;
        .web-logo {
          width: 178px;
          height: 41px;
        }
      }
      .nav {
        margin-top: 8px;
        /deep/ .el-menu-item {
          font-size: 16px;
        }
        /deep/ .el-menu.el-menu--horizontal,
        /deep/ .el-menu--horizontal > .el-menu-item,
        /deep/ .el-menu--horizontal > .el-menu-item.is-active {
          border: 0 none;
        }
        /deep/ .el-menu--horizontal > .el-menu-item,
        /deep/ .el-menu--horizontal > .el-submenu .el-submenu__title {
          height: 36px;
          line-height: 36px;
        }
        /deep/.el-menu-item:nth-of-type(1) {
          padding-left: 0;
        }
        .child-box {
          position: absolute;
          left: -10px;
          z-index: 777;
          width: 250px;
          height: 134px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 10px 0px rgba(166, 171, 167, 0.35);
          padding: 27px 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          > li {
            margin-bottom: 15px;
            height: 15px;
            line-height: 15px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            box-sizing: border-box;
            padding: 0 30px;
            > span:hover {
              cursor: pointer;
              color: rgba(228, 61, 48, 1);
            }
          }
        }
      }
      .publish {
        height: 17px;
        line-height: 17px;
        font-size: 16px;
        margin-top: 16px;
        > a {
          margin-left: 20px;
          padding-left: 22px;
          &:nth-child(1) {
            background: url('~@/assets/images/fawenzhang.svg') no-repeat left center/18px 18px;
          }
          &:nth-child(2) {
            background: url('~@/assets/images/yivideo/yivideo-pub-icon.png') no-repeat left center/18px 13px;
          }
          &:nth-child(3) {
            background: url('~@/assets/images/tiwenti.svg') no-repeat left center/18px 18px;
          }
          &:nth-child(4) {
            background: url('~@/assets/images/xiexiangfa.svg') no-repeat left center/18px 18px;
          }
        }
      }
    }
  }
  /deep/.el-main {
    width: 1100px;
    min-height: 0;
    padding: 0;
    margin: 0 auto;
    overflow: initial;
  }
}
.link {
  margin-top: 8px;
  .app {
    margin-right: 20px;

    position: relative;
    a {
      color: #333333;
      img {
        width: 100px;
        height: 100px;
        position: absolute;
        left: -10px;
        top: 35px;
        z-index: 99;
        display: none;
        padding: 10px;
        background-color: #fff;
        box-shadow: 0px 0px 10px 0px rgba(166, 171, 167, 0.35);
      }
    }
    a:hover {
      img {
        display: block;
      }
    }
  }
  .info-center {
    cursor: pointer;
    margin-right: 20px;
  }
  .gologin {
    clear: both;
    display: inline-block;
    margin-top: -7px;
    a {
      color: #333333;
    }
    .red {
      display: inline-block;
      margin-left: 20px;
      height: 34px;
      width: 70px;
      background: #f33535;
      color: #fff;
      line-height: 34px;
      text-align: center;
      border-radius: 5px;
    }
  }
}
.search {
  width: 400px;
  box-sizing: border-box;
  display: flex;
  margin-left: 30px;
  margin-top: 5px;
  position: relative;
  .input {
    width: 330px;
    height: 36px;
    line-height: 36px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border: 2px solid #f33535;
    border-radius: 5px 0 0 5px;
    vertical-align: middle;
    img {
      font-size: 14px;
      padding: 0 12px;
    }
    input {
      float: right;
      height: 15px;
      line-height: 16px;
      width: 285px;
      padding: 8px 0;
      border: none;
    }
  }
  > button {
    width: 70px;
    height: 36px;
    box-sizing: border-box;
    background: #f33535;
    border: none;
    color: #fff;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
  }
  .search-history {
    position: absolute;
    left: 0;
    top: 44px;
    z-index: 3;
    width: 330px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px 0px rgba(166, 171, 167, 0.35);
    padding: 0 0 20px 0;
    .history-box {
      height: 33px;
      line-height: 33px;
      border-bottom: 1px solid #eeeeee;
      padding: 13px 25px 0 28px;
      span {
        font-size: 14px;
        color: #b8bac8;
      }
      span:nth-child(2) {
        float: right;
        cursor: pointer;
      }
      span:nth-child(2):hover {
        color: #e23732;
      }
    }
    .history-list {
      margin-top: 10px;
      li {
        vertical-align: middle;
        height: 30px;
        line-height: 30px;
        padding: 0 25px 0px 28px;
        box-sizing: border-box;
        span {
          display: inline-block;
          vertical-align: middle;
          color: #333333;
          max-width: 235px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          cursor: pointer;
          font-size: 14px;
        }
        span:hover {
          color: #e23732;
        }
        .icon-box {
          height: 16px;
          float: right;
          img {
            vertical-align: middle;
            cursor: pointer;
            height: 16px;
            width: 16px;
          }
          .closehover-icons {
            display: none;
          }
        }
        .icon-box:hover {
          .close-icons {
            display: none;
          }
          .closehover-icons {
            display: inline-block;
          }
        }
      }
      li:hover {
        background: #f2f2f2;
      }
    }
  }
}
</style>
