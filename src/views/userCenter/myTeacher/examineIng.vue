<template>
  <div class='examineIng'>
      <div class='examineIng_nav'>
      <p>讲师入驻</p>
      </div>
      <div class='shenhe'>
            <h5>审核中</h5>
            <img src="@/assets/images/dengdai.png" alt="">
            <p v-if='type==1'>您已成功提交信息修改申请，信息审核需3-5个工作日，请耐心等待！</p>
            <p v-else>您已成功提交入驻申请，信息审核需3-5个工作日，请耐心等待！</p>
      </div>
  </div>
</template>
<script>
import api from '@/fetch'
export default {
    data() {
        return {
            checked: false,
            type: 0 //0是入驻申请申请，1是修改申请
        }
    },
    mounted () {
        this.myLecturerInfo();
    },
    methods: {
        myLecturerInfo() {
            api.myLecturerInfo(this.$store.state.userInfo.accountId).then(res => {
            if (res.data) {
                this.switchType(res.data);
            }
            })
        },
        //申请的status都是1000,所以不惜判断status判断是修改还是入驻的申请，applyType=1是入驻，=2,3分别是修改申请和完善申请。    
        switchType(data){
            if(data.applyType == 2){
                this.type=1;
            }else if(data.applyType == 3){
                this.type=1;
            }else if(data.applyType == 1){
                this.type=0;
            }
        }
    }
}
</script>
<style lang="less" scoped>
.examineIng{
    height:100%;
    width:100%;
    background:#fff;
    border-radius:10px;
    .shenhe{
         display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 300px;
        >h5{
            text-align: center;
            padding:50px 0;
            font-size: 18px;
            color:#4A4A4A;
            font-weight: 600;
        }
        >img{
            width:52px;
            height: 56px;
            margin:0 auto;
        }
        >p{
            text-align: center;
            color:#666666;
            padding-top: 15px;
        }
    }

    .examineIng_nav {
        width: 100%;
        height: 50px;
        padding: 0 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #dddddd;
        background: #fff;
        border-radius: 10px 10px 0 0;
        > p {
             width: 100%;
            color: #4a4a4a;
            font-size: 16px;
            line-height: 50px;
        }
    }
}
</style>

