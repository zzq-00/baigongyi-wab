<template>
  <div class="yivideo-search">
    <div class="search-top">
      <div class="search-box">
        <el-input
          placeholder="请输入视频标题搜索驿视频"
          prefix-icon="el-icon-search"
          v-model="params.paramObject.keyWords"
          @keyup.enter.native="search"
        >
        </el-input>
      </div>
      <el-dropdown placement="bottom-start" @command="changeSort">
        <span
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
      <div class="areas">
        <ul :class="{'show' : showMore}" @mouseover="showMore = true" @mouseout="showMore = false">
          <li
            :class="{ active: params.paramObject.areaId == item.id }"
            v-for="(item, index) in areas"
            :key="index"
            @click="chooseArea(item)"
          >
            {{ item.areaName }}
          </li>
        </ul>
      </div>
    </div>
    <div class="search-main">
      <yivideoList
        v-loading="loading"
        :dataList="videoList"
        :wrap="true"
        :highLight="true"
        :participle="participle"
      ></yivideoList>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="params.pageNum"
        layout="prev, slot, next, total"
        :total="total"
      >
        <span class="pager">第 {{ params.pageNum }} / {{ totalPage }} 页</span>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from "@/fetch";
import yivideoList from "@/components/yivideoList.vue";
export default {
  components: {
    yivideoList
  },
  data() {
    return {
      loading: true,
      videoList: [],
      total: 0,
      totalPage: 0,
      participle: [],
      areas: [],
      params: {
        pageNum: 1,
        pageSize: 12,
        paramObject: {
          areaId: "",
          keyWords: ""
        }
      },
      currentSort: {},
      // 推荐标识(1 发布时间倒叙 2 收藏时间倒叙 3播放量倒叙 4点赞量倒叙 5评论量倒叙 6收藏量倒叙 7更新时间倒叙 8推荐)
      sortList: [
        // {
        //   name: "最多播放",
        //   flag: 3
        // },
        // {
        //   name: "最多点赞",
        //   flag: 4
        // },
        // {
        //   name: "最多评论",
        //   flag: 5
        // },
        // {
        //   name: "最多收藏",
        //   flag: 6
        // },
        // {
        //   name: "最新发布",
        //   flag: 1
        // }
      ],
      hiddenAreaName: "更多",
      showMore: false
    };
  },
  mounted() {
    this.params.paramObject.keyWords = this.$route.query.keyWords;
    this.currentSort = { name: "默认排序" };
    this.getAreasFn();
    this.getDataFn();
  },
  methods: {
    getDataFn() {
      this.loading = true;
      api.yivideoSearch(this.params).then(res => {
        res.data.pageData.records.forEach(item => {
          this.videoList.push(item.data);
        });
        this.participle = res.data.participle;
        this.total = res.data.pageData.total;
        this.totalPage = res.data.pageData.pages;
        this.loading = false;
      });
    },
    getAreasFn() {
      api.yivideoAreas().then(res => {
        if (res.data.length > 0) {
          this.areas = res.data;
          this.areas.unshift({ id: "", areaName: "全部" });
        }
      });
    },
    search() {
      if(!this.params.paramObject.keyWords) return this.$message.warning("请输入视频标题搜索驿视频");
      this.params.pageNum = 1;
      this.videoList = [];
      this.getDataFn();
    },
    chooseArea(data) {
      this.hiddenAreaName = data.areaName;
      this.showMore = true;
      this.params.paramObject.areaId = data.id;
      this.search();
    },
    handleCurrentChange(val) {
      this.params.pageNum = val;
      this.getDataFn();
    }
  }
};
</script>
<style lang="less" scoped>
.yivideo-search {
  width: 1100px;
  margin: 21px 0;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  /deep/.search-box {
    width: 480px;
    height: 36px;
    padding: 18px 18px 0 18px;
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
  .el-dropdown {
    padding: 18px 18px 0 18px;
    span{
      cursor: default;
    }
  }
  .areas {
    position: relative;
    height: 40px;
    margin-top: 20px;
    ul {
      width: 100%;
      height: 30px;
      overflow: hidden;
      padding-left: 18px;
      padding-right: 18px;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      background-color: #fff;
      border-bottom: 1px solid #eaeaea;
      li {
        font-size: 14px;
        color: #999;
        margin-right: 28px;
        margin-bottom: 10px;
        cursor: pointer;
      }
      .active {
        color: #f33535;
      }
    }
    .show{
      height: auto;
      overflow: auto;
    }
    span{
      position: absolute;
      right: 18px;
      top: 0;
      z-index: 1;
      font-size: 14px;
      color: #999;
      cursor: pointer;
    }
  }
  .search-main {
    padding: 18px;
    /deep/ .el-pagination {
      text-align: center;
      .pager,
      .el-pagination__total {
        color: #999;
        padding: 0 14px;
        font-weight: 400;
      }
    }
    .active {
      color: #f33535;
    }
  }
}
</style>
