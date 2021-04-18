### Vue: Vue3中常用的API - 11 - provide&&inject
- 与 Vue2中的 provide 和 inject 作用相同，只不过在Vue3中需要手动从 vue 中导入
- 这里简单说明一下这两个方法的作用:
- `provide`: 向子组件及子孙组件传递数据,接收两个参数,第一个参数是 `key`, 即数据的名称, 第二个参数为`value`,即数据的值
- `inject`: 接收父组件或者祖先组件传递过来的数据, 接受一个参数 `key`, 即父组件或者祖先组件传递的数据名称
- 假设有三个组件,分别是`A.vue`,`B.vue`,`C.vue`, 其中`B.vue`是`A.vue`的子组件, `C.vue`是`B.vue`的子组件


####  🔰 Root component
```tsx
import { defineComponent, provide } from 'vue'
import ProvideInjectDeep1 from './ProvideInjectDeep1.tsx'

const ProvideInject = defineComponent({
  components: { ProvideInjectDeep1 },
  setup() {
    const obj = {
      name: 'leslie',
      age: 12,
    }
    // 向子组件以及子孙组件传递名为 info 的数据
    provide('provideInfo', obj)

    return () => (
      <>
        <p>root component {JSON.stringify(obj)}</p>
        <ProvideInjectDeep1 />
      </>
    )
  },
})

export default ProvideInject
```

####  🔰 Deep 1 component
```tsx
import { defineComponent, inject } from 'vue'

import ProvideInjectDeep2 from './ProvideInjectDeep2.tsx'
const ProvideInjectDeep1 = defineComponent({
  components: { ProvideInjectDeep2 },
  setup() {
    const obj = {
      name: 'leslie',
      age: 12,
    }
    // 向子组件以及子孙组件传递名为 info 的数据
    const deep1Info = inject('provideInfo')

    return () => (
      <>
        <p>deep 1 component: {JSON.stringify(deep1Info)}</p>
        <ProvideInjectDeep2 />
      </>
    )
  },
})

export default ProvideInjectDeep1

```

#### 🔰 Deep 2 component
```tsx
import { defineComponent, inject } from 'vue'

const ProvideInjectDeep2 = defineComponent({
  setup() {
    const obj = {
      name: 'leslie',
      age: 12,
    }
    // 向子组件以及子孙组件传递名为 info 的数据
    const deep2Info = inject('provideInfo')

    return () => (
      <>
        <p>deep 2 component: {JSON.stringify(deep2Info)}</p>
      </>
    )
  },
})

export default ProvideInjectDeep2
```

### 输出结果
```bash
# root component {"name":"leslie","age":12}

# deep 1 component: {"name":"leslie","age":12}

# deep 2 component: {"name":"leslie","age":12}
```