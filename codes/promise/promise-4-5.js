function runAsync(x) {
  const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000 * x))
  return p
}
function runReject(x) {
  const p = new Promise((res, rej) =>
    setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
  )
  return p
}
Promise.all([runAsync(1), runAsync(4), runAsync(3), runAsync(2)])
  .then((res) => console.log('then res:', res))
  .catch((err) => console.log(err))

/**
  1s后: 1
  2s后: 2
  3s后: 3
  4s后: 4s 
  then res: [ 1, 4, 3, 2 ]
*/

Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
  .then((res) => console.log('then res:', res))
  .catch((err) => console.log(err))

/**
 * 1
 * 2
 * Error: 2
 * 3
 * 4
 */
