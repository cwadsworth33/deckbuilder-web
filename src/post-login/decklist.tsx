import React from "react"
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import { Deck } from "../models/Deck"

export type DeckListProps = {
  decks: Deck[]
}

export const decklist: React.FC<DeckListProps> = ({decks}) => {
  return (
    <div>
      
    </div>
  )
}