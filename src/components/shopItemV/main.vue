<!--
    desc: 店铺item
-->
<style rel="stylesheet/less" lang="less" scoped>
    @diam: px2rem(120px);
    @fontSize28: 14px;
    .shopItemV {
        display: block;
        width: px2rem(226px);
        height: px2rem(280px);
        background: data-uri("./images/shopItemV_bg.png") no-repeat;
        background-size: cover;
        padding: px2rem(20px) 0 0;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        margin: 0 0 px2rem(20px);
        .shopPic {
            width: @diam;
            height: @diam;
            border-radius: 50%;
            margin: 0 auto;
            img {
                width: @diam;
                height: @diam;
                border-radius: 50%;
            }
        }
        .shopTitle {
            height: px2rem(70px);
            padding: px2rem(14px) 0 0;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            text-align: center;
            font-size: @fontSize28;
            color: #000;
            white-space: nowrap;
        }
        .shopCoupon {
            text-align: center;
            font-size: @fontSize28;
            line-height: px2rem(80px);
            color: #fff;
        }
    }
</style>

<template>
    <a class="shopItemV" @click="handlerClick">
        <div class="shopPic">
            <img v-lazy="detail.shopLogo">
        </div>
        <div class="shopTitle">{{detail.shopName}}</div>
        <div class="shopCoupon">{{detail.shopMaxCoupon}}</div>
    </a>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            detail: {
                type: Object,
                default: function () {
                    return {
                        shopId: "",
                        shopName: "",
                        shopLogo: "",
                        shopUrl: "",
                        shopMaxCoupon: "",

                        loadPage: "",
                        nativeApp: "",
                        maidian: "",
                    }
                }
            },
            maidian: {
                type: String,
                default: ''
            },
        },
        methods: {
            handlerClick(event){
                let _detail = this.detail;
                this.$commonSendLogJump(this.maidian, '', _detail.nativeApp, _detail.loadPage, _detail.shopUrl)
            }
        },
    };
</script>