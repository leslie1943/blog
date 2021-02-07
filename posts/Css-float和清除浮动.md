## CSS: 浮动和清除浮动

### 盒子的高度问题
1. 标准流中盒子的高度可以被内容撑起来.
2. 浮动流中浮动的内容不能撑起盒子的高度.如下
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <style>
        .box {
            border: 4px solid teal;
        }

        .box-clearfix {
            border: 4px solid teal;
            overflow: auto;
        }

        .left {
            /* float: left; 这样设置的话会导致导致父元素的高度为 0 */
            display: inline-block;
        }

        .right {
            float: right;
        }

        .middle {
            clear: both;
        }
    </style>
</head>

<body>
    <div class="box">
        <div class="left">左侧内容</div>
        <div class="right">
            <img
                src="https://upload.jianshu.io/users/upload_avatars/1482909/d4282fa8db6e.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/90/h/90/format/webp">
        </div>
    </div>
    <br><br><br><br><br><br>
    <div class="box-clearfix">
        <div class="left">左侧内容</div>
        <div class="right">
            <img
                src="https://upload.jianshu.io/users/upload_avatars/1482909/d4282fa8db6e.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/90/h/90/format/webp">
        </div>
    </div>
    <br><br><br><br><br><br>
    <div class="box">
        <div class="left">左侧内容</div>
        <div class="right">
            <img
                src="https://upload.jianshu.io/users/upload_avatars/1482909/d4282fa8db6e.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/90/h/90/format/webp">
        </div>
        <div class="middle"></div>
    </div>
</body>

</html>
```

### 为什么要清除浮动?
- 由于浮动元素会脱离文档流, 所以不占据页面空间, 所以回对父元素的高度带来影响,如果一个元素中包含的全是浮动元素, 那么该元素高度将变成`0`,从而导致`高度塌陷`


## 解决方案
### 1. 最常用的解决方案
- 给容器加`overflow:auto`
```css
 .box-clearfix {
    overflow: auto;
}
```

### 2. 设置父元素的高度
### 3. 在父元素中,追加空子元素,并设置其clear属性为both
- `clear`是css中专用清除浮动的属性
  - - `clear: none`: 默认值，不做任何清除浮动的操作
  - - `clear: left`: 清除前面元素左浮动带来的影响
  - - `clear: none`: 清除前面元素右浮动带来的影响
  - - `clear: both`: 清除前面元素所有浮动带来的影响
- 注意: `必须是在最后添加`.
```html
 <div class="box">
    <div class="left">左侧内容</div>
    <div class="right">
        <img
    src="https://upload.jianshu.io/users/upload_avatars/1482909/d4282fa8db6e.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/90/h/90/format/webp">
    </div>
    <div class="middle"></div>
</div>
```
### 4. 设置父元素浮动
### 5. 使用内容生成的方式清除浮动,与第三种类似
```css
.clear:after{
     /*生成内容作为最后一个元素*/
    content: "";
    /*使生成的元素以块级元素显示,占满剩余空间*/
    display: block;
    clear: both;
}
```
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <style>
        .box {
            border: 4px solid teal;
        }

        .right {
            float: right;
        }

        .clearfix::after {
            content: "";
            display: block;
            clear: both;
        }
    </style>
</head>

<body>
    <div class="box clearfix">
        <div class="left">左侧内容</div>
        <div class="right">
            <img
                src="https://upload.jianshu.io/users/upload_avatars/1482909/d4282fa8db6e.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/90/h/90/format/webp">
        </div>
    </div>
</body>

</html>
```
