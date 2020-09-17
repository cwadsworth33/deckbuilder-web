import React from "react"
import { Deck } from "../models/Deck"
import { DeckCard } from "./components/DeckCard"

export type DeckListProps = {
  decks: Deck[]
}

export const Decklist: React.FC<DeckListProps> = ({decks}) => {
  return (
    <div className="grid grid-flow-col grid-cols-3 grid-rows-3 gap-4">
      { decks.map(d => <DeckCard deck={d} key={d.id} />) }
    </div>
  )
}