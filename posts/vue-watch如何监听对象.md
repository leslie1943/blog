#### watch 的用法
- 如果要监听obj内的某一个属性, 可以用obj.key 进行;
- 如果要对obj进行深层监听, 要使用handler, deep, immediate 来完成
- immediate可以让对象在最初绑定的时候执行.
```js
watch:{
    "obj.name":{
        handler:function(newQ,oldQ){
            this.answer = 'waiting...'
            this.getAnswer()
        },
        deep: true,
        immediate: true
    }
}
```