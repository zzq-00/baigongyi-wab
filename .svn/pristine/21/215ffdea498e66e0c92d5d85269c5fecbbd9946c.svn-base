<template>
  <div class="yivideo-box" v-loading="loading" v-if="total > 0">
    <div class="area-name">
      <span>{{ areaName }}</span>
      <span v-if="total > 4" @click="changeAbatch(index)">换一批</span>
    </div>
    <ul>
      <li v-for="(item, index) in yivideos" :key="index" @click="detail(item)">
        <div class="cover">
          <img :src="$store.state.imageDomain + item.image" alt="" />
          <div class="info">
            <div class="left">
              <i class="el-icon-video-play"></i>
              <span>{{ item.watchCount | formatNumbers }}</span>
              <i class="el-icon-chat-dot-round"></i>
              <span>{{ item.commentCount | formatNumbers }}</span>
            </div>
            <span>{{ formatDuring(item.duration) }}</span>
          </div>
        </div>
        <div class="title">{{ item.title }}</div>
        <div class="author">
          <img
            :src="
              item.avatar
                ? $store.state.imageDomain + item.avatar
                : require('@/assets/images/user-icon.png')
            "
            alt=""
          />
          <span>{{ item.nickName }}</span>
        </div>
      </li>
      <li class="last-li" v-if="yivideos.length < 4">
        <div class="pub-btn" @click="publish"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "@/fetch";
export default {
  props: {
    areaId: String,
    areaName: String
  },
  data() {
    return {
      loading: true,
      params: {
        pageNum: 1,
        pageSize: 4,
        paramObject: {
          areaId: this.areaId,
          recommendFlag: 8
        }
      },
      yivideos: [],
      total: 0
    };
  },
  mounted() {
    this.getDataFn();
  },
  methods: {
    getDataFn() {
      this.loading = true;
      api.yivideoRecommends(this.params).then(res => {
        if (res.data.total != 0 && res.data.records.length == 0) {
          this.params.pageNum = 1;
          this.getDataFn();
        } else {
          this.yivideos = res.data.records;
          this.total = res.data.total;
        }
        this.loading = false;
      });
    },
    changeAbatch() {
      this.params.pageNum++;
      this.getDataFn();
    },
    detail(data) {
      this.$router.push("/yivideo/detail/" + data.id);
    },
    publish() {
      this.$router.push(
        this.$store.state.userInfo.accountId ? "/yivideo/publish" : "/login"
      );
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
.yivideo-box {
  .area-name {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    span:nth-child(1) {
      font-size: 20px;
      font-weight: bold;
      color: #4a4a4a;
    }
    span:nth-child(2) {
      cursor: pointer;
      font-size: 14px;
      color: #777;
    }
  }
  ul {
    width: calc(100% + 18px);
    display: flex;
    li {
      display: inline-block;
      width: 250px;
      background: #fff;
      border: 1px solid #f1f1f1;
      border-radius: 10px;
      margin-right: 18px;
      cursor: pointer;
      .cover {
        width: 100%;
        height: 138px;
        border-radius: 10px 10px 0px 0px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px 10px 0px 0px;
          object-fit: cover;
        }
        .info {
          width: 100%;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          color: #fff;
          position: absolute;
          padding: 10px;
          left: 0;
          bottom: 0;
          .left {
            i {
              font-size: 1.2em;
              margin-right: 3px;
              vertical-align: bottom;
            }
            span {
              padding-right: 5px;
            }
          }
        }
      }
      .title {
        padding: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        font-weight: bold;
        color: #333;
      }
      .author {
        padding: 0 16px 16px 16px;
        img {
          width: 23px;
          height: 23px;
          border-radius: 50%;
          object-fit: cover;
          vertical-align: top;
        }
        span {
          display: inline-block;
          width: 80%;
          padding-left: 8px;
          font-size: 13px;
          line-height: 23px;
          color: #999;
          cursor: default;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .last-li {
      height: 236px;
      background: url("../assets/images/yivideo/yivideo-pub-2.png") center
        no-repeat;
      background-size: 100% 100%;
      position: relative;
      .pub-btn {
        width: 140px;
        height: 40px;
        box-sizing: border-box;
        border-radius: 10px;
        position: absolute;
        bottom: 22px;
        left: 55px;
        z-index: 1;
        cursor: pointer;
      }
    }
  }
}
</style>
