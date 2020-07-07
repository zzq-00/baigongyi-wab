<template>
  <div class='article_main'>
    <ul class='article_main_left'>
      <li :class="{active:currentIndex==index}" v-for='(item,index) in leftNavData' :key='index' @click='currentIndexFn(index)'>
        <i class="el-icon-notebook-2" v-if='currentIndex==index'></i>
        <span>{{item}}</span>
      </li>
    </ul>
    <div class='article_main_right'>
      <div class='newsHot'>
        <ul v-scroll="getDataListFn" :scroll-disabled="disabled">
          <li v-for='(item,index) in listData' :key='index'>
            <dl>
              <dt>
                <img @click='goDetails(item)' :src="$store.state.imageDomain + item.image" style="cursor:pointer" />
              </dt>
              <dd>
                <h4 @click='goDetails(item)'>{{item.title}}</h4>
                <p @click='goDetails(item)' v-html='item.roundup' style="cursor:pointer"></p>
                <div>
                  <p>
                    <span class="recommend" v-if="item.recommendation == 1">推荐</span>
                    <span>
                      <i class="el-icon-time"></i>
                      {{item.publishTime | formatDate}}
                    </span>
                    <span>
                      <i class="el-icon-view"></i>{{item.watchCount}}
                    </span>
                  </p>
                </div>
              </dd>
            </dl>
          </li>
        </ul>
        <p v-if="loading" class="nomore-data">加载中...</p>
        <div v-else-if="!listData.length" class="no-data">
          <img src="@/assets/images/No-article.png" alt="">
          <p>暂无{{hotMessageNav[1].name}}</p>
        </div>
        <p v-else-if="noMore" class="nomore-data">没有更多了</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
export default {
  data() {
    return {
      noData: true,
      loading: false,
      totalNums: 1,
      hotMessageNav: [
        {
          name: '热点资讯',
          path: '/hotmessage'
        },
        {
          name: '环球资讯'
        }
      ],
      listData: [],
      params: {
        pageNum: 1,
        pageSize: 10,
        paramObject: {
          type: 1
        }
      },
      leftNavData: ['环球资讯', '行业热点', '建筑前沿', '资质热点', '职场资讯']
    }
  },
  mounted() {
    this.currentIndexFn(this.currentIndex || 0)
  },
  computed: {
    currentIndex() {
      return this.$route.query.indexs * 1
    },
    disabled() {
      return this.loading || this.noMore
    },
    noMore() {
      return this.listData.length >= this.totalNums
    }
  },
  methods: {
    getDataListFn() {
      this.loading = true
      api.hotNewsList(this.params).then(res => {
        this.loading = false
        this.listData = [...this.listData, ...res.data.records]
        this.totalNums = res.data.total
        this.totalNums == 0 ? (this.noData = true) : (this.noData = false)
        !this.noMore && this.params.pageNum++
      })
    },
    currentIndexFn(index) {
      this.currentIndex != index && this.$router.replace('/hotmessage?indexs=' + index)
      this.hotMessageNav[1].name = this.leftNavData[index]
      this.listData = []
      this.params.pageNum = 1
      if (index == 0) {
        this.params.paramObject.type = 4
      } else if (index == 4) {
        this.params.paramObject.type = 5
      } else {
        this.params.paramObject.type = index
      }
      this.getDataListFn()
    },
    goDetails(item) {
      let routeData = this.$router.resolve({ path: '/hotmessage/' + item.id + '?currentIndex=' + this.currentIndex })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
.article_main {
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin: 20px 0;
}

.article_main_left {
  width: 180px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 0 100px;
  position: fixed;
  top: 120px;
  li {
    position: relative;
    padding-top: 10px;
    padding-bottom: 20px;
    > span {
      font-size: 16px;
      color: #4a4a4a;
      padding-left: 60px;
      font-weight: 500;
    }
    > i {
      font-size: 16px;
      position: absolute;
      left: 35px;
      top: 13px;
    }
    &:hover {
      cursor: pointer;
      span,
      i {
        color: #e23732;
      }
    }
  }
  .active {
    span,
    i {
      color: #e23732;
    }
  }
}

.article_main_right {
  flex: 1;
  padding: 20px;
  background-color: #fff;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  margin-left: 200px;
}

.newsHot {
  li {
    margin-bottom: 30px;
    height: 118px;
    overflow: hidden;
    padding-right: 40px;
    dl {
      position: relative;
      dt {
        img {
          width: 200px;
          height: 118px;
          border-radius: 5px;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
      dd {
        padding-left: 220px;
        h4 {
          font-size: 16px;
          padding: 10px 0;
          color: #333333;
          font-weight: 600;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
          &:hover {
            cursor: pointer;
            color: #f33535;
          }
        }
        p {
          color: #666666;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          word-wrap:break-word ;
        }
        > div {
          display: flex;
          justify-content: space-between;
          padding-top: 18px;
          > span {
            color: #999999;
            display: inline-block;
            width: 160px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          > p {
            .recommend {
              color: #f33535;
            }
            span {
              color: #999999;
              i {
                color: #999999;
                padding-right: 6px;
              }
              &:nth-child(2) {
                padding-left: 12px;
              }
            }
          }
        }
      }
    }
  }
}
.nomore-data {
  text-align: center;
  padding: 20px 0 10px;
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
