#### 如何优化 Webpack 的构建速度

- 使用高版本的 Webpack 和 Node.js
- 多进程/多实例构建: `thread-loader`
- 压缩代码
```bash
# terser-webpack-plugin / uglifyjs-webpack-plugin 压缩JS代码
# 图片压缩: 基于 Node 库的 imagemin /  image-webpack-loader
# 缩小打包作用域: exclude / include; resolve.modules指明第三模块的绝对路径; 
# resolve.extension 减少后缀尝试的可能性; 合理使用别名
# 提取共通资源
# DLL: 使用DllPlugin进行分别, 缓存打包的静态资源, 避免反复编译
# 开启Tree shaking
```