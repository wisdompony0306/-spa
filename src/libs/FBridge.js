var FBridge = (function () {
'use strict';

// 计算平台环境并导出
var platform = '';
!function () {
    var userAgent = window.navigator.userAgent;
    if (userAgent.indexOf('WUBA') != -1) {
        platform = 'app';
    } else if (userAgent.indexOf('MicroMessenger') != -1) {
        platform = 'wx';
    } else {
        platform = 'm';
    }
}();

var env = Object.freeze({
	get platform () { return platform; }
});

/**
 * 动态添加js,请求回来之后在回调函数里面执行你的操作
 * @param {string} url js地址.
 * @param {function} callback 加载完毕的回调函数.
 */
var loadjs = function (url, callback) {
    /**
    * onload回调
    */
    function onload() {
        var readyState = script.readyState;
        if (typeof readyState == 'undefined' || /^(loaded|complete)$/.test(readyState)) {
            script.onload = script.onreadystatechange = null;
            script = null;
            callback && callback();
        }
    }
    var script = document.createElement('script');
    script.async = true;
    if (script.readyState) {
        script.onreadystatechange = onload;
    } else {
        script.onload = onload;
    }
    script.src = url;
    var parent = document.getElementsByTagName('head')[0] || document.body;
    parent.appendChild(script) && (parent = null);
};

/**
 * 用cookie名获取值
 * @param {string} cname cookie name.
 * @return {string} cookie value.
 */
function get(cname) {
    var name = cname + '=';
    var decodedCookie = void 0;
    try {
        decodedCookie = decodeURIComponent(document.cookie);
    } catch (err) {
        decodedCookie = document.cookie;
    }
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

/**
 * 设置cookie名值以及过期时间
 * @param {string} cname cookie name.
 * @param {string} cvalue cookie value.
 * @param {string} exdays cookie expires (day).
 */
function set(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

/**
 * 删除cookie
 * @param {string} name cookie name.
 */
function remove(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

var cookie = Object.freeze({
	get: get,
	set: set,
	remove: remove
});



var tools = Object.freeze({
	env: env,
	cookie: cookie,
	loadjs: loadjs
});

/**
 * 判断登录状态
 * @param {function} callback login callback.
 */
function isLogin(callback) {
    window.isLoginCallback = callback;
    WBAPP.isLogin('isLoginCallback');
}

/**
 * 调用登录
 * @param {string} url url is just a placeholder.
 * @param {function} callback login callback.
 */
function login(url) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    window.openMobileLoginCallback = callback;
    window.isLoginCallback = function (data) {
        if (data['state']) {
            // app端已经登录了
            return;
        }
        WBAPP.openMobileLogin('openMobileLoginCallback');
    };
    WBAPP.isLogin('isLoginCallback');
}

/**
 * 调用登出
 * @param {string} url url is just a placeholder.
 * @param {function} callback logout callback.
 */
function logout(url, callback) {
    window.logoutCallback = callback;
    window.isLoginCallback = function (data) {
        if (!data['state']) {
            // app端已经登录了
            return;
        }
        WBAPP.logout('', 'logoutCallback');
    };
    WBAPP.isLogin('isLoginCallback');
}

var app = Object.freeze({
	isLogin: isLogin,
	login: login,
	logout: logout
});

/**
 * 判断登录状态
 * @param {function} callback login callback.
 */
function isLogin$1(callback) {
    if (FBridge.cookie.get('PPU')) {
        callback({ state: true });
    } else {
        callback({ state: false });
    }
}

/**
 * 调用登录
 * @param {string} url 登录成功之后的跳转地址.
 */
function login$1(url) {
    window.location.href = encodeURI('//m.m.58.com/login?path=' + url);
}

/**
 * 调用登出
 * @param {string} url 登出成功之后的跳转地址.
 */
function logout$1(url) {
    window.location.href = '//passport.58.com/logout?path=' + url;
}

var m = Object.freeze({
	isLogin: isLogin$1,
	login: login$1,
	logout: logout$1
});

var index = {};

switch (platform) {
    case 'app':
        index = app;
        break;
    case 'm':
    case 'wx':
        index = m;
        break;
}

var index$1 = index;

/**
 * 发送埋点
 * @param {string} logMsg 埋点内容.
 * @param {string} pageType pageType.
 */
function send(logMsg) {
  var pageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'click';

  WBAPP.setWebLog('app_' + logMsg, pageType);
}

/**
 * 发送展现埋点，有待优化
 * @param {string} appPageType appPageType.
 * @param {string} mPageType mPageType.
 * @param {string} wxPageType wxPageType.
 * @param {string} code cate码.
 * @param {string} actionType 埋点内容.
 */
function show(appPageType, mPageType, wxPageType) {
  var code = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '1';
  var actionType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'show';

  WBAPP.setWebLog(actionType, appPageType, code);
}

var app$1 = Object.freeze({
	send: send,
	show: show
});

/**
 * 发送埋点
 * @param {string} logMsg 埋点内容.
 */
function send$1(logMsg) {
  window.clickLog('from=m_' + logMsg);
}
/**
 * 发送展现埋点，有待优化
 * @param {string} appPageType appPageType.
 * @param {string} mPageType mPageType.
 * @param {string} wxPageType wxPageType.
 * @param {string} code cate码.
 * @param {string} actionType 埋点内容.
 */
function show$1(appPageType, mPageType, wxPageType) {
  var code = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '1';
  var actionType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'show';

  window.clickLog(mPageType);
}

var m$1 = Object.freeze({
	send: send$1,
	show: show$1
});

/**
 * 发送埋点
 * @param {string} logMsg 埋点内容.
 */
function send$2(logMsg) {
  window.clickLog('from=wx_' + logMsg);
}
/**
 * 发送展现埋点，有待优化
 * @param {string} appPageType appPageType.
 * @param {string} mPageType mPageType.
 * @param {string} wxPageType wxPageType.
 * @param {string} code cate码.
 * @param {string} actionType 埋点内容.
 */
function show$2(appPageType, mPageType, wxPageType) {
  var code = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '1';
  var actionType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'show';

  window.clickLog(wxPageType);
}

var wx$1 = Object.freeze({
	send: send$2,
	show: show$2
});

var index$2 = {};

switch (platform) {
    case 'app':
        index$2 = app$1;
        break;
    case 'm':
        index$2 = m$1;
        break;
    case 'wx':
        index$2 = wx$1;
        break;
}

var index$3 = index$2;

/**
 * app分享
 * @param {string} title 标题.
 * @param {string} content 分享描述.
 * @param {string} url 分享url.
 * @param {string} imgUrl 分享图标url.
 * @param {string} shareto 分享到的地方.
 * @param {function} callback 分享后的回调.
 */
function config(title, content) {
    var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.location.href;
    var imgUrl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'https://img.58cdn.com.cn/logo/m58/90_90/logo.png';
    var shareto = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'QQ,SINA,WEIXIN,FRIENDS,COPY | ALL';
    var callback = arguments[5];

    window.rightBtnCallback = function () {
        WBAPP.shareInfo(title, url, imgUrl, '分享占位显示', content, shareto, '', '', '', callback);
    };
    WBAPP.extendRightBtn('top_right', '分享', 'rightBtnCallback');
}

var app$2 = Object.freeze({
	config: config
});

/**
 * 微信分享
 * @param {string} title 标题.
 * @param {string} content 分享描述.
 * @param {string} url 分享url.
 * @param {string} imgUrl 分享图标url.
 * @param {string} shareto 分享到的地方.
 * @param {function} callback 分享后的回调.
 */
function config$1(title, content) {
    var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.location.href;
    var imgUrl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'http://img.58cdn.com.cn/logo/m58/90_90/logo.png';
    var shareto = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'QQ,SINA,WEIXIN,FRIENDS,TENCENT,QQSPACE';
    var callback = arguments[5];

    wx.ready(function () {
        var platform = shareto.split(',');
        if (platform.includes('FRIENDS')) {
            wx.onMenuShareTimeline({
                title: title,
                link: url,
                imgUrl: imgUrl,
                success: function success() {
                    callback('1', 'FRIENDS');
                },
                cancel: function cancel() {
                    callback('2', 'FRIENDS');
                }
            });
        }

        if (platform.includes('WEIXIN')) {
            wx.onMenuShareAppMessage({
                title: title,
                desc: content,
                link: url,
                imgUrl: imgUrl,
                success: function success() {
                    callback('1', 'WEIXIN');
                },
                cancel: function cancel() {
                    callback('2', 'WEIXIN');
                }
            });
        }

        if (platform.includes('QQ')) {
            wx.onMenuShareQQ({
                title: title,
                desc: content,
                link: url,
                imgUrl: imgUrl,
                success: function success() {
                    callback('1', 'QQ');
                },
                cancel: function cancel() {
                    callback('2', 'QQ');
                }
            });
        }

        if (platform.includes('TENCENT')) {
            wx.onMenuShareWeibo({
                title: title,
                desc: content,
                link: url,
                imgUrl: imgUrl,
                success: function success() {
                    callback('1', 'TENCENT');
                },
                cancel: function cancel() {
                    callback('2', 'TENCENT');
                }
            });
        }

        if (platform.includes('QQSPACE')) {
            wx.onMenuShareQQ({
                title: title,
                desc: content,
                link: url,
                imgUrl: imgUrl,
                success: function success() {
                    callback('1', 'QQSPACE');
                },
                cancel: function cancel() {
                    callback('2', 'QQSPACE');
                }
            });
        }
    });
    wx.error(function (res) {
        throw new Error('wx cinfig error:' + res);
    });
}

var wx$2 = Object.freeze({
	config: config$1
});

/**
 * 防止报错
 */
function config$2() {}

var m$2 = Object.freeze({
	config: config$2
});

var index$4 = {};
switch (platform) {
    case 'app':
        index$4 = app$2;
        break;
    case 'm':
        index$4 = m$2;
        break;
    case 'wx':
        index$4 = wx$2;
        break;
}

var index$5 = index$4;

/**
 * app 页面跳转
 * @param {string} href 跳转url.
 * @param {string} pageTitle pageTitle.
 * @param {object | string} nativeParameter 跳转native页面所需参数.
 */
function redirect(href, pageTitle, nativeParameter) {
    if (nativeParameter) {
        if (typeof nativeParameter == 'string') {
            nativeParameter = JSON.parse(nativeParameter);
        }
        WBAPP._nativeBridge(nativeParameter);
        return;
    }
    WBAPP.loadPage('link', href, pageTitle);
}

var app$3 = Object.freeze({
	redirect: redirect
});

/**
 * 页面跳转
 * @param {string} href 跳转url.
 */
function redirect$1(href) {
  window.location.href = href;
}

var m$3 = Object.freeze({
	redirect: redirect$1
});

var index$6 = {};

switch (platform) {
    case 'app':
        index$6 = app$3;
        break;
    case 'm':
    case 'wx':
        index$6 = m$3;
        break;
}

var index$7 = index$6;



var components = Object.freeze({
	passport: index$1,
	track: index$3,
	share: index$5,
	router: index$7
});

var FBridge$1 = {};
Object.assign(FBridge$1, components, tools);
// 检测微信外部依赖项
if (platform == 'wx') {
    if (!window.wx) {
        document.write('<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>');
        document.write('<script src="//weixin.58.com/weixinjsconfig/config?t=' + Math.random() + '&debug=false"></script>');
    }
}

return FBridge$1;

}());
