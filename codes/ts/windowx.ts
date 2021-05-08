// interface Window {
//   MyNamespace: any
// }

declare interface Window {
  MyNamespace: any
}

window.MyNamespace = window.MyNamespace || {}

window.AbortController
