### React: 在JSX中如何进行for循环
- 使用ES6的箭头函数`Array.prototype.map`即可, 例如
```jsx
<tbody>
  {items.map(item => <SomeComponent key={item.id} name={item.name} />)}
</tbody>
```
- 不能使用 `for`循环
```jsx
<tbody>
  for (let i = 0; i < items.length; i++) {
    <SomeComponent key={items[i].id} name={items[i].name} />
  }
</tbody>
```
- 这是因为 `JSX` 标签会被转换成函数调用,并且你不能在表达式中使用语句.但这可能会由于 do 表达式而改变,它们是第一阶段提案.

