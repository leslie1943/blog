## 标准盒子模型
- `Margin`: 外边距
- `Border`: 边框
- `Padding`: 内边距
- `Content`: 内容

## IE 盒子模型
- `Border`: 边框
- `Padding`: 内边距
- `Content`: 内容


## box-sizing: content-box | border-box | inherit
- `box-sizing`属性允许以某种方式定义某些元素,以适应指定区域.
- `content-box`：默认值, 计算公式: <font color="pink">元素的高度/宽度 = border + padding + content width/height</font>
- `border-box`: `content width/height`包含了元素的`border,padding`. <font color="pink">元素的高度/宽度 = width/height - border - padding</font>

- 例如: 需要并排放置两个带边框的框, 可将`box-sizing`设置为`border-box`,这可能令浏览器呈现出带有指定高度和宽度的框, 并把边框和内边距放入框中.

## 兼容性
```css
 Element {
     -moz-box-sizing: content-box;  
     -webkit-box-sizing: content-box; 
     -o-box-sizing: content-box; 
     -ms-box-sizing: content-box; 
     box-sizing: content-box; 
  }
        
  Element {
     -moz-box-sizing: border-box;  
     -webkit-box-sizing: border-box; 
     -o-box-sizing: border-box; 
     -ms-box-sizing: border-box; 
     box-sizing: border-box; 
  }
```
