## CSS-哪些属性可以继承
1. 每一个属性在定义中都给出了这个属性是否具有继承性, 一个具有继承性的属性会在没有指定值的时候,会使用父级元素的同属性来作为自己的值
2. 一般具有继承性的属性有, 字体的相关属性: `font-size`/`font-weight`等
3. 文本相关的属性: `color`和`text-align`
4. 表格的一些布局属性, 列表属性和`list-style`
5. 还有光标属性`cursor`,元素可见性`visibility`
6. 当一个属性不是继承属性的时候, 我们也可以通过将他的值设置为`inherit`来使它从父元素那获取同名的属性值