// 浏览器环境中运行
const blob = new Blob(['<div>john</div>'], { type: 'text/xml' })
console.info('blob', blob)
/**
 * Blob {size: 15, type: "text/xml"}
 */
