## JavaScript-事件模型如何理解

### 💛💛 事件与事件流
- `JavaScript`中的事件, 可以理解就是在`HTML`文档或者浏览器中发生的一种交互操作, 使得网页具备互动性, 常见的有`加载事件`、`鼠标事件`、`自定义事件`等
- 由于`DOM`是一个树结构, 如果在父子节点绑定事件的时候, 就存在一个顺序, 这就涉及到了事件流的概念
- 事件流都会经历三个阶段
- 1. 事件捕获阶段(`capture phase`)
- 2. 处于目标阶段(`target phase`)
- 3. 事件冒泡阶段(`bubbling phase`)
- (1)🧡Document => 💙(2)Element-html => (3)💜Element-body => (4)💗Element-div => (5)💜Element-body => (6)💙Element-html => (7)🧡Document
- 其中 : 1-3 属于 `捕获阶段`, 4-7 属于 `冒泡阶段`
- 事件冒泡是一种从下往上的传播方式, 由最具体的元素(触发节点)然后逐渐象上传播到最不具体的那个节点, 也就是 `DOM` 中最高层的父节点

```html
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Event Bubbling</title>
</head>

<body>
    <button id="clickMe">Click Me</button>
    <!-- 
        1.button
        2.body
        3.document
        4.window
     -->
    <script>
        var button = document.getElementById('clickMe')
        button.onclick = function () {
            console.info('1.button')
        }
        document.body.onclick = function () {
            console.info('2.body')
        }
        document.onclick = function () {
            console.info('3.document')
        }
        window.onclick = function () {
            console.info('4.window')
        }
    </script>
</body>

</html>
```
- 点击事件首先在 button 元素上发生, 然后逐级向上传播
- 事件捕获事件与冒泡相反, 事件最开始由不太具体的节点最早接收事件, 而最具体的节点(触发节点)最后接收事件


### 💛💛 事件模型
事件模型分为三种
1. 原始事件模型(DOM 0 级)
2. 标准事件模型(DOM 1 级)
3. IE 事件模型(基本不用)

### 🚀🚀 原始事件模型
- 💜 事件绑定监听函数比较简单, 有两种方式:
1. HTML 代码中直接绑定
```html
<input type="button" onclick="func()" />
```
2. 通过 `JS` 代码绑定
```js
var btn = document.getElementById('.btn')
btn.onclick = function(){}
```

- 💜 原始事件模型的特性
1. 绑定速度快: `DOM0`级事件具有很好的跨浏览器优势, 会以最快的速度绑定, 但由于绑定速度太快, 可能页面还未完全加载出来, 以至于事件可能无法正常运行
- - 只支持冒泡, 不支持捕获
- - 同一个类型的事件只能绑定一次
```html
<input type="button" id="btn" onclick="fun1()">
<script>
    var btn = document.getElementById('.btn');
    btn.onclick = fun2;
</script>
```
- 如上, 当希望为同一个元素绑定多个同类型事件的时候(上面的这个btn元素绑定2个点击事件), 是不被允许的, 后绑定的事件会覆盖之前的事件
- 删除 `DOM0` 级事件处理程序只要将对应事件属性置为 `null` 即可
```js
btn.onclick = null
```

### 🚀🚀 标准事件模型
- 在该事件模型中, 一次事件共有3个过程
1. 事件捕获阶段: 事件从`document`一直向下传播到目标元素, 依次检查经过的节点是否绑定了事件监听函数,如果有则执行
2. 事件处理阶段: 时间达到目标元素,触发目标元素的监听函数
3. 事件冒泡阶段: 事件从目标元素冒泡到 `document`, 依次检查经过的节点是否绑定了事件监听函数, 如果有则执行

- 事件绑定监听函数的方式如下:
```js
    addEvenetListener(eventType, handler, useCapture)
```
- 事件移除监听函数的方式如下: 
```js
    removeEventListener(eventType, handler, useCapture)
```
- 参数如下:
- - `eventType` 指定事件类型(不要加 `on` )
- - `handler` 是 事件处理函数
- - `useCapture`  是 一个 `boolean`用于指定是否在捕获阶段进行处理, 一般设置为`false`,与IE浏览器保持一致

- 特性
```js
var btn = document.getElementById('.btn');
btn.addEventListener('click', showMessage, false);
btn.removeEventListener('click', showMessage, false);
```
- - 可以在一个`DOM`元素上绑定多个事件处理起,各自并不会冲突
```js
btn.addEventListener('click', showMessage1, false);
btn.addEventListener('click', showMessage2, false);
btn.addEventListener('click', showMessage3, false);
```
- - 执行时机: 当第三个参数(`useCapture`)设置为true就在捕获过程中执行,反之在冒泡过程中执行处理函数

```html
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Event Bubbling</title>
</head>

<body>
    <div id='div1'>
        <p id='p1'>
            <span id='span1'>Click Me 1!</span>
        </p>
    </div>
    <hr>
    <div id='div2'>
        <p id='p2'>
            <span id='span2'>Click Me 2!</span>
        </p>
    </div>
    <script>
        // 设置点击事件
        var div1 = document.getElementById('div1')
        var p1 = document.getElementById('p1')

        var div2 = document.getElementById('div2')
        var p2 = document.getElementById('p2')

        function onClickFn(event) {
            var tagName = event.currentTarget.tagName
            // 1-捕获阶段
            // 2-事件对象触发阶段
            // 3-冒泡阶段
            var phase = event.eventPhase
            console.info(tagName, phase)
        }
        div1.addEventListener('click', onClickFn, false)
        p1.addEventListener('click', onClickFn, false)

        div2.addEventListener('click', onClickFn, true)
        p2.addEventListener('click', onClickFn, true)
        /*
            点击 Click Me 1
            输出结果:
                P   3
                DIV 3
            可以看到, p 和 div 都是在冒泡阶段响应了事件, 由于冒泡的特性, 裹在内层的 p 率先 做出响应

            点击 Click Me 2
            输出结果:
                DIV   1
                P     1
            可以看到, p 和 div 都是在捕获阶段响应了事件, div 比 p 标签先做出响应
        */
    </script>
</body>

</html>
```