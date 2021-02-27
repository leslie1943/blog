## JavaScript: export default 和 export 的区别?

### export default
- 一个文件中只允许存在一个
- `xxx` 可以是任意变量名
- 无需 {}, 直接导出
```js
// 文件 A 定义及导出
export default  xxx
// 文件 B 引用
import xxx from './'
```

### export
- 一个文件中可以存在多个
- `xxx` 必须是 `文件A` 中的具名变量或者函数
- 导入的时候需要加 {}, 内部是具名的
```js
// 文件 A 定义及导出
export xxx
// 文件 B 引用
import { xxx } from './'
```