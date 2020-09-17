import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import { ServiceContext } from "../../App";
import { Deck } from "../../models/Deck";
import { useConnectObservable } from "../../utils/hooks";

export const DeckDetails: React.FC = () => {

  const { deckId } = useParams<{deckId: string}>();
  const { deckService } = useContext(ServiceContext);
  const deck = useConnectObservable<Deck | undefined>(deckService.getDeck(deckId), undefined);

  return (
    <div className="p-3 bg-blue-100 h-screen">
      { deck 
      ? ( 
        <div>
          <h1 className="text-white-100 text-center">{deck.name}</h1>
          <div className="grid">
            {
              deck.cards
              ? deck.cards.map(card => (
                <img src={card.imageUrl} id={card.id} />
              )) : null
            }
          </div>
        </div>
        )
      : 'No deck found.'}
    </div>
  )
}