<!--
    毕业福利tab页
-->
<style rel="stylesheet/less" lang="less" scoped>
    @import './benefit.less';
</style>

<template>
    <div id='benefit'>
    <div id="page">
        <XcjhGuide class="guide" />
        <div class="applyButton" v-on:click="goToApply">{{is_apply?'已申请':'火速申请'}}</div>
        <p class="instruction">说明： 本计划只适用于在“北上深”租房的2017应届毕业生<p/>
        <div class="detailRules">
            <p>详细规则</p>
            <ul>
                <li>1. 申请资格：2017年应届毕业生</li>
                <li>2. 租住适用城市：北上深，后续我们会开通更多的城市</li>
                <li>3. 租住适用公寓：见本页面下方新巢计划适用公寓</li>
                <li>4. 申请流程：点击上方的火速申请按钮，填写相关资料，审核通过后第一时间短信通知您</li>
                <li>5. 签订租房合同时，请将学生证和身份证出示给公寓方证明毕业生身份，同时在个人中心点击助力券使用按钮，公寓方将在验证页面输入代号验证，验证成功后即可享受0押金且租金按月付优惠</li>
                <li>6. 点评赢大奖：成功入住公寓后，对体验的公寓进行点评，可赢取50-2000元不等的租房福利~</li>
            </ul>
        </div>
        <div v-if="passList.length>=minLastNewsNum" class="lastNews">
            <i class="last_news_png"/>
            <p><span class="message"><ul><li v-for="item in passList">{{item}}</li></ul></span><span ><ul><li v-for="n in passList.length">已通过审核</li></ul></span></p>
        </div>
        <div class="invitation" v-if="showInvite">
            <p class = "invitation_header">邀请有礼</p>
            <div class="invitation_content">
                <p>{{!invitationNum?'您还没有邀请过好友,快去邀请吧!':'您已邀请'+invitationNum+'位好友,加油～'}}<span v-on:click="messageShow=true;FBridge.track.send('rule-click','fcapp-xcjhsy',cate);">详细规则<i class="question_jpg" /></span></p>
                <div class="invitation_content_img">
                    <i class="money20_png" />
                    <i class="battery_png" />
                    <i class="ring_png" />
                </div>
                <div class="invitation_content_word">
                    <span>20元话费</span>
                    <span>小米移动电源</span>
                    <span>小米运动手环</span>
                </div>
                <ul class="invitation_content_bar">
                    <li v-for="n in 15" :class="n<=invitationNum?'invitated':'notInvitated'" ></li>
                </ul>
                <div class="invitation_content_barnum">
                    <span class="barnum1">3位</span>
                    <span class="barnum2">7位</span>
                    <span class="barnum3">15位</span>
                </div>
                <div v-on:click="share" class="invitation_content_button">火速分享给小伙伴</div>
                <p class="invitation_content_instruction">点击上方按钮，邀请好友赢大奖</p>
            </div>
        </div>
        <div class="apartments">
            <p class="apartments_header">新巢计划适用公寓<span v-on:click="selectModalShow=true;FBridge.track.send('changearea-click','fcapp-xcjhsy',cate);"><i class="location_png" />{{city}}</span></p>
            <div class="apartments_content">

                <a v-for="item in apartments" class="apartments_content_item" :href=item.shopUrl v-on:click="FBridge.track.send('gongyu-click','fcapp-xcjhsy',cate)" >
                    <div class="apartments_content_item_img">
                        <img v-lazy="item.shopLogo" />
                    </div>
                    <div class="apartments_content_item_words">
                        <p class="apartments_name"><span></span>{{item.shopName}}</p>
                        <p class="apartments_price">{{item.shopMaxCoupon}}</p>
                    </div>
                </a>
            </div>
            <div v-if="showApartmentNum == 6 && hasMoreApartments" class="apartments_more" v-on:click="showApartmentNum=Infinity;FBridge.track.send('byjgymore-click','fcapp-xcjhsy',cate);">更多公寓店铺 <i class="go_jpg" /></div>
        </div>
        


    </div>


    <show-message :title=messageTitle :text=messageText v-model=messageShow />
    <select-modal :title=selectModalTitle :list=selectModalList v-model=selectModalShow v-on:selected="selectModalCallback"/>
    <wx-share-tip :title=wxShareTip.title :text=wxShareTip.text v-model=wxShareTip.show />
    </div>
</template>

