## 在 React 中 componentWill 开头的生命周期做的 "那些错事"

- ❌ setState()
- ❌fecth发起异步请求
- ❌操作真实DOM

#### 解决办法
(1) ✅ 完全可以转移到其他生命周期(尤其是 `componentDidxxx`)里去做.
比如在 `componentWillMount` 里发起异步请求.很多同学因为太年轻, 以为这样做就可以让异步请求回来得“早一点”, 从而避免首次渲染白屏.
可惜你忘了, 异步请求再怎么快也快不过(`React 15` 下)同步的生命周期.`componentWillMount` 结束后, `render` 会迅速地被触发, 所以说首次渲染依然会在数据返回之前执行.这样做不仅没有达到你预想的目的, 还会导致服务端渲染场景下的冗余请求等额外问题, 得不偿失.

(2) ✅ 在 `Fiber` 带来的异步渲染机制下, 可能会导致非常严重的 `Bug`.
试想, 假如你在 `componentWillxxx` 里发起了一个付款请求.由于 `render` 阶段里的生命周期都可以重复执行, 在 `componentWillxxx` 被打断 + 重启多次后, 就会发出多个付款请求.

比如说, 这件商品单价只要 10 块钱, 用户也只点击了一次付款.但实际却可能因为 `componentWillxxx` 被打断 + 重启多次而多次调用付款接口, 最终付了 50 块钱；又或者你可能会习惯在 `componentWillReceiveProps` 里操作 DOM(比如说删除符合某个特征的元素), 那么 `componentWillReceiveProps` 若是执行了两次, 你可能就会一口气删掉两个符合该特征的元素.

结合上面的分析, 我们再去思考 `getDerivedStateFromProps` 为何会在设计层面直接被约束为一个触碰不到 `this` 的静态方法, 其背后的原因也就更加充分了——避免开发者触碰 `this`, 就是在避免各种危险的骚操作.

(3)✅ 即使你没有开启异步, `React 15` 下也有不少人能把自己“玩死”.

比如在 `componentWillReceiveProps`  和 `componentWillUpdate` 里滥用 `setState` 导致重复渲染死循环的
