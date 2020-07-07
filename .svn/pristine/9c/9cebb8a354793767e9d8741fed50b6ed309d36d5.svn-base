<template>
  <div class="yivideo">
    <transition name="el-fade-in">
      <yivideoNavbar></yivideoNavbar>
    </transition>
    <div
      class="area-list"
      :style="{ height: showThirdArea && thirdAreas.length > 0 ? '108px' : '54px' }"
    >
      <ul
        class="second"
        @mouseover="showMore = true"
        @mouseout="showMore = false"
        :class="{ show: showMore }"
      >
        <li
          v-for="(item, index) in secondAreas"
          :key="index"
          @click="chooseArea(item.id, 2)"
        >
          <span :class="{ active: item.id == activeSecondAreaId }">{{
            item.areaName
          }}</span>
        </li>
      </ul>
      <ul class="third" v-if="showThirdArea && thirdAreas.length > 0" 
        @mouseover="showMoreThird = true"
        @mouseout="showMoreThird = false"
        :class="{ show: showMoreThird }">
        <li
          v-for="(item, index) in thirdAreas"
          :key="index"
          @click="chooseArea(item.id, 3)"
        >
          <span :class="{ active: item.id == activeThirdAreaId }">{{
            item.areaName
          }}</span>
        </li>
      </ul>
    </div>
    <div class="yivideo-list">
      <el-dropdown placement="bottom-start" @command="changeSort">
        <span style="cursor:default;"
          >{{ currentSort.name
          }}<i class="el-icon-arrow-down el-icon--right"></i
        ></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in sortList"
            :key="index"
            :command="item"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <yivideoList
        v-loading="loading"
        :dataList="videoList"
        :wrap="true"
      ></yivideoList>
      <el-pagination
        v-if="total != 0"
        background
        @current-change="handleCurrentChange"
        :current-page="params.pageNum"
        layout="prev, slot, next, total"
        :page-size="params.pageSize"
        :total="total"
      >
        <span class="pager">第 {{ params.pageNum }} / {{ totalPage }} 页</span>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from "@/fetch";
