#### Vue: hash模式 和 history模式
- `hash`模式: 在浏览器中符号 `#` , `#`以及`#`后面的字符称之为 `hash`, 使用 `window.location.hash` 获取; 其特点是`hash虽然在URL中, 但不被包括在HTTP请求中,对服务端安全无用, hash不会重加载页面` ==> hash 模式下, 仅 `#`符号之前的内容会被包含在请求中

- `history`模式: 采用 `HTML5`的特性, 提供了两个新方法 `pushState()`和`replaceState()`可以对浏览器历史记录栈进行修改, 以及`popState()`事件的监听达到状态更新 ===> history 模式下, 前端的 URL 必须和实际向后端发起请求的 URL 一致.