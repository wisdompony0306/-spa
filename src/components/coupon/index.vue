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
    color: #e1ab7a;
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
    font-size: .78125rem
}

.coupon_right_value span {
    font-size: .375rem
}

.coupon_right_use {
    border: 1px solid #e1ab7a;
    border-radius: .03125rem;
    text-align: center;
    padding: .0625rem;
    font-size:11px;
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
                <div class="coupon">
                    <p class="coupon_title">{{couponItem.companyName}} 租房券</p>
                    <p class="coupon_expiration">有效期至 {{expire}}</p>
                    <p class="coupon_rule" v-on:click="switchRules">更多使用规则 <span> <</span></p>
                    <ul class="coupon_rules" v-if="showRules">
                        <li>1. 不可与其他优惠共享</li>
                        <li>2. 一家公寓同时只能使用一张租房券</li>
                        <li>{{'3. '+couponItem.conditionText}}</li>
                        <li>{{'4. '+couponItem.deductionText}}</li>
                        <li>5. 签订租房合同时请点击“立即使用”按钮将兑换码出示给公寓方</li>
                    </ul>
                    <div class="coupon_right">
                        <p class="coupon_right_value"><span>￥</span>{{couponItem.credit}}</p>
                        <p class="coupon_right_use" v-on:click="useCoupon">立即使用</p>
                    </div>
                </div>

</template>

<script type="text/ecmascript-6">
    export default {
        name: 'coupon',
        props: {
            'couponItem':{
                type: Object,
                required: true
            },
        },
        computed:{
            expire(){
                return this.couponItem.expireTime.slice(0,10);
            }
        },
        data() {
            return {
                showRules:false
            }
        },
        methods: {
            switchRules(){
                this.$emit('switchRules')
                this.showRules = !this.showRules;
            },
            useCoupon(){
                this.$emit('useCoupon',this.couponItem.code)
            }
        }
    };
</script>