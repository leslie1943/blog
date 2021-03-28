function print(i) {
  console.info('print:', i)
  /**
    print i 0
    print i 1
    print i 2
    print i 3
    print i 4
   */
  setTimeout(() => {
    console.info('setTimeout i', i)
  }, i * 1000)
}
for (var i = 0; i < 5; i++) {
  print(i)
}
