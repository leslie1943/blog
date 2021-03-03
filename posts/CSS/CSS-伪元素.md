##  ::before 和 :after 中双冒号和单冒号的区别? 这2个伪元素的作用? 

- `:`表示伪类, `::`表示伪元素
- 想让插入的内容出现在其他内容前使用 `::before`, 否则使用`::after`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>1-伪元素和伪类</title>
    <style>
        .phoneNumber::before {
            content: '\260E';
            font-size: 15px;
        }
    </style>
</head>

<body>
    <p class="phoneNumber">12345645654</p>
</body>

</html>
```