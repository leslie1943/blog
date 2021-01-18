## Babel-从案例开始讲解
- 从这篇文章你能学到什么
1. `@babel/cli`
2. `plugins`
3. `presets`
4. 配置`Babel`
5. `polyfill`

学习一个新的知识, 还是偏向于用案例的的方式来打开讲解它.

所以在正式开始阅读之前, 让们先来准备一个这样的案例项目:

```bash
mkdir babel-basic && cd babel-basic
npm init -y
mkdir src && cd src
touch index.js
```

```bash
/babel-basic
 |- /src
   |- index.js
 |- package.json
```

- 现在package.json是最原始的配置, 而index.js暂时没有写内容.

```json
{
  "name": "babel-basic",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {}
}
```

- 下面都将围绕这个babel-basic项目来进行讲解, 希望你也能在本地准备一个这样的项目案例, 以便你更好的理解接下来要说的内容.

### 🚀🚀 @babel/core
- 首先学习下`@babel/core`. 它是Babel的核心模块,使用 ✅ `npm i --save-dev @babel/core` ✅
- 安装成功之后就可以在代码中使用了. 可以采用`CommonJS`的引用方式
```js
const babel = require('@babel/core')
babel.transform("code",options)
```
- 这里的知识点有很多, 不过你不用急于的掌握它, 只需要知道它是Babel的核心, 让们接着往下看.

### 🚀🚀 @babel/cli
- 再然后就是`@babel/cli`, 它是一个终端运行工具, 内置的插件,运行你从终端使用babel的工具.同样, 它也需要先安装: ✅ `npm i --save-dev @babel/cli @babel/core` ✅

现在, 让先在`src/index.js`中写上一段简单的代码, 并来看看它的基本用法.
```js
const fn = () => 1; // 箭头函数, 返回值为1
console.log(fn());
```
#### 💛 用法一: 命令行的形式(在项目根目录执行语句):
```bash
# npx babel src --out-dir lib
```
- 这段语句的意思是: 它使用们设置的解析方式来解析`src`目录下的所有`JS`文件, 并将转换后的每个文件都输出到`lib`目录下.
- 但是注意了, 由于们现在没有设置任何的解析方式, 所以你在执行了这段语句之后, 能看到项目中多了一个`lib`目录, 而且里面的`JS`代码和`src`中的是一样的. 至于说的解析方式, 就是后面要介绍的`plugins`和`presets`.

#### 💛 用法二: 给package.json中配置一段脚本命令:
```json
{
    "name": "babel-basic",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
       "build": "babel src -d lib" // 新增脚本
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
       "@babel/cli": "^7.8.4",
       "@babel/core": "^7.8.4"
    }
}
```
- `-d` 是 `out-dir`的缩写
- 我们使用上面的 `--out-dir` 选项. 你可以通过使用 `--help` 运行它来查看 `cli` 工具接受的其余选项. 但对我们来说最重要的是` --plugins` 和 `--presets`
```bash
# npx babel --help
  
```
| 缩写 | 详情 |
| ---- |---- |
|-f, --filename [filename]|The filename to use when reading from stdin. This will be used in source-maps,errors etc.|
|--presets [list]|A comma-separated list of preset names.|
|--plugins [list]|A comma-separated list of plugin names.
|--config-file [path]|Path to a .babelrc file to use.
|--env-name [name]|The name of the 'env' to use when loading configs and plugins. Defaults to the value of BABEL_ENV, or else NODE_ENV, or else 'development'.
|--root-mode [mode]|The project-root resolution mode. One of 'root' (the default), 'upward', or 'upward-optional'.
|--source-type [script|module]|
|--no-babelrc|Whether or not to look up .babelrc and .babelignore files.
|--ignore [list]|List of glob paths to **not** compile.
|--only [list]|List of glob paths to **only** compile.
|--no-highlight-code|Enable or disable ANSI syntax highlighting of code frames. (on by default)
|--no-comments|Write comments to generated output. (true by default)
|--retain-lines|Retain line numbers. This will result in really ugly code.
|--compact [true|false|auto]|Do not include superfluous whitespace characters and line terminators.
|--minified|Save as many bytes when printing. (false by default)
|--auxiliary-comment-before [string]|Print a comment before any injected non-user code.
|--auxiliary-comment-after [string]|Print a comment after any injected non-user code.
  -s, --source-maps [true|false|inline|both]
