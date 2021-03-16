## Vue: 动态绑定 class 样式

### 🚀 方式一 🚀
- 💛 绑定单个class
```vue
<template>
    <div :class="{'active': isActive}"></div>
</template>
<script>
data() {
    return {
      isActive: true
    }
}
</script>
```
- 渲染结果
```html
<div class="active"></div>
```


- 💛 绑定多个class
```vue
<template>
    <div class="activeOne" :class="{activeTwo: isActive, 'activeThree': hasActive }"></div>
</template>
<script>
data() {
    return {
      isActive: true,
      hasActive: true
    }
}
</script>
```
- 渲染结果
```html
<div class="activeOne activeTwo activeThree"></div>
```

### 🚀 方式二 🚀
- 绑定的数据对象
```vue
<template>
    <div :class="classObject"></div>
</template>
<script>
data() {
    return {
      classObject: {
          active: true
      }
    }
}
</script>
```

### 🚀 方式三 🚀
- 绑定一个返回对象的计算属性
```vue
<template>
    <div :class="classObject"></div>
</template>
<script>
export default{
    data() {
        return {
            isActive: true
        }
    },
    computed: {
        classObject: function(){
            return {
                active: this.isActive
            }
        }
    }
}
</script>
```

### 🚀 方式四 🚀
- 单纯数组方法
```vue
<template>
    <div :class="[activeClass, errorClass]"></div>
</template>
<script>
export default{
    data() {
        return {
            activeClass: "active",
            errorClass: "disActive"
        }
    },
}
</script>
```
- 渲染为
```html
<div class="active disActive"></div>
```

### 🚀 方式五 🚀
```vue
<template>
    <div :class="[isActive ? 'active' : 'disActive']"></div>
</template>
<script>
export default{
    data() {
        return {
            isActive: false,
        }
    },
}
</script>
```
- 渲染为
```html
<div class="disActive"></div>
```