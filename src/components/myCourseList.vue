<!--课程列表-->
<template>
  <div class="course">
    <ul class="classList">
      <!--@click.stop="$emit('courseDetail',item)"-->
      <li class="line" v-for="(item,index) in dataList.course.records" :key="index">
        <div class="classPic"><img :src="$store.state.imageDomain + item.image" alt=""></div>
        <div class="classInfo">
          <span class="font-14 content">{{item.name}}</span>
          <div class="price ">
            <i :class="item.price > 0 ? 'red' : 'purple'">{{item.price>0 ? '&yen;'+item.price : '免费' }}</i>
            <div class="tag">
              <span class="font-12 update">{{item.type===1? '音频': '视频'}}</span>
              <div>
                <el-tag v-if="item.status===2000" type="primary" plain size="mini">草稿</el-tag>
                <el-tag v-if="item.status===1002" type="success" plain size="mini">已发布</el-tag>
                <el-tag v-if="item.status===1000" type="warning" plain size="mini">待审核 </el-tag>
                <el-tag v-if="item.status===1001" type="danger" plain size="mini">审核驳回</el-tag>
              </div>
            </div>
          </div>
        </div>
        <div class="otherInfo">
          <div class="time">{{item.updateTime | formatDate}}</div>
          <div class="font-12 handle">
            <template v-if="item.status===2000 || item.status===1001">
              <span @click.stop="pushEditCourse(item.id)">编辑</span>
              <span @click.stop="onDelete(item.id)">删除</span>
            </template>
            <span v-if="item.status===1002&&(item.price==0||item.purchaseCount==0)" @click.stop="downCourse(item.id)">下架课程</span>
          </div>
        </div>
      </li>
    </ul>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination hide-on-single-page @current-change="handleCurrentChange" :page-size.sync="dataList.course.size" layout="prev,slot, next, total" :total="dataList.course.total">
        <slot>
          <span>第
            <i>{{dataList.course.current}}/{{dataList.course.pages}}</i>页</span>
        </slot>
      </el-pagination>
    </div>
 <perfectTeacherInfo :dialogVisible="dialogVisible2"></perfectTeacherInfo>
  </div>
</template>

<script>
import api from '@/fetch'
import perfectTeacherInfo from '@/components/perfectTeacherInfo'
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
   components: {
    perfectTeacherInfo
  },
  data() {
    return {
      dialogVisible2:false,  //完善信息组件弹框
      dialogVisible: false, // 创建课程弹框
      currentPath: this.$route.path
    }
  },
  methods: {
    // 翻页
    handleCurrentChange(val) {
      this.$emit('getCurrentPage', val)
    },
    // 下架课程
    downCourse(id) {
       this.infoWasComplete(()=>{
            if(this.dialogVisible2==false){
            this.$emit('downCourse', id)
         }
        });
    },
    // 删除
    onDelete(id) {
        this.infoWasComplete(()=>{
            if(this.dialogVisible2==false){
             this.$emit('onDelete', id)
         }
        });
    },
    pushEditCourse(id){

        this.infoWasComplete(()=>{
          if(this.dialogVisible2==false){
            this.$router.push('/myLecture/editCourse/'+id)
          }
        })
    },
    //判断讲师信息是否完善
    infoWasComplete(fun) {
      api.myLecturerInfo(this.$store.state.userInfo.accountId).then(res => {
        if (res.data) {
          // console.log(res);
          //  if(res.data.applyType == 2 && res.data.status == 1002){
          //    this.dialogVisible2=true;
          //  }
          if(!res.data.teacherInfoWasComplete){
            if(res.data.applyType == 3 && res.data.status != 1002){
              fun();
              return;
            }
            this.dialogVisible2 = true;
          } else {
            fun()
          }
        }
      })
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
    .line::after {
      content: '';
      display: block;
      height: 1px;
      width: 100%;
      position: absolute;
      bottom: 48px;
      left: 0;
      background-color: #ddd;
    }
    li {
      float: left;
      width: 260px;
      height: 346px;
      border-radius: 10px;
      background-color: #fff;
      margin-bottom: 20px;
      position: relative;
      border: 1px solid #e7e8ec;
      box-sizing: border-box;
      margin-right: 20px;
      .classPic {
        width: 100%;
        height: 174px;
        box-sizing: border-box;
        border-bottom: 1px solid #e7e8ec;
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
        .content {
          width: 100%;
          text-overflow: ellipsis;
          /* white-space: nowrap; */
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          display: -webkit-box;
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        .photoInfo {
          .photo {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            margin-right: 8px;
          }
        }
        .time {
          flex: 1;
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
  } // 分页
  .pagination {
    margin: 30px 0 70px;
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
