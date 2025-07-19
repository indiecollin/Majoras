import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children }) => {
  // Get the DOM node where we want to render the portal content
  const modalRoot = document.getElementById('modal-root');

  // Use createPortal to render the children into modalRoot
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal