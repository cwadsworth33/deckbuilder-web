import React, { useContext, useState } from "react"
import { PokemonTCG } from "pokemon-tcg-sdk-typescript"
import { IQuery } from "pokemon-tcg-sdk-typescript/dist/sdk"
import { useForm } from "react-hook-form";
import { classNameUtil } from "../utils";
import { ServiceContext } from "../App";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useConnectObservable } from "../utils/hooks";

export const CardSearch: React.FC = () => {

  const { register, handleSubmit, errors } = useForm<CardSearchForm>();
  const [cards, setCards] = useState<any[]>([]);
  const [selectedCards, setSelectedCards] = useState<{[key: string]: boolean}>({});
  const { deckId } = useParams<{deckId: string}>();

  const onSubmit = (val: CardSearchForm) => {
    const query: IQuery[] = [{name: 'name', value: val.name}];
    PokemonTCG.Card.where(query).then(res => {
      setCards(res);
      console.log(res);
    });
  };

  const { deckService } = useContext(ServiceContext);
  const deck = useConnectObservable(deckService.getDeck(deckId), undefined);

  const toggleSelectCard = (id: string) => setSelectedCards({...selectedCards, [id]: !selectedCards[id]});

  const addCards = () => {
    console.log(deck);
    if (deck) {
      const updatedDeck = {
        ...deck, cards: [...deck.cards, ...Object.keys(selectedCards).filter(key => selectedCards[key])]
      }
      deckService.updateDeck(deckId, updatedDeck)
    }
  }

  return (
    <div className="bg-blue-100 h-screen text-white-100 p-4 flex flex-col">
      <div className="relative mb-4">
        <span className="absolute left-0">
          <Link to={`/dashboard/decks/${deckId}`}>
            <FontAwesomeIcon icon='arrow-left' className="cursor-pointer inline-block mr-4" />
          </Link>
          <h3 className="inline-block">{deck?.name}</h3>
        </span>
        <h1 className="text-center">Card Search</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block">Card Name:</label>
        <input type="text" className="max-w-sm mb-4 mt-2 mr-4" name="name" ref={register({ required: true })} />
        <button className={classNameUtil("btn btn-primary mb-2", {disabled: errors})} type="submit">Search</button>
      </form>
      <div className="flex-grow overflow-y-auto">
        {cards.map(card => {
          const isSelected = selectedCards[card.id];
          const imageClasses = classNameUtil("border-4 rounded inline-block p-3 m-1", { 
            "border-transparent": !isSelected, 
            "border-blue-electric": isSelected });
          return (
            <div key={card.id} className={imageClasses}>
              <img src={card.imageUrl} onClick={() => toggleSelectCard(card.id)} className="cursor-pointer" style={{ maxWidth: 245 }} />
            </div>
          )
        })}
      </div>
      <div className="flex pt-4">
        <div className="flex-grow"></div>
        <button className={classNameUtil("btn btn-primary", {
          disabled: !Object.values(selectedCards).some(isSelected => isSelected)
        })} onClick={() => addCards()}>Add Selected Cards</button>
      </div>
    </div>
  )
}

type CardSearchForm = {
  name: string
}