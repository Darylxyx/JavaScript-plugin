window.onload = function() {

	function SubType() {
		var doc = document;
		this.containerDom = doc.querySelector('.container');
		this.pageListDom = Array.prototype.slice.apply(doc.querySelectorAll('.page'));
		this.fileDom = doc.querySelector('#files');
		this.picAreaDom = doc.querySelector('.pic-area');
		this.submitBtnDom = doc.querySelector('.submit-btn');
		this.showAreaDom = doc.querySelector('.show-area');
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
			var _this = this;
			this.cutter = new Cutter(this.picAreaDom, {
				imgUrl: url,
				conWidth: this.containerDom.offsetWidth,
				conHeight: this.containerDom.offsetWidth * 1.2,
				speed: 2,
				callback: function() {
					_this.turnPage(1);
				}
			});
		},

		cutImage: function() {
			var result = this.cutter.cut();
			this.showAreaDom.style.backgroundImage = 'url('+result+')';
			this.turnPage(2);
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

	a.submitBtnDom.onclick = function() {
		a.cutImage();
	};
};