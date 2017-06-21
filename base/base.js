;(function(window, document, undefined) {

	function Base() {}

	Base.prototype.server = function(Ajax, data, url, callback, type, dataType) { //Server方法
		Ajax({
			data: data || {},
			type: type || 'get',
			url: url,
			dataType: dataType || 'json',
			done: (res) => {
				callback && callback(res);
			}
		});
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

	var base = new Base();

	window.base = base;

})(window, document);

if (typeof module !== 'undefined') {
	module.exports = window.base;
} else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.base;
    });
}