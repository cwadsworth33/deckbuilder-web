import { Card } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Deck } from "../models/Deck";

export class DeckService {
  private _deckDictionary = new BehaviorSubject<{[key: string]: Deck}>({
    '1': { name: 'Deck 1', expandedLegal: false, standardLegal: false, cards: [], id: '1' },
    '2': { name: 'Deck 2', expandedLegal: true, standardLegal: true, cards: [], id: '2' },
    '3': { name: 'Deck 3', expandedLegal: false, standardLegal: true, cards: [], id: '3' },
    '4': { name: 'Deck 4', expandedLegal: true, standardLegal: true, cards: [], id: '4' },
    '5': { name: 'Deck 5', expandedLegal: true, standardLegal: false, cards: [], id: '5' },
    '6': { name: 'Deck 6', expandedLegal: true, standardLegal: true, cards: [], id: '6' }
  });

  getDecks(): Observable<object> {
    return this._deckDictionary.asObservable();
  }

  getDeck(id: string) {
    return this.getDecks().pipe(
      map((deckDict: any) => deckDict ? deckDict[id] : undefined)
    )
  }

  addCards(deckId: string, cards: Card[]) {
    const curVal = this._deckDictionary.value;
    const nextVal = { ...curVal, [deckId]: { ...curVal[deckId], cards: [...curVal[deckId].cards, ...cards]} };
    this._deckDictionary.next(nextVal);
  }
}