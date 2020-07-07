<template>
  <div class="dissolve">
    <p>
      <span>解散圈子</span>
      <span>说明：当前圈子内无发言、无其他成员才可以解散。</span>
    </p>
    <el-button type='danger' :disabled="!disabled" @click="delGroup">解散圈子</el-button>
  </div>
</template>

<script>
import api from '@/fetch/group'
export default {
  data() {
    return {
      disabled: false // true可以解散 false不可以
    }
  },
  methods: {
    delGroup() {
      this.$confirm('是否确定解散当前圈子？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api.delGroup(this.$route.params.id).then(res => {
            this.$message.success('圈子已解散')
            this.$router.replace('/engineering/myGroup/managed')
          })
        })
        .catch(() => {})
    },
    showDelGroupButton() {
      api.showDelGroupButton(this.$route.params.id).then(res => this.disabled = res.data)
    },
  },
  created() {
    this.showDelGroupButton()
  }
}
</script>

<style lang="less" scoped>
.dissolve {
  width: 700px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(221, 221, 221, 1);
  border-radius: 5px;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
