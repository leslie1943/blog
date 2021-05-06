### vue-property-decorator -7- Ref
- `@Ref(refKey?:string)`
- @Ref装饰器接受一个可选参数, 用来指向元素或子组件的引用信息.如果没有提供这个参数, 会使用装饰器后面的属性名充当参数.


### 💛 默认元素
- `@Ref() readonly xxxxElement!: ElementType`: 此时页面上需要有一个`ref=xxxxElement`的元素,然后可使用`this.xxxxElement`来调用
```vue
<template>
  <div>
    <el-form ref="loginForm" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input
      ></el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input
      ></el-form-item>
    </el-form>
    <el-row>
      <el-button @click="onHandle">Get ref instance</el-button>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Form } from 'node_modules/element-ui/types'
import { Component, Ref, Vue } from 'vue-property-decorator'
@Component
export default class RefDemo extends Vue {
  @Ref() readonly loginForm!: Form // 🎃 把模板上 ref="loginForm"的元素赋给 this.loginForm
  private form = {
    name: '',
    password: ''
  }
  public onHandle() {
    console.info('this.loginForm', this.loginForm)
    this.loginForm.validate((valid) => {
      console.info('valid', valid)
    })
  }
}
</script>
```


### 💛 具名元素
- `@Ref('refInTemplate') readonly xxxxElement!: ElementType`: 此时页面上需要有一个`ref=refInTemplate`的元素,把模板上 `ref="refInTemplate"`的元素赋给 `this.xxxxElement`
```vue
<template>
  <div>
    <el-form ref="registerFormRef" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input
      ></el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input
      ></el-form-item>
    </el-form>
    <el-row>
      <el-button @click="onHandle">Get ref instance</el-button>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Form } from 'node_modules/element-ui/types'
import { Component, Ref, Vue } from 'vue-property-decorator'
@Component
export default class RefDemo extends Vue {
  @Ref('registerFormRef') readonly loginForm!: Form // 🎃 把模板上 ref="registerFormRef"的元素赋给 this.loginForm
  private form = {
    name: '',
    password: ''
  }

  public onHandle() {
    console.info('this.loginForm', this.loginForm)
    this.loginForm.validate((valid) => {
      console.info('valid', valid)
    })
  }
}
</script>
```