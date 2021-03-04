## Vue3: Composition Api 与 Options Api 有什么区别

### options api
- 包含一个描述组件选项(`data`,`methods`,`props`等)的对象`options`
- API 开发复杂组件, 同一个功能逻辑的代码被拆分到不同的选项
- 使用`mixin`抽取共用代码会带来命名冲突及来源不清晰的问题

### composition api
- vue3 新增的一组 api, 基于函数的 api, 可以灵活的组装组件逻辑
- 解决 options api 在复杂组件中不好拆分和重用的问题