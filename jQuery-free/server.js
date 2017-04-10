;(function(window, document, undefined) {
	function Ajax(opts) {

		opts.type = opts.type || 'get';
		opts.type = opts.type.toLowerCase();
		opts.dataType = opts.dataType || 'json';
		opts.dataType = opts.dataType.toLowerCase();
		
		if (opts.dataType == 'jsonp') {
			jsonpRequest(opts);
			return;
		}

		var xhr = new XMLHttpRequest(),
			params = null;

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				opts.done && opts.done(jsonParse(xhr.responseText), xhr.responseXML);
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					opts.success && opts.success(jsonParse(xhr.responseText), xhr.responseXML);
				} else {
					opts.fail && opts.fail(jsonParse(xhr.responseText), xhr.responseXML);
				}
			}
		}

		if (opts.type == 'get') {
			params = formatParams(opts.data);
			var url = opts.url.indexOf('?') > -1 ? (opts.url + '&' + params) : (opts.url + '?' + params);
			xhr.open('get', url, true);
			opts.headers && setHeaders();
			xhr.send(null);
		} else if (opts.type == 'post') {
			params = formatParams(opts.data);
			xhr.open('post', opts.url, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			opts.headers && setHeaders();
			xhr.send(params);
		}

		function formatParams(data) {
			var arr = [];
			for (var key in data) {
				arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
			}
			return arr.join('&');
		}

		function jsonpRequest(opts) {

			if (!opts.url) {
				console.error('url missing');
				return;
			}

			opts.jsonpCallback = opts.jsonpCallback || 'callback';

			var callbackName = 'jsonp_' + Math.ceil((Math.random() * 1E12));

			opts.data[opts.jsonpCallback] = callbackName;

			//创建script标签
			var params = formatParams(opts.data),
				oHead = document.querySelector('head'),
				oScript = document.createElement('script');
			oHead.appendChild(oScript);

			//创建回调函数
			window[callbackName] = function(json) {
				oHead.removeChild(oScript);
				window[callbackName] = null;
				window.clearTimeout(oScript.timer);
				opts.success && opts.success(json);
				opts.done && opts.done(json);
			};

			//发起请求
			oScript.src = opts.url + '?' + params;

			if (opts.time) {
				oScript.timer = window.setTimeout(function() {
					oHead.removeChild(oScript);
					window[callbackName] = null;
					opts.fail && opts.fail({message: 'timeout'});
					opts.done && opts.done({message: 'timeout'});
				}, opts.time);
			}
		}

		function setHeaders() {
			for (var o in opts.headers) {
				// console.log(o, opts.headers[o]);
				xhr.setRequestHeader(o, opts.headers[o]);
			}
		}

		function jsonParse(text) {
			return JSON.parse(text);
		}
	}

	window.Ajax = Ajax;

})(window, document);

if (typeof module !== 'undefined') {
	module.exports = window.Ajax;
} else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.Ajax;
    });
}
