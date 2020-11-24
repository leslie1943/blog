#### CSS position
- `static`: 默认值.没有定位,元素出现在正常的流中(忽略 top, bottom, left, right 或者 z-index 声明).
- `absolute`: 生成绝对定位的元素, 相对于`static`定位以外的第一个父元素进行定位, 元素的位置通过`left,top,right,bottom`属性进行规定.
- `relative`: 生成相对定位的元素,相对于其正常位置进行定位. 因此`left:20`会向元素的LEFT位置添加20像素
- `fixed`: 生成固定的定位, 相对于浏览器窗口进行定位, 元素的位置通过`left,top,right,bottom`属性进行规定.
- `sticky`: 粘性定位, 该定位基于用户滚动的位置,它的行为就像 `position:relative`; 而当页面滚动超出目标区域时,它的表现就像 `position:fixed;`,它会固定在目标位置.
- `inherit`: 规定应该从父元素继承`position`属性的值.

#### absolute vs relative
`absolute`: 绝对定位,基于最近的一个已经定位的父元素, 如果没用找到就基于根元素 `html` 进行定位. 设置了`absolute`定位的宽带由元素的内容决定.
`relative`: 相对定位, 基于自身的位置进行定位. 设置了`relative`元素的宽度则取决于父元素的高度.