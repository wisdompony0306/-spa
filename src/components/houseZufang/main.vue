<!--
    desc: 非公寓版-房源整租
-->
<style rel="stylesheet/less" lang="less" scoped>
    .houseZufang {
        width: 100%;
        height: px2rem(450px);
        display: -webkit-flex;
        display: flex;
        -webkit-flex-flow: row nowrap;
        -webkit-justify-content: space-between;
        -webkit-align-items: center;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        .hzfTitle {
            padding: px2rem(22px);
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            font-size: px2rem(30px);
            color: #000;
        }
        .hzfLeft {
            display: block;
            height: 100%;
            width: px2rem(270px);
            background: data-uri("//img.58cdn.com.cn/fangrs/img/2a73615550c1eba2ad7c297f465ae964.png");
            background-size: cover;
        }
        .hzfRight {
            height: 100%;
            width: px2rem(410px);
            display: -webkit-flex;
            display: flex;
            -webkit-flex-flow: column nowrap;
            -webkit-justify-content: space-between;
            -webkit-align-items: center;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;

            .hzfrTop {
                width: 100%;
                overflow: hidden;
                .hzfrt {
                    display: block;
                    width: px2rem(200px);
                    height: px2rem(220px);
                    &.hzfrtl {
                        float: left;
                        background: data-uri("//img.58cdn.com.cn/fangrs/img/a7bd4843d877803b73981c96efa0e07d.png");
                        background-size: cover;
                    }
                    &.hzfrtr {
                        float: right;
                        background: data-uri("//img.58cdn.com.cn/fangrs/img/45fba35907624b2c8439809de9d78a1b.png");
                        background-size: cover;
                    }
                }

            }
            .hzfrBottom {
                display: block;
                width: px2rem(410px);
                height: px2rem(220px);
                background: data-uri("//img.58cdn.com.cn/fangrs/img/144921cd83e1cf626e2e7f09b36a3458.png");
                background-size: cover;
            }
        }
    }
</style>

<template>
    <div class="houseZufang">
        <a class="hzfLeft hzfTitle" @click="handlerClick('zufang')">{{unionItems.zufang.title}}</a>
        <div class="hzfRight">
            <div class="hzfrTop">
                <a class="hzfrt hzfrtl hzfTitle" @click="handlerClick('yiju')">{{unionItems.yiju.title}}</a>
                <a class="hzfrt hzfrtr hzfTitle" @click="handlerClick('erju')">{{unionItems.erju.title}}</a>
            </div>
            <a class="hzfrBottom hzfTitle" @click="handlerClick('sanju')">{{unionItems.sanju.title}}</a>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                tabs: {
                    zufang: {
                        title: '整套出租',
                        maidian: 'byjztcz',
                    },
                    yiju: {
                        title: '经济一居',
                        maidian: 'byjjjyj',
                    },
                    erju: {
                        title: '精致两居',
                        maidian: 'byjjzlj',
                    },
                    sanju: {
                        title: '改善三居',
                        maidian: 'byjgssj',
                    }
                }
            }
        },
        props: {
            items: {
                type: Object,
                default: function () {
                    return {
                        zufang: {},
                        yiju: {},
                        erju: {},
                        sanju: {},
                    }
                }
            },
        },
        computed: {
            unionItems(){
                for (let key in this.items) {
                    Object.assign(this.items[key], this.tabs[key]);
                }
                return this.items;
            }
        },
        methods: {
            handlerClick(key){
                let _item = this.items[key];
                this.$commonSendLogJump(_item.maidian, '', _item.nativeApp, _item.loadPage, _item.url);
            }
        }
    }
</script>