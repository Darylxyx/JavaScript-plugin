### Usage
```
//init
<script src="./server.js"></script>
or
import Ajax from './server.js';

//use
Ajax({
	data: data, //request data
	url: url, //request url
	dataType: 'jsonp', //jsonp or not
	type: 'get', //request method, support 'get' and 'post'
	headers: {
		header1: 'aaa',
		header2: 'bbb'
	},
	success: function(json) {
		console.log(json);
	},
	fail: function(json) {
		console.log(json);
	},	
	done: function(json) {
		console.log(json);
	}
});

```