import yivideoNavbar from "@/components/yivideoNavbar.vue";
import yivideoList from "@/components/yivideoList.vue";
export default {
  components: {
    yivideoNavbar,
    yivideoList
  },
  data() {
    return {
      showMore: false,
      showMoreThird: false,
      showThirdArea: false,
      activeSecondAreaId: "",
      activeThirdAreaId: "",
      loading: true,
      videoList: [],
      total: 0,
      totalPage: 0,
      secondAreas: [],
      thirdAreas: [],
      params: {
        pageNum: 1,
        pageSize: 12,
        paramObject: {
          areaId: "",
          recommendFlag: 3
        }
      },
      currentSort: {},
      // 推荐标识(1 发布时间倒叙 2 收藏时间倒叙 3播放量倒叙 4点赞量倒叙 5评论量倒叙 6收藏量倒叙 7更新时间倒叙 8推荐)
      sortList: [
        {
          name: "最多播放",
          flag: 3
        },
        {
          name: "最多点赞",
          flag: 4
        },
        {
          name: "最多评论",
          flag: 5
        },
        {
          name: "最多收藏",
          flag: 6
        },
        {
          name: "最新发布",
          flag: 1
        }
      ]
    };
  },
  // 监听路由发生变化的时候执行
  watch: {
    $route(to, from) {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.params.pageNum = 1;
      this.currentSort = this.sortList[0];
      this.areaId = this.$route.params.areaId;
      let areaId = this.$route.params.areaId;
      let sonId = this.$route.query.sonId;
      let grandsonId = this.$route.query.grandsonId;
      let from = this.$route.query.from;
      // 激活对应分区
      this.activeSecondAreaId = sonId;
      // 如果是从微课堂过来的
      if(from == "microClassroom") {
        // 显示三级分区
        this.showThirdArea = true;
        // 激活三级分区‘全部’
        this.activeThirdAreaId = grandsonId ? grandsonId : sonId;
        // 获取微课堂下的二级分区
        this.getMicroClassroomSecondAreasFn(areaId);
        // 如果从微课堂过来的不是选择的‘全部分区’，则获取对应三级分区（如果选择的是全部分区sonId会等于areaId）
        if (sonId != areaId) {
          this.getThirdAreas(sonId);
        }
        // 参数赋值
        this.params.paramObject.areaId = grandsonId ? grandsonId : sonId;
      } else {
        // 其他一级分区不显示三级分区
        this.showThirdArea = false;
        // 获取其它一级分区的二级分区
        this.getSecondAreasFn(areaId);
        // 参数赋值
        this.params.paramObject.areaId = sonId;
      }
      // 获取数据
      this.getDataFn();
    },
    // 获取分区对应数据
    getDataFn() {
      this.loading = true;
      api.yivideoRecommends(this.params).then(res => {
        this.videoList = res.data.records;
        this.total = res.data.total;
        this.totalPage = res.data.pages;
        this.loading = false;
      });
    },
    // 获取子分区列表，如果分区里没有视频，不返回
    getSecondAreasFn(parentAreaId) {
      api.yivideoSonAreas(parentAreaId).then(res => {
        this.secondAreas = res.data;
        this.secondAreas.unshift({ id: parentAreaId, areaName: "全部" });
      });
    },
    // 获取微课堂下的全部二级分区，不区分分区下是否有视频
    getMicroClassroomSecondAreasFn(areaId) {
      api.yivideoFirstAreas(areaId).then(res => {
        this.secondAreas = res.data;
        this.secondAreas.unshift({ id: areaId, areaName: "全部" });
      });
    },
    // 获取三级分区列表
    getThirdAreas(parentAreaId) {
      api.yivideoSonAreas(parentAreaId).then(res => {
        if (res.data.length > 0) {
          this.thirdAreas = res.data;
          this.thirdAreas.unshift({ id: parentAreaId, areaName: "全部" });
        } else {
          // 没有三级分区不显示
          this.thirdAreas = [];
        }
      });
    },
    // 选中分区方法，areaId为二级分区/三级分区id，level用来区分几级分区
    chooseArea(areaId, level) {
      let path = this.$route.path;
      let query = this.$route.query;
      if (level == 2) {
        // 激活对应分区
        this.activeSecondAreaId = areaId;
        // 替换路由，保证刷新后还在当前选择的分区
        this.$router.replace({path: path, query: {sonId: areaId, from: query.from}});
        // 选中的是二级分区，需要再次获取三级分区，除了‘全部’
        if (areaId != this.areaId) {
          this.getThirdAreas(areaId);
        } else {
          this.thirdAreas = [];
        }
      } else {
        // 激活对应分区
        this.activeThirdAreaId = areaId;
        // 替换路由，保证刷新后还在当前选择的分区
        this.$router.replace({path: path, query: {sonId: query.sonId, grandsonId: areaId, from: query.from}});

      }
      this.params.paramObject.areaId = areaId;
      this.getDataFn();
    },
    // 改变排序方法
    changeSort(data) {
      this.currentSort = data;
      this.params.paramObject.recommendFlag = data.flag;
      this.getDataFn();
    },
    // 分页方法
    handleCurrentChange(val) {
      this.params.pageNum = val;
      this.getDataFn();
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
  .area-list {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 54px;
    box-sizing: border-box;
    .second,
    .third {
      width: 100%;
      height: 55px;
      display: flex;
      flex-wrap: wrap;
      padding: 0 19px 0 18px;
      overflow: hidden;
      background-color: #fff;
      border-bottom: 1px solid #eaeaea;
      box-sizing: border-box;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 5;
      li {
        span {
          display: inline-block;
          font-size: 13px;
          color: #999;
          margin: 11px 17px 11px 0;
          padding: 7px 16px;
          cursor: pointer;
        }
      }
    }
    .third {
      position: absolute;
      left: 0;
      top: 55px;
      z-index: 4;
      background-color: #f5f5f5;
    }
    .show {
      height: auto;
      overflow: auto;
    }
    .active {
      border-radius: 16px;
      color: #f33535 !important;
      background-color: #fef0ef;
    }
  }
  .yivideo-list {
    padding: 18px;
    box-sizing: border-box;
    /deep/ .el-dropdown {
      margin-bottom: 19px;
    }
  }
  /deep/ .el-pagination {
    text-align: center;
    .pager,
    .el-pagination__total {
      color: #999;
      padding: 0 14px;
      font-weight: 400;
    }
  }
}
</style>
