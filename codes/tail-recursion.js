function factorial(n, total) {
  if (n === 1) return total
  return factorial(n - 1, n * total)
}

const res = factorial(5, 6)
console.info('res', res)
