import React from "react";

export type ModalProps = {
  showModal: boolean,
  closeModal: Function
}

export const Modal: React.FC<ModalProps> = ({children, showModal, closeModal}) => {
  return (
    <>
    {showModal ?
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          onClick={() => closeModal()}
        >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {children}
          </div>
        </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </> : null}
    </>
  );
}

export const ModalBody: React.FC = ({children}) => {
  return (
    <div className="relative p-6 flex-auto">
      {children}
    </div>
  )
}

export const ModalHeader: React.FC = ({children}) => {
  return (
    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
      {children}
    </div>
  )
}

export const ModalFooter: React.FC = ({children}) => {
  return (
    <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
      {children}
    </div>
  )
}