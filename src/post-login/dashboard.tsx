import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { NewDeckModal } from './components/NewDeckModal';
import { ServiceContext } from '../App';
import { Decklist } from './decklist';
import { Deck } from '../models/Deck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useModal } from '../components/modal';
import { useConnectObservable } from '../utils/hooks';
import { DecksResolver } from '../resolvers/DecksResolver';

export function Dashboard() {
  const history = useHistory();
  const [showModal, openModal, closeModal] = useModal(false);
  const { myUserService, deckService } = useContext(ServiceContext);
  const decks = useConnectObservable<Deck[]>(deckService.getDecks(), []);
  const logout = () => {
    myUserService.logout();
    history.push('/');
  }

  return (
    <>
      <NewDeckModal showModal={showModal} closeModal={() => closeModal()} />
      <div className="p-3 bg-blue-100 h-screen">
        <button className="btn btn-primary" onClick={logout}>Logout</button>
        <h1 className="text-center text-white-100 mb-5">
          <span className="mr-2">My Decks</span>
          <FontAwesomeIcon icon="plus" className="cursor-pointer" onClick={() => openModal()} />
        </h1>
        <Decklist decks={decks} />
      </div>
    </>
  )
}