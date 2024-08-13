import Decks from './decks.mjs'
// import readline from 'readline'
//
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

const main = () => {
  const decks = new Decks()
  decks.shuffle()

  const desk = {
    userA: {
      isLandlord: false,
      list: []
    },
    userB: {
      isLandlord: false,
      list: []
    },
    userC: {
      isLandlord: false,
      list: []
    }
  }

  for (let i = 0; i < 17; i++) {
    desk.userA.list.push(decks.drawTheCards())
    desk.userB.list.push(decks.drawTheCards())
    desk.userC.list.push(decks.drawTheCards())
  }

  const landlord = ['userA', 'userB', 'userC'][Math.floor(Math.random() * 3)]
  desk[landlord].isLandlord = true
  desk[landlord].list.push(decks.drawTheCards())
  desk[landlord].list.push(decks.drawTheCards())
  desk[landlord].list.push(decks.drawTheCards())

  // 整理
  const finishing  = () => {
    const weightMap = {
      J: 11,
      Q: 12,
      K: 13,
      A: 14,
      2: 15,
      joker: 16
    }
    desk.userA.list = desk.userA.list.sort((a, b) => (weightMap[a.value] || a.value) - (weightMap[b.value] || b.value))
    desk.userB.list = desk.userB.list.sort((a, b) => (weightMap[a.value] || a.value) - (weightMap[b.value] || b.value))
    desk.userC.list = desk.userC.list.sort((a, b) => (weightMap[a.value] || a.value) - (weightMap[b.value] || b.value))
  }

  finishing()

  console.log('userA', desk.userA.list)
  console.log('userB', desk.userB.list)
  console.log('userC', desk.userC.list)
}

main()
