<!--课程列表-->
<template>
  <div class="course">
    <ul class="classList">
      <li class="line" v-for="(item,index) in dataList.course.records" :key="index" @click.stop="$emit('courseDetail',item)">
        <div class="classPic"><img :src="$store.state.imageDomain + item.image" alt=""></div>
        <div class="classInfo">
          <span class="font-14 titles">{{strReplace(item.name)}}</span>
          <div class="price ">
            <i :class="item.price > 0 ? 'red' : 'purple'">{{item.price>0 ? '&yen;'+item.price : '免费' }}</i>
            <div class="tag">
              <span class="font-12 update">{{item.type===1? '音频': '视频'}}</span>
              <div v-if="currentPath ==='/myLecture'">
                <el-tag v-if="item.status===2000" type="primary" plain size="mini">草稿</el-tag>
                <el-tag v-if="item.status===1002" type="success" plain size="mini">已发布</el-tag>
                <el-tag v-if="item.status===1000" type="warning" plain size="mini">待审核 </el-tag>
                <el-tag v-if="item.status===1001" type="danger" plain size="mini">审核驳回</el-tag>
              </div>
            </div>
          </div>
        </div>
        <div class="otherInfo">
          <div class="photoInfo clearfix" v-if="currentPath!=='/myLecture'">
            <img @click.stop="openTeacherHome(item.accountId)" :src="item.avatar?$store.state.imageDomain + item.avatar : require('@/assets/images/err-header-icon01.png')" class="photo fl">
            <div @click.stop="openTeacherHome(item.accountId)" class="name font-12 fl">{{item.realName}}</div>
          </div>
          <div class="time">{{item.auditTime | formatDate}}</div>
          <div v-show="currentPath==='/myLecture'" class="font-12 handle">
            <template v-if="item.status===2000 || item.status===1001">
              <span @click.stop="$router.push('/myLecture/editCourse/'+item.id)">编辑</span>
              <span @click.stop="onDelete(item.id)">删除</span>
            </template>
            <span v-if="item.status===1002&&(item.price==0||!item.purchaseStatus)" @click.stop="downCourse(item.id)">下架课程</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="no-data-style" v-if="dataList.course.total==0">
      <img src="@/assets/images/No-courses.png" alt="">
      <p>暂无课程</p>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination hide-on-single-page @current-change="handleCurrentChange" :current-page.sync="dataList.course.current" :page-size.sync="dataList.course.size" layout="prev,slot, next, total" :total="dataList.course.total">
        <slot>
          <span>
            第<i>{{dataList.course.current}}/{{dataList.course.pages}}</i>页
          </span>
        </slot>
      </el-pagination>
    </div>

  </div>
</template>

<script>
import api from '@/fetch'
export default {
  // 课程状态码：
  // DRAFT(2000, "草稿"),;
  // APPROVING(1000, "审核中"),
  // REJECT(1001, "审核驳回"),
  // AGREE(1002, "审核通过"),
  name: 'CourseList',
  props: {
    dataList: Object
  },
  data() {
    return {
      dialogVisible: false, // 创建课程弹框
      currentPath: this.$route.path
    }
  },
  methods: {
    strReplace(str) {
      if (str.length > 26) {
        return str.slice(1, 26) + '...'
      } else {
        return str
      }
    },
    // 翻页
    handleCurrentChange(val) {
      this.$emit('getCurrentPage', val)
    },
    // 下架课程
    downCourse(id) {
      this.$emit('downCourse', id)
    },
    // 删除
    onDelete(id) {
      this.$emit('onDelete', id)
    }
  }
}
</script>

<style lang="less" scoped>
.course {
  .classList {
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    width: calc(100% + 20px);
    .line {
      cursor: pointer;
    }
    .line::after {
      content: '';
      display: block;
      height: 1px;
      width: 100%;
      position: absolute;
      bottom: 48px;
      left: 0;
      background-color: #f4f4f4;
    }
    li {
      width: 260px;
      float: left;
      height: 346px;
      border-radius: 10px;
      background-color: #fff;
      margin-right: 20px;
      margin-bottom: 20px;
      position: relative;
      border: 1px solid #f4f4f4;
      box-sizing: border-box;
      .classPic {
        width: 100%;
        height: 174px;
        box-sizing: border-box;
        border-bottom: 1px solid #f4f4f4;
        img {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          width: 100%;
          height: 174px;
        }
      }
      .classInfo {
        padding: 20px 20px 22px 20px;
        height: 121px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        .titles {
          display: block;
          width: 100%;
          color: #333333;
        }
        .price {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .tag {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .red,
          .purple {
            font-size: 16px;
          }
          .update {
            padding: 3px 9px;
            background-color: #f2f2f2;
            border-radius: 5px;
            margin-right: 3px;
          }
        }
      }
      .otherInfo {
        padding: 0 12px;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .photoInfo {
          .name {
            max-width: 90px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: keep-all;
          }
          .photo {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            margin-right: 8px;
            margin-top: 13px;
          }
        }
        .time {
          font-size: 12px;
          color: #999;
        }
        .handle {
          > span {
            cursor: pointer;
            padding: 3px 9px;
            border-radius: 16px;
            border: 1px solid #dddddd;
            & + span {
              margin-left: 3px;
            }
          }
        }
      }
    }
  }
  .no-data-style {
    margin-top: 82px;
    text-align: center;
    p {
      margin-top: 10px;
      height: 14px;
      line-height: 14px;
      font-size: 15px;
      color: rgba(188, 188, 196, 1);
    }
  }
  // 分页
  .pagination {
    margin: 20px 0 30px;
    text-align: center;
    /deep/.el-pagination .btn-next,
    /deep/.el-pagination .btn-prev {
      width: 40px;
      height: 40px;
      padding-right: auto;
      .el-icon-arrow-left:before,
      .el-icon-arrow-right:before {
        font-size: 20px;
      }
    }
    /deep/.el-pagination {
      slot {
        span {
          font-size: 20px;
          margin: 6px 20px 0;
          color: #999;
          font-weight: normal;
        }
      }
      .el-pagination__total {
        margin: 6px 0 0 20px;
        font-size: 20px;
        color: #999;
        font-weight: normal;
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
</style>
