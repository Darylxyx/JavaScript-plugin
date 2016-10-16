window.onload = function() {

	function SubType() {
		var doc = document;
		this.pageListDom = Array.prototype.slice.apply(doc.querySelectorAll('.page'));
		this.fileDom = doc.querySelector('#files');
		this.picAreaDom = doc.querySelector('.pic-area');

		this.picAreaWidth = document.body.clientWidth;
		this.picAreaHeight = this.picAreaWidth * 1.2;
		this.picAreaRate = this.picAreaWidth / this.picAreaHeight;
	}

	SubType.prototype = {
		init: function() {
			this.turnPage(0);
		},

		handleUpload: function(files) {
			var reader = new FileReader(),
				_this = this;
			reader.readAsDataURL(files);

			reader.onload = function() {
				_this.chooseComplete(reader.result);
			};
		},

		chooseComplete: function(url) {
			var img = new Image(),
				_this = this,
				hammer = new Hammer(this.picAreaDom);

			img.src = url;

			img.onload = function() {

				var imgWidth = img.width,
					imgHeight = img.height,
					imgRate = imgWidth / imgHeight;
				console.log(imgRate);
				if (imgRate > _this.picAreaRate) { //宽型

					var imgCurrentHeight = _this.picAreaHeight,
						imgCurrentWidth = imgCurrentHeight * imgRate,
						maxOffset = _this.picAreaWidth - imgCurrentWidth;

					img.setAttribute('width', 'auto');
					img.setAttribute('height', _this.picAreaHeight);
					
					hammer.on('pan', function(e) {
						var current = img.style.transform ? img.style.transform.split('(')[1].split('px')[0] : 0,
							move = Number(current) + (e.deltaX / 6);

						if (move >= 0 || move <= maxOffset) {
							return;
						}

						img.style.transform = 'translateX('+(move)+'px)';
					});

				} else { //高型

					var imgCurrentWidth = _this.picAreaWidth,
						imgCurrentHeight = imgCurrentWidth / imgRate,
						maxOffset = _this.picAreaHeight - imgCurrentHeight;

					img.setAttribute('width', '100%');
					
					hammer.get('pan').set({
			    		direction: Hammer.DIRECTION_VERTICAL
					});
					hammer.on('pan', function(e) {
						var current = img.style.transform ? img.style.transform.split('(')[1].split('px')[0] : 0,
							move = Number(current) + (e.deltaY / 6);

						if (move >= 0 || move <= maxOffset) {
							return;
						}

						img.style.transform = 'translateY('+(move)+'px)';
					});
				}

				_this.picAreaDom.appendChild(img);
				_this.turnPage(1);
			}
		},

		turnPage: function(pageIndex) {
			this.pageListDom.forEach(function(item, index) {
				item.style.display = 'none';
			});
			this.pageListDom[pageIndex].style.display = 'block';
		}
	}

	var a = new SubType();
	a.init();

	a.fileDom.onchange = function(e) {
		a.handleUpload(e.target.files[0]);
	};
};