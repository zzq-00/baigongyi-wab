<template>
    <div class="container">
    <h4 class="cursor-pointer" @click="back"><i class="el-icon-arrow-left"></i>返回</h4>
    <div  class="approving">
      <span>审核中</span>
      <span
        ><i class="el-icon-success"></i
        >管理员审核通过后发布成功，请耐心等待！</span
      >
    </div>
    </div>
</template>

<script>
    export default {
        methods:{
            back(){
                this.$router.push("publish");
            }
        }
    }
</script>

<style lang="less" scoped>
.container {
  border-radius: 10px;
  margin: 21px auto 29px;
  height:calc(100vh - 200px);
  background-color: #fff;
  position: relative;
  .cursor-pointer{
    cursor: pointer;
  }
  > h4 {
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #dddddd;
    padding-left: 20px;
    font-weight: normal;
  }
  .approving {
    width: 100%;
    background-color: #fff;
    position: absolute;
    top: 30%;
     span:nth-child(1) {
      display: block;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    span:nth-child(2) {
      display: block;
      text-align: center;
      i {
        display: inline-block;
        margin-right: 5px;
        font-size: 2em;
        color: #f33535;
        vertical-align: middle;
      }
    }
  }
}
</style>