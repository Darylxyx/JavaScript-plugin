function ajax(opts) {

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
		if (xhr.readystate == 4) {
			opts.done && opts.done(xhr.responseText, xhr.responseXML);
			if ((xhr.status > 200 && xhr.status <= 300) || xhr.status == 304) {
				opts.success && opts.success(xhr.responseText, xhr.responseXML);
			} else {
				opts.fail && opts.fail(xhr.responseText, xhr.responseXML);
			}
		}
	}

	if (opts.type == 'get') {
		params = formatParams(opts.data);
		xhr.open('get', opts.url + '?' + params, true);
		xhr.send(null);
	} else if (opts.type == 'post') {
		params = formDataParams(opts.data);
		xhr.open('post', opts.url, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoed');
		xhr.send(params);
	}

	function formatParams(data) {
		var arr = [];
		for (var key in data) {
			arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
		}
		return arr.join('&');
	}

	function formDataParams(data) {
		var fd = new FormData();
		for (var key in data) {
			fd.append(key, encodeURIComponent(data[key]));
		}
		return fd;
	}

	function jsonpRequest(opts) {

		if (!opts.url) {
			console.error('url missing');
			return;
		}

		opts.jsonpCallback = opts.jsonpCallback || 'callback';

		var callbackName = 'jsonp_' + (new Date()).getTime();

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
				opts.done && opts.fail({message: 'timeout'});
			}, opts.time);
		}
	}
}