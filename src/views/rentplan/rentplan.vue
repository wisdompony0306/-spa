<!--
    desc: 非公寓版租房宣传页
-->
<style rel="stylesheet/less" lang="less" scoped>
    @import './rentplan.less';
</style>

<template>
    <div class="rentplanBox">
        <section class="rpbLogo"></section>
        <section class="rpbHead"></section>
        <section class="rpbDescBox">
            <ul class="rpbPlan">
                <li class="rpbpItem" v-for="item in planList">
                    <div class="rpbpiIcon" :class=[item.class]></div>
                    <div class="rpbpiText" @click="handlerOpen(item)">
                        <div v-html="item.text"></div>
                        <div class="wen" v-if="item.hasTips"></div>
                    </div>
                </li>
            </ul>
            <div class="rpbDesc">
                <div class="rpbdTop"></div>
                <div class="rpbdText">{{descText}}</div>
                <div class="rpbdBottom"></div>
            </div>
            <router-link class="rpbBtn" :to="buttonModel.url" @click.native="handlerGo(buttonModel)">
                {{buttonModel.text}}
            </router-link>
        </section>
        <section class="tipsBox" v-show="tips.length>0">
            <div class="tipsContext">
                <div class="tipsClose" @click="handlerClose"/>
                <div class="tipsText">{{tips}}</div>
            </div>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                planList: [{
                    text: '优选品牌<br>公寓入住',
                    class: 'icon1',
                }, {
                    text: '覆盖<br>19个城市',
                    class: 'icon2',
                }, {
                    text: '品质<br>装修',
                    class: 'icon3',
                }, {
                    text: '品质家具<br>配置设施',
                    class: 'icon4',
                }, {
                    text: '管家<br>服务',
                    class: 'icon5',
                }, {
                    text: '租金月付<br>解决资金不足',
                    class: 'icon6',
                    hasTips: true,
                    maidian: 'yfask',
                    tips: '58同城专为租客推出的按月付房租服务，通常租房需要季付、半年付或者年付，使用58月付后，租客只需支付首月的房租及押金，剩余的房租将由58月付一次性付给公寓，租客之后按月付房租给58月付即可。',
                }],
                descText: '品牌公寓19个城市的热门店铺助力毕业生找好房，发放千万租房优惠，租客在发放优惠的公寓店铺，相关房源页面领取租房优惠券后，可联系公寓方进行看房，看房成功后和公寓房签订租房合同，向公寓方出示公寓租房优惠券公寓方直接进行抵扣。',
                buttonModel: {
                    url: '/nestplan/apartment',
                    text: '立即领取公寓租房优惠券',
                    maidian: 'lqyhq',
                },
                tips: '',
                currentPagetype: this.$pagetype,
            }
        },
        methods: {
            handlerGo(item){
                if (item && item.maidian) {
                    this.$clickLog(item.maidian, this.currentPagetype);
                }
            },
            handlerClose(event){
                this.tips = "";
            },
            handlerOpen(item){
                if (item && item.hasTips) {
                    this.tips = item.tips;
                    if (item.maidian) {
                        this.$clickLog(item.maidian,'fcapp-gyxc');
                    }
                }
            }
        }
    };
</script>