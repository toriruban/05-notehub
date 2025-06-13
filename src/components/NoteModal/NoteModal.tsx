import { useEffect } from "react";
import { createPortal } from "react-dom";
import NoteForm from "../NoteForm/NoteForm";
import css from '../NoteModal/NoteModal.module.css';
interface NoteModalProps {
    onClose: () => void;
}
export default function NoteModal({ onClose }: NoteModalProps) {
    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            if (event.code === 'Escape'){
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown)
        };
    }, [ onClose ]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      };
    
    return createPortal(
        <div
            className={ css.backdrop }
            role="dialog"
            aria-modal="true"
            onClick={ handleBackdropClick }
        >
            <div className={ css.modal }>
            {/* Компонент NoteForm */}
            </div>
        </div>
, document.body )
}