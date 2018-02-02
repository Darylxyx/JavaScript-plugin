;(function(window, document, undefined) {

	function Base() {}

	Base.prototype.server = function(Ajax) { //Server方法
		
		var Server = Ajax;

		return function(data, url, callback, type, dataType) {
			Server({
				data: data || {},
				type: type || 'get',
				url: url,
				dataType: dataType || 'json',
				done: (res) => {
					callback && callback(res);
				}
			});
		}
	};

	Base.prototype.queryParams = function() { //获取查询字符串参数
		var search = location.search,
			theRequest = {};
		if (search.indexOf('?') < 0) {
			return;
		}
		search = search.substr(1);
		var paramArr = search.split('&'),
			max = paramArr.length;
		for (var i = 0; i < max; i ++) {
			theRequest[paramArr[i].split('=')[0]] = unescape(paramArr[i].split('=')[1]);
		}
		return theRequest;
	};

	Base.prototype.htmlEncode = function(str) { //html字符转义
		var temp = document.createElement('div');
		div.appendChild(document.createTextNode(str));
		return div.innerHTML;
	};

	Base.prototype.checkPlatforms = function() {
		var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
	};

	Base.prototype.setCookie = function(name, value, days) {
		let Days = days || 1,
			exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape (value) + ";expires=" + exp.toGMTString();
	};

	Base.prototype.getCookie = function(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
		if (arr = document.cookie.match(reg)) {
			return unescape(arr[2]);
		} else {
			return null;
		}
	};

	Base.prototype.delCookie = function(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = this.getCookie(name);
		if (cval != null) {
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
		}
	};
	
	Base.prototype.dateFormat = function(date) {
		function further(num) {
			if (num < 10) num = `0${num}`;
			return num;
		}
		const str = `${date.getFullYear()}-${further(date.getMonth() + 1)}-${further(date.getDate())} ${further(date.getHours())}:${further(date.getMinutes())}:${further(date.getSeconds())}`;
		return str;
	};

	var basefn = new Base();

	window.basefn = basefn;

})(window, document);

if (typeof module !== 'undefined') {
	module.exports = window.basefn;
} else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.basefn;
    });
}
