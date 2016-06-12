;(function() {
	'use strict';

	function WaterFull(ele, opts) {
		this.ele = this._selector(ele);
		this.defaults = {
			type: 1
		};
		this.opts = this._extend({}, this.defaults, opts);
	}

	WaterFull.prototype = {
		
		create: function(dataArr) {
			var type = this.opts.type,
				func;
			if (!type || !dataArr.length) {
				return;
			}
			switch (type) {
				case 1:
					func = this.createFirst;
					break;
				case 2:
					func = this.createSecond;
					break;
				case 3:
					func = this.createThird;
					break;
				default:
					return;
			}
			var str = func(dataArr),
				listNode = document.createElement('div');
			listNode.id = 'wf-container';
			listNode.style.width = '100%';
			listNode.style.position = 'relative';
			listNode.style.overflow = 'hidden';
			listNode.innerHTML = str;
			this.ele.appendChild(listNode);
			if (type === 2) {
				this.secondeReflows();
			}

		},

		createFirst: function(dataArr) {
			// console.log(dataArr);
			var result = dataArr.map(function(item, index) {
				return '<div class="wf-item wf-item-1" style="background-image: url('+item.picUrl+');"></div>';
			});
			return result.join('');
		},

		createSecond: function(dataArr) {
			function countRate(width, height) {
				return height / width;
			}
			var result = dataArr.map(function(item, index) {
					var height = countRate(item.width, item.height) * 47 + '%';
					return '<div class="wf-item wf-item-2" style="padding-bottom: '+height+';background-image: url('+item.picUrl+');"></div>';
				});
			return result.join('');
		},

		secondeReflows: function() {
			var itemList = Array.prototype.slice.call(document.getElementsByClassName('wf-item-2')),
				marginVal = document.body.clientWidth * 0.02,
				columnHeightArr = new Array(2);

				itemList.forEach(function(item, index) {
					if (index < 2) {
						columnHeightArr[index] = item.offsetHeight + marginVal;
					} else {
						var minHeight = Math.min.apply(null, columnHeightArr),
							minHeightIndex = columnHeightArr.indexOf(minHeight);
						// console.log(minHeight, minHeightIndex);
						item.style.position = 'absolute';
						item.style.top = minHeight + 'px';

						if (minHeightIndex !== 0) {
							item.style.left = '49%';
						}

						columnHeightArr[minHeightIndex] += item.offsetHeight + marginVal;
					}
				});

				document.getElementById('wf-container').style.height = Math.max.apply(null, columnHeightArr) + 'px';
		},

		createThird: function(dataArr) {
			// console.log(dataArr);
			return '<h1>3</h1>';
		},

		_extend: function() {
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
		},

		_selector: function(ele) {
			if (!ele) {
				return;
			}
			return document.querySelector(ele);
		}
	}

	window.WaterFull = WaterFull;

})();

//waterfull AMD Export

if (typeof module !== 'undefined') {
	module.exports = window.WaterFull;
} else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.WaterFull;
    });
}