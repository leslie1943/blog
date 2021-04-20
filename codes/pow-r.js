function pow(x, n) {
  if (n == 1) {
    return x
  } else {
    return x * pow(x, n - 1)
  }
}

console.info(pow(10, 4))
