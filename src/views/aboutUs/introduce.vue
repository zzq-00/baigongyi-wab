<template>
    <div>
       <div class="main_introduce">
                <img src="@/assets/images/introduce.png" style="float:left;width:530px;height:475px;margin:22px 0 0 60px">
            <div class="main_content">
                <span class="content_title">百工驿</span>
                <div></div>
                <span class="content_word">由青矩技术旗下子公司</span><br/>
                <span class="content_word">北京青矩互联科技有限公司倾力打造:</span><br/>
                <span class="content_word">国内工程行业首个—— </span><br/>
                <span class="content_word">集人才服务、学习交流、资讯阅读、社交娱乐 </span><br/>
                <span class="content_word">于一体的垂直社区类平台(App+Web)。</span><br/>
                <span style="display:block;color:#333333;font-size:24px;margin:20px 0 10px">聚百工之驿，悟工程之道</span>
                <span class="content_word">通过资讯服务，培训学习、</span><br/>
                <span class="content_word">问答交流以及视频分享等功能，共享创意互联生活。</span>
            </div>
       </div>
       <div class="foot_box">
           <footerComponents></footerComponents>
       </div>
    </div>
</template>

<script>
import footerComponents from '@/components/footerComponents.vue'
    export default {
        components: {
            footerComponents,
        },
    }
</script>

<style lang="less" scoped>

.main_introduce{
    margin-top:2px;
    width:1100px;
    min-height:550px;
    background:#FFF;
    overflow: hidden;
    .main_content{
         float:left;
        .content_title{
            margin-top:80px;
            display: block;
            font-size:32px;
            font-family:Microsoft YaqiHei;
            font-weight:bold;
            color:rgba(51,51,51,1);
        }
        .content_word{
            font-size:18px;
            font-family:PingFang SC;
            font-weight:300;
            color:#7A859B;
            line-height:30px;
        }
    }
}
.foot_box{
    position:fixed;
    bottom:40px;
    left:0;
    width:100%;
}
</style>