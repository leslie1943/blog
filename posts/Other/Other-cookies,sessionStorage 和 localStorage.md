## Other: cookies,sessionStorage 和 localStorage
- `Cookie`: 网站为了标识用户身份而存储在本地终端上的数据(通常需要加密), `cookie`数据始终在同源的`http`请求中携带,会在浏览器和服务器之间来回传递
- `sessionStorage`和`localStorage`不会自动把数据发送给服务器,仅在本地保存, 本地持久化数据的策略
- `localStorage`关闭后不会丢失,除非主动删除数据
- `sessionStorage`数据在当前浏览器窗口关闭后自动删除
- `cookie`设置的`cookie`过期时间之前一直有效, 即时窗口或浏览器关闭