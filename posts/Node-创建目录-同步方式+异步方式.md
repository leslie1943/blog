## Node: 创建目录-同步方式
```js
const fs = require('fs')
const path = require('path')

// 目录创建之同步实现
/**
 * 1: 将来调用时需要接受类似于 a/b/c 这样的路径 它们之间采用 / 去连接
 * 2: 利用 / 分割符 将路径进行拆分, 将每一项放入一个数组中进行管理 ['a', 'b', 'c']
 * 3: 对上述的数组进行遍历, 我们需要拿到每一项, 然后于前一项进行拼接 /
 * 4: 判断一下当前对拼接之后的路径是否有可操作的权限, 如果有则证明存在, 否则的话就需要执行创建
 */
function makeDirSync(dirPath) {
  let items = dirPath.split(path.sep)
  for (let i = 1; i <= items.length; i++) {
    let dir = items.slice(0, i).join(path.sep)
    try {
      fs.accessSync(dir)
    } catch (error) {
      fs.mkdirSync(dir)
    }
  }
}
makeDirSync('aa\\bb\\cc') // 执行完成后就可以生成目录了
```

## Node: 创建目录-异步方式-1
```js
const fs = require('fs')
const path = require('path')

// 目录创建之异步实现: 异步的API+递归

function mkDir(dirPath, cb) {
  let parts = dirPath.split('/')
  let index = 1

  function next() {
    // 递归结束条件
    if (index > parts.length) {
      return cb && cb()
    }

    // 正常的逻辑
    let current = parts.slice(0, index++).join('/')

    fs.access(current, (err) => {
      if (err) {
        // mkdir接受callback方法, 执行下一次
        fs.mkdir(current, next)
      } else {
        next()
      }
    })
  }
  // 首次执行
  next()
}

mkDir('a/b/c', () => {
  console.info('操作成功')
})
```

## Node: 创建目录-异步方式-2
```js
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

// 目录创建之异步实现: 将 access 与 mkdir 处理成 promise 风格

const access = promisify(fs.access)
const mkdir = promisify(fs.mkdir)

async function promiseMakeDir(dirPath, cb) {
  let parts = dirPath.split('/')
  for (let index = 1; index <= parts.length; index++) {
    let current = parts.slice(0, index).join('/')
    try {
      await access(current)
    } catch (err) {
      await mkdir(current)
    }
  }
  cb && cb()
}

promiseMakeDir('pa/pb/pc', () => {
  console.info('创建完成!')
})

```
