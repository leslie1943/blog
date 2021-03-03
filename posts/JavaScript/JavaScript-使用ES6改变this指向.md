## JavaScript: 使用ES6改变this指向


### call
- 格式: `fn.call(this的新指向, param1,param2)`
```js
const dog = {
  name: 'Snoopy',
  say(first, last) {
    console.info(first + ' ' + this.name + ' ' + last)
  },
}

// 没有 say, 要使用别人的方法
const cat = {
  name: 'Tom',
}

dog.say('Hello', 'World') // Hello Snoopy World
dog.say.call(cat, 'Hello', 'World') // Hello Tom World

```

### apply
- 格式: `fn.apply(this的新指向, [param1,param2])`

```js
const dog = {
  name: 'Snoopy',
  say(first, last) {
    console.info(first + ' ' + this.name + ' ' + last)
  },
}

const cat = {
  name: 'Tom',
}

dog.say('Hello', 'World') // Hello Snoopy World
dog.say.apply(cat, ['Hello', 'World']) // Hello Tom World
```

### bind
- 格式: `const newFn = oldFn.bind(this的新指向)`
```js
const dog = {
  name: 'Snoopy',
  say(first, last) {
    console.info(first + ' ' + this.name + ' ' + last)
  },
}

const cat = {
  name: 'Tom',
}

dog.say('Hello', 'World') // Hello Snoopy World
const bindSay = dog.say.bind(cat) // 获取新的方法,然后内部的this指向是 cat
bindSay('Hello', 'World') // Hello Tom World
```

### 区别
- 相同点: 都可以改变 this 的指向
- 不同点:
- - call 和 apply 使用时会调用函数, 而 bind 不会, bind 会返回的是原始函数的拷贝
- - apply 传递参数形式 必须是 数组
- - call 主要用于继承, apply可用于数组的相关操作, bind 由于其不会调用函数的特定, 可以用于改变定时器的 this 指向等