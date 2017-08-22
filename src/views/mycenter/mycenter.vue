<style rel="stylesheet/less" lang="less" scoped>
    @import './mycenter.less';
</style>

<template>
    <div id='mycenter'>
        <div id="page">
            <div class="content">
                <div v-if=nothing class="noThing">
                    <img class="noThing_img" src="//img.58cdn.com.cn/fangrs/img/517ac2a1299ed718b2459b8c128705b0.png"></img>
                    <p class="noThing_text">呀，啥都没有，快去会场瞅瞅～</p>
                </div>
                <couponNestPlan v-if=couponData.nestPlan&&couponData.nestPlan.code :item=couponData.nestPlan v-on:useNestPlan="useNestPlan" v-on:switchRules="nestPlanSwitchRules" />
                <coupon v-for="item in goodCoupon" :couponItem=item v-on:useCoupon="useCoupon" v-on:switchRules="couponSwitchRules" :key="item.couponId" />
                <p v-if=badCoupon&&badCoupon.length class="defunct">已失效的优惠券</p>
                <coupon class="none" v-for="item in badCoupon" :couponItem=item :key="item.couponId" />
            </div>
        </div>
        <showCode :title=showCode.title :text=showCode.text :button=showCode.button v-model=showCode.show v-on:buttonClick="showCodeButtonClick" />
        <toast :text=toast.text :time=toast.time v-model=toast.show />
        <getInput :title=getInput.title :button=getInput.button v-model=getInput.show v-on:inputSubmit="inputSubmit" />
    </div>
</template>

<script>
    import coupon from '../../components/coupon/index.vue';
    import couponNestPlan from '../../components/couponNestPlan/index.vue';
    import showCode from '../../components/common/showCode/index.vue';
    import getInput from '../../components/common/getInput/index.vue';
    import toast from '../../components/common/toast/index.vue';
    import API from '../../service/api'
    export default {
        data(){
            return {
                showCode:{
                    show:false,
                    title:'请向公寓出示以下优惠码',
                    text:'',
                    button:'我知道了',
                },
                toast:{
                    show:false,
                    text:'',
                    time:2000,
                },
                getInput:{
                    show:false,
                    title:'请公寓方填写其代号',
                    button:'提交',
                },
            }
        },
        computed:{
            couponData(){
                return this.$parent.couponData;
            },
            goodCoupon(){
                return this.couponData.shopCoupon && this.couponData.shopCoupon.filter((item)=>{return item.status==10})
            },
            badCoupon(){
                return this.couponData.shopCoupon && this.couponData.shopCoupon.filter((item)=>{return item.status!=10})
            },
            nothing(){
                if(Object.keys(this.$parent.couponData).length != 0 && !(this.couponData.nestPlan && this.couponData.nestPlan.code) && !(this.couponData.shopCoupon && this.couponData.shopCoupon.length > 0)){
                    return true;
                }else {
                    return false;
                }
            }
        },
        components: {
            coupon,
            couponNestPlan,
            showCode,
            toast,
            getInput
        },
        created(){
            this.checkLogin();
        },
        methods:{
            checkLogin(){
                if(this.$parent.$data.isLogin === null){
                    setTimeout(this.checkLogin,0);
                    return;
                }
                if(!this.$parent.$data.isLogin){
                    FBridge.passport.login(location.href,(state)=>{
                        if(state==0){
                            this.$parent.$data.isLogin = true;
                        }
                    });
                }else{
                    // if(Object.keys(this.$parent.couponData).length == 0){
                    //     this.getCoupon();
                    // }
                    this.getCoupon();
                }
            },
            useCoupon(code){
                FBridge.track.send('yhquse-click','fcapp-cyjpzx',this.$parent.cate);
                this.showCode.text = code;
                this.showCode.show = true;
            },
            couponSwitchRules(){
                FBridge.track.send('yhqmore-click','fcapp-cyjpzx',this.$parent.cate);
            },
            showCodeButtonClick(){
                FBridge.track.send('yhqiknow-click','fcapp-cyjpzx',this.$parent.cate);
            },
            showToast(text,time){
                this.toast.text=text;
                this.toast.time=time;
                this.toast.show=true;
            },
            useNestPlan(code){
                this.getInput.show=true;
                FBridge.track.send('qlquse-click','fcapp-cyjpzx',this.$parent.cate);
            },
            nestPlanSwitchRules(){
                FBridge.track.send('zlqmore-click','fcapp-cyjpzx',this.$parent.cate);
            },
            inputSubmit(value){
                FBridge.track.send('gydhtj-click','fcapp-cyjpzx',this.$parent.cate);
                let _this=this;
                this.$request.get({
                    url: API.useNestplan.host + API.useNestplan.url,
                    data:{code:value},
                    callback: function(state, res){
                        if(res.code==0){
                            _this.showToast('兑换成功',2000);
                        } else {
                            _this.showToast('兑换失败',2000);
                        }
                    },
                });
            },
            getCoupon(){
                let _this = this;
                this.$request.get({
                    url: API.getCoupon.host + API.getCoupon.url,
                    callback: function (state, res) {
                        if (res.code == 0) {
                            _this.$parent.couponData = res.data;
                        }
                    },
                });
            },
        },
        watch: {

        }
    };
</script>