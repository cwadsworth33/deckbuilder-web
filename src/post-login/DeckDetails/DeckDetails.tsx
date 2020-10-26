import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { Card } from "pokemon-tcg-sdk-typescript/dist/sdk";
import React, { useContext, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ServiceContext } from "../../App";
import { Deck } from "../../models/Deck";
import { classNameUtil } from "../../utils";
import { useConnectObservable } from "../../utils/hooks";

export const DeckDetails: React.FC = () => {

  const { deckId } = useParams<{deckId: string}>();
  const { deckService } = useContext(ServiceContext);
  const deck = useConnectObservable<Deck | undefined>(deckService.getDeck(deckId), undefined);
  const [selectedCards, setSelectedCards] = useState<{[key: string]: boolean}>({});

  let cardDict: {[key: string]: PokemonTCG.Card} = {}
  if (localStorage.getItem('cardDict')) {
    cardDict = JSON.parse(localStorage.getItem('cardDict')!);
  }

  const cards: Card[] | undefined = deck?.cards.map(id => cardDict[id]);
  let cardQuantMap = cards?.reduce((agg: any, card) => {
    if (agg[card.id]) {
      return ({
        ...agg, 
        [card.id]: {...agg[card.id], quantity: agg[card.id].quantity + 1}})
    }
    return ({...agg, [card.id]: new CardWithNumber(card, 1)})
  }, {});
  const cardQuantArray: CardWithNumber[] = cardQuantMap ? Object.values(cardQuantMap) : [];

  const toggleSelectCard = (id: string) => setSelectedCards({...selectedCards, [id]: !selectedCards[id]});

  return (
    <div className="bg-blue-100 h-screen text-white-100 p-4 flex flex-col">
      <div className="relative mb-4">
        <span className="absolute left-0">
          <Link to={'/dashboard'}>
            <FontAwesomeIcon icon='arrow-left' className="cursor-pointer inline-block mr-4" />
          </Link>
          <h3 className="inline-block">Decks</h3>
        </span>
        <div className="p-3">
          { deck 
          ? ( 
            <div className="flex-grow overflow-y-auto">
              <h1 className="text-white-100 text-center">{deck.name}</h1>
              <div className="grid">
                {
                  <div className="">
                    { cards ? cardQuantArray.map(card => {
                      const isSelected = selectedCards[card.card.id];
                      const imageClasses = classNameUtil("border-4 rounded inline-block p-3 m-1 relative", {
                        "border-transparent": !isSelected, 
                        "border-blue-electric": isSelected });
                      return (
                        <div key={card.card.id} className={imageClasses}>
                          <div className="fab">{`x${card.quantity}`}</div>
                          <img src={card.card.imageUrl} onClick={() => toggleSelectCard(card.card.id)} className="cursor-pointer" style={{ maxWidth: 245 }} />
                        </div>
                      )
                    }) : null}
                  </div>
                }
              </div>
            </div>
            )
          : 'No deck found.'}
        </div>
      </div>
    </div>
  )
}

class CardWithNumber {
  quantity: number;
  card: Card;

  constructor(card: Card, quantity: number) {
    this.card = card;
    this.quantity = quantity;
  }
}