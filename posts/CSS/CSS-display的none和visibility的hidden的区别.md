## CSS: display:none 和 visibility:hidden 的区别
- `display:none`: 彻底消失,不在文档流中占据中占位, 浏览器也不会解析该元素
- `visibility:hidden`: 视觉上消失了,可以理解为是一个透明的元素,占据文档流,浏览器会解析该元素
- 性能: `visibility:hidden`的好于`display:none`, `display`切换显示时, 页面产生回流, 而`visibility`在切换显示隐藏时不会引起回流.
- `visibility`具有继承性, 给父元素设置`visibility:hidden`, 子元素也会继承这个属性, 但是如果给子元素重新设置`visibility:visible`子元素又可以显示出来, 这个和`display:none`有着本质的区别