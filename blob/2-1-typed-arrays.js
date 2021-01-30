// 创建一个 8 字节的 ArrayBuffer
var b = new ArrayBuffer(8)
console.info('b', b)

// 创建一个指向 b 的视图 v1, 采用 Int32类型, 开始于默认的字节索引0, 直到缓冲区的末尾
var v1 = new Int32Array(b) // v1: Int32Array(2) [0,0]

v1[0] = 1 // v1: Int32Array(2) [1, 0]

// 创建一个指向 b 的视图 v2, 采用Uint8类型, 开始于字节索引2, 直到缓冲区的末尾
var v2 = new Uint8Array(b, 2) // // Uint8Array(6) [0, 0, 0, 0, 0, 0]
console.info('v2', v2)

// 创建一个指向b的视图v3, 采用Int16类型, 开始于字节索引2, 长度为2
var v3 = new Int16Array(b, 2, 2) // Int16Array(2) [0, 0]
