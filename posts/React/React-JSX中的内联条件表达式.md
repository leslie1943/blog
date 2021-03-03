### JSX中的内联条件表达式
- 在`JavaScript`中使用`if`或者`三元表达式`来实现条件判断
- 在`JSX`或者`TSX`中可以在`{}`中嵌入任何表达式
```js
    function Message(){
        render(){
            <h1>Hello!</h1>
            {   
                messages.length > 0 && !isLogin ?
                <h2>You have {messages.length} unread messages.</h2> : 
                <h2> You don't have unread messages.</h2>
            }
        }
    }
```
- 如果指向判断 `if`
```js
    function Message(){
        render(){
            <h1>Hello!</h1>
            {   
                isLogin && <h2> You have been login!</h2>
            }
        }
    }
```