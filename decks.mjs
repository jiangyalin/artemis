const brandValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
const brandColor = ['#', '$', '@', '%']

class Decks {
  brand = [{
    color: 'big',
    value: 'joker'
  }, {
    color: 'small',
    value: 'joker'
  }]
  constructor () {
    for (let i = 0; i < brandColor.length; i++) {
      for (let j = 0; j < brandValue.length; j++) {
        this.brand.push({
          color: brandColor[i],
          value: brandValue[j]
        })
      }
    }
  }
  // 洗牌
  shuffle () {
    for (let i = 0; i < this.brand.length; i++) {
      const piece = this.brand[i]
      const index = Math.floor(Math.random() * this.brand.length)
      this.brand[i] = this.brand[index]
      this.brand[index] = piece
    }
  }
  // 摸牌
  drawTheCards () {
    const piece = this.brand[0]
    this.brand.shift()
    return piece
  }
}

export default Decks
