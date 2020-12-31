## Vue-使用异步完成子组件的表单校验
- 当一个大的表单组件被拆分成多个子组件的时候.
- 在父组件进行【保存】或者【提交】的时候，需要去完成子组件的表单校验, 然后汇总各个子组件的校验结果进行下一步的操作
- ❌ 以前使用过 `ref`来获取子组件实例,然后调用子组件的实例方法进行校验, 这么做需要手动去触发子组件方法的调用, 不够灵活
- ✅ 现在使用 vuex + watch + 手写 `onValidateForm`返回 Promise的方式来实现

## 实现步骤
请重点阅读以 `💛💛` 开头的注释

### 定义 store 的 state 数据 和 mutation
```js
export default {
  namespaced: true,
  namespace: 'post',
  state: {
  /**
   * 💛💛 type: 用来标识是 保存还是提交, 提交的话需要去校验页面的必填项
   * 💛💛 shouldEmit: 子组件触发 this.$emit 是在 watcher 中, 当 shouldEmit 为 true 的时候才执行
  */
    doAction: { type: '', shouldEmit: false },
  },
  // 同步修改
  mutations: {
      // 💛💛 父组件会 commit 这个 动作, 然后子组件监听这个属性, 确定是否要执行 emit
    setAction: (state, payload) => {
      state.doAction = payload
    },
  },
}
```

### 父组件
```html
<template>
  <div class="post-info-wrapper">
    <TopFix>
      <div slot="header">
        <el-row class="topTitle" type="flex" justify="space-between">
          <!-- 标题 -->
          <el-col :span="12" style="line-height: 36px">创建文章</el-col>
          <!-- 操作按钮 -->
          <el-col :span="12" style="text-align: right">
            <el-button size="small"@click="handleSave">保存</el-button>
            <el-button type="primary" size="small" @click="handleSubmit">提交</el-button>
          </el-col>
        </el-row>
      </div>
      <div slot="trbody">
        <!-- 💛💛 传递方法和属性 -->
        <PostBaseInfoEdit @handleBaseInfo="handleBaseInfo" :_parent_PostBaseInfo="postParams.postBaseInfo" />
      </div>
    </TopFix>
  </div>
</template>

<script>
// 💛💛 引入子组件
import PostBaseInfoEdit from '../components/post-base-edit'
export default {
  components: { PostBaseInfoEdit },
  data() {
    return {
        postParams:{
            postBaseInfo: {}
        },
        postBaseFlag: false,
        postBaseErrorMsg: [],
    }
  },
  methods: {
    async handleSave() {
        // 💛💛 调用同步方法 设置 doAction
        // 💛💛 设置完成后, 子组件会监听到 执行 $emit
      await this.$store.commit('post/setSubmitFlag', { type: 'action_save', shouldEmit: true })
      const params = {
        postBaseInfo: this.postParams.postBaseInfo,
      }
      // 执行保存草稿
      this.loading = true
      const res = await this.$store.dispatch('post/draft', params)
      if (res.data.status === 1) {
        this.needCheckFlag = false
        this.$router.push('/post/list')
      } else {
        this.$message.error(res.data.msg)
      }
      this.loading = false
    },

    async handleSubmit() {
        // 💛💛 调用同步方法 设置 doAction
        // 💛💛 设置完成后, 子组件会监听到 执行 $emit, 由于是 提交操作会去做校验行为
        // 💛💛 然后把结果返回给父组件, 父组件根据子组件返回的数据来决定是否继续下一步
      await this.$store.commit('post/setSubmitFlag', { type: 'action_submit', shouldEmit: true })
      setTimeout(async () => {
          // 💛💛 已经获取到的校验结果
        if (this.postBaseFlag) {
          // 执行提交
          const params = {
            postBaseInfo: this.postParams.postBaseInfo,
          }
          const res = await this.$store.dispatch('post/submit', params)
          if (res.data.status === 1) {
            this.$message.success('提交成功!')
            this.$router.push('/post/list')
          } else {
            this.$message.error(res.data.msg)
          }
        } 
      }, 0)
    },
    handleBaseInfo(result) {
      // 💛💛 子组件 $emit 的方法会被此方法接收
      this.postParams.postBaseInfo = result.data
      this.postBaseFlag = result.success
      this.postBaseErrorMsg = result.errorMsgs
    },
  },
  created() {
    // 💛💛 初次调用重置 doAction 的值
    this.$store.dispatch('post/setAction',{type:'', shouldEmit: false})
  },
}
</script>
```

### 子组件
```html
<template>
  <div class="post-base-info-edit">
    <Block title="合同信息">
      <el-form
        :model="baseInfo"
        :rules="baseRules"
        ref="postBaseRef"
        label-position="right"
        label-width="160px"
      >
        <el-row>
          <!-- 合同名称 -->
          <el-col :span="8"
            ><el-form-item label="合同名称:" prop="conName">
              <el-input
                placeholder="请输入合同名称"
                v-model="baseInfo.conName"
                :maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
  </div>
</template>

<script>

export default {
  props: {
    _parent_PostBaseInfo: {
      type: Object
    }
  },
  data() {
    return {
      // 表单基础信息
      baseInfo: {
        conName: '',
      },
      // 校验规则
      baseRules: {
        conName: [{ required: true, message: '请输入合同名称' }],
      },
    }
  },
  methods: {
    // 校验表单
    onValidateForm() {
      return new Promise(resolve => {
        this.$refs.postBaseRef.validate(valid => resolve(valid))
      })
    },
  },
  computed: {
    // 💛💛 获取 store 中的 action 属性
    // 💛💛 并 watch 这个属性
    doAction() {
      return this.$store.state.post.doAction
    },
   
  },
  watch: {
    // watch 得到的属性
    doAction: {
      async handler(action) {
        // should emit action to parent component
        // 💛💛 一旦父组件触发 【保存】或者【提交】动作 shouldEmit 变成 true, 开始执行数据搜集和校验
        // 💛💛 触发 $emit, 将搜集的数据和校验结果返回给父组件, 更新父组件的 data 属性
        if (action.shouldEmit) {
          if (action.type === 'action_submit') {
            const result = await this.onValidateForm()
            this.$emit('handleBaseInfo', { data: this.baseInfo, success: result, errorMsgs: result ? [] : ['请完成必填项的填写!'] })
          } else if (action.type === 'action_save') {
            this.$emit('handleBaseInfo', { data: this.baseInfo, success: true, errorMsgs: [] })
          }
        }
      },
      deep: true,
      immediate: true
    },
  }
}
</script>
```