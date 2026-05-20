import { ReactNode } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import './Modal.css';

interface ModalProps {
  titulo: string;
  onFechar: () => void;
  children: ReactNode;
}

const Modal = ({ titulo, onFechar, children }: ModalProps) => {
  return (
    <div className="modal__overlay" onClick={onFechar}>
      <div className="modal__caixa" onClick={e => e.stopPropagation()}>
        <div className="modal__cabecalho">
          <h2 className="modal__titulo">{titulo}</h2>
          <button className="modal__fechar" onClick={onFechar}>
            <AiFillCloseCircle size={24} />
          </button>
        </div>
        <div className="modal__conteudo">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
