### Vue: Vue3中的样式穿透 deep的使用
- 在 Vue2.x中的样式穿透
```css
.normal-field /deep/ .el-form-item {
  margin-bottom: 0px;
}
.normal-field /deep/ .el-form-item__label {
  color: #939393;
}
```

- 在 Vue3.x中的样式穿透, 如果使用之前的会报警告
- `::v-deep usage as a combinator has been deprecated. Use :deep(<inner-selector>) instead.`
```css
 :deep(.el-card__header) {
    background: darkcyan;
  }
```

### 参考 rfc
[scoped-styles-changes](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md)