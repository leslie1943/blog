# Other: 使用 postMessage 跨域

### application - 1
- 在应用1中添加`iframe`,  使用`postMessage`向`目标网页`发送跨域数据 `iframe.contentWindow.postMessage(JSON.stringify(message), domain);`
- 由于要写入到 localStorage, 使用 JSON.stringify 转成字符串 存储
- 测试的时候, 启动本地html文件的时候,使用 `serve` 命令
```html
<!DOCTYPE html>
<html lang="en">
<body>
    <iframe id="myIFrame"></iframe>
    <script>
        //捕获iframe   
        var domain = 'http://localhost:8080';
        var iframe = document.getElementById('myIFrame')
        iframe.src = domain

        //发送消息   
        setTimeout(function () {
            console.log('传递的数据是:  ' + message);
            var message = {
                time: 'Hello!  The time is: ' + (new Date().getTime()),
                id: 'suzhen'
            }
            //send the message and target URI   
            iframe.contentWindow.postMessage(JSON.stringify(message), domain);
        }, 4000);

        // 移除
        setTimeout(function () {
            iframe.remove()
        }, 6000)

    </script>
</body>

</html>
```


### application - 2 vue项目
- 在vue项目的`app.js`或者`app.vue`的`created`,`mounted`声明周期中监听
```js
created() {
    window.addEventListener('message',
      function (event) {
        console.info('event in epro', event)
        localStorage.setItem('token-epro', event.data)
      },
      false
    )
  }
```