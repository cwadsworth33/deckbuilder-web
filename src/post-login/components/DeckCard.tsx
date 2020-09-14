import React from "react"
import { Deck } from "../../models/Deck"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const DeckCard: React.FC<DeckCardProps> = ({ deck }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white-100">
      <div className="px-6 py-4">
        <div className="flex">
          <div className="font-bold text-xl mb-2 flex-grow">{ deck.name }</div>
          <FontAwesomeIcon icon="trash" className="cursor-pointer hover:text-orange-dull" />
        </div>
        <div className="pt-4 flex items-center">
          <div className="flex-grow">
            { deck.standardLegal 
              ? <span className="inline-block bg-gray-med rounded-full py-1 px-3 text-sm font-semibold text-gray-700 mr-2">Standard</span>
              : null }
            { deck.expandedLegal 
              ? <span className="inline-block bg-gray-med rounded-full py-1 px-3 text-sm font-semibold text-gray-700 mr-2">Expanded</span>
              : null }
          </div>
          <span className="">{deck.cards ? deck.cards.length : 0} / 60</span>
        </div>
      </div>
    </div>
  )
}

type DeckCardProps = {
  deck: Deck
}