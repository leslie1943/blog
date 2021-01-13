### Promise 5 - 7

```js
async function async1() {
  console.log('async1 start')

  await new Promise((resolve) => {
    console.log('promise1')
    resolve('promise resolve')
  })

  console.log('async1 success')
  return 'async1 end'
}

console.log('srcipt start')

async1().then((res) => {
  console.log(res)
})

new Promise((resolve) => {
  console.log('promise2')
  setTimeout(() => {
    console.log('timer')
  })
})

/**
 * srcipt start
 * async1 start
 * promise1
 * promise2
 * async1 success
 * async1 end
 * timer
 */
```

### 讲解
这道题应该也不难, 不过有一点需要注意的, 在`async1`中的`new Promise`它的`resovle`的值和`async1().then()`里的值是没有关系的, 很多小伙伴可能看到`resovle('promise resolve')`就会误以为是`async1().then()`中的返回值。