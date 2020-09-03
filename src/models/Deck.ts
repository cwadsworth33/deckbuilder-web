import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'

export type Deck = {
  name: string,
  cards: PokemonTCG.ICard[]
}