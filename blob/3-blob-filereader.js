var blob = new Blob(['<xml>foo</xml>'], { type: 'text/xml' })
console.info(blob) // Blob(14) {size: 14, type: "text/xml"}

var reader = new FileReader()
reader.onload = () => {
  console.info(reader.result)
}

reader.readAsText(blob) // <xml>foo</xml>
reader.readAsArrayBuffer(blob) // ArrayBuffer(14) {}
reader.readAsDataURL(blob) // data:text/xml;base64,PHhtbD5mb288L3htbD4=
