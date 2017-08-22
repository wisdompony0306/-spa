<!--
    主会场tab页
-->
<style rel="stylesheet/less" lang="less" scoped>
    @import './mainvenue.less';
</style>

<template>
    <div class="mainvenueBox">
        <!--S 头图-->
        <section class="headBox" :class="{houseHeadBox:!cityModel.isGongyu}">
            <span>6月15日-7月21日</span>
        </section>
        <!--E 头图-->

        <!--S 公寓版-->
        <template v-if="cityModel.isGongyu">
            <!--S 新巢计划引导-->
            <section class="xcjhBox" v-if="isShowXinchao">
                <div class="xcjhHead"></div>
                <XcjhGuide/>
                <div class="xcjhDesc">
                    又是一年毕业季，朝气勃发的你走出校园，迈向新的旅程。我们推出了“新巢计划”，希望让努力的你，住更好一点！只需提交资料，就可以享受上百家公寓有奖入住体验，更有“免押金”“房租月付”等服务。
                </div>
                <router-link class="xcjhBtn" :to="gongyuModel.benefitGo.url"
                             @click.native="handlerGo(gongyuModel.benefitGo)">现在去报名
                </router-link>
            </section>
            <!--E 新巢计划引导-->

            <!--S 精选店铺列表(品牌墙)-->
            <section class="jxdpBox" v-show="isShowBrandWall">
                <div class="jxdpTitle">{{gongyuModel.brandWall.title}}</div>
                <div class="jxdpDesc">{{gongyuModel.brandWall.desc}}</div>
                <div class="jxdpList">
                    <ShopItemV :detail="detail" v-for="(detail,index) in gongyuModel.brandWall.list"
                               :key="'brandWall_' + index" :maidian="gongyuModel.brandWall.maidian"/>
                </div>
                <router-link class="jxdpBtn" :to="gongyuModel.brandWall.more.url"
                             @click.native="handlerGo(gongyuModel.brandWall.more)">
                    {{gongyuModel.brandWall.more.text}}
                </router-link>
            </section>
            <!--E 精选店铺列表(品牌墙)-->

            <!--S 公寓房源列表-月付-->
            <GongyuWrap :title="gongyuModel.yuefu.title" :desc="gongyuModel.yuefu.desc"
                        :more="gongyuModel.yuefu.more"
                        v-show="gongyuModel.yuefu.list.length>0">
                <GongyuCouponItem :detail="detail" v-for="(detail,index) in gongyuModel.yuefu.list"
                                  :key="'yuefu_' + index" :maidian="gongyuModel.yuefu.maidian"/>
            </GongyuWrap>
            <!--E 公寓房源列表-月付-->

            <!--S 公寓房源列表-精致开间-->
            <GongyuWrap :title="gongyuModel.jizhong.title" :desc="gongyuModel.jizhong.desc"
                        :more="gongyuModel.jizhong.more"
                        v-show="gongyuModel.jizhong.list.length>0">
                <GongyuCouponItem :detail="detail" v-for="(detail,index) in gongyuModel.jizhong.list"
                                  :key="'jizhong_' + index" :maidian="gongyuModel.jizhong.maidian"/>
            </GongyuWrap>
            <!--E 公寓房源列表-精致开间-->

            <!--S 公寓房源列表-独立卫生-->
            <GongyuWrap :title="gongyuModel.dlweishengjian.title" :desc="gongyuModel.dlweishengjian.desc"
                        :more="gongyuModel.dlweishengjian.more"
                        v-show="gongyuModel.dlweishengjian.list.length>0">
                <GongyuCouponItem :detail="detail" v-for="(detail,index) in gongyuModel.dlweishengjian.list"
                                  :key="'dlweishengjian_' + index" :maidian="gongyuModel.dlweishengjian.maidian"/>
            </GongyuWrap>
            <!--E 公寓房源列表-独立卫生-->

            <!--S 公寓房源列表-短租过渡-->
            <GongyuWrap :title="gongyuModel.duanzu.title" :desc="gongyuModel.duanzu.desc"
                        :more="gongyuModel.duanzu.more"
                        v-show="gongyuModel.duanzu.list.length>0">
                <GongyuCouponItem :detail="detail" v-for="(detail,index) in gongyuModel.duanzu.list"
                                  :key="'duanzu_' + index" :maidian="gongyuModel.duanzu.maidian"/>
            </GongyuWrap>
            <!--E 公寓房源列表-短租过渡-->

            <section class="yunying" :class="[cityModel.isGongyu?'yunyingMGY':'yunyingM']" @click="handlerDaoliu">
                <img src="http://img.58cdn.com.cn/fangrs/img/f6cd296433ac50207caa4aba99704e6e.png">
            </section>

            <section class="toutiao">
                <div class="ttTitle"></div>
                <div class="ttInfo">
                    <transition-group name="headline-loop">
                        <router-link v-for="(item,index) in Adlist" v-if="item.type=='in'" v-bind:key='item.id' :to="item.url" @click.native="handlerGo(item)" v-show="index==AdIndex">
                            {{item.text}}
                        </router-link>
                        <a v-for="(item,index) in Adlist" v-if="item.type=='out'" v-bind:key='item.id' :href="item.url" @click.native="handlerGo(item)" v-show="index==AdIndex">{{item.text}}</a>
                    </transition-group>
                </div>
            </section>

        </template>
        <!--E 公寓版-->

        <!--S 非公寓版-->
        <template v-if="!cityModel.isGongyu">
            <!--S 房源推荐 3 tab-->
            <section class="houseGuideBox">
                <div class="houseTitle">努力的你, 应当住更好</div>
                <HouseGuide :items="houseModel.houseTab"/>
            </section>
            <!--E 房源推荐 3 tab-->

            <!--S 整租-->
            <section class="zufangBox">
                <div class="houseTitle">整套好房子,由我独享</div>
                <HouseZufang :items="houseModel.zufang"/>
            </section>
            <!--E 整租-->

            <!--S 合租-->
            <section class="hezuBox">
                <div class="houseTitle">住在一起的,都是朋友</div>
                <HouseHezu :items="houseModel.hezu"/>
            </section>
            <!--E 合租-->

            <!--<section class="yunying" :class="[cityModel.isGongyu?'yunyingMGY':'yunyingM']" @click="handlerDaoliu">
                <img src="http://img.58cdn.com.cn/fangrs/img/f6cd296433ac50207caa4aba99704e6e.png">
            </section>-->

            <!--S 其他分类: 商铺、写字楼、厂房-->
            <section class="otherBox">
                <HouseOther :items="houseModel.other"/>
            </section>
            <!--E 其他分类: 商铺、写字楼、厂房-->
        </template>

        <!--<section class="yinliu" :class="[cityModel.isGongyu?'yinliuMGY':'yinliuM']">
            <img src="http://img.58cdn.com.cn/fangrs/img/65859dc0c6f5ed36c5df548608d89add.png">
        </section>-->
        <!--E 公寓版-->
    </div>
