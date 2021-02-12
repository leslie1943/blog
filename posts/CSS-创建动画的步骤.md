## CSS-创建动画的步骤
1. `@keysframes` 创建动画: 使用`from`和`to` 或者 使用百分比
```css
@keyframes Gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
@-webkit-keyframes Gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

@-moz-keyframes Gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
```
2. `animation` 绑定动画到选择器(`class`或者`id`)上
```css

.jumbotron {
    animation: Gradient 15s ease infinite;
    -webkit-animation: Gradient 15s ease infinite;  /* 动画.时长.方式.次数 */
    -moz-animation: Gradient 15s ease infinite;
}
```
3