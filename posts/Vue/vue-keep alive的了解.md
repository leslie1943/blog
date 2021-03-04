#### Vue: keep alive的了解
- `keep-alive`是vue内置的一个组件, 可以使被包含的组件保留状态,避免重新渲染
- `vue 2.1.0`之后, `keep-alive` 新增了2个属性: `include`(包含的组件缓存)于`exclude`(排除的组件不缓存)
- 优先级: `include` > `exclude`