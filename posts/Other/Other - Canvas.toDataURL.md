## Canvas.toDataURL
- 使用`Canvas`内容,并将其转为`base64`格式
```html
<body>
    <canvas id="canvas" width="200" height="50"></canvas>
    <textarea id="content" style="width: 200px; height: 200px"></textarea>
    <script>
        var canvas = document.getElementById('canvas');
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            // canvas 的绘制
            ctx.font = 'Bold 20px Arial';
            ctx.textAlign = 'left';
            ctx.fillStyle = 'purple';
            ctx.fillText('leslie', 10, 30);
            // 获取 Data URL
            document.getElementById('content').value = canvas.toDataURL();
        } 
    </script>
</body>
```
- 使用`canvas`绘制图片,然后使用`canvas.toDataURL`得到`base64`格式的值