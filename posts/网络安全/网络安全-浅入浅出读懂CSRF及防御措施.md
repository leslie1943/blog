### 🚀🚀 网络安全: 浅入浅出读懂CSRF及防御措施
- `CSRF`: `Cross Site Request Forgery`, 跨站请求伪造: 攻击者诱导受害者进入第三方网站, 在第三方网站中,向被攻击网站发送跨站请求.
- 利用受害者在被攻击网站已经获取的注册凭证,绕过后台的用户验证, 达到冒充用户对被攻击网站执行某些操作的目的
- 一个典型的CSRF攻击有着如下的流程: 
```bash
# 1. 受害者登录 a.com, 并保留了登录凭证 cookie
# 2. 攻击者引诱受害者访问了 b.com
# 3. b.com 向 a.com 发送了一个请求, a.com/act=xxx 浏览器会默认携带 a.com 的 cookie
# 4. a.com 接收到请求后, 对请求进行验证, 并确认是受害者的凭证, 误以为是受害者自己发送的请求
# 5. a.com 以 受害者的名义执行了 act=xxx
# 6. 攻击完成, 攻击者在受害者不知情的情况下, 冒充受害者, 让 a.com 执行了自己定义的操作
```
- `csrf`可以通过`get`请求, 即通过访问`img`的页面后,浏览器自动访问目标地址,发送请求
- 同样, 也可以设置一个自动提交表单的 post 请求
```html
<form action="http://bank.example/withdraw" method=POST>
    <input type="hidden" name="account" value="xiaoming" />
    <input type="hidden" name="amount" value="10000" />
    <input type="hidden" name="for" value="hacker" />
</form>
<script> document.forms[0].submit(); </script> 
```
- 访问该页面后,表单会自动提交,相当于模拟用户完成了一次POST操作
- 还有一种使用`a`标签的, 需要用户点击链接才触发
- 访问该页面后, 表单会自动提交, 相当于模拟用户完成一次POST操作
```html
<a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">
    重磅消息！！
</a>
```

### 🚀🚀 CSRF的特点
- 攻击一般发起在第三方网站, 而不是被攻击的网站. 被攻击的网站无法防止攻击发生
- 攻击利用受害者在被攻击网站的登录凭证, 冒充受害者提交操作；而不是直接窃取数据
- 整个过程攻击者并不能获取到受害者的登录凭证, 仅仅是 '冒用'
- 跨站请求可以用各种方式: `图片URL`, `超链接`, `CORS`, `Form` 提交等等. 部分请求方式可以直接嵌入在第三方论坛, 文章中, 难以进行追踪


### 🚀🚀 CSRF的预防
- `CSRF` 通常从第三方网站发起，被攻击的网站无法防止攻击发生，只能通过增强自己网站针对CSRF的防护能力来提升安全性
- 防止 `csrf` 的方案
1. ✅ 阻止不明外域的访问
- - 同源检测
- - `Samesite Cookie`
2. ✅ 提交时要求附加本域才能获取的信息
- - `CSRF token`
- - 双重 `Cookie` 验证

- 主要讲讲 `token` 这种形式，流程如下
1. 当用户打开页面的时候, 服务器需要给这个用户生成一个 `token`
2. 对于 `get` 请求, `Token` 将附在请求地址之后, 对于 `Post` 请求来说,要在 `form表单` 的最后加上