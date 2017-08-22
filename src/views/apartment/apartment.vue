<!--
    公寓馆tab页
-->
<style rel="stylesheet/less" lang="less" scoped>
    @import './apartment.less';
</style>

<template>
    <div class="apartmentBox">
        <!--S 头图-->
        <section class="apartmentHeadBox">
            <span>6月15日-7月21日</span>
        </section>
        <!--E 头图-->

        <!--S 页内导航-->
        <nav class="apartmentNavBox">
            <a v-for="(item,index) in navModel.navList" class="navItem"
               :class="[navModel.activeNavIndex == index ? 'hover': '']" @click="handlerNavClick(index)">
                {{item.text}}
            </a>
        </nav>
        <!--E 页内导航-->

        <!--S 公寓列表-->
        <ShopWrap :title="activeNav.text">
            <ShopItemA :detail="detail" v-for="(detail,index) in brandWallModel['list'+ this.activeNav.type]"
                       :key="'brandWall_'+index"/>
            <div class="noList" v-if="brandWallModel['list'+ this.activeNav.type].length==0">无请求数据</div>
            <div class="moreGongyuBtn" v-if="hasMore" @click="handlerMoreClick">更多公寓</div>
        </ShopWrap>
        <Loading :isShow="loading"/>
        <!--E 公寓列表-->
    </div>
</template>

<script type="text/ecmascript-6">
    import {ShopItemA, ShopWrap, Loading} from '../../components/index';

    import API from '../../service/api'

    export default {
        data(){
            return {
                /*请求加载loading*/
                loading: true,
                /*页面导航数据模型*/
                navModel: {
                    /* 导航: 激活状态的导航索引*/
                    activeNavIndex: 0,
                    /* 导航: 数据 */
                    navList: [{
                        text: '热门公寓',
                        type: 2,
                        size: 50,
                        page: 1,
                        maidian: 'byjrmgy',
                    }, {
                        text: '精选公寓',
                        type: 1,
                        size: 50,
                        page: 1,
                        maidian: 'byjjxgy',
                    }, {
                        text: '更多公寓',
                        type: 3,
                        size: 50,
                        page: 1,
                        maidian: 'byjjzgd',
                    }]
                },
                /*当前城市及终端数据模型*/
                cityModel: {
                    /*是否是公寓城市*/
                    isGongyu: true,
                    /*是否是新巢计划城市*/
                    isXinchao: true,
                    /*当前终端*/
                    platform: '',
                    /*当前城市*/
                    currentCity: {}
                },

                /*公寓店铺模型*/
                brandWallModel: {
                    /*精选公寓列表*/
                    list1: [],
                    /*热门公寓列表*/
                    list2: [],
                    /*更多公寓列表*/
                    list3: []
                },
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
            /*当前选中导航*/
            activeNav(){
                return this.navModel.navList[this.navModel.activeNavIndex];
            },
            /*列表是否有加载更多 预留*/
            hasMore(){
                return false;
            }
        },
        created(){
            this.initData();
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
                    currentCity: _this.cityModel.currentCity
                } = _this.$parent.$data);
                this.getBrandWallData();
            },
            getBrandWallData(){
                let _this = this;
                let _city = _this.cityModel.currentCity.listName;
                let {type:_type, size:_size, page:_page}=_this.activeNav;
                this.$request.jsonp({
                    url: API.getBrandWall.host + API.getBrandWall.url,
                    data: {
                        city: _city,
                        type: _type,
                        geoia: _this.$coords,
                        page: _page,
                        size: _size,
                    },
                    callback: this.getBrandWallDataCb,
                    jsonpName: 'jsoncallback'
                });
            },
            getBrandWallDataCb(state, res){
                let _this = this;
                if (state) {
                    let _data = res.data;
                    let _type = _this.activeNav.type;
                    ({
                        gongyuShopList: _this.brandWallModel['list' + _type] = []
                    } = _data);

                    this.loading = false;
                } else {
                    //接口错误处理
                    console.error(res);
                }
            },
            handlerNavClick(index){
                let _this = this;
                _this.navModel.activeNavIndex = index;
                _this.maidianClick();
                _this.getBrandWallData();
            },
            /**
             * 点击埋点
             */
            maidianClick: function () {
                let {maidian:_clickLog}=this.activeNav;
                this.$clickLog(_clickLog);
            },
            handlerMoreClick(event){
                //预留
            }
        },
        components: {
            ShopItemA,
            ShopWrap,
            Loading
        }
    };
</script>