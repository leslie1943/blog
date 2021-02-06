## CSS: witdth:auto 和 width:100%的区别

#### width:auto
- 块级元素默认的宽度值, 意味着浏览器会选择一个合适的宽度值
- 内容的宽度=`margin-left`+`border-left-width`+`padding-left`+`width`+`padding-right`+`border-right-width`+`margin-right`
- 如果`margin-left`+`border-left-width`+`padding-left`+`padding-right`+`border-right-width`+`margin-right`比较大, 就减少`width`的值, 如果比较小, 就增大`width`的值, 使其满足上面的表达式.
 
#### width:100%
- `width:100%`会使元素撑满整个父元素, `margin`,`border`,`padding`,`content`区域会自动分配水平空间
- `width:100%`,它的宽度就是父级的`width`,并且随着父级的`width`自动变化, 增加子元素的`padding`和`margin`后,它的`width`还是不变的.
- 个人理解: <font color="pink">不考虑margin和padding, 父子的content width 保持一致</font>

#### 总结
- `width:100%`并不包含`margin/padding-left`和`margin/padding-right`的属性值.直接取父元素的宽度加上`margin-left /margin-right`的值
- `width:auto`: 父元素的`width`=子元素的 `content width` = `padding width` + `margin width`


```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3-width的两种宽度</title>
    <style>
        html {
            font-size: 30px;
        }

        .main-percernt-100 {
            background-color: red;
            width: 700px;
            font-size: 30px;
            color: #fff;
            height: 80px;
        }

        .right {
            background: green;
            height: 40px;
            width: 100%;
        }

        .right-padding-padding-left-100 {
            background: green;
            height: 40px;
            width: 100%;
            padding-left: 100px;
        }

        .right-padding-margin-left-100 {
            background: green;
            height: 40px;
            width: 100%;
            margin-left: 100px;
        }

        .main-auto {
            background-color: red;
            width: 700px;
            font-size: 30px;
            color: #fff;
            height: 80px;
        }

        .right-auto {
            background: green;
            height: 40px;
            width: auto;
        }

        .right-auto-padding-left-100 {
            background: green;
            height: 40px;
            width: auto;
            padding-left: 100px;
        }

        .right-auto-margin-left-100 {
            background: green;
            height: 40px;
            width: auto;
            margin-left: 100px;
        }
    </style>
</head>

<body>
    <div>当width=100%时,子元素的宽度是继承的父元素宽度,不包括子元素设置的margin padding 和border部分
    </div>
    <hr>
    <div class="main-percernt-100">
        <div class="right">right</div>
    </div>
    <hr>
    <div>此时如果left设置padding值的话例如padding-left：100px,会变成下面这样
    </div>
    <div class="main-percernt-100">
        <div class="right-padding-padding-left-100">right</div>
    </div>
    <hr>
    <div class="main-percernt-100">
        <div class="right-padding-margin-left-100">right</div>
    </div>
    <hr><hr>
    <div>
        当width=auto时,父元素的width=子元素的width+子元素border+子元素margin+子元素padding
    </div>
    <hr>
    <div class="main-auto">
        <div class="right-auto">auto right</div>
    </div>
    <hr>
    <div class="main-auto">
        <div class="right-auto-padding-left-100">padding-left-100</div>
    </div>
    <hr>
    <div class="main-auto">
        <div class="right-auto-margin-left-100">margin-left-100</div>
    </div>

</body>
</html>
```