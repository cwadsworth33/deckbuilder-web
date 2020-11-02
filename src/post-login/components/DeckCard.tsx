import React, { useContext } from "react"
import { Deck } from "../../models/Deck"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useHistory } from "react-router-dom"
import { ServiceContext } from "../../App"
import { useConnectObservable } from "../../utils/hooks"

export const DeckCard: React.FC<DeckCardProps> = ({ deck }) => {
  const { deckService, myUserService } = useContext(ServiceContext);
  const userId = useConnectObservable<string | null>(myUserService.getMyUserId(), localStorage.getItem('userId'));
  const history = useHistory();
  const deleteDeck = (uId: string, deckId: string) => deckService.deleteDeck(uId, deckId);
  const navigateToDeckDetail = (e: React.MouseEvent) => history.push(`/dashboard/decks/${deck.deckId}`);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white-100 cursor-pointer" onClick={navigateToDeckDetail}>
      <div className="px-6 py-4">
        <div className="flex">
          <div className="font-bold text-xl mb-2 flex-grow">{ deck.name }</div>
          <FontAwesomeIcon icon="trash" className="cursor-pointer hover:text-orange-dull" onClick={(e) => {
            e.stopPropagation();
            deleteDeck(userId ? userId : '', deck.deckId ? deck.deckId : '');
          }}/>
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