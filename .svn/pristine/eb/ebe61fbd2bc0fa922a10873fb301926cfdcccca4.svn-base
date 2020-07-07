<template>
  <div class="special-course">
    <h4>相关推荐</h4>
    <ul class="yivideo-list">
      <li
        v-for="(item, index) in showRecommendList"
        :key="index"
        @click="gotoDetail('/yivideo/detail/' + item.id)"
      >
        <div class="cover-img">
          <img :src="$store.state.imageDomain + item.image" alt="" />
          <span>{{ formatDuring(item.duration) }}</span>
        </div>
        <div class="info">
          <h5 class="ellipsis">{{ item.title }}</h5>
          <div>
            <span class="ellipsis" style="flex: 1;margin-right: 5px;">
              {{ item.nickName }}
            </span>
            <span>
              <i class="el-icon-video-play"></i> {{ item.watchCount || 0 }}
            </span>
          </div>
        </div>
      </li>
    </ul>
    <div class="page-turning" v-if="recommendList.length > 0">
      <img src="@/assets/images/xiangzuo.png" alt="" @click="change('prev')" />
      &nbsp;
      <img src="@/assets/images/xiangyou.png" alt="" @click="change('next')" />
    </div>
    <div v-else class="nomore-data">暂无推荐</div>
  </div>
</template>

<script>
import api from "@/fetch";
export default {
  props: {
    yivideoId: String
  },
  data() {
    return {
      recommendList: [],
      showRecommendList: [],
      page: 0,
      totalPage: 0,
      size: 5
    };
  },
  watch: {
    yivideoId: function(val) {
      if (val) {
        this.getRecommend(val);
      }
    }
  },
  mounted() {},
  methods: {
    // 课程推荐
    getRecommend(yivideoId) {
      api.yivideoDetailRecommends(yivideoId).then(res => {
        this.recommendList = res.data;
        this.totalPage = Math.ceil(res.data.length / this.size);
        // console.log(this.totalPage);
        if (res.data.length > this.size) {
          this.showRecommendList = res.data.slice(this.page, this.size);
        } else {
          this.showRecommendList = res.data;
        }
      });
    },
    change(type) {
      if (this.recommendList.length <= this.size) return;
      let tmpList = this.recommendList;
      if (type == "next") {
        this.page = this.page + 1 == this.totalPage ? 0 : this.page + 1;
      } else {
        this.page = this.page - 1 < 0 ? this.totalPage - 1 : this.page - 1;
      }
      // console.log((this.page * this.size) +"/"+ (this.page * this.size + this.size));
      this.showRecommendList = tmpList.slice(
        this.page * this.size,
        this.page * this.size + this.size
      );
    },
    gotoDetail(url) {
      window.open(url);
    },
    formatDuring(second) {
      //   var h =
      //     Math.floor(second / 3600) < 10
      //       ? "0" + Math.floor(second / 3600)
      //       : Math.floor(second / 3600);
      var m =
        Math.floor((second / 60) % 60) < 10
          ? "0" + Math.floor((second / 60) % 60)
          : Math.floor((second / 60) % 60);
      var s =
        Math.floor(second % 60) < 10
          ? "0" + Math.floor(second % 60)
          : Math.floor(second % 60);
      return m + ":" + s;
    }
  }
};
</script>

<style lang="less" scoped>
.special-course {
  background-color: #fff;
  border-radius: 10px;
  padding: 15px 20px 10px;
  box-sizing: border-box;
  > h4 {
    font-weight: normal;
    font-size: 16px;
  }
  .yivideo-list {
    > li {
      cursor: pointer;
      display: flex;
      align-items: center;
      margin: 10px 0;

      .cover-img {
        width: 100px;
        height: 64px;
        position: relative;
        border-radius: 10px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
        span {
          position: absolute;
          bottom: 0;
          right: 5px;
          z-index: 1;
          color: #fff;
        }
      }
      .info {
        flex: 1;
        margin-left: 10px;
        overflow: hidden;
        > div:nth-child(2) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #999;
          margin-top: 26px;
        }
        > p.reds {
          color: #f51e1e;
        }
        > p.purple {
          color: #7355f6;
        }
      }
    }
  }
  .page-turning {
    text-align: center;
    > img {
      cursor: pointer;
    }
  }
}
.nomore-data {
  text-align: center;
  margin: 20px 0 10px;
  color: #999;
}
</style>
