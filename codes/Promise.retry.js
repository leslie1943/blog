/**
 *
 * @param {*} promiseFn: 请求方法
 * @param {*} times : 限制次数
 */
Promise.retry = function (promiseFn, times = 3) {
  return new Promise(async (resolve, reject) => {
    while (times--) {
      console.info("left times:", times);
      try {
        const res = await promiseFn();
        resolve(res);
        break;
      } catch (error) {
        console.info("err", error);
        // 到达次数后 reject
        if (!times) reject(error);
      }
    }
  });
};

// 随机生成数
function getRandomNumber() {
  const n = Math.random();
  console.info("random n", n);
  return new Promise((resolve, reject) => {
    // 大于0.5 => resolve
    // 小于0.5 => reject
    setTimeout(() => (n > 0.9 ? resolve(n) : reject(n)), 1000);
  });
}

// Promise.retry(getRandomNumber);

const tryToGetNum = async () => {
  try {
    const finalRes = await Promise.retry(getRandomNumber, 6);
    console.info("Try to get success result:", finalRes);
  } catch (e) {
    console.info("Try to get fail result:", e.toString());
  }
};

tryToGetNum();
