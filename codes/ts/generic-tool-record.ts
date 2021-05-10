/**
 * node_modules/typescript/lib/lib.es5.d.ts
 * Construct a type with a set of properties K of type T
 */
// type Record<K extends keyof any, T> = {
//   [P in K]: T
// }

interface PageInfo {
  title: string
}

type Page = 'home' | 'about' | 'contact'

// type Record<K extends string | number | symbol, T> = { [P in K]: T; }
const x: Record<Page, PageInfo> = {
  about: { title: 'about' },
  home: { title: 'home' },
  contact: { title: 'contact' },
}

export {}
