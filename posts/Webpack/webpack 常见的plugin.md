#### 有哪些常见的Plugin?你用过哪些Plugin?

- `define-plugin`: 定义环境变量 (Webpack4 之后指定 mode 会自动配置)
- `ignore-plugin`: 忽略部分文件
- `copy-webpack-plugin`: 复制不参与构建的文件
- `html-webpack-plugin`: 创建HTML文件.并将生成的`bundle.js`插入到html页面中
- `friendly-errors-webpack-plugin`: 构建信息输出
- `webpack-bundle-analyzer`: 可视化 Webpack 输出文件的体积
- `circular-dependency-plugin`: 循环依赖检查
- `AssetsPlugin`: 缓存 `bundle.js`
- `uglifyjs-webpack-plugin`: 压缩JS代码,不包括ES6
- `clean-webpack-plugin`: dist目录清理