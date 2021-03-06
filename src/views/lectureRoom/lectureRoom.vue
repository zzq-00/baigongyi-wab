<template>
  <div class="courseRoom">
    <div class="content">
      <div class="tabChange clearfix">
        <span v-for="(item,index) in tabsColumn" :key="index" @click="toggleTabs(item.value)" :class="{active:item.value==activeTab}">{{item.name}}
        </span>
      </div>
      <div v-if="!noData">
        <course-list :dataList="dataList" @getCurrentPage="getCurrentPage" @courseDetail="courseDetail" v-show="activeTab==='course'"></course-list>
        <column-list :dataList="dataList" @getCurrentPage="getCurrentPage" @columnDetail="columnDetail" v-show="activeTab==='column'"></column-list>
      </div>
      <div class="no-content" v-if="noData">
        <img src="@/assets/images/No-courses.png" alt="" v-if="activeTab==='course'">
        <img src="@/assets/images/No-column.png" alt="" v-else>
        <p v-if="activeTab==='course'">暂无课程</p>
        <p v-if="activeTab==='column'">暂无专栏</p>
      </div>
    </div>
  </div>
</template>

<script>
import CourseList from '@/components/courseList'
import ColumnList from '@/components/columnList'
import api from '@/fetch'
export default {
  name: 'LectureRoom',
  components: {
    CourseList,
    ColumnList
  },
  data() {
    return {
      noData: true, //无数据图
      tabsColumn: [
        {
          name: '课堂',
          value: 'course'
        },
        {
          name: '专栏',
          value: 'column'
        }
      ],
      // 课程参数
      courseParams: {
        asc: true,
        orderBy: 'id',
        pageNum: 1,
        pageSize: 8
      },
      // 专栏参数
      columnParams: {
        asc: true,
        orderBy: 'id',
        pageNum: 1,
        pageSize: 8,
        paramObject: {}
      },
      // 列表数据
      dataList: {
        course: {},
        column: {}
      }
    }
  },
  computed: {
    activeTab() {
      if (this.$route.query.activeTab === 'column') {
        return 'column'
      }
      return 'course'
    }
  },
  created() {
    this.toggleTabs(this.activeTab)
  },
  watch: {
    courseParams: {
      handler: 'getCourse',
      deep: true,
      immediate: true
    },
    columnParams: {
      handler: 'getColumn',
      deep: true,
      immediate: true
    }
  },
  methods: {
    // tab栏切换
    toggleTabs(val) {
      if (val === 'column') {
        this.columnParams.pageNum = 1
      } else {
        this.courseParams.pageNum = 1
      }
      this.$router.replace('/lectureRoom?activeTab=' + val)
    },
    // 课程
    async getCourse() {
      const res = await api.getCourse(this.courseParams)
      this.dataList.course = res.data
      this.dataList.course.total == 0 ? (this.noData = true) : (this.noData = false)
    },
    // 专栏
    async getColumn() {
      const res = await api.getColumn(this.columnParams)
      this.dataList.column = res.data
      this.dataList.column.total == 0 ? (this.noData = true) : (this.noData = false)
    },
    // 翻页
    getCurrentPage(currentPage) {
      if (this.activeTab === 'course') {
        this.courseParams.pageNum = currentPage
      } else {
        this.columnParams.pageNum = currentPage
      }
    },
    // 跳转到---课程详情页--讲堂
    courseDetail(courseItem) {
      window.open(`/courseDetail/${courseItem.id}`)
    },
    // 跳转到---专栏详情页--讲堂
    columnDetail(columnItem) {
      window.open(`/columnDetail/${columnItem.id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.courseRoom {
  width: 1100px;
  overflow: hidden;
  li:nth-child(4n) {
    margin-right: 0;
  }
  .tabChange {
    font-size: 16px;
    margin: 20px 20px 26px 0;
    > span {
      cursor: pointer;
      margin-right: 20px;
    }
    .active {
      position: relative;
      color: #e43c31;
    }
    .active::after {
      content: '';
      display: inline-block;
      position: absolute;
      bottom: -10px;
      left: 5px;
      height: 3px;
      width: 24px;
      background-color: #e43c31;
    }
  }
  .no-content {
    min-height: calc(100vh - 215px);
    padding: 20px 0;
    text-align: center;
    p {
      height: 14px;
      line-height: 14px;
      font-size: 15px;
      color: rgba(188, 188, 196, 1);
      text-align: center;
    }
  }
}
</style>
