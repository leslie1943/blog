#### 文件指纹是什么? 怎么用?

文件指纹是打包后输出的文件名的后缀。
- `Hash`：和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改
- `Chunkhash`：和 Webpack 打包的 chunk 有关，不同的 entry 会生出不同的 chunkhash
- `Contenthash`：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变
- JS文件指纹设置: `output` 的 `filename` 中设置,使用 `chunkhash`
- CSS的文件指纹设置: `MiniCssExtractPlugin`插件中的`filename`设置,使用`contenthash`
- 图片的文件指纹设置: `file-loader` 中的 `options`中设置 使用 `hash`