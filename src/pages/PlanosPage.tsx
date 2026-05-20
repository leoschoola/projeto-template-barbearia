import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BarberPage.css';
import TituloTextoPadrao from '../components/TituloTextoPadrao';
import PlansCard from '../components/Plans-card';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface Plano {
  id: number;
  icon: string;
  plano: string;
  subtitulo: string;
  valor: string;
  beneficios: string[];
}

interface NovoPlanoForm {
  icon: string;
  plano: string;
  subtitulo: string;
  valor: string;
  beneficiosTexto: string;
}

const planosIniciais: Plano[] = [
  {
    id: 1,
    icon: 'fa-bolt',
    plano: 'Bronze',
    subtitulo: 'Ideal para começar',
    valor: 'R$ 99/mês',
    beneficios: [
      '2 cortes por mês',
      '10% desconto em produtos',
      'Agendamento prioritário',
      'Atendimento preferencial',
    ],
  },
  {
    id: 2,
    icon: 'fa-star',
    plano: 'Prata',
    subtitulo: 'Mais procurado',
    valor: 'R$ 179/mês',
    beneficios: [
      '4 cortes por mês',
      '1 barba grátis',
      '15% desconto em produtos',
      'Agendamento prioritário',
      'Atendimento VIP',
      'Bebida premium inclusa',
    ],
  },
  {
    id: 3,
    icon: 'fa-crown',
    plano: 'Ouro',
    subtitulo: 'Experiência premium',
    valor: 'R$ 299/mês',
    beneficios: [
      'Cortes ilimitados',
      'Barba ilimitada',
      '25% desconto em produtos',
      'Agendamento VIP',
      'Atendimento exclusivo',
      'Bebidas premium',
      'Massagem relaxante',
      'Kit de produtos mensais',
    ],
  },
];

const iconesDisponiveis = [
  { valor: 'fa-bolt',    label: 'Raio'      },
  { valor: 'fa-star',   label: 'Estrela'   },
  { valor: 'fa-crown',  label: 'Coroa'     },
  { valor: 'fa-gem',    label: 'Diamante'  },
  { valor: 'fa-trophy', label: 'Troféu'    },
];

const formVazio: NovoPlanoForm = {
  icon: 'fa-bolt',
  plano: '',
  subtitulo: '',
  valor: '',
  beneficiosTexto: '',
};

function PlanosPage() {
  const [planos, setPlanos] = useState<Plano[]>(planosIniciais);
  const [modalAberto, setModalAberto] = useState<boolean>(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [form, setForm] = useState<NovoPlanoForm>(formVazio);
  const { perfil } = useAuth();
  const { mostrarToast } = useToast();
  const navigate = useNavigate();
  const isAdmin = perfil === 'ADMIN';

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function abrirEdicao(p: Plano): void {
    setForm({
      icon: p.icon,
      plano: p.plano,
      subtitulo: p.subtitulo,
      valor: p.valor,
      beneficiosTexto: p.beneficios.join('\n'),
    });
    setEditandoId(p.id);
    setModalAberto(true);
  }

  function fecharModal(): void {
    setModalAberto(false);
    setForm(formVazio);
    setEditandoId(null);
  }

  function handleSalvar(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const beneficios = form.beneficiosTexto
      .split('\n')
      .map(b => b.trim())
      .filter(b => b.length > 0);

    if (editandoId !== null) {
      setPlanos(prev => prev.map(p => p.id === editandoId ? {
        ...p, icon: form.icon, plano: form.plano, subtitulo: form.subtitulo, valor: form.valor, beneficios,
      } : p));
      mostrarToast(`Plano "${form.plano}" atualizado com sucesso!`);
    } else {
      const novo: Plano = {
        id: Date.now(),
        icon: form.icon,
        plano: form.plano,
        subtitulo: form.subtitulo,
        valor: form.valor,
        beneficios,
      };
      setPlanos(prev => [...prev, novo]);
      mostrarToast(`Plano "${form.plano}" adicionado com sucesso!`);
    }

    fecharModal();
  }

  function deletarPlano(id: number, nome: string): void {
    setPlanos(prev => prev.filter(p => p.id !== id));
    mostrarToast(`Plano "${nome}" removido.`, 'removido');
  }

  return (
    <>
      <main className="principal__planos">
        <TituloTextoPadrao
          titulo="Planos Fidelidade"
          texto="Economize e aproveite benefícios exclusivos com nossos planos mensais"
        />

        {isAdmin && (
          <div className="admin__adicionar">
            <button className="admin__botao-adicionar" onClick={() => { setEditandoId(null); setModalAberto(true); }}>
              <i className="fa-solid fa-plus"></i> Adicionar Plano
            </button>
          </div>
        )}

        <section className="planos__cards-container">
          {planos.map(p => (
            <PlansCard
              key={p.id}
              icon={p.icon}
              plano={p.plano}
              subtitulo={p.subtitulo}
              valor={p.valor}
              beneficios={p.beneficios}
              isAdmin={isAdmin}
              aoAssinar={() => navigate('/agendar')}
              aoEditar={() => abrirEdicao(p)}
              aoDeletar={() => deletarPlano(p.id, p.plano)}
            />
          ))}
        </section>
      </main>

      {modalAberto && (
        <Modal
          titulo={editandoId !== null ? 'Editar Plano' : 'Adicionar Plano'}
          onFechar={fecharModal}
        >
          <form className="modal__form" onSubmit={handleSalvar}>
            <div className="modal__campo">
              <label htmlFor="plano">Nome do plano</label>
              <input id="plano" type="text" name="plano" value={form.plano} onChange={handleChange} placeholder="Ex: Platina" required />
            </div>
            <div className="modal__campo">
              <label htmlFor="icon">Ícone</label>
              <select id="icon" name="icon" value={form.icon} onChange={handleChange}>
                {iconesDisponiveis.map(ic => (
                  <option key={ic.valor} value={ic.valor}>{ic.label}</option>
                ))}
              </select>
            </div>
            <div className="modal__campo">
              <label htmlFor="subtitulo">Subtítulo</label>
              <input id="subtitulo" type="text" name="subtitulo" value={form.subtitulo} onChange={handleChange} placeholder="Ex: Para clientes frequentes" required />
            </div>
            <div className="modal__campo">
              <label htmlFor="valor">Valor</label>
              <input id="valor" type="text" name="valor" value={form.valor} onChange={handleChange} placeholder="Ex: R$ 149/mês" required />
            </div>
            <div className="modal__campo">
              <label htmlFor="beneficiosTexto">Benefícios (um por linha)</label>
              <textarea
                id="beneficiosTexto"
                name="beneficiosTexto"
                value={form.beneficiosTexto}
                onChange={handleChange}
                placeholder={'3 cortes por mês\n12% desconto em produtos\nAgendamento prioritário'}
                required
              />
              <span className="modal__dica">Digite cada benefício em uma linha separada</span>
            </div>
            <button type="submit" className="modal__botao-salvar">
              {editandoId !== null ? 'Salvar alterações' : 'Adicionar'}
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}

export default PlanosPage;
