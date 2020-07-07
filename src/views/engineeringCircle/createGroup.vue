<template>
  <div class="container">
    <div class="navs">
      <h4 v-if="!$route.params.id" style="font-weight: normal;">申请创建圈子</h4>
      <el-breadcrumb separator="/" v-else>
        <el-breadcrumb-item :to="{ path: '/engineering/myGroup/joined' }">我的圈子</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/engineering/myGroup/applyGroup' }">我的申请</el-breadcrumb-item>
        <el-breadcrumb-item>再次申请</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-area">
      <groupEdit ref="group-edit" :groupDetail="groupDetail" />
    </div>
    <div class="footer-create">
      <div v-if="!$route.params.id">
        <el-checkbox v-model="checked">我已阅读并同意 <span class="red">
            <router-link to="/agreement/circle">《圈子使用协议》</router-link>
          </span> </el-checkbox>
      </div>
      <div class="button-list">
        <el-button type="danger" @click="submit">提交申请</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
import groupEdit from './components/groupEdit'
export default {
  components: {
    groupEdit
  },
  data() {
    return {
      checked: false,
      groupDetail: {}
    }
  },
  watch: {
    $route: {
      // 再次申请圈子
      handler: function(val) {
        if (val.params.id) {
          this.checked = true
          api.getGroupDetail(val.params.id).then(res => (this.groupDetail = res.data))
        }
      },
      immediate: true
    }
  },
  methods: {
    async submit() {
      if (!this.checked) return this.$message.warning('请同意圈子使用协议')
      try {
        await api.groupPredicate(this.$store.state.userInfo.accountId)
        this.$refs['group-edit'].submitForm()
      } catch (error) {
        // this.$message.warning(error)
      }
    }
  },
  created() {}
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
    padding: 10px 180px;
  }
  .footer-create {
    border-top: 1px solid #dddddd;
    padding: 8px 180px;
    .button-list {
      text-align: center;
      margin: 30px 0 20px;
      .el-button {
        width: 90px;
      }
    }
  }
}
</style>
