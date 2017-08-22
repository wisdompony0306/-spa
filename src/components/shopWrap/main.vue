<!--
    desc: 公寓馆 公寓包装
-->
<style rel="stylesheet/less" lang="less" scoped>
    .shopWrap {
        width: 100%;
        padding: 0 px2rem(18px);
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        .swTitle {
            width: 100%;
            height: px2rem(100px);
            line-height: px2rem(100px);;
            font-size: px2rem(40px);
            color: #fff;
            text-align: center;
        }
        .swList {
            display: -webkit-flex;
            display: flex;
            -webkit-flex-flow: row wrap;
            -webkit-justify-content: space-between;
            -webkit-align-items: center;
            flex-flow: row wrap;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>

<template>
    <section class="shopWrap">
        <div class="swTitle">{{title}}</div>
        <div class="swList">
            <slot></slot>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            title: {
                type: String,
                default: ""
            }
        }
    };
</script>