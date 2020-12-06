## MobX
- `mobx`是一个简单、可扩展的状态管理的框架.
- [全面了解mobx](https://cn.mobx.js.org)

### 异步请求数据 并更新状态 - 方式1 - 异步调用同步
- 其实就是`异步方法`中调用`同步方法`修改状态
```js
import { observable, configure, action } from 'mobx'
import axios from 'axios'
const BASEURL = 'https://api.github.com'

// 🔰🔰 通过配置强制程序使用 action 函数更改应用程序中的状态 🔰🔰
configure({ enforceActions: 'observed' })

class CounterStore {
    @observable users = []

    // 同步更新
    @action.bound setUsers(users) {
        this.users = users
    }
    // 异步请求数据
    @action.bound async getUsers(){
        const { data } = await axios.get(BASEURL + '/users')
        this.setUsers(data)
    }
}
```

### 异步请求数据 并更新状态 - 方式2 - runInAction
- 使用 `runInAction()`
```js
import { observable, configure, action, runInAction } from 'mobx'
import axios from 'axios'
const BASEURL = 'https://api.github.com'

// 🔰🔰 通过配置强制程序使用 action 函数更改应用程序中的状态 🔰🔰
configure({ enforceActions: 'observed' })

class CounterStore {
    @observable users = []

    // 异步请求数据并在runInAction中完成状态更新
    @action.bound async getUsers(){
        const { data } = await axios.get(BASEURL + '/users')
        // 如果要修改 state 必须放在 runInAction 的回调函数后执行
        runInAction(() => {
            this.users = data
        })
    }
}
```

### 异步请求数据 并更新状态 - 方式3 - flow
- 使用 `flow()`
```js
import { observable, configure, action, flow } from 'mobx'
import axios from 'axios'
const BASEURL = 'https://api.github.com'

// 🔰🔰 通过配置强制程序使用 action 函数更改应用程序中的状态 🔰🔰
configure({ enforceActions: 'observed' })

class CounterStore {
    @observable users = []

    // 异步请求数据并在runInAction中完成状态更新
   getUsers = flow(function*(){
        const { data } = yield axios.get(BASEURL + '/users')
        this.users = data
   }).bind(this) // 需要注意 this 的指向
}
```