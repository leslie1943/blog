### Vue: 为什么Vue实例只允许有一个根节点
- `vue` 实例化后最终会得到一个 `vdom` 树
- 树结构要求必须只有一个 `root` 节点

或者我们可以这么来理解
- 当我们实例化 `Vue`的时候, 填写了一个 `el`选项来指定`SPA`入口, 这相当于为`vue`开启了一个入口
- 如果在模板中设置了多个根节点
```html
<template>
    <div id="app1"></div>
    <div id="app2"></div>
</template>
```
- `Vue`其实不知道哪一个才是我们的入口, 因为对于一个入口来讲, 这个入口就是一个`Vue`类,`Vue`需要把这个入口里面的所有东西作为`VNode`来处理,然后再插入到`dom`中, 如果同时设置了多个入口, 那么`vue`就不知道哪个才是这个类

### 单文件组件
- 单文件组件也是同样的道理(被`loader`处理成一个`vue`实例),其`template`的内容就会被`vue`处理成虚拟`DOM`并渲染, 如果有多个根节点, 无法指定这个`vue`实例的入口


### 其他
- Vue 目前的设计只允许由一个根节点
- 如果允许多个节点出现的化, 就需要diff一个数组,而数组的diff不加key会出现效率问题