|--source-map-target [string]|Set `file` on returned source map.
|--source-file-name [string]|Set `sources[0]` on returned source map.
|--source-root [filename]|The root from which all sources are relative.
|--module-root [filename]|Optional prefix for the AMD module formatter that will be prepended to the filename on module definitions.
|-M, --module-ids|Insert an explicit id for modules.
|--module-id [string]|Specify a custom name for module ids.
|-x, --extensions [extensions]|List of extensions to compile when a directory has been the input.[.es6,.js,.es,.jsx,.mjs]
|--keep-file-extension|Preserve the file extensions of the input files.
  -w, --watch|Recompile files on changes.
|--skip-initial-build|Do not compile files before watching.
  -o, --out-file [out]|Compile all input files into a single file.
  -d, --out-dir [out]|Compile an input directory of modules into an output directory.
|--relative|Compile into an output directory relative to input directory or file. Requires       
|--out-dir [out]
|-D, --copy-files|When compiling a directory copy over non-compilable files.
|--include-dotfiles|Include dotfiles when compiling and copying non-compilable files.
|--no-copy-ignored|Exclude ignored files when copying non-compilable files.
|--verbose|Log everything. This option conflicts with --quiet
|--quiet|Don not log anything. This option conflicts with --verbose
|--delete-dir-on-start|Delete the out directory before compilation.
|--out-file-extension [string]|Use a specific extension for the output files
|-V, --version|output the version number
|-h, --help|output usage information

### 🚀🚀 插件plugins

#### 💛 基本概念
- 知道了Babel的基本用法之后, 让我们来看看具体的代码转换.
- 现在要介绍的是插件`plugins`, 它的本质就是一个`JS`程序, 指示着`Babel`如何对代码进行转换.
- 所以你也可以编写自己的插件来应用你想要的任何代码转换.

#### 💛 插件案例(箭头函数插件)
- 但是首先让我们来学习一些基本的插件.
- 如果你是要将ES6+转成ES5, 可以依赖官方插件, 例如:
- `@babel/plugin-transform-arrow-function`
```bash
  # ✅ npm install @babel/plugin-transform-arrow-function --save-dev ✅
  
  # 使用 某个指定的插件来编译
  # npx babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions
```
- 这个插件的作用是将箭头函数转换为ES5兼容的函数:
- 还记得我们之前的`src/index.js`吗?
```js
const fn = () => 1; // 箭头函数, 返回值为1
console.log(fn());
```
- 现在编译之后, 你再打开lib/index.js来看看.
- 它是不是被转换为ES5的代码了呢? 😁
```js
// 转换后
const fn = function () {
  return 1;
}; // 箭头函数,返回值为 1

console.info(fn());
```
- 捣鼓了这么久, 终于看到了一点实际的效果, 此时有点小兴奋啊😄
- 虽然我们已经实现了箭头函数转换的功能, 但是ES6+其它的语法(比求幂运算符**)却并不能转换, 这是因为我们只使用了`@babel/plugin-transform-arrow-functions`这个功能插件, 没有使用其它的了.


### 🚀🚀 Presets (预置)

#### 💛 基本概念
- 如果想要转换`ES6+`的其它代码为`ES5`,我们可以使用`preset`来代替预先设定的一组插件,而不是逐一添加我们想要的所有插件.
- 这里可以理解为一个 `preset` 就是一组插件的集合.
- `presets`和`plugins`一样, 也可以创建自己的`preset`, 分享你需要的任何插件组合.

#### 💛 @babel/preset-env
- 例如, 我们使用`preset-env`: ✅ `npm install @babel/preset-env --save-dev` ✅
- `preset-env` 这个`preset`包括支持现代`JavaScript(ES6+)`的所有插件.
- 所以也就是说如果使用了`preset-env`之后, 就可以看到其他`ES6+`语法的转换了.
- 现在让我们来用用`ES7`中的`求幂运算符`和`函数参数支持尾部逗号`这两个功能吧
- 修改 `package.json`
```json
"scripts": {
    // "build": "npx babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions"
    "build": "npx babel src --out-dir lib --presets=@babel/preset-env"
  }
```

### 🚀🚀 配置
- 上面👆介绍的都是一些终端传入`CLI`的方式, 在实际使用上, 我们更加偏向于配置文件.
- 例如我们在项目的根目录下创建一个`babel.config.js`文件:
```js
const presets = [
  ['@babel/env'],
  {
    target: {
      edge: '17',
      chrome: '64',
      firefox: '60',
      safari: '11.1',
    },
  },
]

module.exports = { presets }
```
加上这个配置的作用是:
- 使用`env`这个`preset`
- `env` 只会为目标浏览器中没有的功能加载转换插件

