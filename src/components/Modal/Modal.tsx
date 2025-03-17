import React, { useEffect } from 'react';
import * as classes from './styles.module.scss';
import Portal from '../Portal/Portal';
import { ModalProps } from './types';

const Modal = ({ open, onClose, children }: ModalProps) => {
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!open) return null;

  return (
    <Portal>
      <div className={classes.modal} onClick={handleClose}>
        <div
          className={classes.modal__content}
          onClick={(e) => e.stopPropagation()}
          tabIndex={1}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
