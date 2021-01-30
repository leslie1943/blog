// 将文件流转换成url
export function getObjectURL(data) {
  let url = null
  // basic validate
  if (window.createObjectURL != undefined) {
    url = window.createObjectURL(data)
  } else if (window.webkitURL != undefined) {
    // webkit or chrome
    try {
      url = window.webkitURL.createObjectURL(data)
    } catch (error) {
      console.info(error)
    }
  } else if (window.URL != undefined) {
    // mozilla(firefox)
    try {
      url = window.URL.createObjectURL(data)
    } catch (error) {}
  }
  return url
}

// vue里调用
this.$axios({
  method: 'post',
  url: `/api/contract/preview`,
  data: params,
  responseType: 'blob',
}).then((res) => {
  const blob = new Blob([res.data], { type: 'application/pdf' })
  const url = getObjectURL(blob)
  this.pdfLoading = false
  window.open(url, '__blank')
})
