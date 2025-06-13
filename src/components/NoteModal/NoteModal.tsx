import { useEffect } from 'react';
import { FormikHelpers } from 'formik';
import { createPortal } from 'react-dom';
import NoteForm, { FormValues } from '../NoteForm/NoteForm';
import css from './NoteModal.module.css';

export interface NoteModalProps {
  onClose: () => void;
  onCreate: (values: FormValues, actions: FormikHelpers<FormValues>) => void;
}

export default function NoteModal({ onClose, onCreate }: NoteModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className={css.modal}>
        <NoteForm onClose={onClose} onCreate={onCreate} />
      </div>
    </div>,
    document.body
  );
}
