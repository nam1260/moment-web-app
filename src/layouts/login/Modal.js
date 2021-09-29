import React, { useRef } from "react";
import ReactDom from "react-dom";
export const Modal = ({ setShowModal, children, onClose}) => {
  // close the modal when clicking outside the modal.
  console.log('setShowModal = ' , setShowModal);
  console.log('children = ' , children);
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
    if (onClose) {
      onClose(e);
    }
  };
  //render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div className="modalContainer" ref={modalRef} onClick={closeModal}>
        {children}
    </div>,
    document.getElementById("portal")
  );
};