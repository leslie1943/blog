const getObjectURL = (file) => {
  let url
  if (window.createObjectURL) {
    url = window.createObjectURL(file)
  } else if (window.URL) {
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL) {
    url = window.webkitURL.createObjectURL(file)
  }
  console.info('url', url)

  return url
}
