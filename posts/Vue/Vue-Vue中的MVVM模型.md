## Vue: Vue中的MVVM模型
- `MVVM`: `Model`,`View`,`ViewModel`


- `Model`(data:数据对象): 代表数据模型, 数据和业务逻辑都在`Model`层中定义
- `View`(template: 模板页面): 代表 UI视图, 负责数据的展示
- `ViewModel`(视图模型:Vue实例): 负责监听`Model`中数据的改变并且控制视图的更新,处理用户交互操作

`Model`和`View`并无直接关联, 而是通过`ViewModel`来进行联系的, `Model`和`ViewModel`之间有着双向数据绑定的联系, 因此当`Model`中的数据改变时会触发`View`层的刷新.`View`由于用户交互操作而改变的数据也会在`Model`中同步

- 这种模式已经实现了`Model`和`View`的数据自动同步, 无需再操作DOM, 只需关系对数据的操作