## Vue 的父组件和子组件生命周期钩子执行顺序
1. 加载渲染过程: `🤴父 beforeCreate` ==> `🤴父 created` ==> `🤴父 beforeMount` ==> `🧑子 created` ==> `🧑子 beforeMount` ==> `🧑子 mounted` ==> `🤴父 mounted`
2. 🧑子组件更新过程: `🤴父 beforeUpdate` ==> `🧑子 beforeUpdate` ==> `🧑子 updated` ==> `🤴父 updated`
3. 🤴父组件更新过程: `🤴父 beforeUpdate` ==> `🤴父 updated`
4. 销毁过程: `🤴父 beforeDestory` ==> `🧑子 beforeDestory` ==> `🧑子 destoryed` ==> `🤴父 destoryed`