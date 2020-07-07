<template>
    <div class='modifiedSuccess'>
        <div class='modifiedSuccess_nav'>
            <div>
                <p v-if='Identification==1'>修改登录密码</p>
                <p v-if='Identification==2'>修改支付密码</p>
                <p v-if='Identification==3'>修改绑定手机</p>
                <div>
                    <p>
                        <em>1</em>
                        <span>验证身份</span>
                    </p>
                    <span></span>
                    <p>
                        <em>2</em>
                        <span v-if='Identification==1'>修改密码</span>
                        <span v-if='Identification==2'>重置支付密码</span>
                        <span v-if='Identification==3'>修改手机</span>
                    </p>
                    <span></span>
                    <p>
                        <em>3</em>
                        <span>完成</span>
                    </p>
                </div>
            </div>
        </div>
        <div class='modifiedSuccess_main'>
            <div>
                <p v-if='Identification==1'>修改密码成功！</p>
                <p v-if='Identification==3'>修改手机成功！</p>
                <p v-if='Identification==2'>修改支付密码成功！</p>
                <img src='@/assets/images/pic.png'>
                <button v-if='Identification==1' @click='$router.push("/login")'>重新登录</button>
                <button v-if='Identification==2' @click='$router.push("/safetySet")'>返回安全设置</button>
                <button v-if='Identification==3' @click='$router.push("/login")'>重新登录</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            Identification: 0
        }
    },
    mounted() {
        this.Identification = this.$route.query.Identification;
    },
    methods: {

    }
}
</script>
<style lang="less" scoped>
.modifiedSuccess {
    width: 100%;
    height: 100vh;
    background: #fff;
    margin-top: 20px;
    border-radius: 10px 10px 0 0;
}

.modifiedSuccess_nav {
    >div {
        width: 100%;
        height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #dddddd;
        background: #fff;
        border-radius: 10px 10px 0 0;
        >p {
            color: #4a4a4a;
            font-size: 16px;
            line-height: 50px;
        }
        >div {
            display: flex;
            box-sizing: border-box;
            >p {
                >em {
                    width: 21px;
                    height: 21px;
                    border: 1px solid #e23732;
                    border-radius: 50%;
                    color: #ffffff;
                    display: inline-block;
                    background: #e23732;
                    margin-top: 14px;
                    line-height: 22px;
                    text-align: center;
                    font-style:normal;
                }
                >span {
                    font-weight: 500;
                    color: #333333;
                    padding-left: 10px;
                    display: inline-block;
                    margin-top: 14px;
                    line-height: 22px;
                }
            }
            >span {
                display: inline-block;
                height: 2px;
                width: 40px;
                background: #000000;
                margin: 24px 10px 0;
            }
        }
    }
}

.modifiedSuccess_main {
    width: 100%;
    height: 100%;
    >div {
        width: 180px;
        margin: 60px auto 0;
        >p {
            color: #4A4A4A;
            font-size: 18px;
            font-weight: 600;
            padding-bottom: 20px;
            text-align: center;
        }
        >img {
            display: block;
            width: 60px;
            height: 60px;
            margin: 0 auto;
        }
        >button {
            margin-left: 35px;
            margin-top: 50px;
            width: 110px;
            height: 34px;
            background: #E23732;
            color: #fff;
            border-radius: 5px;
            &:hover {
                cursor: pointer;
            }
        }
    }
}
em, i, s {
  font-style: normal;
  text-decoration: none;
}
</style>

