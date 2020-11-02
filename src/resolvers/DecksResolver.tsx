import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { ServiceContext } from "../App";

export const DecksResolver: React.FC = (props) => {
  const { deckService } = useContext(ServiceContext);
  const userId = localStorage.getItem('userId');
  const [isLoading, setIsLoading] = useState(true);

  console.log(userId);

  useEffect(() => {
    if (userId) {
      deckService.fetchDecks(userId)
        .then(decks => {
          let cardDict: {[key: string]: PokemonTCG.Card} = {};
          if (localStorage.getItem('cardDict')) {
            cardDict = JSON.parse(localStorage.getItem('cardDict')!);
          }
          const cardSet = new Set<string>();
          decks.forEach(deck => {
            deck.cards.forEach(cardId => {
              cardSet.add(cardId);
            });
          });
          const promiseArr: Function[] = [];
          
          cardSet.forEach((card: string) => {
            if (!cardDict[card]) {
              promiseArr.push(() => PokemonTCG.Card.find(card));
            }
          });
          return Promise.all<PokemonTCG.Card>(promiseArr.map(p => p()))
        })
        .then(cards => {
          const cardMap = cards.reduce((agg, card) => ({...agg, [card.id]: card}), {});
          let existingCardDict = {};
          if (localStorage.getItem('cardDict')) {
            existingCardDict = JSON.parse(localStorage.getItem('cardDict')!);
          }
          localStorage.setItem('cardDict', JSON.stringify({...existingCardDict, ...cardMap}))
        })
        .finally(() => setIsLoading(false))
    }
  }, [userId])
  
  return isLoading ? <span>Loading...</span> : props.children as ReactElement<any>;
}

