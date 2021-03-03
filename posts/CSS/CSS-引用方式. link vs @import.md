### link vs @import

#### link: link属于xhtml标签,写在html的head, 随着页面同时加载.
- link属于xhtml标签,写在html的head, 随着页面同时加载.
```html
<head>
    <link rel="stylesheet" rev="stylesheet" href="style.css" type="text/css" media="all" />
</head>
```
#### @import 写在css文档里面引入样式表. 页面加载完成后加载
```html
<style type="text/css" media="screen"> 
    @import url("http://www.taobao.com/home/css/global/v2.0.css?t=20070518.css"); 
</style>
```