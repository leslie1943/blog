function sum(arr, total) {
  if (arr.length === 1) {
    return total
  } else {
    return sum(arr, total + arr.pop())
  }
}

const nums = [10, 20, 30, 40, 50]
const res = sum(nums, nums[0])
console.info('res', res)
