import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import './Toast.css';

export type ToastTipo = 'sucesso' | 'removido' | 'erro';

interface ToastItem {
  id: number;
  mensagem: string;
  tipo: ToastTipo;
}

interface ToastContextData {
  mostrarToast: (mensagem: string, tipo?: ToastTipo) => void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

function ToastContainer({ toasts, onRemover }: { toasts: ToastItem[]; onRemover: (id: number) => void }) {
  if (toasts.length === 0) return null;
  return (
    <div className="toast__container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast--${t.tipo}`}>
          <span className="toast__icone">
            {t.tipo === 'sucesso'  && <i className="fa-solid fa-circle-check" />}
            {t.tipo === 'removido' && <i className="fa-solid fa-trash" />}
            {t.tipo === 'erro'     && <i className="fa-solid fa-circle-xmark" />}
          </span>
          <span className="toast__mensagem">{t.mensagem}</span>
          <button className="toast__fechar" onClick={() => onRemover(t.id)}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
      ))}
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const mostrarToast = useCallback((mensagem: string, tipo: ToastTipo = 'sucesso') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, mensagem, tipo }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  function removerToast(id: number): void {
    setToasts(prev => prev.filter(t => t.id !== id));
  }

  return (
    <ToastContext.Provider value={{ mostrarToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemover={removerToast} />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextData {
  return useContext(ToastContext);
}
