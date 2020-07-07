<template>
  <div>
    <groupEdit ref="group-edit" :groupDetail="groupDetail" />
    <div class="button-list">
      <el-button type="danger" @click="submit">提交审核</el-button>
    </div>
  </div>
</template>

<script>
import api from '@/fetch'
import groupEdit from '../../components/groupEdit'

export default {
  components: {
    groupEdit
  },
  props: {
    groupDetail: Object
  },
  methods: {
    async submit() {
      try {
        await api.groupPredicate(this.$store.state.userInfo.accountId)
        this.$refs['group-edit'].submitForm()
      } catch (error) {
        // this.$message.warning(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.button-list {
  border-top: 1px solid #dddddd;
  padding: 20px 0;
  text-align: center;
  margin: 0 -20px;
  .el-button {
    width: 90px;
  }
}
</style>
