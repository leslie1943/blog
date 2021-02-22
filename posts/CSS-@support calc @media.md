##  @support
- `CSS` 中的 `@support` 主要是用于检测浏览器是否支持 CSS的某个属性, 其实就是条件判断, 如果支持某个属性, 你可以写一套样式, 如果不支持某个属性, 你也可以提供另外一套样式作为替补.但是这里有一点需要注意的是：`@support`对于浏览器的版本也是有要求的, 不是说所有的浏览器以及其所有的版本都是支持`@support`的.
```css
@support(display:flex){
    div{
        display:flex;
    }
}
@support not (display:flex){
    div{
        float:right;
    }
}
```

## calc
- `calc()` 函数用于动态计算长度值. `calc()`函数支持 "+", "-", "*", "/" 运算;


## @media
- `@media` 查询,你可以针对不同的媒体类型定义不同的样式
- <p>重置浏览器查看大小。当浏览器窗口的宽度小于 300 像素时，背景颜色会变成淡蓝，否则是淡绿色。<input type="button" onclick="resize_window()" value="查看效果"></p>

```html
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style>
        body {
            background-color: lightgreen;
        }

        @media screen and (max-width: 300px) {
            body {
                background-color: lightblue;
            }
        }
    </style>
</head>

<body>
    <p>重置浏览器查看大小。当浏览器窗口的宽度小于 300 像素时，背景颜色会变成淡蓝，否则是淡绿色。<input type="button" onclick="resize_window()" value="查看效果"></p>
    <SCRIPT>
< !--
            function resize_window() {
                window.open('http://www.w3cschool.cc/try/demo_source/trycss3_media_example1.htm', 'newwindow', 'height=299,width=299,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')
            }
        //写成一行
        -->
    </SCRIPT>

</body>

</html>
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style>
        body {
            background-color: lightgreen;
        }

        @media screen and (max-width: 300px) {
            body {
                background-color: lightblue;
            }
        }
    </style>
</head>

<body>
    <p>重置浏览器查看大小。当浏览器窗口的宽度小于 300 像素时，背景颜色会变成淡蓝，否则是淡绿色。<input type="button" onclick="resize_window()" value="查看效果"></p>
    <SCRIPT>
            function resize_window() {
                window.open('http://www.w3cschool.cc/try/demo_source/trycss3_media_example1.htm', 'newwindow', 'height=299,width=299,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')
            }
        //写成一行
    </SCRIPT>

</body>

</html>
```