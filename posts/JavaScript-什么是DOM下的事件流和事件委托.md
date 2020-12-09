#### 原生 DOM 下的事件流
- 在浏览器中, 我们通过事件监听来实现JS和HTML之间的交互. 一个页面往往会被绑定许多的事件, 而页面接收事件的顺序,就是事件流.
- W3C标准约定了一个事件的传播过程要经过3个阶段
```bash
    # 1. ⭐ 事件捕获阶段
    # 2. ⭐ 目标阶段
    # 3. ⭐ 事件冒泡阶段
```
- 下图中的箭头就代表事件的`穿梭`路径

<img src="https://s0.lgstatic.com/i/image/M00/78/7B/Ciqc1F_KCc2AH3SuAADAfZ2rEXk066.png">

- 当事件被触发时, 首先经历的是一个`⭐捕获过程`: 事件从最外层元素开始`穿梭`, 逐层`穿梭`到最内层元素, 这个过程会持续到事件抵达它目标的元素(也就是真正复发这个事件的元素)为止; 此时事件流就切换到了`⭐目标阶段`----事件被目标元素所接收; 然后事件就被`回弹`,进入`⭐冒泡阶段`,它会沿着来时的路逆流而上, 一层一层再走回去

<img src="https://s0.lgstatic.com/i/image/M00/78/8F/Ciqc1F_KGs2AQ6VHAABqyZCa5L0820.png">

#### DOM 事件流下的性能优化思路: 事件委托
- 在原生DOM中, 事件委托(也叫事件代理)是一种重要的性能优化手段. 
```html
<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    </head>
    <body>
        <ul id="poem">
            <li>床前明月光</li>
            <li>疑是地上霜</li>
            <li>举头望明月</li>
            <li>低头思故乡</li>
            <li>锄禾日当午</li>
            <li>汗滴禾下土</li>
            <li>谁知盘中餐</li>
            <li>粒粒皆辛苦</li>
            <li>背不动了</li>
            <li>我背不动了</li>
        </ul>
       
    </body>
</html>
```
```js
// 获取 li 列表
var liList = document.getElementsByTagName('li')
// 逐个安装监听函数
for (var i = 0; i < liList.length; i++) {
    liList[i].addEventListener('click', function (e) {
    console.log(e.target.innerHTML)
    })
}
```
- 当然我们可以用上面的代码来实现, 但是这样开销大,也不够优雅. 怎么办? ==> `事件冒泡`
- 对于这 10 个 `li` 来说, 无论点击动作发生在哪个 `li` 上, 点击事件最终都会被冒泡到它们共同的父亲—— `ul` 元素上去, 所以我们完全可以让 `ul` 来帮忙感知这个点击事件.
- 既然 `ul` 可以帮忙感知事件, 那它能不能帮忙处理事件呢? `能!`, 因为我们有`e.target`. ul 元素 可以通过事件对象中的target属性拿到实际触发事件的那个元素, 针对这个元素分发事件处理的逻辑,做到真正的委托.
```js
// 使用冒泡来捕捉子元素的事件
var ul = document.getElementById('poem')
ul.addEventListener('click', function(e){
  console.log(e.target.innerHTML)
})
```
- `e.target`这个属性, 它指的就是触发事件的具体目标,记录着事件的源头,所以说,不管咱们的监听函数在哪一层执行,只要我拿到这个 `e.target`,就相当于拿到了真正触发事件的那个元素.

像这样利用事件的冒泡特性,把多个子元素的同一类型的监听逻辑,合并到父元素上通过一个监听函数来管理的行为,就是`事件委托`