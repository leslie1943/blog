#### Vue3中响应式数据原理
- Vue3.x改用 `Proxy` 替代 `Object.defineProperty`. 因为Proxy可以直接监听对象和数组的变化,并且有多达13种拦截方法.
- `Proxy只会代理对象的第一层,那么Vue3又是怎样处理这个问题的呢?` => 判断当前`Reflect.get`的返回值是否为`Object`,如果是则再通过`reactive`方法做代理, 这样就实现了深度观测.
- `监测数组的时候可能触发多次get/set, 那么如何防止触发多次呢` => 可以判断key是否为当前被代理对象target自身属性, 也可以判断旧值与新值是否相等, 只有满足以上两个条件之一时, 才有可能执行trigger

`ref`,`toRef`都是调用了`reactive方法`

```js
/**
 * 模拟实现reactive
 */

// 判断是否是对象
const isObject = val => val != null && typeof val === 'object'
// 把对象转换成响应式数据
const convert = target => isObject(target) ? reactive(target) : target
// 判断是否有属性
const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (target, key) => hasOwnProperty.call(target, key)

// reactive
export function reactive(target) {
  // 不是对象
  if (!isObject(target)) return target

  // 对象
  const handler = {
    get(target, key, receiver) {
      // 搜集依赖
      track(target, key)
      const result = Reflect.get(target, key, receiver)
      return convert(result)
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      let flag = true
      if (oldValue !== value) {
        flag = Reflect.set(target, key, value, receiver)
        // 触发更新
        trigger(target, key)
      }
      return flag
    },
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key)
      const flag = Reflect.deleteProperty(target, key)
      if (hadKey && flag) {
        // 触发更新
        trigger(target, key)
      }
      return flag
    }
  }

  return new Proxy(target, handler)
}

let activeEffect = null

export function effect(callback) {
  activeEffect = callback
  callback() // 访问响应式对象属性,去搜集依赖
  activeEffect = null
}

let targetMap = new WeakMap()
// track 搜集依赖, trigger触发更新, trigger去targetMap中找到属性对应的effect函数
export function track(target, key) {
  if (!activeEffect) return
  // 字典: 属性和对应的函数
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    // 键是target
    targetMap.set(target, (depsMap = new Map()))
  }
  // 根据属性查找对应的dep对象
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(activeEffect)
}

export function trigger(target, key) {
  // 根据目标找属性depsMap
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  // 根据key找集合
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => {
      effect()
    })
  }
}

export function ref(raw) {
  // 判断raw是否是 ref 创建的对象,如果是的话直接返回
  if (isObject(raw) && raw.__v_isRef) {
    return
  }

  let value = convert(raw)
  const r = {
    __v_isRef: true,
    get value() {
      track(r, 'value') // 搜集依赖
      return value
    },
    set value(newValue) {
      if (newValue !== value) {
        raw = newValue
        // 重新赋值,保证它是响应式的
        value = convert(raw)
        trigger(r, 'value')
      }
    }
  }

  return r
}

// 把reactive返回的对象所有属性转换成响应式对象
export function toRefs(proxy) {
  const ret = proxy instanceof Array ? new Array(proxy.length) : {}
  for (const key in proxy) {
    ret[key] = toProxyRef(proxy, key)
  }
  return ret
}

// 转换代理对象的每一项作为响应式对象返回
function toProxyRef(proxy, key) {
  const r = {
    __v_isRef: true,
    get value() {
      return proxy[key] // 代理对象的属性会自动搜集依赖
    },
    set value(newValue) {
      proxy[key] = newValue
    }
  }

  return r
}

// 计算属性
// computed 内部会通过effect监听内部的响应式数据的变化
// effect中访问属性时会去搜集依赖,数据变化后重新执行effect,结果会存到 result
export function computed(getter) {
  const result = ref() // undfined
  effect(() => (result.value = getter()))
  return result
}
```