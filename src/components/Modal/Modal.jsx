// import { Component } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

const modalRoot = document.getElementById('modal-root');

export function Modal({ onClose, children }) {
  useEffect(() => {
    const handlerKeydown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handlerKeydown);

    return () => {
      window.removeEventListener('keydown', handlerKeydown);
    };
  }, [onClose]);

  return createPortal(
    <div className="Overlay" onClick={onClose}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot
  );
}
