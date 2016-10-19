### Usage

```
//init
var wtf = new WaterFull(container, {
	type: listType, //1 -> 等高等宽 2 -> 等宽 3 -> 等高
	urlField: 'picUrl' //数据中图片url对应字段
});

//create
wtf.create(dataArr); //生成DOM，append进容器中，可用于分页加载。
```
