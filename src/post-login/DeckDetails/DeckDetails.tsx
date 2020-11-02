import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { Card } from "pokemon-tcg-sdk-typescript/dist/sdk";
import React, { useContext, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { callbackify } from "util";
import { ServiceContext } from "../../App";
import { Deck } from "../../models/Deck";
import { classNameUtil } from "../../utils";
import { useConnectObservable } from "../../utils/hooks";

export const DeckDetails: React.FC = () => {

  const { deckId } = useParams<{deckId: string}>();
  const { deckService, toastService } = useContext(ServiceContext);
  const deck = useConnectObservable<Deck | undefined>(deckService.getDeck(deckId), undefined);
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [tempQuantity, setTempQuantity] = useState<number>(0);
  const history = useHistory();

  let cardDict: {[key: string]: PokemonTCG.Card} = {}
  if (localStorage.getItem('cardDict')) {
    cardDict = JSON.parse(localStorage.getItem('cardDict')!);
  }

  const cards: Card[] | undefined = deck?.cards.map(id => cardDict[id]);
  let cardQuantMap = cards && cardDict ? cards.reduce((agg: any, card) => {
    if (card) {
      if (agg[card.id]) {
        return ({
          ...agg, 
          [card.id]: {...agg[card.id], quantity: agg[card.id].quantity + 1}})
      }
      return ({...agg, [card.id]: new CardWithNumber(card, 1)})
    }
    return agg;
  }, {}) : {};
  const cardQuantArray: CardWithNumber[] = cardQuantMap ? Object.values(cardQuantMap) : [];

  const toggleSelectCard = (id: string) => {
    if (selectedCard === id) {
      setSelectedCard('');
      setTempQuantity(0);
    } else {
      setSelectedCard(id);
      setTempQuantity(cardQuantMap[id].quantity);
    }
  };

  const addCards = () => history.push(`/dashboard/decks/${deckId}/add`);

  const updateDeck = () => {
    const index = deck?.cards.findIndex((cardId: string) => cardId === selectedCard);
    if (index !== undefined && index >= 0 && deck) {
      const newCards = deck?.cards.filter(c => c !== selectedCard);
      const fill = new Array(tempQuantity);
      fill.fill(selectedCard);
      newCards?.splice(index, 0 , ...fill);
      const newDeck: Deck = {
        ...deck,
        cards: newCards
      }
      deckService.updateDeck(deckId, newDeck)
        .catch(err => toastService.showErrorToast('Failed to update deck'))
        .finally(() => setSelectedCard(''))
    }
  };

  return (
    <div className="bg-blue-100 h-screen text-white-100 p-4 flex flex-col">
      <div className="header">
        <div className="relative mb-4">
          <span className="absolute left-0">
            <Link to={'/dashboard'}>
              <FontAwesomeIcon icon='arrow-left' className="cursor-pointer inline-block mr-4" />
            </Link>
            <h3 className="inline-block">Decks</h3>
          </span>
          <div className="text-white-100 text-center">
            <h2 className="inline-block">{deck ? `(${deck.cards.length} / 60)` : null}</h2>
            <h1 className="ml-4 mr-4 inline-block">{deck?.name}</h1>
            <FontAwesomeIcon icon="plus" className="cursor-pointer mb-1" onClick={() => addCards()} />
          </div>
        </div>
      </div>
      <div className="body overflow-y-auto flex-grow">
        <div className="text-center">
          { cards ? cardQuantArray.map(card => {
            const isSelected = card.card.id === selectedCard;
            const quantityHasChanged = card.quantity === tempQuantity;
            const isMinusDisabled = tempQuantity === 0;
            const isPlusDisabled = tempQuantity >= 60;
            const imageClasses = classNameUtil("border-4 rounded inline-block p-3 m-1 relative", {
              "border-transparent": true });
            return (
              <div key={card.card.id} className={imageClasses}>
                <div className="fab bg-orange-dull" style={{right: 0, top: 0}}>{isSelected ? `x${tempQuantity}` : `x${card.quantity}`}</div>
                <img src={card.card.imageUrl} onClick={() => toggleSelectCard(card.card.id)} className="cursor-pointer" style={{ maxWidth: 245 }} />
                <div className="fab bg-orange-dull right-0 bottom-0 transition duration-500 cursor-pointer" style={
                  {
                    top: isSelected ? 'calc(100% - 40px)' : '50%',
                    left: isSelected ? 0 : 'calc(50% - 20px)',
                    opacity: isSelected && !isMinusDisabled ? 1 : 0
                  }
                } onClick={() => !isMinusDisabled ? setTempQuantity(tempQuantity - 1) : null}>
                  <FontAwesomeIcon icon="minus" className="cursor-pointer" />
                </div>
                <div className="fab bg-error right-0 bottom-0 transition duration-500 cursor-pointer" style={
                  {
                    top: isSelected ? 'calc(100% - 40px)' : '50%',
                    right: isSelected ? 'calc(50% + 20px)' : 'calc(50% - 20px)',
                    opacity: isSelected && !quantityHasChanged ? 1 : 0
                  }
                } onClick={() => toggleSelectCard(card.card.id)}>
                  <FontAwesomeIcon icon="times" className="cursor-pointer" />
                </div>
                <div className="fab bg-orange-dull right-0 bottom-0 transition duration-500 cursor-pointer" style={
                  {
                    top: isSelected ? 'calc(100% - 40px)' : '50%',
                    right: isSelected ? 0 : 'calc(50% - 20px)',
                    opacity: isSelected && !isPlusDisabled ? 1 : 0
                  }
                } onClick={() => isPlusDisabled ? null : setTempQuantity(tempQuantity + 1)}>
                  <FontAwesomeIcon icon="plus" className="cursor-pointer" />
                </div>
                <div className="fab  bg-green right-0 bottom-0 transition duration-500 cursor-pointer" style={
                  {
                    top: isSelected ? 'calc(100% - 40px)' : '50%',
                    right: isSelected ? 'calc(50% - 60px)' : 'calc(50% - 20px)',
                    opacity: isSelected && !quantityHasChanged ? 1 : 0
                  }
                } onClick={() => updateDeck()}>
                  <FontAwesomeIcon icon="check" className="cursor-pointer" />
                </div>
              </div>
            )
          }) : null}
          {cards && cards.length === 0 ? <div className="mt-4">Looks like your deck doesn't have any cards yet! Click on the plus icon to search for cards to add.</div> : null}
        </div>
      </div>
    </div>
  )
}

export class CardWithNumber {
  quantity: number;
  card: Card;

  constructor(card: Card, quantity: number) {
    this.card = card;
    this.quantity = quantity;
  }
}