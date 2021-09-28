import React from 'react';
import './styles.scss';
import Shadow from './../Shadow';
function Modal({children,hideModal,toggleModal}) {
  return (
    !hideModal?
    <div>
      <Shadow/>
      <div className="modal">
        {children}
      </div>
    </div>
    :null
  )
}

export default Modal
