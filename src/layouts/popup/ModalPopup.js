import React, { useRef } from "react";
import ReactDom from "react-dom";
export const Modal = ({ setShowModal, children, onClose, blockClickBG=false}) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current && !blockClickBG) {
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