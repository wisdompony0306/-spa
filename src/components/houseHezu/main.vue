<!--
    desc: 非公寓版-房源合租
-->
<style rel="stylesheet/less" lang="less" scoped>
    .houseHezu {
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
        a {
            background: #fff;
        }

        .hhTitle {
            padding: px2rem(22px);
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            font-size: px2rem(30px);
            color: #000;
        }

        .hhLeft {
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

            .hhlTop {
                width: 100%;
                display: block;
                height: px2rem(220px);
                background: data-uri("//img.58cdn.com.cn/fangrs/img/f62308bd9d2f315c1c1589f750a3a1c5.png") no-repeat;
                background-size: cover;
            }
            .hhlBottom {
                width: 100%;
                height: px2rem(220px);
                overflow: hidden;

                .hhlb {
                    display: block;
                    width: px2rem(200px);
                    height: 100%;
                    &.hhlbl {
                        float: left;
                        background: data-uri("//img.58cdn.com.cn/fangrs/img/3815ea732b688826f63e030672684415.png") no-repeat;
                        background-size: cover;
                    }
                    &.hhlbr {
                        float: right;
                        background: data-uri("//img.58cdn.com.cn/fangrs/img/e651f7ceca97dcd4a8996c103c4a4f55.png") no-repeat;
                        background-size: cover;

                    }
                }
            }
        }
        .hhRight {
            height: 100%;
            width: px2rem(270px);
            display: -webkit-flex;
            display: flex;
            -webkit-flex-flow: column nowrap;
            -webkit-justify-content: space-between;
            -webkit-align-items: center;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: center;

            .hhr {
                display: block;
                width: 100%;
                height: px2rem(220px);
                &.hhrt {
                    background: data-uri("//img.58cdn.com.cn/fangrs/img/ad30401c441331b01bc9d8882220ed0c.png") no-repeat;
                    background-size: cover;
                }
                &.hhrb {
                    background: data-uri("//img.58cdn.com.cn/fangrs/img/69a3cdaa8499cea3d5870637e24c55fd.png") no-repeat;
                    background-size: cover;
                }
            }
        }
    }
</style>

<template>
    <div class="houseHezu">
        <div class="hhLeft">
            <a class="hhlTop hhTitle"
               @click="handlerClick('duliweishengjian')">{{unionItems.duliweishengjian.title}}</a>
            <div class="hhlBottom">
                <a class="hhlb hhlbl hhTitle" @click="handlerClick('ciwo')">{{unionItems.ciwo.title}}</a>
                <a class="hhlb hhlbr hhTitle" @click="handlerClick('zhuwo')">{{unionItems.zhuwo.title}}</a>
            </div>
        </div>
        <div class="hhRight">
            <a class="hhr hhrt hhTitle" @click="handlerClick('chuzu')">{{unionItems.chuzu.title}}</a>
            <a class="hhr hhrb hhTitle" @click="handlerClick('danjian')">{{unionItems.danjian.title}}</a>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                tabs: {
                    duliweishengjian: {
                        title: '独立卫生间',
                        maidian: 'byjdlwsj',
                    },
                    ciwo: {
                        title: '温馨次卧',
                        maidian: 'byjwxcw',
                    },
                    zhuwo: {
                        title: '阳光主卧',
                        maidian: 'byjygzw',
                    },
                    chuzu: {
                        title: '经济合租',
                        maidian: 'byjcwcz',
                    },
                    danjian: {
                        title: '单间出租',
                        maidian: 'byjdjcz',
                    }
                }
            }
        },
        props: {
            items: {
                type: Object,
                default: function () {
                    return {
                        duliweishengjian: {},
                        chuzu: {},
                        ciwo: {},
                        zhuwo: {},
                        danjian: {},
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
        },
    };
</script>