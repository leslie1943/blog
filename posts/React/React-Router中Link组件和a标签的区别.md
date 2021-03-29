### React: Router中Link组件和a标签的区别
- Link组件最终会渲染为 HTML 标签 `<a>`, 它的 to, query, hash属性会被组合在一起并渲染为`href`属性. 虽然Link被渲染为超链接, 但是在内部是线上使用了脚本拦截了浏览器的默认行为`event.preventDefault()`, 调用了`history.pushState`方法
- `Link` 只负责触发 `url` 的变更,`Route` 负责根据`url`渲染组件
- 相比于`<a>`标签, `<Link>`避免不重复渲染页面

### 总结
- `<a>`标签会重新渲染页面
- `<Link>`组件不会重新渲染页面