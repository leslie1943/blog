function mainFn({ dora, mark }) {
  console.info('【print in mainFn】')

  console.info('dora', dora)
  console.info('mark', mark)

  createFn1({ dora, mark })
  createFn2(dora)
  createFn3({ dora })
}

function createFn1({ dora, mark }) {
  console.info('【print in createFn1】')

  console.info('dora', dora)
  console.info('mark', mark)
}

function createFn2(anyName) {
  console.info('【print in createFn2】')

  console.info('anyName', anyName)
}
function createFn3({ dora }) {
  console.info('【print in createFn3】')

  console.info('dora', dora)
}

const dora = { name: 'dora', age: 19, job: 'openjaw' }
const mark = { name: 'mark', age: 20, job: 'viewhigh' }

mainFn({ dora, mark })

/**
【print in mainFn】
dora { name: 'dora', age: 19, job: 'openjaw' }
mark { name: 'mark', age: 20, job: 'viewhigh' }

【print in createFn1】
dora { name: 'dora', age: 19, job: 'openjaw' }
mark { name: 'mark', age: 20, job: 'viewhigh' }

【print in createFn2】
dora { name: 'dora', age: 19, job: 'openjaw' }

【print in createFn3】
dora { name: 'dora', age: 19, job: 'openjaw' }
 */
