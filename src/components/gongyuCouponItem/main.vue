<!--
    desc: 品牌公寓房源Item
-->
<style rel="stylesheet/less" lang="less" scoped>
    @import '../../asset/base';

    @radius: px2rem(10px);
    @padding: px2rem(20px);

    @fontSize22: 11px;
    @fontSize28: 14px;

    .gongyuCouponItem {
        display: block;
        width: px2rem(300px);
        height: px2rem(418px);
        border-radius: @radius @radius 0px 0px;
        .gyciBox {
            width: 100%;
            border-radius: @radius @radius 0px 0px;
            -webkit-box-shadow: 0 0 px2rem(18px) rgba(203, 216, 230, .8);
            box-shadow: 0 0 px2rem(18px) rgba(203, 216, 230, .8);
        }
        .gycImg {
            display: block;
            background: #fff;
            width: 100%;
            height: px2rem(200px);
            border-radius: @radius @radius 0px 0px;
        }
        .gycBox {
            background: #fff;
            position: relative;
            width: 100%;
            height: px2rem(200px);
            padding: @padding;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            .gycTitle {
                width: 100%;
                line-height: px2rem(32px);
                font-size: @fontSize22;
                color: #111;
                overflow: hidden;
            }
            .gycCoupon {
                position: absolute;
                right: px2rem(20px);
                bottom: px2rem(-20px);
                width: px2rem(96px);
                height: px2rem(110px);
                background: data-uri("./images/gongyuCouponItem_quan.png");
                background-size: 100% 100%;
                overflow: hidden;
                .jian {
                    display: block;
                    position: absolute;
                    top: px2rem(60px);
                    width: 100%;
                    font-size: @fontSize22;
                    height: px2rem(30px);
                    line-height: px2rem(30px);
                    color: #fff;
                    text-align: center;
                }
            }
            .gycPrice {
                position: absolute;
                left: px2rem(20px);
                bottom: px2rem(24px);
                color: #ff0000;
                font-size: @fontSize28;
            }
        }
    }
</style>
<template>
    <a class="gongyuCouponItem"
       @click="handlerClick">
        <div class="gyciBox">
            <img class="gycImg" v-lazy="detail.gongyuPic+'?w=240'">
            <div class="gycBox">
                <div class="gycTitle">{{detail.gongyuTitle}}</div>
                <div class="gycCoupon" v-if="detail.gongyuMaxCoupon.length>0">
                    <i class="jian">{{detail.gongyuMaxCoupon}}</i>
                </div>
                <div class="gycPrice">{{detail.gongyuPrice | price}}</div>
            </div>
        </div>
    </a>
</template>
<script>
    export default {
        props: {
            detail: {
                type: Object,
                default: function () {
                    return {
                        gongyuId: "",
                        gongyuTitle: "",
                        gongyuPrice: "",
                        gongyuPic: "",
                        gongyuUrl: "",
                        gongyuMaxCoupon: "",

                        pageType: '',
                        loadPage: "",
                        maidian: "",
                        nativeApp: ""
                    }
                }
            },
            maidian: {
                type: String,
                default: '',
            },
        },
        filters: {
            price(value) {
                return "¥ " + value + "/月";
            }
        },
        methods: {
            handlerClick(event){
                let _detail = this.detail;
                this.$commonSendLogJump(this.maidian, '', _detail.nativeApp, _detail.loadPage, _detail.gongyuUrl)
            }
        },
    }
</script>