</template>

<script type="text/ecmascript-6">
    import {
            XcjhGuide,
            ShopItemV,
            GongyuWrap,
            GongyuCouponItem,
            HouseGuide,
            HouseZufang,
            HouseHezu,
            HouseOther
    } from '../../components/index';

    import API from '../../service/api'

    export default {
        data(){
            return {
                /*当前城市及终端数据模型*/
                cityModel: {
                    /*是否是公寓城市*/
                    isGongyu: true,
                    /*是否是新巢计划城市*/
                    isXinchao: true,
                    /*当前终端*/
                    platform: '',
                    /*当前城市*/
                    currentCity: {},
                },
                /*公寓版数据模型*/
                gongyuModel: {
                    /*精选店铺品牌墙*/
                    brandWall: {
                        title: '精选店铺',
                        desc: '精选优秀靠谱品牌 租房优惠拿到手软',
                        list: [],
                        minNum: 6,//只有合作数大于等于6个的城市才展示品牌墙
                        maidian: 'ppq',
                        more: {
                            url: '/nestplan/apartment',
                            text: '更多精选店铺 >',
                            maidian: 'ppqmore'
                        },
                    },
                    /*房源:月付*/
                    yuefu: {
                        title: '房租月付',
                        desc: '钱少也能住好房，房租轻松按月付',
                        list: [],
                        maidian: 'kyf',
                        more: {
                            text: '更多月付房源',
                            maidian: 'kyfmore',
                            url: '',
                            loadPage: '',
                            nativeApp: ''
                        },
                    },
                    /*房源:精致开间*/
                    jizhong: {
                        title: '精致开间',
                        desc: '宽敞优美的环境，自由舒适的体验',
                        list: [],
                        maidian: 'zzkj',
                        more: {
                            text: '更多精致开间',
                            maidian: 'zzkjmore',
                            url: '',
                            loadPage: '',
                            nativeApp: ''
                        }
                    },
                    /*房源:独立卫生*/
                    dlweishengjian: {
                        title: '独立卫生间',
                        desc: '方便随心的环境，自由舒适的体验',
                        list: [],
                        maidian: 'dlwsj',
                        more: {
                            text: '更多独立卫生间',
                            maidian: 'dlwsjmore',
                            url: '',
                            loadPage: '',
                            nativeApp: ''
                        }
                    },
                    /*房源:短租过渡*/
                    duanzu: {
                        title: '短租过渡',
                        desc: '即使是短暂的过渡 也丝毫不含糊',
                        list: [],
                        maidian: 'kdz',
                        more: {
                            text: '更多短租过渡',
                            maidian: 'kdzmore',
                            url: '',
                            loadPage: '',
                            nativeApp: ''
                        }
                    },
                    benefitGo: {
                        url: '/nestplan/benefit',
                        maidian: 'xzqbm'
                    },
                    rentplanGo: {
                        url: '/nestplan/rentplan',
                        maidian: 'zftt'
                    },
                },

                /*非公寓版数据模板*/
                houseModel: {
                    houseTab: {
                        keyuefu: {},
                        geren: {},
                        jingjiren: {},
                    },
                    zufang: {
                        zufang: {},
                        yiju: {},
                        erju: {},
                        sanju: {},
                    },
                    hezu: {
                        duliweishengjian: {},
                        chuzu: {},
                        ciwo: {},
                        zhuwo: {},
                        danjian: {},
                    },
                    other: {
                        shangpu: {},
                        xiezl: {},
                        changfang: {}
                    }
                },
                daoliuModel: {
                    maidian: 'gydlw',
                    pinpaigongyu: {},
                },
                currentPagetype: this.$pagetype,
                Adlist:[
                    {
                        id:1,
                        url:'/nestplan/rentplan',
                        maidian: 'zftt',
                        text:'如何在58同城品牌公寓找房？',
                        type:'in'
                    },
                    {
                        id:2,
                        url:'//activityhouse.m.58.com/activity/rent_guide',
                        maidian: 'gonglue',
                        text:'毕业租房不用愁，攻略这里全都有！',
                        type:'out'
                    }
                ],
                AdIndex:0,
            }
        },
        props: ['getCityFinish'],
        watch: {
            'getCityFinish'(val, old){
                if (val) {
                    this.initData();
                }
            }
        },
        computed: {
            isShowXinchao(){
                return this.cityModel.isXinchao;
            },
            isShowBrandWall(){
                let _isShow = this.gongyuModel.brandWall.list.length >= this.gongyuModel.brandWall.minNum;
                return _isShow;
            }
        },
        created(){
            this.initData();
            this.loop();
            if(FBridge.env.platform != 'app'){
                callWbApp("","url", {
                    url:"https://activityhouse.m.58.com/nestplan/mainvenue", //必填参数, H5页面url
                    title:"2017毕业季",//必填参数, 页面title
                    pid:"1191",//可选参数，置空或者不填将自动填充默认值
                });
            }
        },
        mounted(){
        },
        methods: {
            initData(){
                if (!this.getCityFinish) {
                    return;
                }
                let _this = this;
                //初始化城市信息
                ({
                    isGongyu: _this.cityModel.isGongyu,
                    isXinchao: _this.cityModel.isXinchao,
                    platform: _this.cityModel.platform,
                    currentCity: _this.cityModel.currentCity,
                    pinpaigongyu: _this.daoliuModel.pinpaigongyu = {},
                } = _this.$parent.$data);

                if (_this.cityModel.isGongyu) {//初始化公寓版数据
                    _this.getBrandWallData();
                    _this.getHouseData();
                } else {//初始化非公寓版数据
                    _this.getRecommendUrlData();
                }
            },
            getBrandWallData(){
                let _this = this;
                _this.$request.jsonp({
                    url: API.getBrandWall.host + API.getBrandWall.url,
                    data: {
                        city: _this.cityModel.currentCity.listName,
                        // type: 1,
                        geoia: _this.$coords,
                        page: 1,
                        size: 6
                    },
                    callback: _this.getBrandWallDataCb,
                    jsonpName: 'jsoncallback'
                });
            },
            getBrandWallDataCb(state, res){
                let _this = this;
                if (state) {
                    let _data = res.data;
                    ({
                        gongyuShopList: _this.gongyuModel.brandWall.list = []
                    } = _data);
                } else {
                    //接口错误处理
                    console.error(res);
                }
            },
            getHouseData(){
                let _this = this;
                _this.$request.jsonp({
                    url: API.getHouse.host + API.getHouse.url,
                    data: {
                        city: _this.cityModel.currentCity.listName,
                        type: 'all',
                        geoia: _this.$coords,
                        page: 1,
                        size: 2
                    },
                    callback: _this.getHouseDataCb,
                    jsonpName: 'jsoncallback'
                });
            },
            getHouseDataCb(state, res){
                let _this = this;
                if (state) {
                    let _data = res.data;
                    let _default = {gongyuList: [], moreUrl: ''};
                    ({
                        yuefu: {
                            gongyuList: _this.gongyuModel.yuefu.list = [],
                            moreUrl: _this.gongyuModel.yuefu.more.url = '',
                            loadPage: _this.gongyuModel.yuefu.more.loadPage = '',
                            nativeApp: _this.gongyuModel.yuefu.more.nativeApp = ''
                        } = _default,
                        jizhong: {
                            gongyuList: _this.gongyuModel.jizhong.list = [],
                            moreUrl: _this.gongyuModel.jizhong.more.url = '',
                            loadPage: _this.gongyuModel.jizhong.more.loadPage = '',
                            nativeApp: _this.gongyuModel.jizhong.more.nativeApp = ''
                        } = _default,
                        dlweishengjian: {
                            gongyuList: _this.gongyuModel.dlweishengjian.list = [],
                            moreUrl: _this.gongyuModel.dlweishengjian.more.url = '',
                            loadPage: _this.gongyuModel.dlweishengjian.more.loadPage = '',
                            nativeApp: _this.gongyuModel.dlweishengjian.more.nativeApp = ''
                        } = _default,
                        duanzu: {
                            gongyuList: _this.gongyuModel.duanzu.list = [],
                            moreUrl: _this.gongyuModel.duanzu.more.url = '',
                            loadPage: _this.gongyuModel.duanzu.more.loadPage = '',
                            nativeApp: _this.gongyuModel.duanzu.more.nativeApp = ''
                        } = _default,
                    } = _data);
                } else {
                    //接口错误处理
                    console.error(res);
                }
            },
            getRecommendUrlData(){
                let _this = this;
                _this.$request.jsonp({
                    url: API.getRecommendUrl.host + API.getRecommendUrl.url,
                    data: {
                        city: _this.cityModel.currentCity.listName
                    },
                    callback: _this.getRecommendUrlDataCb,
                    jsonpName: 'jsoncallback'
                });
            },
            getRecommendUrlDataCb(state, res){
                let _this = this;
                if (state) {
                    let _data = res.data;
                    ({
                        keyuefu: _this.houseModel.houseTab.keyuefu = {},
                        geren: _this.houseModel.houseTab.geren = {},
                        jingjiren: _this.houseModel.houseTab.jingjiren = {},

                        zufang: _this.houseModel.zufang.zufang = {},
                        yiju: _this.houseModel.zufang.yiju = {},
                        erju: _this.houseModel.zufang.erju = {},
                        sanju: _this.houseModel.zufang.sanju = {},

                        duliweishengjian: _this.houseModel.hezu.duliweishengjian = {},
                        chuzu: _this.houseModel.hezu.chuzu = {},
                        ciwo: _this.houseModel.hezu.ciwo = {},
                        zhuwo: _this.houseModel.hezu.zhuwo = {},
                        danjian: _this.houseModel.hezu.danjian = {},

                        shangpu: _this.houseModel.other.shangpu = {},
                        xiezl: _this.houseModel.other.xiezl = {},
                        changfang: _this.houseModel.other.changfang = {}
                    } = _data);
                } else {
                    //接口错误处理
                    console.error(res);
                }
            },
            /*
             * 如果路由切换由@click.native方法绑定的事件,
             * 此时的全局this.$pagetype变量会变成跳转后的页面的pagetype,
             * 需求将当前页面的pagetype缓存后传递给埋点方法
             */
            handlerGo(item){
                if (item && item.maidian) {
                    this.$clickLog(item.maidian, this.currentPagetype);
                }
            },
            handlerDaoliu(){
                let [_maidian,_pinpaigongyu]=[this.daoliuModel.maidian, this.daoliuModel.pinpaigongyu];
                this.$commonSendLogJump(_maidian, '', _pinpaigongyu.nativeApp, _pinpaigongyu.loadPage, _pinpaigongyu.url)
            },
            loop(){
                var _this = this,
                    length = _this.Adlist.length;

                _this.timer && clearInterval(_this.timer);
                _this.timer = setInterval(function(){
                    if(_this.AdIndex >= length - 1){
                        _this.AdIndex = 0;
                    }
                    else{
                        _this.AdIndex ++;
                    }
                }, 3000);
            }
        },
        components: {
            XcjhGuide,
            ShopItemV,
            GongyuWrap,
            GongyuCouponItem,

            HouseGuide,
            HouseZufang,
            HouseHezu,
            HouseOther
        },

    };
</script>