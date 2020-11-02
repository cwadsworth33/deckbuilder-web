import React from "react"
import { Deck } from "../models/Deck"
import { DeckCard } from "./components/DeckCard"

export type DeckListProps = {
  decks?: Deck[]
}

export const Decklist: React.FC<DeckListProps> = ({decks}) => {
  return (
    <>
    <div className="grid grid-flow-col grid-cols-3 grid-rows-3 gap-4">
      { decks?.map(d => <DeckCard deck={d} key={d.deckId} />) }
    </div>
    { decks && decks.length === 0 ? <div className="text-white-100 text-center">Looks like you don't have any decks yet! Click on the Plus icon to create a deck.</div> : null }
    </>
  )
}