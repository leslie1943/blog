## CSS-Grid网格布局-2 justift-align

### 💛 justify-items / align-items ==> place-items
- `justify-items`属性设置单元格内容的水平位置(左中右)
- `align-items`属性设置单元格的垂直位置(上中下)
- 两者属性的值完全相同
  
```css
    .container{
        justify-items: start | end | center | stretch;
        align-items: start | end | center | stretch;
    }
```
- 属性对应如下:
- `start`: 对齐单元格的起始边缘
- `end`: 对齐单元格的结束边缘
- `center`: 单元格内部居中
- `stretch`: 拉伸, 占满单元格的整个宽度 <font color="#FF0000">默认</font>, 不然宽度不够占满设置的宽度

`place-items` 的属性是`align-items`属性和`justify-items`属性的合并件写形式

- 参考 `css\gird-place-items.html`


### 💛 justify-content / align-content ==> place-content
- `justify-content`属性是将整个内容区域在容器里面的水平位置(左中右)
- `align-content`属性是整个内容区域的垂直位置(上中下)
```css
    .container{
        justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
        align-content: start | end | center | stretch | space-around | space-between | space-evenly;
    }
```
- `start` - 对齐容器的起始边框
- `end` - 对齐容器的结束边框
- `center` - 容器内部居中
- `space-around` - 每个项目两侧的间隔相等. 所以, 项目之间的间隔比项目与容器边框的间隔大一倍
- `space-between` - 项目与项目的间隔相等, 项目与容器边框之间没有间隔
- `space-evenly` - 项目与项目的间隔相等, 项目与容器边框之间也是同样长度的间隔
- `stretch` - 项目大小没有指定时, 拉伸占据整个网格容器
- 参考 `css\gird-place-content.html`


### 💛 grid-auto-columns / grid-auto-rows
- 有时候, 一些项目的指定位置, 在现有网格的外部, 就会产生显示网格和隐式网格
- 比如网格只有3列, 但是某一个项目指定在第5行. 这时, 浏览器会自动生成多余的网格, 以便放置项目. 超出的部分就是隐式网格
- 而 `grid-auto-rows` 与 `grid-auto-columns` 就是专门用于指定隐式网格的宽高

### grid-column-start / grid-column-end / grid-row-start / grid-row-end
- 制定如网项目所在的4个边框, 分别定位在哪个网格线, 从而指定项目的位置
- `grid-column-start` 属性: 左边框所在的垂直网格线
- `grid-column-end` 属性: 右边框所在的垂直网格线
- `grid-row-start` 属性: 上边框所在的水平网格线
- `grid-row-end` 属性: 下边框所在的水平网格线
- 参考 `css\grid-column-row-start-end.html`