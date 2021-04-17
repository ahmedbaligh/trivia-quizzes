import React from 'react';

import '../stylesheets/Modal.scss';

const Modal = ({ questionAction }) => (
  <div
    className="modal fade"
    id="exampleModal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Confirm Deletion
          </h5>
          <button
            type="button"
            className="close hidden-xs"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          Are you sure you want to delete this question?
        </div>
        <div className="modal-footer">
          <button type="button" className="btn" data-dismiss="modal">
            Cancel
          </button>
          <button
            id="delete-question"
            data-show="false"
            type="button"
            className="btn"
            data-dismiss="modal"
            onClick={() => questionAction('DELETE')}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
