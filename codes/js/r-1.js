// 累加
function acc(a) {
  a = a + 1
  if (a < 100) {
    return a + acc(a)
  }
  return a
}

const total = acc(0)
console.info('total', total)

// 阶乘
function factorial(n) {
  if (n == 1) {
    return n
  }
  return n * factorial(n - 1)
}

const res = factorial(5, 6)
console.info('res', res)
