<!--
    毕业季入口组件
    页面的路由操作:导航、切换配置、
    数据请求采用:导航完成之后获取,只有通用所有页面都通用的数据请求放到该组件中完成,跟单一导航项有个的请放到具体的组件中完成
-->
<style rel="stylesheet/less" lang="less" scoped>
@import './asset/base';

@fontsize20: 10px;
.bodyBox {
    width: 100%;
    height: 100%;

    .footerNav {
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 10;
        width: 100%;
        height: px2rem(100px);
        background: #ffffff;
        display: -webkit-flex;
        display: flex;


        .tab {
            display: block;
            position: relative;
            flex: 1.0;
            -webkit-flex: 1;
            box-flex: 1.0;
            -webkit-box-flex: 1.0;
            i {
                display: block;
                position: absolute;
                bottom: px2rem(10px);
                width: 100%;
                font-size: @fontsize20;
                color: #999;
                text-align: center;
            }
            span {
                display: block;
                position: absolute;
                bottom: px2rem(44px);
                left: 50%;
            }
            .mainvenue {
                width: px2rem(60px);
                height: px2rem(48px);
                background: data-uri('./asset/images/nav_mainvenue.png') no-repeat;
                background-size: cover;
                margin-left: px2rem(-30px);
            }
            .apartment {
                width: px2rem(52px);
                height: px2rem(46px);
                background: data-uri('./asset/images/nav_apartment.png') no-repeat;
                background-size: cover;
                margin-left: px2rem(-26px);
            }
            .benefit {
                width: px2rem(64px);
                height: px2rem(46px);
                background: data-uri('./asset/images/nav_benefit.png') no-repeat;
                background-size: cover;
                margin-left: px2rem(-32px);
            }
            .mycenter {
                width: px2rem(48px);
                height: px2rem(48px);
                background: data-uri('./asset/images/nav_mycenter.png') no-repeat;
                background-size: cover;
                margin-left: px2rem(-24px);
            }
            &.router-link-active {
                span {
                    position: absolute;
                    bottom: px2rem(44px);
                }
                i {
                    color: #f11826;
                }
                .mainvenue {
                    width: px2rem(100px);
                    height: px2rem(86px);
                    background: data-uri('./asset/images/nav_mainvenue_big.png') no-repeat;
                    background-size: cover;
                    margin-left: px2rem(-50px);
                }
                .apartment {
                    width: px2rem(88px);
                    height: px2rem(82px);
                    background: data-uri('./asset/images/nav_apartment_big.png') no-repeat;
                    background-size: cover;
                    margin-left: px2rem(-44px);
                }
                .benefit {
                    width: px2rem(106px);
                    height: px2rem(81px);
                    background: data-uri('./asset/images/nav_benefit_big.png') no-repeat;
                    background-size: cover;
                    margin-left: px2rem(-53px);
                }
                .mycenter {
                    width: px2rem(84px);
                    height: px2rem(84px);
                    background: data-uri('./asset/images/nav_mycenter_big.png') no-repeat;
                    background-size: cover;
                    margin-left: px2rem(-42px);
                }
            }
        }
    }
}
</style>

<template>
    <div class="bodyBox" ref="rootApp">
        <router-view :getCityFinish="getCityFinish"></router-view>
        <nav class="footerNav">
            <router-link class="tab" to="/nestplan/mainvenue">
                <span class="mainvenue"></span>
                <i>主会场</i>
            </router-link>
            <router-link class="tab" to="/nestplan/apartment" v-if="isGongyu">
                <span class="apartment"></span>
                <i>公寓馆</i>
            </router-link>
            <router-link class="tab" to="/nestplan/benefit">
                <span class="benefit"></span>
                <i>毕业福利</i>
            </router-link>
            <div class="tab" :class=linkActive v-on:click="goToMycenter">
                <span class="mycenter"></span>
                <i>个人中心</i>
            </div>
        </nav>
    
        <GoTop/>
        <Loading :isShow="loading" mode="pop" />
    </div>
