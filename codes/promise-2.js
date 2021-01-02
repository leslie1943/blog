const promise = new Promise((resolve, reject) => {
  console.info("1");
  resolve("success");
  console.info("2");
});

promise.then(() => {
  console.info("3");
});

console.info("4");
