<!--
    毕业福利tab页
-->
<style rel="stylesheet/less" lang="less" scoped>
@import './apply.less';
</style>

<template>
    <div id='apply'>
        <div id="page">
            <p class="title">租房免押金 按月付房租</p>
            <p class="instruction">目前本计划只适用在北上深租房的应届毕业生，请认真填写以下信息，保证信息真实有效，审核通过后将第一时间联系您：</p>
            <input v-model="name" class="input" type="text" placeholder="姓名" maxlength="20">
            <input v-model="school" class="input" type="text" placeholder="学校" maxlength="20">
            <select v-model="city" class="input">
                <option value="" disabled selected>城市</option>
                <option v-for="item in accessCity" :value=item>{{item}}</option>
            </select>
            <div class="upload">
                <p class="upload_title">证件上传</p>
                <p class="upload_instruction">请将毕业证第一页和身份证正面摆放在一起拍摄清晰竖版图片上传,支持jpg和png格式，图片大小请控制在8M以内</p>
                <p class="upload_case">样例</p>
                <img :src="imgUrl">
                <form id="uploadImg">
                    <label class="upload_button" for="file-upload">{{uploadBtn}}</label>
                    <input id="file-upload" accept="image/jpg,image/jpeg,image/png" type='file' name='student_pic_upload[]' v-on:change="imgUpload" />
                </form>
                <p class="upload_ps">PS：若毕业证丢失或者不在身边，可换成能够证明2017年应届毕业生身份的学信网截图或者学生证~</p>
            </div>
            <div class="submitBtn" v-on:click="submit">{{is_apply?'已提交':'提交'}}</div>
            <p class="lastInstruction">说明：我们会对申请资料严格保密，仅作为身份核验使用。请仔细确认所填资料，一经上传不得修改</p>
        </div>
        <submitSuccess :title=submitSuccess.title :text=submitSuccess.text :button=submitSuccess.button v-model=submitSuccess.show v-on:buttonClick="submitSuccessBtnClick" />
        <invitationAlert v-model=invitationAlert.show :invitationNum=invitationNum v-on:share="share" />
        <toast :text=toast.text :time=toast.time v-model=toast.show />
        <wx-share-tip :title=wxShareTip.title :text=wxShareTip.text v-model=wxShareTip.show />
    
    </div>
</template>

