;(function() {
	'use strict';

	function WaterFull(ele, opts) {
		this.ele = ele;
		this.defaults = {
			type: 1
		};
		this.opts = this.extend({}, this.defaults, opts);
		console.log(this.opts);
	}

	WaterFull.prototype = {
		
		create: function(dataArr) {
			
		},

		extend: function() {
			var args = Array.prototype.slice.call(arguments),
				len = args.length,
				obj = null, i;

			for (i = 0; i < len; i ++) {
				if (typeof(args[i]) !== 'object') {
					break;
				}
				if (i !== 0) {
					for (var o in args[i]) {
						obj[o] = args[i][o];
					}
				} else {
					obj = args[0];
				}
			}

			return obj;
		}
	}

	window.WaterFull = WaterFull;

})();

//waterfull AMD Export

if (typeof(module) !== 'undefined') {
	module.exports = window.WaterFull;
} else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.WaterFull;
    });
}