<script>

    import Axios from 'axios';
    import showMessage from '../../components/common/showMessage.vue';
    import selectModal from '../../components/common/selectModal.vue';
    import wxShareTip from '../../components/common/wxShareTip/index.vue';
    import {XcjhGuide} from '../../components/index';
    import router from '../../router/router';
    export default {
        data(){
            return {
                messageTitle: "邀请有礼 详细规则",
                messageText:[
                    '在2017年6月30日-7月7日期间，点击"火速分享给小伙伴"按钮，登录分享本活动并邀请2017年毕业来北上深租房的好友参加新巢计划；',
                    '好友通过您分享的链接填写信息且通过审核后，方可确认本次邀请成功。同一登录账号，同一手机号，同一终端设备号、同一IP或其他同一用户情形，均视为同一用户；',
                    '邀请奖励：每成功邀请3人可得20元话费，邀请7位可得小米移动电源，邀请15位可得小米运动手环，邀请人数最多的将获得一部Beats耳机~',
                    '奖品发放：话费将在活动结束后直接发放，其他实物奖品则在活动结束后由专人联系您确认收货信息，并在联系后的7个工作日内发出奖励。',
                    '本次活动最终解释权归58同城所有'
                ],
                messageShow:false,
                selectModalTitle:"请选择所在城市",
                city:'',
                selectModalList:['北京市','上海市','深圳市'],
                selectModalShow:false,
                showApartmentNum:Infinity, //公寓初始显示数量
                minLastNewsNum:10, //跑马灯最小显示数量
                FBridge:window.FBridge,
                cate:this.$parent.cate,
                wxShareTip:{
                    title:'分享给小伙伴',
                    text:'一起拿好礼',
                    show:false,
                },
                awardShare:{
                    title:'老铁，我来邀请你一起毕业租房，享受月付0押金福利！有福要同享～',
                    desc:'58租房，温暖你的毕业找房路～'
                }
            }
        },
        computed:{
            is_apply(){
                return this.$parent.userInfo.is_apply;
            },
            showInvite(){
                if(FBridge.env.platform=='m'){
                    return false;
                }else{
                    return this.$parent.userInfo.is_chip_show;
                }
            },
            invitationNum(){
                if(this.$parent.userInfo.current_user_invite_info){
                    return this.$parent.userInfo.current_user_invite_info.invite_nums;
                }else{
                    return 0;
                }
            },
            apartments(){
                return this.$parent.apartmentsData.slice(0,this.showApartmentNum)
            },
            hasMoreApartments(){
                return this.$parent.apartmentsData.length>6;
            },
            passList(){
                let data = this.$parent.userInfo.news;
                if(!data){return [];}
                let tem=[];
                for(let i=0;i<data.length;i++){
                    tem.push(data[i].apply_name+' '+data[i].apply_universty.slice(0,7)+' '+data[i].apply_phone)
                }
                return tem;
            }
        },
        methods:{
            cityInit(){
                if(!this.$parent.currentCityName){
                    setTimeout(this.cityInit,0);
                    return;
                }
                switch(this.$parent.currentCityName){
                    case '上海':
                        this.city = '上海';
                        break;
                    case '深圳':
                        this.city = '深圳';
                        break;
                    default:
                        this.city = '北京';
                        break;
                }
            },
            goToApply(){
                if(this.is_apply){return;}
                FBridge.track.send('hssq-click','fcapp-xcjhsy',this.$parent.cate);
                if(this.$parent.$data.isLogin){
                    if(this.$parent.userInfo && this.$parent.userInfo.current_user_mobile){
                        router.push("/nestplan/apply");
                    }else{
                        if (FBridge.env.platform == 'app') {
                            WBAPP.extendRightBtn("top_right", "", "rightBtnCallback");
                            function rightBtnCallback() {}
                        };
                        location.href = '//my.58.com/m/mobilebind?path=' + location.href;
                    }    
                }else {
                    FBridge.passport.login(location.href,(state)=>{
                        if(state==0){
                            this.$parent.$data.isLogin = true;
                            router.push("/nestplan/apply");
                        }
                    });
                }
            },
            selectModalCallback(item,index){
                this.city = item.slice(0,-1);
                this.$parent.getApartments(item);
            },
            share(){
                FBridge.track.send('sharefriends-click','fcapp-xcjhsy',this.$parent.cate);
                if(!this.$parent.$data.isLogin){
                    FBridge.passport.login(location.href,(state)=>{
                        if(state==0){
                            this.$parent.$data.isLogin = true;
                        }
                    });
                }else{
                        if(this.$parent.userInfo.current_user_invite_info && this.$parent.userInfo.current_user_invite_info.invite_link){
                            if(FBridge.env.platform=='wx'){
                                FBridge.share.config(this.awardShare.title, this.awardShare.desc, '//'+this.$parent.userInfo.current_user_invite_info.invite_link,'https://img.58cdn.com.cn/fangrs/img/b31606ed93951506968ef830ad4c9f3a.jpg');
                                this.wxShareTip.show = true;
                            }else if(FBridge.env.platform=='app'){
                                WBAPP.shareInfo(this.awardShare.title, this.$parent.userInfo.current_user_invite_info.invite_link, 'https://img.58cdn.com.cn/fangrs/img/b31606ed93951506968ef830ad4c9f3a.jpg', '分享占位显示', this.awardShare.desc, 'WEIXIN,FRIENDS');
                            }
                        }else{
                            alert('网络错误');
                        }
                }
            }
        },
        components: {
            XcjhGuide,
            showMessage,
            selectModal,
            wxShareTip,
        },
        created(){
            this.cityInit();
        }
    };
</script>