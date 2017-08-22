<!--
    desc: 新巢计划说明4个icon
-->
<style rel="stylesheet/less" lang="less" scoped>
    @bgColor: #f8ffff;
    @margin: px2rem(30px);
    @color: #0033cc;
    @fontSize: 14px;

    @width: px2rem(170px);
    @height: px2rem(250px);

    @mianHeight: px2rem(168px);
    @bottomHeight: px2rem(82px);
    @bottomBgColor: #bceef4;

    .xcjhGuide {
        display: -webkit-flex;
        display: flex;
        -webkit-flex-flow: row nowrap;
        flex-flow: row nowrap;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        -webkit-align-items: center;
        align-items: center;

        .item {
            width: @width;
            height: @height;
            background: @bgColor;

            .itemMian {
                height: @mianHeight;
                display: -webkit-flex;
                display: flex;
                -webkit-justify-content: center;
                justify-content: center;
                -webkit-align-items: center;
                align-items: center;
                .yj {
                    width: px2rem(115px);
                    height: px2rem(124px);
                    background: data-uri("./images/xcjhGuide_yj.png");
                }
                .fzyf {
                    width: px2rem(113px);
                    height: px2rem(116px);
                    background: data-uri("./images/xcjhGuide_fzyf.png");
                }
                .yjbm {
                    width: px2rem(136px);
                    height: px2rem(118px);
                    background: data-uri("./images/xcjhGuide_yjbm.png");
                }
                .rzyj {
                    width: px2rem(109px);
                    height: px2rem(116px);
                    background: data-uri("./images/xcjhGuide_rzyj.png");
                }
                .yj, .fzyf, .yjbm, .rzyj {
                    background-size: cover;
                }
            }
            .itemDesc {
                background: @bottomBgColor;
                height: @bottomHeight;
                line-height: @bottomHeight;
                text-align: center;
                color: @color;
                font-size: @fontSize;
            }
        }
    }
</style>

<template>
    <div class="xcjhGuide">
        <div class="item" v-for="data in items">
            <div class="itemMian"><span :class="[data.img]"></span></div>
            <div class="itemDesc">{{data.text}}</div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                items: [{
                    img: 'yj',
                    text: '0押金'
                }, {
                    img: 'fzyf',
                    text: '房租月付'
                }, {
                    img: 'yjbm',
                    text: '一键报名'
                }, {
                    img: 'rzyj',
                    text: '入住有奖'
                }]
            }
        }
    };
</script>