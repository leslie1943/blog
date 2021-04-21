### CSS: 如何实现单行／多行文本溢出的省略样式
- 在日常开发展示页面, 如果一段文本的数量过长, 受制于元素宽度的因素, 有可能不能完全显示, 为了提高用户的使用体验, 这个时候就需要我们把溢出的文本显示成省略号
- 单行文本溢出
- 多行文本溢出


### 实现方式: 单行文本溢出省略
- 理解也很简单, 即文本在一行内显示, 超出部分以省略号的形式展现
- 实现方式也很简单, 涉及的css属性有
- `text-overflow`: 规定当文本溢出时, 显示省略符号来代表被修剪得文本
- `white-space`: 设置文字在一行显示, 不能换行
- `overflow`: 文字长度超出限定宽度, 则隐藏超出的内容
- `overflow`设为`hidden`, 普通情况用在块级元素的外层隐藏内部溢出元素, 或者配合下面两个属性属性文本溢出省略
- `white-space:nowrap`, 作用是设置文本不换行, 是`overflow:hidden`和`text-overflow:ellipsis`生效的基础
- `text-overflow`属性值有如下
1. `clip`: 当对象内文本溢出部分裁剪掉
2. `ellipis`: 当对象内文本溢出时显示省略标记(...)
- <font color="#ff0000">text-overflow</font>只有在设置<font color="#ff0000">overflow:hidden</font>和<font color="#ff0000">white-space:nowrap</font>才能够生效的

### 实现方式: 多行文本溢出省略
- 多行文本溢出的时候, 我们可以分为两种情况
1. 基于高度截断
2. 基于行数截断

#### 基于高度截断
- `伪元素 + 定位`: 核心的css代码结构如下:
- `positive:relative`: 为伪元素绝对定位
- `overflow:hidden`: 文本溢出限定的宽度就隐藏内容
- `position:absolute`: 给省略号绝对定位
- `line-height:20px`: 结合元素高度, 高度固定的情况下, 控制显示行数
- `height:40px`: 设定当前元素高度
- `::after{}`: 设置省略号样式
```css
.demo {
    position: relative;
    line-height: 20px;
    height: 40px;
    overflow: hidden;
}

.demo::after {
    content: '...';
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0 20px 0 20px;
}
```
- 实现原理很好理解, 就是通过伪元素绝对定位到行尾并遮住文字, 再通过 overflow: hidden 隐藏多余文字
- 这种实现具有以下优点：
1. 兼容性好, 对各大主流浏览器有好的支持
2. 响应式截断, 根据不同宽度做出调整
- 一般文本存在英文的时候,可以设置word-break: break-all使一个单词能够在换行时进行拆分


#### 基于行数截断
- 纯 `css` 实现也非常简单, 核心的css代码如下：
- `-webkit-line-clamp: 2`：用来限制在一个块元素显示的文本的行数, 为了实现该效果, 它需要组合其他的WebKit属性）
- `display: -webkit-box`：和1结合使用, 将对象作为弹性伸缩盒子模型显示
- `-webkit-box-orient: vertical`：和1结合使用 , 设置或检索伸缩盒对象的子元素的排列方式
- `overflow: hidden`：文本溢出限定的宽度就隐藏内容
- `text-overflow: ellipsis`：多行文本的情况下, 用省略号“…”隐藏溢出范围的文本
```html
<style>
    p {
        width: 400px;
        border-radius: 1px solid red;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
<p>
    这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
    这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
</p>
```
- 可以看到, 上述使用了 `webkit` 的 `CSS` 属性扩展, 所以兼容浏览器范围是PC端的 `webkit` 内核的浏览器, 由于移动端大多数是使用 `webkit`, 所以移动端常用该形式
- 需要注意的是, 如果文本为一段很长的英文或者数字, 则需要添加word-wrap: break-word属性
- 还能通过使用javascript实现配合css, 实现代码如下所示
- 参考文件: `css\overflow-text-ellipsis-js.html`