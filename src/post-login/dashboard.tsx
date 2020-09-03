import React, { useState } from 'react';
import { myUserService } from '../services/DataServices';
import { useHistory } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader, ModalFooter } from '../components/modal';

export function Dashboard() {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const logout = () => {
    myUserService.logout();
    history.push('/');
  }
  return (
    <>
      <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
        <div className="bg-white-100">
          <ModalHeader>Header!</ModalHeader>
          <ModalBody>Ham</ModalBody>
          <ModalFooter>Footer!</ModalFooter>
        </div>
      </Modal>
      <div className="p-3 bg-blue-100 h-screen">
        <h1 className="text-center text-white-100">My Decks</h1>
        <button className="btn btn-primary" onClick={logout}>Logout</button>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Show Modal</button>
      </div>
    </>
  )
}