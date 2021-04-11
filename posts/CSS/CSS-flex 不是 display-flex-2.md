### CSS: flex 不是 display:flex - 2

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .con {
            margin-bottom: 20px;
            width: 800px;
            height: 100px;
            display: flex;
            background-color: darkolivegreen;
        }

        .b1 {
            flex: 2 1 auto;
            width: 100px;
            background-color: #67C23A;
        }

        .b2 {
            flex: 0 1 auto;
            width: 100px;
            background-color: #409EFF;
        }

        .b3 {
            flex: 0 1 auto;
            width: 100px;
            background-color: #E6A23C;
        }

        .b4 {
            flex: 2 1 auto;
            width: 100px;
            background-color: #67C23A;
        }

        .b5 {
            flex: 1 1 auto;
            width: 100px;
            background-color: #409EFF;
        }

        .b6 {
            flex: 0 1 auto;
            width: 100px;
            background-color: #E6A23C;
        }

        .b7 {
            flex: 0 1 auto;
            width: 600px;
            background-color: #67C23A;
        }

        .b77 {
            flex: 10 1 auto;
            width: 600px;
            background-color: #67C23A;
        }

        .b8 {
            flex: 1 2 auto;
            width: 600px;
            background-color: #409EFF;
        }

        .b9 {
            flex: 1 2 auto;
            width: 600px;
            background-color: #E6A23C;
        }
    </style>
</head>

<body>
    <div>
        <p>示例说明: 父容器的宽度是800px, 每个子项的宽度是100px;</p>
        <p>flex: flex-grow , flex-shrink 和 flex-basis 属性的缩写</p>
        <p>默认值 flex: 0 1 auto</p>
    </div>
    <div class="con">
        <div class="b1">flex: 2 1 auto; </div>
        <div class="b2">flex: 0 1 auto;</div>
        <div class="b3">flex: 0 1 auto;</div>
    </div>
    <div class="con">
        <div class="b4">flex: 2 1 auto;</div>
        <div class="b5">flex: 1 1 auto;</div>
        <div class="b6">flex: 0 1 auto;</div>
    </div>

    <div>
        <p>示例说明: 父容器的宽度是800px, 每个子项的宽度是600px;</p>
    </div>

    <div class="con">
        <div class="b7">flex: 0 1 auto;第二个参数"1"表示不压缩</div>
        <!-- <div class="b8">flex: 1 2 auto;</div>
        <div class="b9">flex: 1 4 auto;</div> -->
    </div>

    <div class="con">
        <div class="b77">flex: 10 1 auto;此时由于父容器没有了剩余空间, flex-grow的值已经不起作用了,但是第二个参数"1"表示不压缩</div>
        <div class="b8">flex: 1 2 auto;</div>
        <div class="b9">flex: 1 2 auto;</div>
    </div>
</body>

</html>
```