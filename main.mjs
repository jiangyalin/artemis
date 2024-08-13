import Decks from './decks.mjs'

const main = () => {
  const decks = new Decks()
  decks.shuffle()
  console.log('decks', decks)
}

main()
