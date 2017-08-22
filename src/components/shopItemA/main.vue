<!--
    desc: 公寓馆:热门、精选公寓item
-->
<style rel="stylesheet/less" lang="less" scoped>
    @fontsize28: 14px;
    @fontsize30: 15px;
    .shopItemA {
        display: block;
        width: px2rem(348px);
        background: #fff;
        .siImgBox {
            width: 100%;
            height: px2rem(290px);
            background: data-uri("//img.58cdn.com.cn/fangrs/img/fc300c8ddfacf1382e195cb8f3b861e0.png") no-repeat;
            background-size: cover;
            text-align: center;
            .siImg {
                margin: px2rem(44px) auto px2rem(16px);
                width: px2rem(142px);
                height: px2rem(142px);
                border-radius: 50%;
            }
            .siTitle {
                width: 100%;
                height: px2rem(35px);
                line-height: px2rem(35px);
                text-align: center;
                font-size: @fontsize30;
                color: #fff;
            }
        }
        .siDescBox {
            width: 100%;
            height: px2rem(110px);
            display: -webkit-flex;
            display: flex;
            -webkit-justify-content: center;
            -webkit-align-items: center;
            justify-content: center;
            align-items: center;
            .sidCoupon {
                text-align: center;
                height: px2rem(60px);
                line-height: px2rem(60px);
                min-width: px2rem(270px);
                width: -webkit-fit-content;
                width: fit-content;
                border-radius: px2rem(30px);
                background: #f42f2f;
                color: #fff;
                font-size: @fontsize28;
                padding: 0 px2rem(14px);
                box-sizing: border-box;
                -webkit-box-sizing: border-box;
                overflow: hidden;
            }
        }
    }
</style>

<template>
    <a class="shopItemA" @click="handlerClick">
        <div class="siImgBox">
            <img class="siImg" v-lazy="detail.shopLogo">
            <div class="siTitle">{{detail.shopName}}</div>
        </div>
        <div class="siDescBox">
            <div class="sidCoupon">{{detail.shopMaxCoupon}}</div>
        </div>
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
                        maidian: "",
                        nativeApp: "",
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