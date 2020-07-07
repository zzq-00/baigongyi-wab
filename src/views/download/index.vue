<template>
    <div id="download">
        <img class="bg" src="@/assets/images/download/bg.png" alt="">
        <div class="content">
            <img src="@/assets/images/download/content.png" alt="">
            <button class="top-btn android" 
                onclick="window.location.href = 'https://resource.baigongyi.com/update/baigongyi.apk'"></button>
            <button class="top-btn iphone" 
                onclick="window.location.href = 'https://apps.apple.com/cn/app/id1213676558'"></button>
            <button class="bottom-btn android" 
                onclick="window.location.href = 'https://resource.baigongyi.com/update/baigongyi.apk'"></button>
            <button class="bottom-btn iphone" 
                onclick="window.location.href = 'https://apps.apple.com/cn/app/id1213676558'"></button>
        </div>
        <!--默认隐藏层-->
        <div class="wechat_cover" v-if="showCover">
            <img src="@/assets/images/download/weixin-tip.png" alt="">
        </div>
    </div>
</template>

<script type="text/javascript">

import api from "@/fetch"
import { share} from '@/assets/js/shareUtil.js'
export default {
    data() {
        return {
            showCover: false,
            shareConfig: {}
        }
    },
    mounted() {
        document.getElementsByTagName('meta')[name='viewport'].content = "width=device-width,initial-scale=0.1,user-scalable=no,maximum-scale=1.0";
        let ua = window.navigator.userAgent;
        let isWeixin = ua.match(/MicroMessenger/i) == "MicroMessenger";
        if(isWeixin) {
            this.showCover = true;
            this.shareConfig.wechat_title = "百工驿";
            this.shareConfig.wechat_desc = "工程人的社交、学习平台";
            this.shareConfig.wechat_images0 = this.$store.state.imageDomain + "images/baigongyi.png";
            // 分享参数
            api.getShareConfig()
            .then(respose =>{
                this.shareConfig.appId = respose.appId;
                this.shareConfig.timestamp = respose.timestamp;
                this.shareConfig.nonceStr = respose.nonceStr;
                this.shareConfig.signature = respose.signature;
                this.shareConfig.url = respose.url;
                share(this.shareConfig);
            });
        } else {
            // 判断Android和iOS
            if (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1) {
                setTimeout(function(){
                    window.location.href = "https://resource.baigongyi.com/update/baigongyi.apk"
                }, 500);
            } else if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                setTimeout(function() {
                    window.location.href = "https://apps.apple.com/cn/app/id1213676558"
                }, 500);
            }
        }

    }
}
</script>

<style lang="less">
#download{
    position: relative;
    .bg{
        width: 100%;
        height: 660px;
    }
    .content{
        width: 1200px;
        margin: -657px auto 0;
        position: relative;
        .top-btn {
            height: 58px;
            width: 245px;
            opacity: 0;
            cursor: pointer;
            position: absolute;
            top: 485px;
            left: 0;
        }
        .top-btn.iphone {
            left: 270px;
        }
        .bottom-btn {
            height: 58px;
            width: 245px;
            opacity: 0;
            cursor: pointer;
            position: absolute;
            top: 5055px;
            left: 340px;
        }
        .bottom-btn.iphone {
            left: 619px
        }
    }
    .wechat_cover{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        background: rgba(0,0,0,0.8);
        text-align: center;
        img{
            width: 80%;
            height: auto;
        }
    }
}
</style>
