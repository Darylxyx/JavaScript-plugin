/**
 * Created by Administrator on 2015/10/25.
 */
window.onload = function() {

	var dataArr = [
		{picUrl: './resource/images/dota-4.jpg', width: 480, height: 800},
		{picUrl: './resource/images/dota-15.jpg', width: 500, height: 311},
		{picUrl: './resource/images/dota-23.jpg', width: 720, height: 450},
		{picUrl: './resource/images/dota-1.jpg', width: 700, height: 381},
		{picUrl: './resource/images/dota-7.jpg', width: 850, height: 425},
		{picUrl: './resource/images/dota-8.jpg', width: 403, height: 268},
		{picUrl: './resource/images/dota-9.jpg', width: 720, height: 450},
		{picUrl: './resource/images/dota-10.jpg', width: 1024, height: 640},
		{picUrl: './resource/images/dota-20.jpg', width: 640, height: 960},
		{picUrl: './resource/images/dota-17.jpg', width: 373, height: 252},
		{picUrl: './resource/images/dota-14.jpg', width: 500, height: 272},
		{picUrl: './resource/images/dota-2.jpg', width: 960, height: 540},
		{picUrl: './resource/images/dota-12.jpg', width: 391, height: 220},
		{picUrl: './resource/images/dota-13.jpg', width: 468, height: 292},
		{picUrl: './resource/images/dota-3.jpg', width: 480, height: 800},
		{picUrl: './resource/images/dota-6.jpg', width: 1024, height: 640},
		{picUrl: './resource/images/dota-24.jpg', width: 800, height: 500},
		{picUrl: './resource/images/dota-11.jpg', width: 960, height: 540},
		{picUrl: './resource/images/dota-16.jpg', width: 1000, height: 562},
		{picUrl: './resource/images/dota-18.jpg', width: 600, height: 415},
		{picUrl: './resource/images/dota-19.jpg', width: 362, height: 362},
		{picUrl: './resource/images/dota-5.jpg', width: 480, height: 800},
		{picUrl: './resource/images/dota-21.jpg', width: 874, height: 490},
		{picUrl: './resource/images/dota-22.jpg', width: 1024, height: 640}
	];

	var listType = 1,
		bannerDom = document.querySelector('.banner'),
		contentDom = document.querySelector('.content'),
		loadMoreDom = document.querySelector('.load-more'),
		wtf = null;

	showList();

	bannerDom.onclick = function() {
		listType ++;
		if (listType > 3) listType = 1;
		showList();
	}

	loadMoreDom.onclick = function() {
		wtf.create(dataArr);
	}

	function showList() {
		contentDom.innerHTML = '';
		wtf = new WaterFull('.content', {
			type: listType,
			urlField: 'picUrl'
		});
		wtf.create(dataArr);
	};
};