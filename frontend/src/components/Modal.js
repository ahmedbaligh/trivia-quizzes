import React from 'react';
import '../stylesheets/Modal.scss';

const Modal = ({ handleClick }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="tip">
          TIP: click on the question to show the answer and vica versa.
        </span>
        <button onClick={handleClick} className="modal-btn">
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
