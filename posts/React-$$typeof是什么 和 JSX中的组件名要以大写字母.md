## React: $$typeof是什么属性
```js
<test bgcolor="#ffa7c4">hi</test>
// 实际上
React.createElement(
  /* type */ 'test',
  /* props */ { bgcolor: '#ffa7c4' },
  /* children */ 'hi'
);

// 得到
const element = {
  type: 'test',
  props: {
    bgcolor: '#ffa7c4',
    children: 'hi',
  },
  key: null,
  ref: null,
  $$typeof: Symbol.for('react.element'),
}
```
- 目的是为了放置 XSS 攻击, 因为 `Symbol`无法被序列化, 所以 `React`可以通过有没有`$$typeof`属性来判断当前的`element`对象是从数据库来的还是自己生成的.
- `JSON` 不支持 `Symbol`类型 ===> `JSON` 中无法传递 `Symbol`
- 如果没有这个`$$typeof`属性, `react`会拒绝处理该元素

## React: JSX中的组件名要以大写字母
- 因为 React 要知道当前渲染的是组件还是 HTML 元素.
