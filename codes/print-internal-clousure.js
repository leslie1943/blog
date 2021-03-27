function print(i) {
  setTimeout(() => {
    console.info(i)
  }, i * 1000)
}
for (var i = 0; i < 5; i++) {
  print(i)
}
