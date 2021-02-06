## Vue-使用回调减少数据并发操作数据 gap
1. 管理员设置一些配置数据
2. 业务人员需要展示并使用这些数据
3. 业务人员需要在提交表单时管理员修改了配置数据
4. 这种场景下,为了避免数据差异需要重新获取数据为提交的数据用

### 实现思路-回调
- 页面定义方法去做数据加载`loadFbn()`
- 提交时, 直接调用数据加载`loadFbn()`, 并把执行业务的方法作为参数 `loadFbn(callback)`

```vue
<template>
  <div class="dialog-select-wrapper">
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">取消</el-button>
        <el-button
          @click="loadDefaultCerts(handleConfirm)" 
          type="primary"
          size="small">确定</el-button>
      </div>
  </div>
</template>

<script>
import { formatShowCertsText } from '@/utils/formatter'
export default {
  props: {
    visible: { type: Boolean, required: true },
    existedItems: { type: Array, required: true },
    certsList: { type: Array, required: true }
  },
  data() {
    return {
      // 列表选中
      multipleSelection: [],
      loading: false,
      defaultCerts: [],
    }
  },
  methods: {
    // 通知父组件: 添加数据
    async handleConfirm() {
      this.multipleSelection.forEach(item => {
        item.certMap = this.defaultCerts
      })
      this.$emit('setSelectItems', this.multipleSelection)
    },
    // 执行
    async loadDefaultCerts(callback) {
      this.loading = true
      try {
        // 获取医疗类证件
        const res = await API.getDefaultCerts(1)
        const { status, msg, result } = res.data
        if (status === 1) {
          this.defaultCerts = result
          this.loading = false
            /// 回调
          if (callback && typeof callback === 'function') {
            callback()
          }
        } else {
          this.$message.error(msg)
        }
      } catch (e) {
        this.loading = false
        console.info(e)
      }
    }
  },
  mounted() {
    this.loadDefaultCerts()
  },
}
</script>
<style lang="scss" scoped>
.dialog-select-wrapper {
  .special-btn {
    border: 1px rgb(136, 127, 188) solid;
    color: #000;
  }
}
</style>

```