现在你要使用这个配置就很简单了, 直接用我们前面package.json配置的命令行语句:
```json
{
  "scripts":{
    "build": "babel src -d lib"
  }
}
```
- 执行 `npm run build` 就可以了.
- 这个命令行语句看起来并没有修改, 那是因为它默认会去寻找跟根目录下的一个名为`babel.config.js`的文件(或者`babelrc.js`也可以, 这个在之后的使用`babel`的几种方式中会说到), 所以其实就相当于以下这个配置:
```json
{
	"scripts": {
		"build": "babel src -d lib --config-file ./babel.config.js"
	}
}
```
- 因此如果你的`Babe`l配置文件是`babel.config.js`的话, 这两种效果是一样的.
- <font color="red">(--config-file 指令就类似于webpack中的--config, 用于指定以哪个配置文件构建)</font>
- 这里我重点要说一下只会为目标浏览器中没有的功能加载转换插件这句话的意思.
- 例如我这里配置的其中一项是`edge: "17"`, 那就表示它转换之后的代码支持到`edge17`.
- 所以你会发现, 如果你用了我上面`babel.config.js`的配置之后生成的`lib`文件夹下的代码好像并没有发生什么改变, 也就是它并没有被转换成`ES5`的代码:

- 使用`babel.config.js`配置之后构建的`lib/index.js`:

```js
// 未转换的代码
"use strict";
const fn = () => 1; // ES6箭头函数, 返回值为1
let num = 3 ** 2; // ES7求幂运算符
let foo = function foo(a, b, c) {
  // ES7参数支持尾部逗号
  console.log('a:', a);
  console.log('b:', b);
  console.log('c:', c);
};

foo(1, 3, 4);
console.log(fn());
console.log(num);
```
- 箭头函数依旧是箭头函数, 求幂运算符依旧是求幂运算符.


<h2>这是因为在`Edge17`浏览器中支持`ES7`的这些功能, 所以它就没有必要将其转换了, 它只会为目标浏览器中没有的功能加载转换插件!!!</h2>

- 如果我们将 `edge17` 改成 `edge10` 看看 🤔️?


### 🚀🚀 Polyfill 垫片
- `Plugins` 是提供的插件, 例如箭头函数转普通函数`@babel/plugin-transform-arrow-functions`
- `Presets` 是一组`Plugins`的集合.
- 而 `Polyfill` 是对执行环境或者其它功能的一个补充.
- 什么意思呢 🤔️?
- 就像现在你想在`edge10`浏览器中使用`ES7`中的方法`includes()`, 但是我们知道这个版本的浏览器环境是不支持你使用这个方法的, 所以如果你强行使用并不能达到预期的效果.
- 而 `Polyfill` 的作用正是如此, 知道你的环境不允许, 那就帮你引用一个这个环境, 也就是说此时编译后的代码就会变成这样:
```js
// 原来的代码
var hasTwo = [1, 2, 3].includes(2);

// 加了polyfill之后的代码
require("core-js/modules/es7.array.includes");
require("core-js/modules/es6.string.includes");
var hasTwo = [1, 2, 3].includes(2);

```
- 现在就让我们来学习一个重要的`polyfill`, 它就是`@babel/polyfill`.
- `@babel/polyfill`用来模拟完成`ES6+`环境:
1. 可以使用像`Promise`或者`WeakMap`这样的新内置函数
2. 可以使用像`Array.from`或者`Object.assign`这样的静态方法
3. 可以使用像`Array.prototype.includes`这样的实例方法
4. 还有`generator`函数

- 为了实现这一点, Polyfill增加了全局范围以及像String这样的原生原型.
- 而`@babel/polyfill`模块包括了`core-js`和自定义`regenerator runtime`
- 
- 对于库/工具来说, 如果你不需要像`Array.prototype.includes`这样的实例方法, 可以使用`transform runtime`插件, 而不是使用污染全局的`@babel/polyfill`.

