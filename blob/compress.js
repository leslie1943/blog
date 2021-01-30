const MAX_WIDTH = 800 // 图片最大宽度

function compress(base64, quality, mimeType) {
  let canvas = document.createElement('canvas')
  let img = document.createElement('img')
  img.crossOrigin = 'anonymous'
  return new Promise((resolve, reject) => {
    img.src = base64
    img.onload = () => {
      let targetWidth, targetHeight
      if (img.width > MAX_WIDTH) {
        targetWidth = MAX_WIDTH
        targetHeight = (img.height * MAX_WIDTH) / img.width
      } else {
        targetWidth = img.width
        targetHeight = img.height
      }
      canvas.width = targetWidth
      canvas.height = targetHeight
      let ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, targetWidth, targetHeight) // 清除画布
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      // 通过toDataURL压缩后的base64
      let imageData = canvas.toDataURL(mimeType, quality / 100)
      resolve(imageData)
    }
  })
}
