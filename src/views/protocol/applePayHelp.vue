<template>
    <div class="main">
        <div class="title">充值引导流程</div>
        <p>1. 检查APP购买项目的访问限制是否打开：（步骤：设置－通用－限制），如下图</p>
        <img :src="require('@/assets/images/applepay/applepay2.jpg')">
        
        <p>检查ios版本更新至10.1.1及以上：（步骤：设置－通用－关于本机），如下图：</p>
        <img :src="require('@/assets/images/applepay/applepay3.jpg')">
        
        <p>2. 打开苹果AppStore</p>
        <img :src="require('@/assets/images/applepay/applepay4.jpg')">
        
        <p>3. 点击精品推荐页面底部的“绑定支付宝”或“绑定微信支付”</p>
        <img :src="require('@/assets/images/applepay/applepay5.jpg')">
        
        <p>4. 选择您常用的支付账户，可填写支付宝账户或授权微信支付完成账号绑定</p>
        <img :src="require('@/assets/images/applepay/applepay6.jpg')">
    
        <p>5. 返回“百工驿”APP，在“我的”页面点击“我的钱包”</p>
        <img :src="require('@/assets/images/applepay/applepay7.jpg')">
        
        <p>6. 点击“充值”，选择要充值的金额</p>
        <img :src="require('@/assets/images/applepay/applepay9.png')">
        
        <p>7. 按照系统提示，输入AppleID等信息</p>
        <img :src="require('@/assets/images/applepay/applepay8.jpg')">
        
        <p>8. 充值完成后就可以去购买感兴趣的内容啦～</p>
        
        <p>注：如果您已扣款，但充值未成功，可能是充值到了App Store余额中（验证方法：打开App Store，滑到最下方查看余额）。此时您仅需再次在百工驿中充值相应的金额，即可充值成功。</p>

    </div>
</template>
<script>
require('@/assets/js/lib-flexible/index.min.js')
export default {
    
}
</script>
<style lang="less">
body{
    font-family: "PingFangSC-Regular";
    min-width: 8.5rem !important;
    max-width: 10rem !important;
    margin: 0 auto;
}
.main {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
    padding: .35rem .35rem 0 .35rem;
    overflow: hidden;
    font-weight: 400;
    background: #fff;
    font-size: .37rem;
    line-height: .53rem;
    color: #666;
    p{
        font-size: .37rem;
        margin: .4rem 0;
    }
    .title{
        font-size: .4rem;
        line-height: .64rem;
        color: #333;
        text-align: center;
    }
    .bold{
        font-weight: 600;
    }
    img{
        display: block;
        max-width: 80%;
        margin: 0 auto;
    }
}
</style>