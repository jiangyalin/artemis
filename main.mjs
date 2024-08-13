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

  // 桌
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
    },
    // 丢弃
    discard: [],
    // 待发者
    waiting: ''
  }

  for (let i = 0; i < 17; i++) {
    desk.userA.list.push(decks.drawTheCards())
    desk.userB.list.push(decks.drawTheCards())
    desk.userC.list.push(decks.drawTheCards())
  }

  const landlord = ['userA', 'userB', 'userC'][Math.floor(Math.random() * 3)]
  desk[landlord].isLandlord = true
  desk.waiting = landlord
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

  // 获取双
  const getPair = list => list.filter(item => list.filter(node => node.value === item.value).length > 1)

  // 获取单顺
  const getSingleStraight = list => {
    const weightMap = { J: 11, Q: 12, K: 13, A: 14 }
    const weightReversalMap = { 11: 'J', 12: 'Q', 13: 'K', 14: 'A' }
    const _list = list.filter(item => item.value !== 2 && item.value !== 'joker')
    const arr = []
    for (let i = 0; i < _list.length; i++) {
      const start = (weightMap[_list[i].value] || _list[i].value) + 1
      let state = true
      for (let j = start; j < 4; j++) {
        if (!_list.some(item => item.value === weightReversalMap[j])) state = false
      }
      if (!state) continue
      for (let j = 0; j < 5; j++) {
        arr.push(
          ..._list.filter(item => item.value === _list[i + j]?.value)
            .filter(item => !arr.some(node => node.value === item.value && node.color === item.color))
        )
      }
    }
    return arr
  }

  // 出
  const goOut = () => {
    const order = ['userA', 'userB', 'userC']
    const list = desk[desk.waiting].list
    desk.waiting = order[(order.findIndex(name => name === desk.waiting) + 1) % 3]

    console.log('list', list)

    // 双
    const pair = getPair(list)
    console.log('pair', pair)

    // 单顺
    const singleStraight = getSingleStraight(list)
    console.log('singleStraight', singleStraight)
  }
  goOut()

  // console.log('userA', desk.userA.list)
  // console.log('userB', desk.userB.list)
  // console.log('userC', desk.userC.list)
}

main()