</template>
<script>
import API from './service/api';
import router from './router/router';
import { GoTop, Loading } from './components/index'
export default {
    name: 'graduationRoot',
    data() {
        return {
            /*页面加载状态*/
            loading: true,
            /*是否是公寓城市*/
            isGongyu: true,
            /*是否是新巢计划城市*/
            isXinchao: true,
            /*当前终端*/
            platform: '',
            /*当前城市名*/
            currentCityName: '',
            /*当前城市*/
            currentCity: {},
            pinpaigongyu: {
                url: '',
                loadPage: '',
                nativeApp: '',
            },
            getCityFinish: false,
            /*页面分享配置*/
            shareModel: {
                mainvenue: {
                    title: '毕业租房优惠多，新巢心生活！',
                    desc: '58帮你快速找到好房子',
                    log: 'zhcshare-click'
                },
                apartment: {
                    title: '租房品牌云集，高额减免来袭!',
                    desc: '58同城品牌公寓，享品质生活',
                    log: 'gygshare-click'
                },
                rentplan: {
                    title: '58同城品牌公寓助力毕业生找好房，千万租房优惠，劲爆来袭!',
                    desc: '58租房，温暖你的毕业找房路',
                    log: 'gyxcshare-click'
                },
                benefit: {
                    title: '毕业租房福利多，月付0押金，入住送好礼!',
                    desc: '58租房，温暖你的毕业找房路',
                    log: 'ysjshare-click'
                },
            },
            /*用户信息*/
            userInfo: {},
            /*优惠券信息*/
            couponData: {},
            /*登录信息*/
            isLogin: null,
            /*公寓列表*/
            apartmentsData: [],
            //个人中心脚表激活状态
            linkActive: '',
            cate: '1,70134',//app端埋点
        }
    },
    watch: {
        '$route'(to, from) {
            this.initPage(to.name);
            to.name == 'mycenter' ? this.linkActive = 'router-link-active' : this.linkActive = '';
            this.tabMaidian(to.name);//tab切换埋点
            location.reload();
        },
        isLogin(newValue) {
            if (newValue) {
                this.getUserInfo('login');
            } else {
                this.getUserInfo('noLogin');
            }
        },
    },
    created() {
        this.getCurrentCity();
        this.getLoginState();
        this.$getCoords();
        this.checkInvitCode();
        if (location.href.indexOf('mycenter') > -1) {
            this.linkActive = 'router-link-active';
        }
    },
    mounted() {
        window.onunload = function (e) {
            window.scrollTo(0, 0);
        }
    },
    methods: {
        /*数据请求: 获取当前城市信息*/
        getCurrentCity() {
            this.$request.jsonp({
                url: API.getCity.host + API.getCity.url,
                callback: this.getCurrentCityCb,
                jsonpName: 'jsoncallback'
            });
        },
        /**
         * 数据请求回调: 获取当前城市信息
         * @param state 请求成功状态true|false
         * @param res 后端返回数据
         */
        getCurrentCityCb(state, res) {
            let _this = this;
            if (state && res.data) {
                let _data = res.data;
                ({
                    platform: _this.platform,
                    city: _this.currentCity,
                    city: {
                        isGongyu: _this.isGongyu,
                        isXinchao: _this.isXinchao,
                        url: _this.pinpaigongyu.url = '',
                        loadPage: _this.pinpaigongyu.loadPage = '',
                        nativeApp: _this.pinpaigongyu.nativeApp = '',
                        localName: _this.currentCityName,
                    },
                } = _data);
                if (!_this.pinpaigongyu.url) {
                    _this.pinpaigongyu.url = 'https://gongyu.m.58.com/' + _data.city.listName + '/pinpaigongyu/';
                }
                _this.getCityFinish = true;
                this.loading = false;
                this.initPage(_this.$route.name);
                this.getApartments(_data.city.localName + '市');
            } else {
                console.error("当前城市获取失败!");
            }
        },
        /**
         * 页面配置:页面埋点、分享配置
         * @param currentRouteName 当前路由name(router.js中配置的name属性)
         */
        initPage(currentRouteName) {
            let _this = this;
            _this.redirectPage();
            let _sharePageConfig = {};
            switch (currentRouteName) {
                case 'index':
                    _this.$judgePageType('byj', _this.isGongyu);
                    _this.$showLog();//页面统计必须在$judgePageType之后
                    _this.sharePage(_this.shareModel.mainvenue, _this.isGongyu);
                    break;
                case 'mainvenue':
                    _this.$judgePageType('byj', _this.isGongyu);
                    _this.$showLog();//页面统计
                    _this.sharePage(_this.shareModel.mainvenue, _this.isGongyu);
                    break;
                case 'apartment':
                    _this.$judgePageType('byjgyg');
                    _this.$showLog();//页面统计
                    _this.sharePage(_this.shareModel.apartment);
                    break;
                case 'benefit':
                    _this.$judgePageType('xcjhsy');
                    _this.$showLog();//页面统计
                    _this.sharePage(_this.shareModel.benefit);
                    break;
                case 'mycenter':
                    _this.$judgePageType('cyjpzx');
                    _this.$showLog();//页面统计
                    _this.sharePage(_this.shareModel.benefit);
                    break;
                case 'apply':
                    _this.$judgePageType('xcjhtxy');
                    _this.$showLog();//页面统计
                    _this.sharePage(_this.shareModel.benefit);
                    break;
                case 'rentplan':
                    _this.$judgePageType('gyxc');
                    _this.$showLog();//页面统计
                    _this.sharePage(_this.shareModel.rentplan);
                    break;
                default:
                    break;
            }
        },
        /*tab切换埋点*/
        tabMaidian(currentRouteName) {
            let _maidian = "";
            switch (currentRouteName) {
                case 'mainvenue':
                    _maidian = 'zhctab';
                    break;
                case 'apartment':
                    _maidian = 'gygtab';
                    break;
                case 'benefit':
                    _maidian = 'byfltab';
                    break;
                case 'mycenter':
                    _maidian = 'grzxtab';
                    break;
                default:
                    break;
            }
            if (_maidian) {
                this.$clickLog(_maidian, 'fcapp-byj');
            }
        },
        /*
         * 页面跳转处理
         * 非公寓版,公寓馆不能访问
         */
        redirectPage() {
            let _this = this;
            if (!_this.isGongyu && _this.$route.name == 'apartment') {
                let _indexUrl = [window.location.protocol, '//', window.location.hostname, "/nestplan/index"].join("");
                window.location.href = _indexUrl;
            }
        },
        /*页面分享*/
        sharePage(shareConfig, isGy = false) {
            FBridge.share.config(shareConfig.title, shareConfig.desc, window.location.href, 'https://img.58cdn.com.cn/fangrs/img/b31606ed93951506968ef830ad4c9f3a.jpg', "WEIXIN,FRIENDS", () => {
                FBridge.track.send(shareConfig.log, this.$pagetype, this.$fullpath)
            });
        },
        goToMycenter() {
            if (this.isLogin) {
                router.push("/nestplan/mycenter");
            } else {
                FBridge.passport.login(location.origin + '/nestplan/mycenter', (state) => {
                    if (state == 0) {
                        this.isLogin = true;
                        router.push("/nestplan/mycenter");
                    }
                });
            }
        },
        getApartments(cityName) {
            let _this = this;
            let city;
            switch (cityName) {
                case '北京市':
                    city = 'bj';
                    break;
                case '上海市':
                    city = 'sh';
                    break;
                case '深圳市':
                    city = 'sz';
                    break;
                default:
                    city = 'bj';
                    break;
            }
            this.$request.get({
                url: API.getApartments.host + API.getApartments.url,
                data: { city },
                callback: function (state, res) {
                    if (res.code == 0) {
                        _this.apartmentsData = res.data.gongyuShopList;
                    } else {
                        _this.apartmentsData = [];
                    }
                },
            });
        },
        getLoginState() {
            if (FBridge && FBridge.passport) {
                FBridge.passport.isLogin((res) => {
                    if (res.state) {
                        this.isLogin = true;
                    } else {
                        this.isLogin = false;
                    }
                });
            }
        },

        getUserInfo(state) {
            let _this = this;
            let auth;
            if (state == 'login') {
                auth = 1;
            } else if (state == 'noLogin') {
                auth = 0;
            }
            this.$request.get({
                url: API.getUserInfo.host + API.getUserInfo.url,
                data: { auth },
                callback: function (state, res) {
                    if (res.code == 0) {
                        _this.userInfo = res.data;
                    } else if (res.code == 4003) {
                        if (FBridge.env.platform == 'app') {
                            WBAPP.extendRightBtn("top_right", "", "rightBtnCallback");
                            function rightBtnCallback() {}
                        };
                        location.href = '//my.58.com/m/mobilebind?path=' + location.href;
                    }
                },
            });
        },
        checkInvitCode() {
            let invite_code = this.getParameter('invite_code');
            if (invite_code) {
                sessionStorage.setItem('invite_code', invite_code);
            }
        },
        getParameter(name) {//从url里面获参数值
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            } else {
                return null;
            }
        },
    },
    components: {
        GoTop,
        Loading
    }
}
</script>