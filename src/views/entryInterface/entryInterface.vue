<template>
  <div class="entry">
    <!-- <div class="contain"> -->
    <router-view />
    <!-- </div> -->
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.entry {
  // min-width: 1300px;
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    .password {
      position: relative;
      .closeeyes {
        position: absolute;
        top: 0;
        right: 10px;
      }
    }
    .checkPass {
      position: relative;
      .closeeyes {
        position: absolute;
        top: 0;
        right: 10px;
      }
    }
  }
  /deep/.el-card .el-card__body {
    // padding:30px 0 0 0!important;
    padding: 0 !important;
  }
  /deep/.el-form-item__content {
    margin-left: auto !important;
  }
  /deep/.el-input .el-input__inner {
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    border-radius: 0;
    padding: 0;
  }
  /deep/.el-button {
    width: 100%;
    span {
      font-size: 16px;
    }
  }
}
</style>
