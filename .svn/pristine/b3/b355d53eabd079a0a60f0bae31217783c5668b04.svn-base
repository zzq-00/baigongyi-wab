<template>
<el-dialog
  :visible.sync="dialogVisible"
  width="30%"
  :showClose="false"
  :center="true"
  :close-on-click-modal="false">
  <div class="pleasePrefect">您的讲师资料尚未完善，请先完善资料！</div>
  <div class="prefectButton"><el-button class="prefect-button" @click="$router.push('/applyTeacher/seeinformation?isPrefect=true')" >前往完善</el-button></div>
</el-dialog>
</template>

<script>
    export default {
        props: {
          dialogVisible:{
              default:false
          }
        },
      data() {
          return {

          }
      },
      methods: {
          name() {

          }
      },
      mounted () {
          console.log(this.dialogVisible);
      },
    }
</script>

<style lang="less" scoped>
  .pleasePrefect{
      text-align:center;
  }
  .prefectButton{
      .prefect-button{
          display:block;
          width:100px;
          margin:20px auto 15px;
      }
  }
</style>
