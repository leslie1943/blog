## Vue: v-if和v-for为什么不建议同时使用
- 当`v-if`和`v-for`处于同一个节点时, `v-for`的优先级比`v-if`要高, 这意味着 `v-if`将分别重复运算于每个`v-for`循环中. 如果要遍历的数组很大,而真正要展示的数据很少时, 这将造成很大的性能浪费
- 建议使用先使用`computed`对数据进行过滤.
  
```vue
<template>
    <!-- ❗❗❗ v-if会执行items.length的次数 -->
    <div v-for="item in items" v-if="item.age > 18"></div>
</template>
```