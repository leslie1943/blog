## Vue 中子组件获取父组件异步数据
- 在业务开发的时候,当有一个大表单的时候,往往会把整个页面拆分成多个组件, 在父组件的`created`或者`mounted`生命周期中根据`$route.params`或者`$route.query` 查询详情, 然后把数据传递给可编辑的子组件(子组件的表单依赖于父组件传递的数据), 这样的场景是非常常见的.
- 但是, 由于Vue中父子生命周期的原因. [Vue: 父子生命周期](https://github.com/leslie1943/blog/issues/92). 子组件率先完成`mounted`,而后才是父组件的`mounted`完成, 这样就导致了父组件加载的数据无法被子组件检测到.
- 解决这种方式的办法有很多种, `$parant`是一种解决方法, 通过`$ref`调用组件的方法进行设置也可以.
- 在这里,我更推荐使用`watch`

#### 子组件
```vue
<template>
  <div class="wrapper">
    <el-form :model="baseInfo">
        <el-form-item label="名称:" prop="name">
            <el-input
              placeholder="请输入名称"
              v-model="baseInfo.name"
              :maxlength="50"
            />
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
    export default {
        props:{
            detailInfo: {
                type: Object
            }
        },
        data(){
            return {
                baseInfo: {}
            }
        },
        watch:{
            detailInfo(val) {
                this.baseInfo = val
                this.$nextTick(() => {
                    this.$refs.contractBaseRef.clearValidate()
                })
            }
        }
    }
</script>
```
#### 父组件
```vue
<template>
  <div class="wrapper">
    <BaseInfoEdit :detailInfo="detailInfo"></BaseInfoEdit>
  </div>
</template>
<script>
    import BaseInfoEdit from '../components/base-edit'
    export default {
        data(){
            return {
                detailInfo: {}
            }
        },
        async mounted(){
            const res = await this.$store.dispatch('product/detail', this.$route.query.id)
            this.detailInfo = res.data.result
        }
    }
</script>
```
