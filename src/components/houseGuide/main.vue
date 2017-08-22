<!--
    desc: 非公寓版-房源引导
-->
<style rel="stylesheet/less" lang="less" scoped>
    .houseGuide {
        width: 100%;
        display: -webkit-flex;
        display: flex;
        -webkit-flex-flow: row nowrap;
        -webkit-justify-content: space-between;
        -webkit-align-items: center;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        .hgItem {
            display: block;
            width: px2rem(228px);
            height: px2rem(296px);
            background: #f9f9f9;

            .hgiTitle {
                text-align: center;
                width: 100%;
                font-size: px2rem(30px);
                color: #000;
                margin: px2rem(40px) auto px2rem(10px);
            }
            .hgiDesc {
                margin: 0 auto;
                width: px2rem(114px);
                height: px2rem(40px);
                line-height: px2rem(40px);
                font-size: px2rem(24px);
                border-radius: px2rem(20px);
                text-align: center;
                background: #ff3544;
                color: #fff;
            }
            &.fzyf {
                background: data-uri("//img.58cdn.com.cn/fangrs/img/468134fc58793de9fd010785e1df723c.png");
                background-size: cover;
            }
            &.grfy {
                background: data-uri("//img.58cdn.com.cn/fangrs/img/9ec0d5152f27c4732aafffadd6e58f15.png");
                background-size: cover;
            }
            &.cxfy {
                background: data-uri("//img.58cdn.com.cn/fangrs/img/5d26eadbbd7ed3784f78f055c1bcc7ce.png");
                background-size: cover;
            }
        }
    }
</style>

<template>
    <div class="houseGuide">
        <a class="hgItem" :class="[item.bgClass]" v-for="(item,key) in unionItems" @click="handlerClick(key)">
            <div class="hgiTitle">{{item.title}}</div>
            <div class="hgiDesc">{{item.desc}}</div>
        </a>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                tabs: {
                    keyuefu: {
                        title: '房租月付',
                        desc: "省钱专享",
                        bgClass: 'fzyf',
                        maidian: "byjfzyf",
                    },
                    geren: {
                        title: '个人房源',
                        desc: "免费中介",
                        bgClass: 'grfy',
                        maidian: "byjgrfy",
                    },
                    /*chengxin: {
                        title: '诚信房源',
                        desc: "虚假敢赔",
                        bgClass: 'cxfy',
                        maidian: "byjcxfy",
                    },*/
                     jingjiren: {
                        title: '经纪人房源',
                        desc: "靠谱放心",
                        bgClass: 'cxfy',
                        maidian: "byjjjrfy",
                    }
                }
            }
        },
        props: {
            items: {
                type: Object,
                default: function () {
                    return {
                        keyuefu: {
                            url: "",
                            desc: "",
                            nativeApp: "",
                            loadPage: "",
                            pageType: "",
                        },
                        geren: {
                            url: "",
                            desc: "",
                            nativeApp: "",
                            loadPage: "",
                            pageType: "",
                        },
                        jingjiren: {
                            url: "",
                            desc: "",
                            nativeApp: "",
                            loadPage: "",
                            pageType: "",
                        }
                    }
                }
            }
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
    };
</script>