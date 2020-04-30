import React, { memo } from 'react';
import Backdrop from '../Backdrop/Backdrop';

import './Modal.css';

const Modal = memo(
  ({ children, isActive, modalClosed }) => {
    return (
      <>
        <Backdrop isActive={isActive} clicked={modalClosed} />
        <section
          className="Modal"
          style={{
            transform: isActive ? 'translateY(0)' : 'translateY(-500vh)',
            opacity: isActive ? '1' : '0',
          }}
        >
          {children}
        </section>
      </>
    );
  },
  (prevProps, nextProps) =>
    prevProps.isActive === nextProps.isActive &&
    prevProps.children === nextProps.children
);

export default Modal;
