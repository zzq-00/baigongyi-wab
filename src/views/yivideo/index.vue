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
      <div class="yivideo-main_list">
        <div class="area-item" v-for="(item, index) in firstAreas" :key="index">
          <yivideoRecommendList
            :areaId="item.id"
            :areaName="item.areaName"
          ></yivideoRecommendList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/fetch";
import yivideoNavbar from "@/components/yivideoNavbar.vue";
import swiperComponents from "@/components/swiperComponents.vue";
import yivideoRecommendList from "@/components/yivideoRecommendList.vue";
export default {
  components: {
    yivideoNavbar,
    swiperComponents,
    yivideoRecommendList
  },
  data() {
    return {
      firstAreas: [],
      sliderData: []
    };
  },
  mounted() {
    this.getSliderData();
    this.getFirstAreas();
  },
  methods: {
    // 获取轮播图数据
    getSliderData() {
      api.yivideoHomeSlider().then(res => {
        this.sliderData = res.data;
      })
    },
    // 获取一级分区
    getFirstAreas() {
      api.yivideoIndexFirstAreas().then(res => {
        this.firstAreas = res.data;
      });
    },
    // 发布按钮
    publish() {
      this.$router.push(
        this.$store.state.userInfo.accountId ? "/yivideo/publish" : "/login"
      );
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
    .yivideo-main_list {
      padding: 0 20px;
      .area-item {
        margin-bottom: 39px;
        height: auto;
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
      }
    }
  }
}
</style>
