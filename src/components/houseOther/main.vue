<!--
    desc: 非公寓版-房源其他分类
-->
<style rel="stylesheet/less" lang="less" scoped>
    .houseOther {
        width: 100%;
        height: px2rem(260px);
        display: -webkit-flex;
        display: flex;
        -webkit-flex-flow: row nowrap;
        -webkit-justify-content: space-between;
        -webkit-align-items: center;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        .hoItem {
            display: block;
            width: px2rem(224px);
            height: 100%;
            background: #fff;
            &.shangpu {
                background: data-uri("//img.58cdn.com.cn/fangrs/img/886d4939fbea15928d3abb4bd3f2722a.png") no-repeat;
                background-size: cover;
            }
            &.xiezilou {
                background: data-uri("//img.58cdn.com.cn/fangrs/img/4e1ee9e3e6de656344ed9afad1a4d0de.png") no-repeat;
                background-size: cover;
            }
            &.changfang {
                background: data-uri("//img.58cdn.com.cn/fangrs/img/7a724416984c804b9b6c7be75001ec8b.png") no-repeat;
                background-size: cover;
            }
        }
        .hoTitle {
            padding: px2rem(20px);
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            font-size: px2rem(30px);
            color: #000;
        }
    }
</style>

<template>
    <div class="houseOther">
        <a class="hoItem hoTitle" :class="[item.bgClass]" @click="handlerClick(key)" v-for="(item,key) in unionItems">
            {{item.title}}
        </a>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                tabs: {
                    shangpu: {
                        title: '商铺',
                        bgClass: 'shangpu',
                        maidian: 'shangpu',
                    },
                    xiezl: {
                        title: '写字楼',
                        bgClass: 'xiezilou',
                        maidian: 'xiezilou',
                    },
                    changfang: {
                        title: '厂房',
                        bgClass: 'changfang',
                        maidian: 'changfang',
                    }
                }
            }
        },
        props: {
            items: {
                type: Object,
                default: function () {
                    return {
                        shangpu: {},
                        xiezl: {},
                        changfang: {}
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