<template>
  <div class="yivideo">
    <transition name="el-fade-in">
      <yivideoNavbar></yivideoNavbar>
    </transition>
    <div class="yivideo-main">
      <div class="yivideo-main_top">
        <div class="slider-box">
          <swiperComponents :tasList="sliderData"></swiperComponents>
        </div>
        <div class="yivideo-pub">
          <div class="pub-img"></div>
          <div class="pub-btn" @click="publish"></div>
        </div>
      </div>
      <div class="yivideo-second-area">
        <ul>
          <li
            v-for="(item, index) in secondAreas"
            :key="index"
            @click="allArea(areaId, item.id)"
          >
            {{ item.areaName.length>8?item.areaName.slice(0,8)+'...':item.areaName }}
          </li>
          <li @click="allArea(areaId, areaId)">全部分区</li>
        </ul>
      </div>
      <div class="yivideo-main_list">
        <div class="area-item" v-if="recommendCourses.length > 0">
          <div class="area-name">
            <div class="left">
              <img
                :src="require('@/assets/images/yivideo/wkt-hktj.png')"
                alt=""
              />
              <span>好课推荐</span>
            </div>
            <span v-if="total > 4" @click="changeAbatch">换一批</span>
          </div>
          <yivideoList
            v-loading="recommendLoading"
            :dataList="recommendCourses"
            :showFillImg="true"
          ></yivideoList>
        </div>
        <div class="area-item" v-if="weekLatest.length > 0">
          <div class="area-name">
            <div class="left">
              <img
                :src="require('@/assets/images/yivideo/wkt-yzsx.png')"
                alt=""
              />
              <span>一周上新</span>
            </div>
          </div>
          <yivideoList
            v-loading="weekLatestLoading"
            :dataList="weekLatest"
            :showFillImg="true"
          ></yivideoList>
        </div>
        <div class="area-item" v-if="weekHotest.length > 0">
          <div class="area-name">
            <div class="left">
              <img
                :src="require('@/assets/images/yivideo/wkt-yzrm.png')"
                alt=""
              />
              <span>一周热门</span>
            </div>
          </div>
          <yivideoList
            v-loading="weekHotestLoading"
            :dataList="weekHotest"
            :showFillImg="true"
          ></yivideoList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/fetch";
import swiperComponents from "@/components/swiperComponents.vue";
import yivideoList from "@/components/yivideoList.vue";
import yivideoNavbar from "@/components/yivideoNavbar.vue";
export default {
  components: {
    yivideoNavbar,
    swiperComponents,
    yivideoList
  },
  data() {
    return {
      areaId: this.$route.params.areaId,
      secondAreas: [],
      recommendCourses: [],
      total: 0,
      weekLatest: [],
      weekHotest: [],
      recommendLoading: true,
      weekLatestLoading: true,
      weekHotestLoading: true,
      params: {
        pageNum: 1,
        pageSize: 4,
        paramObject: {
          areaId: this.$route.params.areaId,
          recommendFlag: 8
        }
      },
      sliderData: []
    };
  },
  mounted() {
    this.getSliderData();
    this.getSecondAreasFn();
    this.getRecommendCourse();
    this.getWeekLatest();
    this.getWeekHotest();
  },
  methods: {
    // 获取轮播图数据
    getSliderData() {
      api.microClassroomSlider().then(res => {
        this.sliderData = res.data;
      });
    },
    // 获取二级分区
    getSecondAreasFn() {
      api.yivideoFirstAreas(this.areaId).then(res => {
        this.secondAreas =
          res.data.length <= 5 ? res.data : res.data.slice(0, 5);
      });
    },
    // 获取好课推荐
    getRecommendCourse() {
      this.recommendLoading = true;
      api.yivideoRecommends(this.params).then(res => {
        if (res.data.total != 0 && res.data.records.length == 0) {
          this.params.pageNum = 1;
          this.getRecommendCourse();
        } else {
          this.recommendCourses = res.data.records;
          this.total = res.data.total;
        }
        this.recommendLoading = false;
      });
    },
    // 获取一周最新
    getWeekLatest() {
      api.yivideoWeekLatest(this.areaId).then(res => {
        this.weekLatest = res.data;
        this.weekLatestLoading = false;
      });
    },
    // 获取一周热门
    getWeekHotest() {
      api.yivideoWeekHotest(this.areaId).then(res => {
        this.weekHotest = res.data;
        this.weekHotestLoading = false;
      });
    },
    // 换一批
    changeAbatch() {
      this.params.pageNum++;
      this.getRecommendCourse();
    },
    // 发布按钮
    publish() {
      this.$router.push(
        this.$store.state.userInfo.accountId ? "/yivideo/publish" : "/login"
      );
    },
    // 选中二级分区方法
    allArea(areaId, sonId) {
      this.$router.push({
        path: "/yivideo/otherArea/" + areaId,
        query: { sonId: sonId, from: "microClassroom" }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.yivideo {
  width: 1100px;
  margin: 21px 0;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  .yivideo-main {
    padding-bottom: 20px;
    margin-bottom: 20px;
    .yivideo-main_top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 19px;
      .slider-box {
        width: 726px;
        height: 337px;
        border-radius: 10px;
        padding: 0 20px;
        margin: 20px 0;
      }
      .yivideo-pub {
        padding: 0 20px;
        margin: 20px 0;
        border-left: 1px solid #f1f1f1;
        position: relative;
        .pub-img {
          width: 293px;
          height: 337px;
          background: url("../../assets/images/yivideo/yivideo-pub.png") center
            no-repeat;
          background-size: 100% 100%;
        }
        .pub-btn {
          width: 140px;
          height: 40px;
          box-sizing: border-box;
          border-radius: 20px;
          position: absolute;
          bottom: 30px;
          left: 97px;
          z-index: 1;
          cursor: pointer;
        }
      }
    }
    .yivideo-second-area {
      padding: 0 20px;
      margin-bottom: 39px;
      ul {
        width: calc(100% + 13px);
        display: flex;
        li {
          width: 166px;
          height: 60px;
          margin-right: 13px;
          border-radius: 10px;
          font-size: 16px;
          font-weight: bold;
          color: #504e62;
          line-height: 60px;
          text-align: center;
          cursor: pointer;
          &:nth-child(1) {
            background: url("../../assets/images/yivideo/bg-fq-1.png") center
              no-repeat;
            background-size: 100% 100%;
          }
          &:nth-child(2) {
            background: url("../../assets/images/yivideo/bg-fq-2.png") center
              no-repeat;
            background-size: 100% 100%;
          }
          &:nth-child(3) {
            background: url("../../assets/images/yivideo/bg-fq-3.png") center
              no-repeat;
            background-size: 100% 100%;
          }
          &:nth-child(4) {
            background: url("../../assets/images/yivideo/bg-fq-4.png") center
              no-repeat;
            background-size: 100% 100%;
          }
          &:nth-child(5) {
            background: url("../../assets/images/yivideo/bg-fq-5.png") center
              no-repeat;
            background-size: 100% 100%;
          }
          &:nth-child(6) {
            background: url("../../assets/images/yivideo/bg-fq-6.png") center
              no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
    .yivideo-main_list {
      padding: 0 20px;
      .area-item {
        margin-bottom: 39px;
        height: auto;
        .area-name {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          .left {
            img {
              width: 28px;
              height: 28px;
              vertical-align: bottom;
            }
            span {
              font-size: 20px;
              font-weight: bold;
              color: #4a4a4a;
              padding-left: 6px;
            }
          }
          span {
            cursor:pointer;
            font-size: 14px;
            color: #777;
          }
        }
      }
    }
  }
}
</style>
