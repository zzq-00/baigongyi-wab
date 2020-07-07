<template>
  <div class="container">
    <div class="navs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/engineering/myGroup/joined' }">我的圈子</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/engineering/myGroup/applyGroup' }">我的申请</el-breadcrumb-item>
        <el-breadcrumb-item>查看</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-area">
      <ul>
        <li>
          <span>圈子名称</span>
          <span>{{groupDetail.name}}</span>
        </li>
        <li>
          <span>圈子头像</span>
          <span>
            <img :src="$store.state.imageDomain+groupDetail.avatar" alt="">
          </span>
        </li>
        <li>
          <span>圈子简介</span>
          <span>{{groupDetail.description}}</span>
        </li>
        <li>
          <span>圈子类型</span>
          <span>{{groupDetail.type===1?'公开圈子':'私密圈子'}}</span>
        </li>
        <li>
          <span>圈子分区</span>
          <span>{{groupDetail.belongName}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
export default {
  components: {},
  data() {
    return {
      groupDetail: {}
    }
  },
  methods: {},
  created() {
    api.myGroupApplyRecord(this.$route.params.id).then(res => (this.groupDetail = res.data))
  }
}
</script>

<style lang="less" scoped>
.container {
  border-radius: 10px;
  margin: 21px auto 29px;
  background-color: #fff;
  .navs {
    font-size: 16px;
    height: 50px;
    border-bottom: 1px solid #dddddd;
    padding-left: 20px;
    font-weight: normal;
    display: flex;
    align-items: center;
  }
  .content-area {
    padding: 20px;
    min-height: 700px;
    > ul {
      > li {
        display: flex;
        & + li {
          margin-top: 28px;
        }
        > span {
          word-break: break-word;
          &:first-child {
            flex: 0 0 90px;
            color: #999;
          }
        }
        img {
          width: 120px;
          height: 120px;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
