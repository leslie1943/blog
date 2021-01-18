# Vue-Object.defineProperty vs Proxy
- `Object.defineProperty`无法监控到数组下标的变化, 导致通过数组下标添加元素, 不能实时响应；
- `Object.defineProperty`只能劫持对象的属性, 从而需要对每个对象, 每个属性进行遍历, 如果, 属性值是对象, 还需要深度遍历. Proxy可以劫持整个对象, 并返回一个新的对象. 
- Proxy不仅可以代理对象, 还可以代理数组. 还可以代理动态增加的属性. 
