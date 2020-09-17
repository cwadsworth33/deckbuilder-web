import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'

export type Deck = {
  name: string,
  id: string,
  expandedLegal: boolean,
  standardLegal: boolean,
  cards: PokemonTCG.ICard[]
}