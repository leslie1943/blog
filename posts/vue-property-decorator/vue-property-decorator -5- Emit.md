### vue-property-decorator -5- Emit
- 关于 `Vue` 中的事件的触发和监听, `Vue` 提供了 `$emit`和`$on`, 那么在`vue-property-decorator`中如何使用呢?
- 这就需要用到 `vue-property-decorator` 提供的 `@Emit` 属性.
```vue
<template>
  <div class="wrapper">
    <el-button @click="doSometh('button parameters')">doSometh</el-button>
    <el-button @click="resetCount(1943)">Reset</el-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit } from 'vue-property-decorator'
@Component
export default class EmitParent extends Vue {
  count = 10

  mounted() {
    this.$on('do-someth', function (val: string) {
      console.info('$on do-someth', val) // 🎃 输出: $on do-someth button parameters
    })

    this.$on('reset', function (num: number) {
      console.info('$on reset', num) // 🎃 输出: $on reset 1943
    })
  }

  /**
   * 🎃 点击按钮后,先触发 doSometh 方法本身
   * 🎃 再触发 this.$emit('emit-todo) 这个监听
   */

  // 🎃@Emit() 不带参数的话,相当于执行接跟着的方法的 小写形式, this.$emit('do-someth')
  @Emit()
  doSometh(val: string) {
    console.info('doSometh func', val) // 🎃 输出: doSometh func button parameters
  }

  // 🎃 如果是带参数的 @Emit('reset'): 相当于执行完 resetCount后执行 this.$emit('reset')
  @Emit('reset')
  resetCount(num: number) {
    console.info('num in resetCount', num) // 🎃 num in resetCount 1943
    this.count = 0
  }
}
</script>
```

### 官方 demo
- The functions decorated by @Emit $emit their return value followed by their original arguments. If the return value is a promise, it is resolved before being emitted.

If the name of the event is not supplied via the event argument, the function name is used instead. In that case, the camelCase name will be converted to kebab-case.
```js
import { Vue, Component, Emit } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  count = 0

  @Emit()
  addToCount(n: number) {
    this.count += n
  }
  /* 上面的代码相当于 ==>
    this.count += n
    this.$emit('add-to-count', n) // 🎃
  */

  @Emit('reset')
  resetCount() {
    this.count = 0
  }
  /* 上面的代码相当于 ==>
    this.count = 0
    this.$emit('reset', n) // 🎃
  */

  @Emit()
  returnValue() {
    return 10
  }
  /* 上面的代码相当于 ==>
    this.$emit('return-value', 10) // 🎃
  */

  @Emit()
  onInputChange(e) {
    return e.target.value
  }
  /* 上面的代码相当于 ==>
    this.$emit('on-input-change', e.target.value, e) // 🎃
  */

  @Emit()
  promise() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(20)
      }, 0)
    })
  }
  /* 🎃🎃🎃🎃 上面的代码相当于 ==>
   const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve(20)
        }, 0)
      })

      promise.then((value) => {
        this.$emit('promise', value)
      })
  */
}
```