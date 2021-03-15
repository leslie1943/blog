# Vue: Vue中通过JSON数据导出excel(带合并的)

### 配置步骤
- `npm install -save file-saver xlsx`
- `npm install -D script-loader`
- `src`下新建`excel`文件夹, 放入两个JS文件,`blob.js`和`export2excel.js`
- 并在`main.js`中引入
```js
// main.js
import  './excel/blob'
import './excel/export2excel'
```


### 测试代码
```html
 <template>
  <div class="button">
    <el-button type="primary" @click="exportExcel">导出excel</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1, name: 'name-1', model: 'model-1', spec: 'spec-1', brand: 'brand-1', unit: 'unit-1', s1: 's1-brand', s2: 's2-brand', s3: 's3-brand', s4: 's4-brand'
        },
        {
          id: 1, name: 'name-1', model: 'model-1', spec: 'spec-1', brand: 'brand-1', unit: 'unit-1', s1: 's1-price', s2: 's2-price', s3: 's3-price', s4: 's4-price'
        },
        {
          id: 1, name: 'name-1', model: 'model-1', spec: 'spec-1', brand: 'brand-1', unit: 'unit-1', s1: 's1-现货', s2: 's2-现货', s3: 's3-现货', s4: 's4-现货'
        },
        {
          id: 2, name: 'name-2', model: 'model-2', spec: 'spec-2', brand: 'brand-2', unit: 'unit-2', s1: 's1-brand', s2: 's2-brand', s3: 's3-brand', s4: 's4-brand'
        },
        {
          id: 2, name: 'name-2', model: 'model-2', spec: 'spec-2', brand: 'brand-2', unit: 'unit-2', s1: 's1-price', s2: 's2-price', s3: 's3-price', s4: 's4-price'
        },
        {
          id: 2, name: 'name-2', model: 'model-2', spec: 'spec-2', brand: 'brand-2', unit: 'unit-2', s1: 's1-现货', s2: 's2-现货', s3: 's3-现货', s4: 's4-现货'
        }
      ]
    }
  },

  methods: {
    // 导出的方法
    exportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../excel/export2excel')
        // header
        const header = ['序号', '名称', '型号/货号', '规格/包装', '品牌/厂家(全称)', '计量单位/销售包装', '供应商1', '供应商2', '供应商3', '供应商4']
        // key
        const filterVal = ['id', 'name', 'model', 'spec', 'brand', 'unit', 's1', 's2', 's3', 's4']
        // value
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        // 表头列, 数据, 文件名称, 合并规则标识
        export_json_to_excel(header, data, '报价对比表', 'BIDDING-COMPARE')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
<style lang="scss">
.button {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
```