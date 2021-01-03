const promise = new Promise((resolve, reject) => {
  console.info("1");
  console.info("2");
});

promise.then(() => {
  console.info("3");
});

console.info("4");

// 和题目2相似, 只不过在 `promise` 中并没有 `resolve` 或者 `reject`
// promise.then 不会执行
// 1 2 4
