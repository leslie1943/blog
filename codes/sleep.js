const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("return value");
    }, time);
  });
};
sleep(3000).then((res) => {
  console.info("res", res);
});
