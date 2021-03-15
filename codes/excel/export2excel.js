/* eslint-disable */
require('script-loader!file-saver')
require('./blob.js')
require('script-loader!xlsx/dist/xlsx.core.min')

// WorkBook class
function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook()
  this.SheetNames = []
  this.Sheets = {}
}

/**
 * 🚀🚀 项目使用的导出方法
 * @param {*} th
 * @param {*} jsonData
 * @param {*} fileName
 */
export function export_json_to_excel(th, jsonData, fileName, rangeType) {
  console.info('range type-1', rangeType)
  let data = jsonData
  data.unshift(th)
  let ws_name = 'SheetJS'

  let wb = new Workbook()
  let ws = sheet_from_array_of_arrays(data, rangeType)

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name)
  wb.Sheets[ws_name] = ws

  let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' })
  let title = fileName || '列表'
  saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), title + '.xlsx')
}

// 生成 worksheet
function sheet_from_array_of_arrays(data, rangeType) {
  console.info('range type-2', rangeType)
  let ws = {}
  let range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } }
  for (let R = 0; R != data.length; ++R) {
    for (let C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R
      if (range.s.c > C) range.s.c = C
      if (range.e.r < R) range.e.r = R
      if (range.e.c < C) range.e.c = C
      let cell = { v: data[R][C] }
      if (cell.v == null) continue
      let cell_ref = XLSX.utils.encode_cell({ c: C, r: R })

      if (typeof cell.v === 'number') {
        cell.t = 'n'
      } else if (typeof cell.v === 'boolean') {
        cell.t = 'b'
      } else if (cell.v instanceof Date) {
        cell.t = 'n'
        cell.z = XLSX.SSF._table[14]
        cell.v = datenum(cell.v)
      } else {
        cell.t = 's'
      }
      ws[cell_ref] = cell
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range)

  if (rangeType) {
    const ranges = getMergeRange(rangeType, data.length)
    ws['!merges'] = ranges
  }

  return ws
}

// 格式化日期
function datenum(v, date1904) {
  if (date1904) v += 1462
  let epoch = Date.parse(v)
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
}

// Array Buffer 转换
function s2ab(s) {
  let buf = new ArrayBuffer(s.length)
  let view = new Uint8Array(buf)
  for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}

/**
 * 获取合并规则
 * @param {*} rangeType 
 * @param {*} dataLen 
 * @returns rules of merge
  合并语法
  纵向合并, 范围是第2列的行1到行2: { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } }
  横向合并, 范围是第1行的列3到列5: { s: { r: 0, c: 2 }, e: { r: 0, c: 4 } },
    // 第0,1,2,3,4,5列的 row1 - row3
    [
      { s: { r: 1, c: 0 }, e: { r: 3, c: 0 } },
      { s: { r: 1, c: 1 }, e: { r: 3, c: 1 } },
      { s: { r: 1, c: 2 }, e: { r: 3, c: 2 } },
      { s: { r: 1, c: 3 }, e: { r: 3, c: 3 } },
      { s: { r: 1, c: 4 }, e: { r: 3, c: 4 } },
      { s: { r: 1, c: 5 }, e: { r: 3, c: 5 } },
      // 第0,1,2,3,4,5列的 row4 - row6
      { s: { r: 4, c: 0 }, e: { r: 6, c: 0 } },
      { s: { r: 4, c: 1 }, e: { r: 6, c: 1 } },
      { s: { r: 4, c: 2 }, e: { r: 6, c: 2 } },
      { s: { r: 4, c: 3 }, e: { r: 6, c: 3 } },
      { s: { r: 4, c: 4 }, e: { r: 6, c: 4 } },
      { s: { r: 4, c: 5 }, e: { r: 6, c: 5 } },
   ]
*/
function getMergeRange(rangeType, dataLen) {
  switch (rangeType) {
    case 'BIDDING-COMPARE':
      let rules = []
      let start = 1
      while (start < dataLen) {
        for (let col = 0; col < 6; col++) {
          rules.push({ s: { r: start, c: col }, e: { r: start + 2, c: col } })
        }
        start += 3
      }
      console.info('rules', rules)
      return rules
  }
}
