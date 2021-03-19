# webpack 中 resolve 的配置
### resolve 的 作用
resolve配置webpack如何寻找模块对应的文件

### 代码示例及说明
```js
export default {
  resolve: {
    /**
     * 💛 alias 💛: 通过别名把远导入路径映射成一个新的导入路径
     * 配置完 alias可以简化导入语句
     * 原: import Button from './src/components/button'
     * 现: import Button from '@components/button'
     */
    alias: {
      '@': path.join(__dirname, '.', 'src'),
      '@components': path.join(__dirname, '.', 'src/components')
    },
    /**
    * 💛 mainFields 💛: 有一些第三方模块会针对不同环境提供几份代码
    * 例如在package.json里
    * {
    *   "jsnext:main": 'es/index.js' // 采用 es6 语法的代码入口文件
    *   "main": 'lib/index.js' // 采用 es5 语法的代码入口文件
    * }
    * webpack 会根据 mainFields 的配置去决定优先采用哪份代码,例如:
    * mainFields: ['browser','main']
    * webpack 会按照数组里的顺序去 package.json里寻找，只会使用找到的第一个
    * 加入像采用 ES6 的那部分代码, 可以这样配置
    * mainFields:['jsnext:main','browser','main']
    */
    mainFields: ['jsnext:main', 'browser', 'main'],
    /**
    * 💛 extensions 💛: 在导入语句没带文件后缀时, webpack会自动带上后缀去尝试访问文件是否存在
    * extendsion 用于配置在尝试过程中的后缀列表，默认:
    * extendsion: ['.js','.json']
    */
    extendsion: ['.js', '.json', '.vue'],
    /**
   * 💛 modules 💛: 配置webpack去哪些目录下寻找第三方模块, 默认只会去 node_modules 目录下查找
   * 有时项目里会有一些模块会大量被其他模块依赖和导入, 由于其他模块的位置分不定
   * 针对不同的文件都要去计算被导入模块文件的相对瑞金，这个路径有时候会很长
   * 像 import '../../../components/button' 可以使用modules配置项优化
   * 假如大量被导入的模块都在 ./src/components 目录下, 把modules设置成
   * modules:['./src/components','node_modules']
   * 就可以使用 import 'button' 导入
   */
    modules: ['./src/components', 'node_modules'],
    /**
  * 💛 descriptionFiles 💛: 配置第三方模块的文件名称, 也就是 package.json
  */
    descriptionFiles: ['package.json'],
    /**
  * 💛 enforeExtension💛: 如果配置为 true, 所有的导入语句都必须要待文件后缀.
  * import './foo'  => import './foo.js'
  */
    enforeExtension: true,
    /**
  * 💛 enforeModuleExtension💛: 如果给enforeExtension设置成了true,很多第三方的模块中大多导入语句没带文件后缀
  * 所以通过配置 enforceModuleExtension:false 来如兼容第三方模块
  */
    enforeModuleExtension: false
  }
}
```