对于应用程序, 我们建议安装使用`@babel/polyfill`: ✅ `npm i --save @babel/polyfill` ✅ ((注意 `--save` 选项而不是 `--save-dev`, 因为这是一个需要在源代码之前运行的 `polyfill`.)

但是由于我们使用的是 `env` `preset`, 这里个配置中有一个叫做 `useBuiltIns` 的选项, 如果将这个选择设置为`"usage"`, 就只包括你需要的`polyfill`

- 此时的`babel.config.js`调整为:
```js
const presets = [
	[
		"@babel/env",
		{
			targets: {
				edge: "17",
				chrome: "64",
				firefox: "67",
				safari: '11.1'
			},
		  useBuiltIns: "usage" // added
		}
	]
]

module.exports = { presets }

```

- 安装配置了`@babel/polyfill`, `Babel`将检查你的所有代码, 然后查找目标环境中缺少的功能, 并引入仅包含所需的`polyfill`
- (如果我们没有将 `env preset` 的 `"useBuiltIns" `选项的设置为 `"usage"` , 就必须在其他代码之前 `require` 一次完整的 `polyfill`)
- 还是上面👆的那个例子, 我们来改造一下, 使用`Edge17`中没有的`Promise.prototype.finally`:

```js
const fn = () => 1; // ES6箭头函数, 返回值为1
let num = 3 ** 2; // ES7求幂运算符
let hasTwo = [1, 2, 3].includes(2)
let foo = function(a, b, c, ) { // ES7参数支持尾部逗号
    console.log('a:', a)
    console.log('b:', b)
    console.log('c:', c)
}
foo(1, 3, 4)
Promise.resolve().finally();
console.log(fn());
console.log(num);
console.log(hasTwo);

```
- 现在执行npm run build之后生成的lib/index.js变成了:
```js
"use strict";

require("core-js/modules/es7.promise.finally.js");

const fn = () => 1; // ES6箭头函数, 返回值为1


let num = 3 ** 2; // ES7求幂运算符

let hasTwo = [1, 2, 3].includes(2);

let foo = function foo(a, b, c) {
  // ES7参数支持尾部逗号
  console.log('a:', a);
  console.log('b:', b);
  console.log('c:', c);
};

foo(1, 3, 4);
Promise.resolve().finally();
console.log(fn());
console.log(num);
console.log(hasTwo);
```
- `@babel/polyfill`帮我们引入了`Edge17` 环境中没有的`promise.finally()`


### 🚀🚀 被deprecated的@babel/polyfill
- 上面我介绍了一种名为`@babel/polyfill` 的 `polyfill`, 其实它在`Babel7.4.0`以上已经不被推荐使用了.
- 而是推荐使用`core-js@3+@babel/preset-env然`后设置`@babel/preset-env`的`corejs`选项为`3`.
- 因此如果你按着我文章中讲方式使用@babel/polyfill, 是可以实现的, 不过控制台中会抛出一个警告⚠️:
```bash
WARNING: We noticed you are re using the `useBuiltIns` option without declaring a core-js version. Currently, we assume version 2.x when no version is passed. Since this default version will likely change in future versions of Babel, we recommend explicitly setting the core-js version you are using via the `corejs` option.

You should also be sure that the version you pass to the `corejs` option matches the version specified in your `package.json`'s `dependencies` section. If it doesn't, you need to run one of the following commands:

  npm install --save core-js@2    npm install --save core-js@3
  yarn add core-js@2              yarn add core-js@3
```
- 解决办法是卸载掉`@babel/polyfill`, 然后重新安装`core-js@版本号`, 然后重新配置一些`babel.config.js`文件.
- ✅ `npm install core-js@3` ✅
- 在`babel.config.js`中配置`core-js`
```js
const presets = [
[
  "@babel/env",
      {
        targets: {
        edge: "17",
        chrome: "64",
        firefox: "67",
        safari: '11.1'
      },
      useBuiltIns: "usage",
      corejs: 3 // add
    }
  ]
]
module.exports = { presets }
```
- (`useBuiltIns` 选项还是不能去掉)
- 现在重新 `npm run build` 之后就不会有这个警告了, 而且生成的`lib`也是正确的.

## Q&A
- Q1-既然 `plugins` 就能对新特性转换成目标浏览器支持的`js`, 为什么还要有`polyfill`这个东西呢?
- A1- 因为像一些原型链上的实例方法(比如 `includes`)它是没法通过代码转过去用的. 它们存在于原型链上(比如`Array.prototype`), 你想想这样一个普通的方法它内部实现是不是非常复杂, 如果你是通过转换这个方法来达到效果的话那么代码就会超级多. 所以是采用引入环境这样的一个方式来达到功能的补充 ()
- U1-个人理解就是说,`Polyfill`是通过引入`package`的形式来解决问题,而不是通过`代码实现`的方式

## 小结
- `babel/cli`允许我们从终端运行 `Babel`
- `env preset`只包含我们使用的功能的转换, 实现我们的目标浏览器中缺失的功能
- `@babel/polyfill`实现所有的新的`JS`功能, 为目标浏览器引入缺少的环境(但是`Babel7.4.0`以上不推荐使用)

## 引用
[Babel basic demo](https://github.com/leslie1943/blog/tree/master/babel-basic).
