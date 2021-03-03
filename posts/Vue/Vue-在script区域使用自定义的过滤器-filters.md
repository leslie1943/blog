### Vue-在script区域使用自定义的过滤器-filters

Vue中过滤器(filter)的功能高度提取,便于使用, 前端小伙伴们使用的频率很高.但大多数都是在模板<template></template>区域来使用。
- 如果要在脚本区域, 也就是<script></script>来使用已经定义好过滤器功能, 该如何去做呢
- 难道需要在utils/下写一个filter.js的文件来同步过滤器的功能吗？这样的话重复代码有点多啊。
- 以下就是如何在<script></script>区域使用过滤器的脚本。
- 此处省略去定义filter和在main.js中的引用

```javascript
// 在 methods, 生命周期函数中 mounted / created 中使用.
// 格式: filterName: 自定义过滤器名称 params: 待处理的参数
// 格式举例: this.$root.$options.filters.filterName(params) // filterName 是自定义的过滤器名称.

// demo: 返回不带秒的日期格式
let temp = this.$root.$options.filters.dateSimple('2019-03-20 23:12:12')
// temp: 2019-03-20 23:12
```
当然为了使用方便也可以先提取filters,然后再使用具体的filter
```javascript
let filters = this.$root.$options.filters
let temp = filters.dateSimple(params)
```
