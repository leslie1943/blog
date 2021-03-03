## CSS: flex:1
- `flex`的默认值是`0 1 auto`
- `flex`: `flex-grow`,`flex-shrink`,`flex-basis`的缩写
- `flex:1` == `flex:1 1 0%` || `flex:1 1 auto`

### 参数
- 第一个参数`flex-grow`: 定义项目的放大比例,默认为0,就是说如果存在剩余空间,也不放大
- 第二个参数`flex-shrink`: 定义项目的缩小比例,默认为1, 就是说如果空间不足,该项目将缩小
- 第三个参数`flex-basis`: 给上面两个属性分配多余空间之前,计算项目是否有多余空间,默认值为`auto`,即项目本身的大小