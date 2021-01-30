// 浏览器环境中运行
var arraybuffer = new ArrayBuffer(10)
console.info('arraybuffer', arraybuffer)
/**
 *  [[Int8Array]]: Int8Array(10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    [[Int16Array]]: Int16Array(5) [0, 0, 0, 0, 0]
    [[Uint8Array]]: Uint8Array(10) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    byteLength: 10
 */

const blob = new Blob([arraybuffer], { type: 'text/plain' })
console.info('blob', blob)
/**
 *   Blob {size: 10, type: "text/plain"}
 */
