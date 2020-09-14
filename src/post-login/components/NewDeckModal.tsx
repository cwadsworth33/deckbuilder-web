import React from "react"
import { Modal, ModalProps, ModalHeader, ModalBody, ModalFooter } from "../../components/modal"
import { useForm } from "react-hook-form";
import { Deck } from "../../models/Deck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const NewDeckModal: React.FC<ModalProps> = ({showModal, closeModal}: ModalProps) => {
  const { register, handleSubmit } = useForm<Deck>();
  const onSubmit = (deck: Deck) => {
    console.log(deck);
  }
  return (
    <Modal showModal={showModal} closeModal={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)}> 
        <ModalHeader>
          <h2 className="mr-3">New Deck</h2>
          <FontAwesomeIcon icon='times' className="cursor-pointer" onClick={() => closeModal()} />
        </ModalHeader>
        <ModalBody>
          <label>Deck Name:</label>
          <input type="text" name={'name'} ref={register({ required: true })} className="text-black" />
          <div className="mt-3">
            <h4>Formats:</h4>
            <div>
              <input type="checkbox" name={'standardLegal'} ref={register()} />
              <label className="ml-3">Standard</label>
            </div>
            <div>
              <input type="checkbox" name={'expandedLegal'} ref={register()} />
              <label className="ml-3">Expanded</label>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" type="submit">Create Deck</button>
        </ModalFooter>
      </form>
    </Modal>
  )
}