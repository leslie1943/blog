// 浏览器环境中运行
var arraybuffer = new ArrayBuffer(8)
var arraybufferview = new Int16Array(arraybuffer)
console.info('arraybufferview', arraybufferview)
/**
 * Int16Array(4) [ 0, 0, 0, 0 ]
 */

const blob = new Blob([arraybufferview], { type: 'text/plain' })
console.info('blob', blob)
/**
 *  Blob {size: 4, type: "text/plain"}
 */
