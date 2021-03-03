## .babelrc 和 babel.config.js 的区别
- `.babelrc`只会影响项目本身的代码
- `babel.config.js`会影响整个项目的代码(所有加载的代码), 包括`node_modules`中的代码
- 推荐使用 `babel.config.js`, 因为很多第三方包编译后的结果都是直接 `es6` 的

### 配置说明
```js
module.exports = {
  presets: [
    // env 选项借助 @babel/preset-env, 并且设置 amd,commonjs这样的模块化文件不进行转码
    // ['@babel/preset-env', { modules: false }] // 此行代码与下面是一样的. ✅✅✅
    ['@babel/env'],

    // 为什么是 `@vue/app`?
    // '@vue/cli-plugin-babel/preset' => '@vue/app'
    /**
     * 💥 1: `@vue/cli-plugin-babel/preset` 位置 => `node_modules/@vue/cli-plugin-babel/presets.js`
     * 💥 2: 这个 `node_modules/@vue/cli-plugin-babel/presets.js` 只是引入了  `node_modules/@vue/babel-preset-app的index.js`文件
     * 💥 3: 如果这样的话, 根据命名原则, 直接使用 `@vue/app` 就可以
     */
    '@vue/app'
  ],
  plugins: [
    // ---- babel-plugin-component
    // [
    //   'component',
    //   {
    //     libraryName: 'element-ui',
    //     styleLibraryName: 'theme-chalk'
    //   }
    // ]
  ]
}

```