import { useState, useEffect } from 'react';
import './BarberPage.css';
import './AgendarPage.css';
import TituloTextoPadrao from '../components/TituloTextoPadrao';
import Form, { AgendamentoData, Servico } from '../components/Form';
import Cards from '../components/Cards';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { listarServicos } from '../api/servico';

interface Agendamento extends AgendamentoData {
  id: number;
  status: 'confirmado' | 'cancelado';
}

const servicoNome: Record<string, string> = {
  corte: 'Corte Masculino',
  barba: 'Barba Clássica',
  combo: 'Combo Completo',
};

const barbeiroNome: Record<string, string> = {
  joao: 'João',
  pedro: 'Pedro',
};

const unidadeNome: Record<string, string> = {
  centro: 'Unidade Centro',
  paulista: 'Unidade Paulista',
};

const formInicial: AgendamentoData = {
  nome: '',
  telefone: '',
  email: '',
  unidade: '',
  servico: '',
  barbeiro: '',
  data: '',
  horario: '',
  observacoes: '',
};

function formatarData(data: string): string {
  if (!data) return '—';
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}

function formatarHorario(horario: string): string {
  if (!horario) return '—';
  if (horario.includes(':')) return horario;
  if (horario.length === 4) return `${horario.slice(0, 2)}:${horario.slice(2)}`;
  return horario;
}

function AgendarPage() {
  const { isLogado, nome, email } = useAuth();
  const [aba, setAba] = useState<'agendar' | 'agendamentos'>('agendar');
  const [formData, setFormData] = useState<AgendamentoData>(formInicial);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(() => {
    const saved = localStorage.getItem('fahcortes_agendamentos');
    return saved ? JSON.parse(saved) : [];
  });
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [carregandoServicos, setCarregandoServicos] = useState(false);
  const { mostrarToast } = useToast();

  // Pré-preenche nome e e-mail quando o usuário está logado
  useEffect(() => {
    if (isLogado) {
      setFormData(prev => ({
        ...prev,
        nome:  prev.nome  || nome  || '',
        email: prev.email || email || '',
      }));
    }
  }, [isLogado, nome, email]);

  // Carregar serviços da API
  useEffect(() => {
    async function buscarServicos() {
      setCarregandoServicos(true);
      try {
        const dados = await listarServicos();
        setServicos(dados);
      } catch (erro) {
        console.error('Erro ao carregar serviços:', erro);
        // Fallback: manter serviços hardcoded
        mostrarToast('Não foi possível carregar serviços da API', 'erro');
      } finally {
        setCarregandoServicos(false);
      }
    }
    buscarServicos();
  }, [mostrarToast]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const novo: Agendamento = {
      ...formData,
      id: Date.now(),
      status: 'confirmado',
    };
    const atualizados = [...agendamentos, novo];
    setAgendamentos(atualizados);
    localStorage.setItem('fahcortes_agendamentos', JSON.stringify(atualizados));
    setFormData({
      ...formInicial,
      nome:  isLogado ? (nome  || '') : '',
      email: isLogado ? (email || '') : '',
    });
    mostrarToast('Agendamento confirmado com sucesso!');
    setAba('agendamentos');
  }

  function cancelarAgendamento(id: number): void {
    const atualizados = agendamentos.map(a =>
      a.id === id ? { ...a, status: 'cancelado' as const } : a
    );
    setAgendamentos(atualizados);
    localStorage.setItem('fahcortes_agendamentos', JSON.stringify(atualizados));
    mostrarToast('Agendamento cancelado.', 'removido');
  }

  const confirmados = agendamentos.filter(a => a.status === 'confirmado').length;

  return (
    <main className="principal__barbeiro">
      <TituloTextoPadrao
        titulo="Agendar Horário"
        texto="Escolha o melhor horário e garanta seu atendimento"
      />

      <div className="agendar__tabs">
        <button
          className={`agendar__tab ${aba === 'agendar' ? 'agendar__tab--ativo' : ''}`}
          onClick={() => setAba('agendar')}
        >
          <i className="fa-solid fa-plus"></i> Novo Agendamento
        </button>
        <button
          className={`agendar__tab ${aba === 'agendamentos' ? 'agendar__tab--ativo' : ''}`}
          onClick={() => setAba('agendamentos')}
        >
          <i className="fa-solid fa-calendar-check"></i> Meus Agendamentos
          {confirmados > 0 && (
            <span className="agendar__tab-badge">{confirmados}</span>
          )}
        </button>
      </div>

      {aba === 'agendar' && (
        <>
          <Form formData={formData} onChange={handleChange} onSubmit={handleSubmit} servicos={servicos} carregando={carregandoServicos} />
          <div className="agendar__cards-info">
            <Cards icon="fa-solid fa-calendar-check card-icone" tituloCard="Confirmação Imediata" descricaoCard="Receba confirmação por e-mail e SMS instantaneamente" />
            <Cards icon="fa-solid fa-clock-rotate-left card-icone" tituloCard="Flexibilidade" descricaoCard="Remarque ou cancele com até 2h de antecedência" />
            <Cards icon="fa-solid fa-user-tie card-icone" tituloCard="Atendimento Premium" descricaoCard="Barbeiros experientes e certificados à sua disposição" />
          </div>
        </>
      )}

      {aba === 'agendamentos' && (
        <div className="agendamentos__lista">
          {agendamentos.length === 0 ? (
            <div className="agendamentos__vazio">
              <i className="fa-solid fa-calendar-xmark"></i>
              <p>Nenhum agendamento encontrado.</p>
              <p>Agende seu horário na aba ao lado!</p>
            </div>
          ) : (
            [...agendamentos].reverse().map(a => (
              <div
                key={a.id}
                className={`agendamento__card ${a.status === 'cancelado' ? 'agendamento__card--cancelado' : ''}`}
              >
                <div className="agendamento__header">
                  <span className="agendamento__servico">
                    {servicoNome[a.servico] || a.servico || 'Serviço'}
                  </span>
                  <span className={`agendamento__status agendamento__status--${a.status}`}>
                    {a.status === 'confirmado' ? 'Confirmado' : 'Cancelado'}
                  </span>
                </div>

                <div className="agendamento__info">
                  {a.barbeiro && (
                    <span><i className="fa-solid fa-scissors"></i> {barbeiroNome[a.barbeiro] || a.barbeiro}</span>
                  )}
                  <span><i className="fa-solid fa-calendar-days"></i> {formatarData(a.data)}</span>
                  <span><i className="fa-solid fa-clock"></i> {formatarHorario(a.horario)}</span>
                  {a.unidade && (
                    <span><i className="fa-solid fa-location-dot"></i> {unidadeNome[a.unidade] || a.unidade}</span>
                  )}
                  {a.nome && (
                    <span><i className="fa-solid fa-user"></i> {a.nome}</span>
                  )}
                </div>

                {a.status === 'confirmado' && (
                  <button
                    className="agendamento__botao-cancelar"
                    onClick={() => cancelarAgendamento(a.id)}
                  >
                    Cancelar agendamento
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}

export default AgendarPage;
