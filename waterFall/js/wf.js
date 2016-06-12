;(function() {
	'use strict';

	function WaterFull(ele, opts) {
		this.ele = this._selector(ele);
		this.conWidth = this.ele.offsetWidth;
		this.defaults = {
			type: 1
		};
		this.opts = this._extend({}, this.defaults, opts);
	}

	WaterFull.prototype = {
		
		create: function(dataArr) {
			var type = this.opts.type,
				str = '';
			if (!type || !dataArr.length) {
				return;
			}
			switch (type) {
				case 1:
					str = this.createFirst(dataArr);
					break;
				case 2:
					str = this.createSecond(dataArr);
					break;
				case 3:
					str = this.createThird(dataArr);
					break;
				default:
					return;
			}

			var listNode = document.createElement('div');
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

			var _this = this,
				result = dataArr.map(function(item, index) {
					var height = _this._countRate(item.width, item.height) * 47 + '%';
					return '<div class="wf-item wf-item-2" style="padding-bottom: '+height+';background-image: url('+item.picUrl+');"></div>';
				});
			return result.join('');
		},

		secondeReflows: function() {
			var container = document.getElementById('wf-container'),
				itemList = Array.prototype.slice.call(document.getElementsByClassName('wf-item-2')),
				marginVal = this.conWidth * 0.02,
				columnHeightArr = new Array(2);

				itemList.forEach(function(item, index) {
					if (index < 2) {
						columnHeightArr[index] = item.offsetHeight + marginVal;
					} else {
						var minHeight = Math.min.apply(null, columnHeightArr),
							minHeightIndex = columnHeightArr.indexOf(minHeight);

						item.style.position = 'absolute';
						item.style.top = minHeight + 'px';

						if (minHeightIndex !== 0) {
							item.style.left = '49%';
						}

						columnHeightArr[minHeightIndex] += item.offsetHeight + marginVal;
					}
				});

				container.style.minHeight = Math.max.apply(null, columnHeightArr) + 'px';
		},

		createThird: function(dataArr) {
			// console.log(dataArr);
			var max = dataArr.length,
                template = [],
                clientWidth = this.conWidth,
                _this = this;

            var MIN_RATE = 0.7, //最小宽高比
                MIN_RATE_1 = 3 / 4, //1行只有1张图的最小宽高比
                MIN_RATE_2 = 6 / 4, //2张图的最小宽高比
                MAX_RATE_1 = 16 / 9, //1张图的最大宽高比
                MAX_RATE_2 = 32 / 9; //2张图的最大宽高比

            for (var i = 0; i < max; i += 2) {
            	template.push(countPicList(dataArr[i], dataArr[i+1]));
            }

			function countPicList(pic1, pic2) {

                var maxHeight,minHeight,h,sWidth;

                if (!pic2) { //一行一张
                    sWidth = clientWidth;
                    maxHeight = sWidth / MIN_RATE_1;
                    minHeight = sWidth / MAX_RATE_1;
                    var rate = _this._countRate(pic1.width, pic1.height);
                    h = sWidth / rate;
                    h = h < minHeight ? minHeight : h;
                    h = h > maxHeight ? maxHeight : h;
                    return '<div class="wf-item" style="height: '+h+'px; width: 100%; float: left; margin-top: 3px;background-image:url('+pic1.picUrl+')"></div>';
                } else { //一行两张
                    sWidth = clientWidth * 0.98;
                    maxHeight = sWidth / MIN_RATE_2;
                    minHeight = sWidth / MAX_RATE_2;
                    var rate1 = _this._countRate(pic1.width, pic1.height),
                        rate2 = _this._countRate(pic2.width, pic2.height),
                        totalRate = rate1 + rate2,
                        totalWidth = pic1.width + pic2.width,
                        w1 = rate1 / totalRate * sWidth,
                        w2 = rate2 / totalRate * sWidth;
                    h = sWidth / totalRate;
                    h = h < minHeight ? minHeight : h;
                    h = h > maxHeight ? maxHeight : h;
                    var minWidth = MIN_RATE * h;
                    if (w1 < minWidth) {
                        w2 = w2 - (minWidth - w1);
                        w1 = minWidth;
                    } else if (w2 < minWidth) {
                        w1 = w1 - (minWidth - w2);
                        w2 = minWidth;
                    }
                    w1 = w1 / clientWidth * 100 + '%';
                    w2 = w2 / clientWidth * 100 + '%';
					return '<div style="overflow: hidden;">' +
	                       		'<div class="wf-item" style="height: '+h+'px; width: '+w1+'; margin-right:2%; background-image:url('+pic1.picUrl+')"></div>' +
	                            '<div class="wf-item" style="height: '+h+'px; width: '+w2+'; background-image:url('+pic2.picUrl+')"></div>' +
	                       '</div>';
                }
            }
            return template.join('');
		},

		_countRate: function(width, height) {
			return height / width;
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