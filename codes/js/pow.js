function pow(x, n) {
  let result = 1

  // 循环中, 用 x 乘以 result n 次
  for (let i = 0; i < n; i++) {
    result *= x
  }

  return result
}

console.info(pow(10, 3))
