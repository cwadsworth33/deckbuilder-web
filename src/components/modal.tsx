import React, { useState } from "react";
import { useEscapeListener } from "../utils/hooks";

export type ModalProps = {
  showModal: boolean,
  closeModal: Function
}

export const useModal = (initialIsOpen = false): [boolean, Function, Function] => {
  const [modalOpen, setModalOpen] = useState(initialIsOpen);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return [modalOpen, openModal, closeModal];
}

export const Modal: React.FC<ModalProps> = ({children, showModal, closeModal}) => {
  useEscapeListener(closeModal);
  return (
    <>
    {showModal ?
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          onClick={() => closeModal()}
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-blue-100 text-white-100">
              {children}
            </div>
          </div>
        </div>
        <div className="opacity-90 fixed inset-0 z-40 bg-black"></div>
      </> : null}
    </>
  );
}

export const ModalBody: React.FC = ({children}) => {
  return (
    <div className="relative px-6 py-3 flex-auto">
      {children}
    </div>
  )
}

export const ModalHeader: React.FC = ({children}) => {
  return (
    <div className="flex items-center justify-between p-5 rounded-t">
      {children}
    </div>
  )
}

export const ModalFooter: React.FC = ({children}) => {
  return (
    <div className="flex items-center justify-end p-6 rounded-b">
      {children}
    </div>
  )
}