### Vue中的函数式组件 Fucntional component
- 无自身状态
- 无法实例化
- 内部没有任何生命周期处理函数
- 轻量,渲染性能高,适合只依赖于外部数据传递而变化的组件(`展示组件，无逻辑和状态修改`)
- `在 template 标签里标明 functional `
- `只接受 props 值`
- `不需要 script 标签`

#### Parent component
```vue
 <template>
    <div>
        <List :items="items" :item-click="handleItemClick" />
        <p>Clicked hero: {{ clicked }}</p>
    </div>
</template>
<script>
import List from './List'
export default {
      name: "App",
      data: () => ({ clicked: "", items: ['Wonderwoman', 'Ironman'] }),
      methods:{
          handleItemClick(item) {
              this.clicked = item
          }
      },
      components: { List }
};
</script>
```

#### List.vue 函数式组件
```vue
<template functional>
    <div>
        <p v-for="(item,index) in props.items" :key="index" @click="props.itemClick(item)" />
    </div>
</template>
```