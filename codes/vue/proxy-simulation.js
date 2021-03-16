function render() {
  console.log('模拟视图的更新')
}

let obj = {
  name: '前端工匠',
  age: { age: 100 },
  arr: [1, 2, 3],
}

let handler = {
  get(target, key) {
    // 如果取的值是对象就再对这个对象进行数据劫持
    if (typeof target[key] == 'object' && target[key] !== null) {
      return new Proxy(target[key], handler)
    }
    return Reflect.get(target, key)
  },
  set(target, key, value) {
    // key为length时, 表示遍历完了最后一个属性
    if (key === 'length') return true
    render()
    return Reflect.set(target, key, value)
  },
}

let proxy = new Proxy(obj, handler)
proxy.age.name = 'new'
console.info(proxy.age.name)
proxy.arr[0] = '荣光无限' //支持数组的内容发生变化
console.log(proxy.arr) // 模拟视图的更新 ['荣光无限', 2, 3 ]
