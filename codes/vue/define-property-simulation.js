let data = {
  name: '荣光无限',
  location: { x: 100, y: 100 },
}

function render() {
  // set 的时候走这, 重新渲染
  console.info('模拟视图渲染')
}

// 把数据变成响应式的
observer(data)

// 观察者
function observer(obj) {
  // 判断类型
  if (!obj || typeof obj !== 'object') {
    return
  }

  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key])
  })
}

// 响应式
function defineReactive(obj, key, value) {
  // 递归子属性
  observer(value)

  Object.defineProperty(obj, key, {
    enumerable: true, //可枚举（可以遍历）
    configurable: true, //可配置（比如可以删除）
    get: function () {
      console.info('get', value)
      return value
    },
    set: function (newVal) {
      observer(newVal)
      if (newVal != value) {
        console.info('set', newVal)
        render()
        value = newVal
      }
    },
  })
}

data.location = { x: 1000, y: 2000 } // set {x: 1000,y: 1000} 模拟视图渲染
data.name //  荣光无限
// data.age = '100' // 不生效
