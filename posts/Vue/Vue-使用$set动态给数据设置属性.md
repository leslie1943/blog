#### 在实际的开发过程中，给表单元素绑定model的时候，绑定的元素的属性是根据后台数据动态生成的。如果使用常规的赋值方式，是无法更新视图的
- 需要使用, this.$set(dataName,keyName,keyValue)
```javascript
export default {
  data:{
    // 先定义一个空对象
    formObject:{},
    arrayList:[],
  },
  mounted() {
    this.initPage()
  },
  methods:{
    initPage(){
      this.$store.dispatch(namespace/callData).then(res=>{
        // this.formObject['person'] = res.data.result // ❗❗❗❗ 这种方式是不能更新视图的
        // 给数据设置key-value
        this.$set(this.formObject, 'person', res.data.result) // ✅✅✅✅可以更新视图
        
      })
      // 修改数组
       this.$store.dispatch(namespace/callData).then(res=>{
        // 给数据设置key-value
        this.$set(this.arrayList,0,(res.data)[0].id)  ✅✅✅✅可以更新视图
      })
    }
  }
}
```