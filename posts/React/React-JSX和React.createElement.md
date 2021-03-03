#### JSX
- `React.createElement`的语法糖
  
#### JSX 语法是如何在 JavaScript 中生效的
- `JSX` 会被编译为 `React.createElement()`, `React.createElement()` 将返回一个叫做 `React Element`的 `JS`对象
- 上面提到的 `编译` 由 `Babel` 完成

#### React.createElement 工作流程
- 1: 入口 函数调用 `React.createElement`
- 2: 二次处理 `key`, `ref`, `self`, `source` 四个属性值
- 3: 遍历 `config`, 筛选出可以作为 `props` 的属性
- 4: 提取子元素, 推入 `childArray` (`props.children`)数组
- 5: 格式化 `defaultProps`
- 6: 结合以上数据作为入参, 发出 `React.createElement` 调用
`createElement` 中并没有十分复杂的涉及算法或者真实 `DOM` 的逻辑,几乎每个步骤都在格式化数据

`createElement` 就像是 `开发者` 和 `ReactElement` 调用之间的一个 `转换器`, 一个`数据处理层`

`createElement`: 开发者处接受相对简单的参数, 然后将这些参数按照 `ReactElement`的预期作一层格式化, 最终通过调用`ReactElement`实现元素的创建

`createElement`只是个 `参数中介`