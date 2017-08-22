<!--
    desc: 公寓房源包装器
-->
<style rel="stylesheet/less" lang="less" scoped>
    .gongyuWrap {
        width: 100%;
        margin: 0 auto px2rem(50px);
        .gywBox {
            padding: px2rem(26px);
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            background: #e6f0f0;
            .gywTitle {
                font-size: px2rem(50px);
                line-height: px2rem(60px);
                color: #000;
                text-align: center;
            }
            .gywDesc {
                line-height: px2rem(42px);
                font-size: px2rem(22px);
                color: #0f1010;
                text-align: center;
                margin: 0 0 px2rem(24px);
            }
            .gywList {
                height: auto;
                display: -webkit-flex;
                display: flex;
                -webkit-flex-flow: row nowrap;
                -webkit-justify-content: space-between;
                -webkit-align-items: center;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                padding: 0 0 px2rem(10px);
            }
        }
        .gywMore {
            display: block;
            height: px2rem(80px);
            line-height: px2rem(80px);
            background: rgba(255, 255, 255, 0.5);
            font-size: px2rem(22px);
            color: #070c11;
            text-align: center;
            i {
                margin: 0 px2rem(10px) px2rem(-4px);
                display: inline-block;
                width: px2rem(22px);
                height: px2rem(22px);
                border-radius: 50%;
                background: #4284af;
                background: data-uri("./images/gongyuWrap_more.png") no-repeat;
                background-size: cover;
            }
        }
    }
</style>

<template>
    <section class="gongyuWrap">
        <div class="gywBox">
            <div class="gywTitle">{{title}}</div>
            <div class="gywDesc">{{desc}}</div>
            <div class="gywList">
                <slot></slot>
            </div>
        </div>
        <a class="gywMore" @click="handlerClick">{{more.text}}<i></i></a>
    </section>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            title: {
                type: String,
                default: ""
            },
            desc: {
                type: String,
                default: ""
            },
            more: {
                type: Object,
                default: function () {
                    return {
                        text: '',
                        maidian: '',
                        url: '',
                        loadPage: '',
                        nativeApp: ''
                    }
                }
            }
        },
        methods: {
            handlerClick(event){
                let _item = this.more;
                this.$commonSendLogJump(_item.maidian, '', _item.nativeApp, _item.loadPage, _item.url);
            }
        },
    };
</script>