<script>
import API from '../../service/api'
import submitSuccess from '../../components/common/submitSuccess/index.vue';
import invitationAlert from '../../components/invitationAlert/index.vue';
import toast from '../../components/common/toast/index.vue';
import wxShareTip from '../../components/common/wxShareTip/index.vue';
export default {
    data() {
        return {
            name: '',
            school: '',
            city: '',
            accessCity: ['北京市', '上海市', '深圳市'],
            caseImg: '//img.58cdn.com.cn/fangrs/img/bb539afd156e2b19595a9579b3b78e80.jpg',
            uploadImgArr: {},
            imgGrade: '1', //显示的图片质量1,1/3,1/6
            uploadBtn: '点击上传照片',
            submitSuccess: {
                show: false,
                title: '提交成功',
                text: ['我们已成功收到您的申请，将在3个工作日反馈结果', '审核通过后我们将第一时间短信通知您，请您耐心等待~'],
                button: '我知道了',
            },
            toast: {
                show: false,
                text: '',
                time: 2000,
            },
            invitationAlert: {
                show: false,
            },
            maxPicSize: 8 * 1024 * 1024,
            wxShareTip: {
                title: '分享给小伙伴',
                text: '一起拿好礼',
                show: false,
            },
            awardShare: {
                title: '老铁，我来邀请你一起毕业租房，享受月付0押金福利！有福要同享～',
                desc: '58租房，温暖你的毕业找房路～'
            }
        }
    },
    computed: {
        is_apply() {
            return this.$parent.userInfo.is_apply;
        },
        showInvite() {
            if (FBridge.env.platform == 'm') {
                return false;
            } else {
                return this.$parent.userInfo.is_chip_show;
            }
        },
        imgUrl() {
            if (!this.uploadImgArr['1']) {
                return this.caseImg;
            } else {
                return 'http://' + this.uploadImgArr[this.imgGrade]['pic_url'];
            }
        },
        invitationNum() {
            if (this.$parent.userInfo.current_user_invite_info) {
                return this.$parent.userInfo.current_user_invite_info.invite_nums;
            } else {
                return 0;
            }
        }
    },
    methods: {
        checkLogin() {
            if (this.$parent.$data.isLogin === null) {
                setTimeout(this.checkLogin, 0);
                return;
            }
            if (!this.$parent.$data.isLogin) {
                FBridge.passport.login(location.href, (state) => {
                    if (state == 0) {
                        this.$parent.$data.isLogin = true;
                    }
                });
            } else {
                if (!this.$parent.userInfo.current_user_id) {
                    setTimeout(this.checkLogin, 0);
                    return;
                }
                if (!this.$parent.userInfo.current_user_mobile) {
                    if (FBridge.env.platform == 'app') {
                        WBAPP.extendRightBtn("top_right", "", "rightBtnCallback");
                        function rightBtnCallback() { }
                    };
                    location.href = '//my.58.com/m/mobilebind?path=' + location.href;
                }
            }
        },
        imgUpload(event) {
            let _this = this;
            if (event.target.files[0].size >= this.maxPicSize) {
                _this.showToast('图片不能超过8M');
            } else {
                _this.uploadBtn = '正在上传照片...';
                this.$request.post({
                    url: API.uploadImg.host + API.uploadImg.url,
                    data: new FormData(document.forms["uploadImg"]),
                    callback: function (state, res) {
                        if (res.code == 0) {
                            _this.uploadImgArr = res.data[Object.keys(res.data)[0]];
                            _this.uploadBtn = '重新上传照片';
                        }
                    },
                });
            }
        },
        submit() {
            if (this.is_apply) { return; }
            if (!this.checkParam()) { return; };
            FBridge.track.send('tj-click', 'fcapp-xcjhtxy', this.$parent.cate);
            let _this = this;
            this.$request.get({
                url: API.submitApply.host + API.submitApply.url,
                data: {
                    name: this.name,
                    city: this.getCityCode(this.city),
                    university: this.school,
                    paper_url: this.getImgParam(),
                    invite_code: sessionStorage.getItem('invite_code')
                },
                callback: function (state, res) {
                    if (res.code == 0) {
                        _this.$parent.userInfo.is_apply = 1;
                        _this.submitSuccess.show = true;
                    } else if (res.code == 4003) {
                        location.href = '//my.58.com/m/mobilebind?path=' + location.href;
                    } else {
                        _this.showToast('提交失败');
                    }
                },
            });
        },
        checkParam() {
            if (!this.name) {
                this.showToast('姓名不能为空');
                return false;
            }
            if (!(/^[\u4e00-\u9fa5]+$/i).test(this.name)) {
                this.showToast('姓名必须为汉字');
                return false;
            }
            if (!this.school) {
                this.showToast('学校不能为空');
                return false;
            }
            if (!(/^[\u4e00-\u9fa5]+$/i).test(this.school)) {
                this.showToast('学校必须为汉字');
                return false;
            }
            if (this.school.length <= 3) {
                this.showToast('学校名称最少四个字');
                return false;
            }
            if (!this.city) {
                this.showToast('城市不能为空');
                return false;
            }
            if (!this.uploadImgArr['1']) {
                this.showToast('请上传证件');
                return false;
            }
            return true;
        },
        getCityCode(cityName) {
            let cityTable = this.$parent.$data.userInfo.apply_city;
            let cityCodeArr = Object.keys(cityTable);
            for (let i = 0; i < cityCodeArr.length; i++) {
                if (cityTable[cityCodeArr[i]] == cityName) {
                    return cityCodeArr[i];
                }
            }
        },
        getImgParam() {
            let tem = [];
            let keys = Object.keys(this.uploadImgArr);
            for (let i = 0; i < keys.length; i++) {
                tem.push(this.uploadImgArr[keys[i]]['pic_url'])
            }
            return tem.join('@');
        },
        submitSuccessBtnClick() {
            FBridge.track.send('iknow-click', 'fcapp-xcjhtxy', this.$parent.cate);
            if (this.showInvite) {
                this.invitationAlert.show = true;
            } else {
                history.go(-1);
            }
        },
        share() {
            FBridge.track.send('hsshare-click', 'fcapp-xcjhtxy', this.$parent.cate);
            if (!this.$parent.$data.isLogin) {
                FBridge.passport.login(location.href, (state) => {
                    if (state == 0) {
                        this.$parent.$data.isLogin = true;
                    }
                });
            } else {
                if (this.$parent.userInfo.current_user_invite_info && this.$parent.userInfo.current_user_invite_info.invite_link) {
                    if (FBridge.env.platform == 'wx') {
                        FBridge.share.config(this.awardShare.title, this.awardShare.desc, '//' + this.$parent.userInfo.current_user_invite_info.invite_link, 'https://img.58cdn.com.cn/fangrs/img/b31606ed93951506968ef830ad4c9f3a.jpg');
                        this.wxShareTip.show = true;
                    } else if (FBridge.env.platform == 'app') {
                        WBAPP.shareInfo(this.awardShare.title, this.$parent.userInfo.current_user_invite_info.invite_link, 'https://img.58cdn.com.cn/fangrs/img/b31606ed93951506968ef830ad4c9f3a.jpg', '分享占位显示', this.awardShare.desc, 'WEIXIN,FRIENDS');
                    }
                } else {
                    alert('网络错误');
                }
            }
        },
        showToast(text) {
            this.toast.text = text;
            this.toast.show = true;
        },
    },
    components: {
        submitSuccess,
        invitationAlert,
        toast,
        wxShareTip
    },
    created() {
        // FBridge.track.show('fcapp-xcjhtxy','fcm-xcjhtxy','fcwx-xcjhtxy','1.70134');
        this.checkLogin();
    }
};
</script>