### React: React为什么不实现数据的双向绑定
- React是一个构建用户界面(View)的JS库
- React不实现双向绑定是React设计决定的,因为React的目标从来都不是`让开发者写更少的代码`,而是让`代码结构更加清晰易于维护`
- React是纯粹的View层, 单向数据流的设计已经满足了`View`层渲染的要求并且更容易测试与控制(来自`props`和`state`)
- 数据的双向绑定固然解决了手动更改`state`后页面的刷新渲染,但同时也带来了两个问题
- 1. 数据更新源难以追踪
- 2. 重新渲染导致页面性能问题
- 如果要解决数据双向绑定的问题,可以借助`ant design`的`rc-form`之类的框架

### Vue是 MVVM
- `MVVM`: `Model`,`View`,`ViewModel`

- `Model`(data:数据对象): 代表数据模型, 数据和业务逻辑都在`Model`层中定义
- `View`(template: 模板页面): 代表 UI视图, 负责数据的展示
- `ViewModel`(视图模型:Vue实例): 负责监听`Model`中数据的改变并且控制视图的更新,处理用户交互操作

`Model`和`View`并无直接关联, 而是通过`ViewModel`来进行联系的, `Model`和`ViewModel`之间有着双向数据绑定的联系, 因此当`Model`中的数据改变时会触发`View`层的刷新.`View`由于用户交互操作而改变的数据也会在`Model`中同步

- 这种模式已经实现了`Model`和`View`的数据自动同步, 无需再操作DOM, 只需关系对数据的操作