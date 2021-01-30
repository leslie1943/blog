## revokeObjectURL
- `URL.revokeObjectURL()` 静态方法用来释放一个之前已经存在的、通过调用 `URL.createObjectURL()` 创建的 `URL` 对象.当你结束使用某个 URL 对象之后, 应该通过调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Download</title>
</head>

<body>
    <button onclick="download()">download.txt</button>
    <script>

        const getObjectURL = (file) => {
            let url;
            if (window.createObjectURL) {
                url = window.createObjectURL(file);
            } else if (window.URL) {
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL) {
                url = window.webkitURL.createObjectURL(file);
            }
            console.info('url', url)

            return url;
        };
        // 触发下载
        function download() {
            const filename = 'download.txt'
            const blob = new Blob(['下载文件的内容,从接口返回'], { type: 'application/pdf' })
            downloadFun(filename, blob)
        }
        // 执行下载
        function downloadFun(filename, blob) {
            const link = document.createElement('a')
            link.href = getObjectURL(blob)
            link.download = filename
            link.click()
            link.remove()
            URL.revokeObjectURL(link.href)
        }
    </script>
</body>

</html>
```