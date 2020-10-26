import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Deck } from "../models/Deck";
import { AxiosInstance, AxiosResponse } from 'axios';

export class DeckService {
  private _userDecks = new BehaviorSubject<Deck[]>([]);

  constructor(private http: AxiosInstance) {}

  fetchDecks(userId: string | null): Promise<Deck[]> {
    return this.http.get<Deck[]>(`/users/${userId}/decks`)
      .then((res) => {
        this._userDecks.next(res.data);
        return res.data;
      });
  }

  getDecks(): Observable<Deck[]> {
    return this._userDecks.asObservable();
  }

  getDeck(id: string) {
    return this.getDecks().pipe(
      map((deckArr: Deck[]) => deckArr ? deckArr.find(d => d.deckId === id) : undefined)
    )
  }

  updateDeck(deckId: string, deck: Deck): Promise<void | Deck> {
    return this.http.put(`/decks/${deckId}`, deck)
      .then(res => {
        if (res && res.data) {
          const curUserDecks = this._userDecks.value;
          if (curUserDecks) {
            this._userDecks.next(curUserDecks.map(d => {
              if (d.deckId === deckId) {
                return res.data
              }
              return d;
            }))
          }
        }
      })
  }

  deleteDeck(userId: string, deckId: string): Promise<void | Deck[]> {
    return this.http.delete(`/users/${userId}/decks/${deckId}`)
      .then(res => {
        if (res.data) {
          this._userDecks.next(res.data)
        }
      });
  }

  createDeck(userId: string, deck: Deck) {
    return this.http.post(`/users/${userId}/decks`, deck);
  }
}