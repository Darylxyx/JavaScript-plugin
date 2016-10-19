### Usage

```
//init
var wtf = new WaterFull(container, {
			type: listType,
			urlField: 'picUrl'
		});
//listType: 1 -> 等高等宽 2 -> 等宽 3 -> 等高
//urlField: 数据中图片url对应字段

//create
wtf.create(dataArr);
//生成DOM，append进容器中，可用于分页加载。
```
