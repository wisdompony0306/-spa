<!--
    desc: 公寓馆:热门、精选公寓item
-->
<style rel="stylesheet/less" lang="less" scoped>

.coupon {
    margin: 0 .46875rem .625rem .46875rem;
    background-color: #fff9f4;
    padding: 0 .3125rem;
    position: relative;
    min-height: 2.15625rem
}

.coupon_title {
    color: #ff3544;
    font-size: .375rem;
    padding-top: .39063rem
}

.coupon_expiration {
    color: #7f7f7f;
    font-size: .3125rem;
    padding-top: .03125rem
}

.coupon_rule {
    color: #bbb;
    font-size: .28125rem;
    padding-top: .0625rem;
}

.coupon_rule span {
    -webkit-transform: rotate(-90deg);
    transform: rotate(-90deg);
    display: inline-block;
    font-family: monospace;
    pointer-events: none
}

.coupon_rules {
    font-size: .28125rem;
    color: #7f7f7f;
    margin-top: .1875rem;
    padding-bottom: .28125rem;
}

.coupon_rules li {
    padding-bottom: .0625rem
}

.coupon_right {
    color: #e1ab7a;
    position: absolute;
    top: .3125rem;
    right: .28125rem
}

.coupon_right_value {
    font-size: .7rem
}

.coupon_right_value span {
    font-size: .375rem
}

.coupon_right_use {
    border: 1px solid #e1ab7a;
    border-radius: .03125rem;
    text-align: center;
    padding: .08rem 0.2rem;
    font-size:11px;
    float: right;
    border: 1px solid #FF0000;
    border-radius :1vw;

}

.coupon.none {
    background-color: #fafafa
}

.coupon.none p {
    color: #d8d8d8;
    border-color: #d8d8d8
}

.coupon.none ul {
    color: #d8d8d8
}

</style>

<template>
                <div class="coupon" :class=used>
                    <p class="coupon_title">新巢计划 助力券</p>
                    <p class="coupon_expiration">有效期至 {{item.ttl}}</p>
                    <p class="coupon_rule" v-on:click="switchRules">更多使用规则 <span> <</span></p>
                    <ul class="coupon_rules" v-if="showRules">
                        <li>1. 只能应届毕业生使用</li>
                        <li>2. 使用时请将学生证&身份证出示给公寓方</li>
                        <li>3. 点击立即使用，填写相关信息</li>
                        <li>4. 成功入住后通过满意度调研短信成功提交公寓的评价将获得话费20元充值卡</li>
                        <li>5. 通过满意度调研成为公寓体验大使将有机会获得1000-5000元不等的奖品</li>
                        <li>6. 此项福利不能与租房优惠券福利同享</li>
                    </ul>
                    <div class="coupon_right">
                        <p class="coupon_right_value">{{text}}</p>
                        <p code="" class="coupon_right_use open_alert" v-on:click="useCoupon">立即使用</p>
                    </div>
                </div>

</template>

<script type="text/ecmascript-6">
    export default {
        name: 'couponNestPlan',
        props: {
            'item':{
                type: Object,
                required: true
            },
        },
        computed:{
            used(){
                if(this.item.stat!=0){
                    return 'none';
                }
            },
            text(){
                if(this.item.stat!=0){
                    return '已使用';
                }else{
                    return '月付零押金';
                }
            }
        },
        data() {
            return {
                showRules:false
            }
        },
        methods: {
            switchRules(){
                this.showRules = !this.showRules;
                this.$emit('switchRules')
            },
            useCoupon(){
                if(this.used){return;}
                this.$emit('useNestPlan',this.item.code)
            }
        }
    };
</script>