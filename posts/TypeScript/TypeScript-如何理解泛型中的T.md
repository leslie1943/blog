## TypeScript: 如何理解泛型中的 <T>

对于刚接触`TypeScript`泛型的读者来说, 首次看到`<T>`语法会感到陌生. 其实它没有什么特别,就像传递参数一样, 我们传递了我们想要用于特定函数调用的类型

<img src="./../images/mds/ts-t-1.png">

```typescript
function identity<T>(value: T) :T {
    return value
}

// 调用
identity<Number>(1)
```

- 参考上面的图片, 当我们调用`identity<Number>(1)`, `Number`类型就像参数`1`一样, 它将在出现`T`的任何位置填充该类型.
- 图中`<T>`内部的`T`内称为类型变量, 它是我们希望传递给`identity`函数的类型占位符, 同时它被分配给`value`参数用来代替它的类型: 此时`T`充当的是类型, 而不是特定的`Number`类型
- 其中`T`代表`Type`, 在定义泛型时通常用坐第一个类型变量名称, 但实际上`T`可以用任何有效名称代替. 除了`T`之外, 以下是常见泛型变量代表的意思
1. K-Key: 表示对象中的键类型
2. V-Value: 表示对象中的值类型
3. E-Element: 表示元素类型
- 其实并不是只能定义个类型变量,我们可以引入希望定义的任何数量的类型变量. 比如我们引入一个新的类型变量`U`, 用来扩展我们定义的`identity`函数
```ts
function identity<T, U>(value:T, message:U):T {
    console.info(message)
    return value
}
console.info(identity<Number, string>(68,'leslie'))
```

<img src="./../images/mds/ts-t-2.png">

除了位类型变量显示设定值之外,一种更常见的做法是使编译器自动选择这些类型,从而使代码更简洁

```ts
function identity<T, U>(value:T, message: U): T{
    console.info(message)
    return value
}
console.info(identity(68,'leslie'))
```

对于上述代码, 编译器足够聪明, 能够知道我们的参数类型, 并将它们赋值给 `T` 和 `U`, 而不需要开发人员显式指定它们
