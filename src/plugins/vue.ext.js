/**
 * Created by luanchi on 17/5/25.
 */
import Request from './request';
import Lazyload from 'vue-lazyload';

exports.install = (Vue)=> {
    Vue.use(Request);
    Vue.use(Lazyload);

    Vue.prototype.$fullpath = "1,70134";//app端埋点fullpath
    Vue.prototype.$pagetype = "";//区分app还是m
    Vue.prototype.$isWX = false;//是否在微信端打开

    Vue.prototype.$isWeiXin = function () {//判断是否是微信
        var weFlag = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger";
        if (weFlag) {//是微信端
            this.$isWX = true;
        }
        return this.$isWX;
    };
    Vue.prototype.$getOs = function (objname) {//获取指定名称的cookie的值
        var result = '';
        var arrstr = document.cookie.split("; ");
        for (var i = 0; i < arrstr.length; i++) {
            var temp = arrstr[i].split("=");
            if (temp[0] == objname) {
                result = unescape(temp[1]);
            }
        }
        if (result) {
            return result;
        } else {
            return null;
        }
    };
    //埋点PageType
    Vue.prototype.$judgePageType = function (pageType, isGy = false) {
        if (!pageType) {
            return "";
        }
        let _pageType = "";
        let _gyb = "";
        if (isGy && pageType == 'byj') {
            _gyb = 'gyb';
        }
        if (this.$getOs('os')) {//在app里面打开
            let _app = "fcapp-";
            _pageType = _app + pageType + _gyb;
        } else if (this.$isWeiXin()) {//微信端
            let _wx = "fcwx-";
            _pageType = _wx + pageType + _gyb;
        } else {//m端
            let _m = "fcm-";
            _pageType = _m + pageType + _gyb;
        }
        Vue.prototype.$pagetype = _pageType;

        if (!this.$getOs('os')) {
            try {
                //m埋点统计处理
                if (!window._trackURL) {
                    window._trackURL = "{'cate':'" + Vue.prototype.$fullpath + "','area':'','pagetype':'" + _pageType + "','page':'show'}";
                } else {
                    let _trackURL = eval('(' + window._trackURL + ')');
                    _trackURL.pagetype = _pageType;
                    window._trackURL = JSON.stringify(_trackURL);
                }
            } catch (err) {
            }
        }
        return _pageType;
    };

    Vue.prototype.$weiXin_m_app_clickLog = function (clickLog, isGy = false) {//判断是m还是app还是微信端,加不同的点击埋点前缀
        if (!clickLog) {
            return "";
        }
        var changeLog = "";
        let _gy = "";
        let _click = "-click";
        if (isGy) {
            _gy = "gy_";
        }
        if (this.$getOs('os')) {//app端
            changeLog = _gy + 'app_' + clickLog + _click;
        } else if (this.$isWeiXin()) {//微信端
            changeLog = 'from=' + _gy + 'wx_' + clickLog + _click;
        } else {//m端
            changeLog = 'from=' + _gy + 'm_' + clickLog + _click;
        }
        return changeLog;
    };

    Vue.prototype.$commonSendLogJump = function (clickLog, pageType, nativeJump, lodePage, href) {//发送埋点，原生native跳转，h5native跳转，m端跳转
        if (!pageType) {
            pageType = Vue.prototype.$pagetype;
        }
        let fullpath = Vue.prototype.$fullpath;
        if (clickLog) {
            clickLog = Vue.prototype.$weiXin_m_app_clickLog(clickLog);
        }
        //逻辑判断
        if (this.$getOs('os')) {
            if (clickLog) {
                WBAPP.setWebLog(clickLog, pageType, fullpath);
            }
            if (nativeJump) {
                let param = JSON.parse(nativeJump);
                WBAPP._nativeBridge(param);
            } else if (lodePage) {
                let param = JSON.parse(lodePage);
                WBAPP.loadPage('link', href, param['title']);
            } else {
                // WBAPP.loadPage('link', href);
                window.location.href = href;
            }
        } else {
            if (typeof window.clickLog == "function" && clickLog) {
                window.clickLog(clickLog);
            }
            window.location.href = href;
        }
    };

    //点击log
    Vue.prototype.$clickLog = function (clickLog, pagetype = Vue.prototype.$pagetype) {
        if (clickLog) {
            var clickLog = Vue.prototype.$weiXin_m_app_clickLog(clickLog);
            if (this.$getOs('os')) {
                WBAPP.setWebLog(clickLog, pagetype, Vue.prototype.$fullpath);
            } else {
                if (typeof window.clickLog == "function") {
                    window.clickLog(clickLog);
                }
            }
        }
    };

    Vue.prototype.$showLog = function () {
        if (this.$getOs('os')) {
            WBAPP.setWebLog('show', Vue.prototype.$pagetype, Vue.prototype.$fullpath);
        } else {
            window.clickLog('from=' + Vue.prototype.$pagetype);
        }
    };
    //app页面分享
    Vue.prototype.$commonShare = function (share_Title, share_titleDes, share_url, clickLog) {//app内部分享公用分享方法
        if (this.$getOs('os')) {
            WBAPP.extendRightBtn("top_right", "分享", "rightBtnCallback");
            window.rightBtnCallback = function () {
                WBAPP.setWebLog(clickLog, Vue.prototype.$pagetype, Vue.prototype.$fullpath);
                var shareTitle = share_Title || "";
                var shareUrl = share_url || window.location.href;
                var shareImg = "http://img.58cdn.com.cn/logo/m58/90_90/logo.png";
                var shareTitleDes = share_titleDes || "";
                WBAPP.shareInfo(shareTitle, shareUrl, shareImg, "分享占位显示", shareTitleDes, "WEIXIN,FRIENDS");
            }
        }
    };

    Vue.prototype.$coords = '';
    Vue.prototype.$getCoords = function () {
        if (Vue.prototype.$getOs('os')) {
            WBAPP.getPosition(function (lon, lat, source) {
                let wbCoords = [lat, lon].join(",");
                Vue.prototype.$coords = wbCoords;
            });
        } else if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(function (position) {
                let h5Coords = [position.coords.latitude, position.coords.longitude].join(",");
                Vue.prototype.$coords = h5Coords;
            }, function (err) {
            }, {
                timeout: 10000,//等待响应的最大时间
                maximumAge: 60000,//程序的缓存时间
                enableHighAccuracy: true //是否高精度可用
            });
        }
    };

    Vue.prototype.$getParameter = name => {//从当前URL里面提取参数值
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        } else {
            return null;
        }
    };
};
