function say<T>(val: T): T {
  console.info('parameter value: ', val)
  return val
}

say<String>('Hello')
