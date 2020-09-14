import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { NewDeckModal } from './components/NewDeckModal';
import { ServiceContext } from '../App';
import { Decklist } from './decklist';
import { Deck } from '../models/Deck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useModal } from '../components/modal';
import { TooltipContainer, Tooltip } from '../components/Tooltip';

export function Dashboard() {
  const history = useHistory();
  const [showModal, openModal, closeModal] = useModal(false);
  const { myUserService } = useContext(ServiceContext);
  const logout = () => {
    myUserService.logout();
    history.push('/');
  }

  const decks: Deck[] = [
    { name: 'Deck 1', expandedLegal: false, standardLegal: false, cards: [], id: '1' },
    { name: 'Deck 2', expandedLegal: true, standardLegal: true, cards: [], id: '2' },
    { name: 'Deck 3', expandedLegal: false, standardLegal: true, cards: [], id: '3' },
    { name: 'Deck 4', expandedLegal: true, standardLegal: true, cards: [], id: '4' },
    { name: 'Deck 5', expandedLegal: true, standardLegal: false, cards: [], id: '5' },
    { name: 'Deck 6', expandedLegal: true, standardLegal: true, cards: [], id: '6' },
  ]

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