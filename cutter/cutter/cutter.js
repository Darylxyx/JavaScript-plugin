;(function(window, document, undefined) {
	'use strict';

	function Cutter(ele, opts) {
		this.ele = ele;
		this.defaults = {
			conWidth: ele.offsetWidth,
			conHeight: ele.offsetHeight,
			speed: 2
		};
		this.opts = this._extend({}, this.defaults, opts);
		this.cutData = {};

		this._init();
	}

	Cutter.prototype = {
		_init: function() {
			var img = new Image(),
				hammer = new Hammer(this.ele),
				_this = this;

			img.src = this.opts.imgUrl;
			img.style.webkitUserSelect = 'none';
			img.id = 'cutImgObj';

			img.onload = function() {

				var imgWidth = img.width,
					imgHeight = img.height,
					imgRate = imgWidth / imgHeight,
					conRate = _this.opts.conWidth / _this.opts.conHeight;

				if (imgRate > conRate) { //宽型

					var imgCurrentHeight = _this.opts.conHeight,
						imgCurrentWidth = imgCurrentHeight * imgRate,
						maxOffset = _this.opts.conWidth - imgCurrentWidth;

					img.setAttribute('width', 'auto');
					img.setAttribute('height', _this.opts.conHeight);
					
					hammer.on('pan', function(e) {
						var current = img.style.transform ? img.style.transform.split('(')[1].split('px')[0] : 0,
							move = Number(current) + (e.deltaX * (_this.opts.speed/10));

						if (move >= 0 || move <= maxOffset) {
							return;
						}

						img.style.transform = 'translateX('+move+'px)';

						_this.cutData.moveX = Math.abs(move);
						_this.cutData.moveY = 0;
					});

				} else { //高型

					var imgCurrentWidth = _this.opts.conWidth,
						imgCurrentHeight = imgCurrentWidth / imgRate,
						maxOffset = _this.opts.conHeight - imgCurrentHeight;

					img.setAttribute('width', '100%');
					
					hammer.get('pan').set({
			    		direction: Hammer.DIRECTION_VERTICAL
					});
					hammer.on('pan', function(e) {
						var current = img.style.transform ? img.style.transform.split('(')[1].split('px')[0] : 0,
							move = Number(current) + (e.deltaY * (_this.opts.speed/10));

						if (move >= 0 || move <= maxOffset) {
							return;
						}

						img.style.transform = 'translateY('+move+'px)';

						_this.cutData.moveX = 0;
						_this.cutData.moveY = Math.abs(move);
					});
				}
				
				_this.cutData.scaleRate = imgCurrentWidth / imgWidth;

				_this.ele.appendChild(img);

				_this.opts.callback && _this.opts.callback();
			}

		},

		cut: function() {
			var canvas = document.createElement('canvas'),
				img = document.querySelector('#cutImgObj'),
				data = this.cutData,
				cutWidth = this.opts.conWidth / data.scaleRate,
				cutHeight = this.opts.conHeight / data.scaleRate;

			canvas.width = cutWidth;
			canvas.height = cutHeight;

			canvas.getContext('2d').drawImage(img, data.moveX/data.scaleRate, data.moveY/data.scaleRate, cutWidth, cutHeight, 0, 0, cutWidth, cutHeight);
			return canvas.toDataURL('image/png');
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
						if (args[i].hasOwnProperty(o)) obj[o] = args[i][o];
					}
				} else {
					obj = args[0];
				}
			}

			return obj;
		}
	}

	window.Cutter = Cutter;

})(window, document);

if (typeof module !== 'undefined') {
	module.exports = window.Cutter;
} else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.Cutter;
    });
}