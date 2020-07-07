<template>
  <div class="yivideo-nav" v-loading="loading">
    <div class="show-areas">
      <ul>
        <li
          v-for="(item, index) in areas"
          :key="index"
          :class="{ active: active == index }"
          @click="chooseNav(item)"
        >
          {{ item.areaName }}
        </li>
      </ul>
      <span class="more-btn" v-if="areas.length > 8" :style="{'color' : hiddenAreaName == '更多' ? '#4a4a4a' : '#F33535'}" @click.stop="showMore = !showMore">
        {{hiddenAreaName}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <div class="search-box">
        <el-input
          placeholder="请输入视频标题搜索驿视频"
          prefix-icon="el-icon-search"
          v-model.trim="keyWords"
          @keyup.enter.native="search"
        >
        </el-input>
      </div>
    </div>
    <transition name="el-zoom-in-top">
      <div ref="hide-areas" class="hide-areas" v-show="showMore && hideAreas.length > 0"  @click.stop="hideArea">
        <ul>
          <li
            v-for="(item, index) in hideAreas"
            :key="index"
            :class="{ active: active == index + 9 }"
            @click.stop="chooseNav(item)"
          >
            {{ item.areaName }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import api from "@/fetch";
export default {
  data() {
    return {
      loading: true,
      areas: [],
      hideAreas: [],
      showMore: false,
      keyWords: "",
      hiddenAreaName: "更多"
    };
  },
  computed: {
    active() {
      let activeIndex = 0;
      let areaId = this.$route.params.areaId;
      if (areaId) {
        const areasIndex = this.areas.findIndex(
          item => item.id == areaId
        );
        const hideAreasIndex = this.hideAreas.findIndex(
          item => item.id == areaId
        );
        // 因为显示的分区长度为9，所以如果选择的是隐藏分区，index需要 +9才能对应上，见getAreasFn()
        activeIndex = areasIndex > 0 ? areasIndex : hideAreasIndex + 9;
        // 如果是隐藏分区中的，将’更多‘改为对应分区名称
        if(hideAreasIndex > 0) {
          this.hiddenAreaName = this.hideAreas[hideAreasIndex].areaName;
        }
      }
      return activeIndex;
    }
  },
  mounted() {
    this.getAreasFn();
    document.addEventListener('click', this.hideArea)
  },
  // 清除click监听
  beforeDestroy() {
    document.removeEventListener('click', this.hideArea)
  },
  methods: {
    // 获取一级分区
    getAreasFn() {
      api.yivideoAreas().then(res => {
        if (res.data.length > 0) {
          this.areas = res.data.slice(0, 8);
          this.areas.unshift({ areaName: "推荐" });
          this.hideAreas = res.data.slice(8);
          this.loading = false;
        }
      });
    },
    // 选中一级分区跳转不同页面
    chooseNav(data) {
      this.showMore = false;
      if(this.hideAreas.includes(data)) {
        this.hiddenAreaName = data.areaName;
      } else {
        this.hiddenAreaName = "更多";
      }
      switch (data.areaName) {
        case "推荐":
          return this.$router.push("/yivideo/recommend");
        case "微课堂":
          return this.$router.push({path: "/yivideo/microClassroom/"+ data.id});
        default:
          return this.$router.push({path: "/yivideo/otherArea/"+ data.id, query: {sonId: data.id }});
      }
    },
    // 搜索
    search() {
      let routeUrl = this.$router.resolve({
        path: "/yivideo/search",
        query: { keyWords: this.keyWords }
      });
      window.open(routeUrl.href, "_blank");
    },
    hideArea(e) {
      if (!this.$refs['hide-areas'].contains(e.target)) {
        // 隐藏
        this.showMore = false
      }
    }
  }
};
</script>
<style lang="less" scoped>
.yivideo-nav {
  position: relative;
  .show-areas,
  .hide-areas {
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    ul {
      width: 70%;
      display: flex;
      flex-wrap: wrap;
      height: 50px;
      overflow: hidden;
      li {
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        margin-right: 30px;
        position: relative;
        cursor: pointer;
      }
      .active {
        font-size: 16px;
        font-weight: bold;
        &::after {
          content: "";
          display: inline-block;
          width: 20px;
          height: 3px;
          border-radius: 1px;
          background-color: #f33535;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
    .more-btn {
      display: inline-block;
      cursor: pointer;
      height: 50px;
      line-height: 50px;
    }
    /deep/.search-box {
      width: 240px;
      height: 50px;
      .el-input {
        height: 100%;
        position: relative;
        .el-input__inner {
          width: 100%;
          height: 36px;
          background-color: #f5f5f5;
          border-radius: 18px !important;
          border: 0;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          padding-left: 29px;
        }
      }
    }
  }
  .hide-areas {
    width: 100%;
    position: absolute;
    bottom: -50px;
    left: 0;
    z-index: 6;
    background-color: #fff;
    ul {
      width: 100%;
      height: auto;
      flex-wrap: wrap;
    }
  }
}
</style>
