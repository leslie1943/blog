#### call vs apply
- `call` 和 `apply` 的作用是一样的, 都是为了改变函数在运行时的上下文的, 为了改变函数体内部 `this`的指向

- `call`的参数是按个数传入的, `apply`的参数是放到一个数组中进行传递
```js
fn.call(this, p1,p2,p3)
fn.apply(this, arguments)
```

```js
// demo FOR apply
const name = 'global name'

function say(first, last){
    console.info(first + ' ' + this.name + ' ' + last)
}
const person = {
    name: 'suzhen'
}
say('C','D') // C Global name D
// 使用apply
say.apply(person, ['A','B']) // A suzhen B
```

```js
// demo FOR call
const name = 'global name'

function say(first, last){
    console.info(first + ' ' + this.name + ' ' + last)
}
const person = {
    name: 'suzhen'
}
say('C','D') // C Global name D
// 使用apply
say.call(person, 'A','B') // A suzhen B
```