<template>
  <div class="scroll-wrap">
    <ul class="article-list" v-scroll="loadArticle" :scroll-disabled="disabled">
      <li v-for='(item,index) in listData' :key='index'>
        <img :src="$store.state.imageDomain + item.image" alt="" width="200px">
        <div>
          <h5 class="ellipsis">
            <router-link :to="'/columnDetail/'+item.id" target="_blank">{{item.name}}</router-link>
          </h5>
          <p>{{item.courseAddTime | formatDate}}</p>
          <span>{{item.upToTime}}</span>
          <i :class="item.price > 0 ? 'red' : 'purple'">{{item.price>0 ? '&yen;'+item.price : '免费' }}</i>

        </div>
      </li>
    </ul>
    <p v-if="loading" class="nomore-data">加载中...</p>
    <div v-else-if="!listData.length" class="no-data">
      <img src="@/assets/images/No-column.png" alt="">
      <p>暂无专栏</p>
    </div>
    <p v-else-if="noMore" class="nomore-data">没有更多了</p>
  </div>
</template>
<script>
import api from '@/fetch'
export default {
  data() {
    return {
      loading: false,
      params: {
        keywords: '',
        pageNum: 1,
        pageSize: 10
      },
      listData: [],
      totals: 0
    }
  },
  computed: {
    noMore() {
      return this.listData.length >= this.totals
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  watch: {
    $route(to, from) {
      this.listData = []
      this.params.pageNum = 1;
      this.getListData(this.$route.query.id)
    }
  },
  mounted() {
    this.getListData(this.$route.query.id)
  },
  methods: {
    getListData(id = "ebbe50e030b34863af4b08562f8592bd") {
      this.loading = true
      this.params.keywords = id
      api.columnTag(this.params).then(res => {
        this.loading = false
        this.listData = [...this.listData, ...res.data.records]
        this.totals = res.data.total
        !this.noMore && this.params.pageNum++
      })
    },
    loadArticle() {
      this.getListData(this.$route.query.id)
    }
  }
}
</script>
<style lang="less" scoped>
.article-list {
  padding: 5px 92px 5px 20px;
  > li {
    padding: 10px 0;
    display: flex;
    align-items: center;
    > img {
      height: 118px;
      margin-right: 20px;
      border-radius: 5px;
    }
    > div {
      flex: 1;
      overflow: hidden;
      border-bottom: 1px solid #dddddd;
      > h5 {
        font-size: 16px;
        margin-bottom: 5px;
        padding-top: 5px;
        box-sizing: border-box;
        color: #333333;
      }
      > p {
        color: #999999;
        padding: 10px 0;
      }
      > span {
        display: block;
        width: 80px;
        height: 20px;
        background: #f2f2f2;
        color: #666666;
        border-radius: 3px;
        box-sizing: border-box;
        text-align: center;
        line-height: 21px;
      }
      > i {
        padding-top: 18px;
        font-size: 16px;
        display: block;
        margin-bottom: 10px;
        font-weight: 600;
      }
    }
  }
}
em,
i,
s {
  font-style: normal;
  text-decoration: none;
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
</style>

