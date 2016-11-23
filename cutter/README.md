### Usage
```
//init
var cutter = new Cutter(container, {
  imgUrl: url,
  conWidth: container_width, //裁剪区域宽度
  conHeight: container_height, //裁剪区域高度
  speed: 2, //滑动速度
  callback: function() {
    //doSomething... 创建成功回调
  }
});

//cut
var result = cutter.cut(); //返回裁剪后图片的base64码
```
