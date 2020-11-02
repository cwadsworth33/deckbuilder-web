import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'

export type Deck = {
  name: string,
  deckId?: string,
  expandedLegal: boolean,
  standardLegal: boolean,
  cards: string[]
}