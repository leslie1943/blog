// const dog = {
//   name: 'Snoopy',
//   say(first, last) {
//     console.info(first + ' ' + this.name + ' ' + last)
//   },
// }

// const cat = {
//   name: 'Tom',
// }

// dog.say('Hello', 'World') // Hello Snoopy World
// dog.say.call(cat, 'Hello', 'World') // Hello Tom World

// const dog = {
//   name: 'Snoopy',
//   say(first, last) {
//     console.info(first + ' ' + this.name + ' ' + last)
//   },
// }

// const cat = {
//   name: 'Tom',
// }

// dog.say('Hello', 'World') // Hello Snoopy World
// dog.say.apply(cat, ['Hello', 'World']) // Hello Tom World

const dog = {
  name: 'Snoopy',
  say(first, last) {
    console.info(first + ' ' + this.name + ' ' + last)
  },
}

const cat = {
  name: 'Tom',
}

dog.say('Hello', 'World') // Hello Snoopy World
const bindSay = dog.say.bind(cat) // Hello Tom World
bindSay('Hello', 'World')
