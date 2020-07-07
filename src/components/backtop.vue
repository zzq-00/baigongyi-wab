<template>
     <div  v-if="btnFlag" class="back-top" @click="backTop">
       <img  class="back-top-img" src="@/assets/images/zhidingpic.png" alt="">
      </div>
</template>

<script>
    export default {
          data() {
          return {
              btnFlag:false
          }
      },  
       methods:{
              // 点击图片回到顶部方法，加计时器是为了过渡顺滑
  backTop () {
      const that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
  },
 
  // 为了计算距离顶部的高度，当高度大于一屏显示回顶部图标，小于一屏则隐藏
  scrollToTop () {
    const height=document.documentElement.clientHeight;
    const that = this
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    that.scrollTop = scrollTop
    if (that.scrollTop > height) {
      that.btnFlag = true
    } else {
      that.btnFlag = false
    }
   }
       } ,
         mounted () {
           window.addEventListener('scroll', this.scrollToTop)
      },
    }
</script>

<style lang="less" scoped>
.back-top{
  position:fixed;
  bottom:50px;
  // right:calc((100% - 780px) / 2 + 80px);
  right:50px;
  width:40px;
  height:40px;
  border-radius:25px;
  z-index: 9999999999999;
   cursor: pointer;
}
</style>