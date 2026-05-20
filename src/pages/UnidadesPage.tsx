import { useState } from 'react';
import './BarberPage.css';
import TituloTextoPadrao from '../components/TituloTextoPadrao';
import Local from '../components/Local';
import Search from '../components/Search';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { mascaraTelefone, validarTelefone } from '../utils/validacoes';

interface Unidade {
  id: number;
  nomeUnidade: string;
  distacia: string;
  endereco: string;
  telefone: string;
  horario: string;
}

interface NovaUnidadeForm {
  nomeUnidade: string;
  distacia: string;
  endereco: string;
  telefone: string;
  horario: string;
}

const unidadesIniciais: Unidade[] = [
  {
    id: 1,
    nomeUnidade: 'Unidade Centro',
    distacia: '2.5 km',
    endereco: 'Rua das Flores, 123 - Centro, São Paulo, SP',
    telefone: '(11) 3456-7890',
    horario: 'Seg-Sáb: 9h-20h',
  },
  {
    id: 2,
    nomeUnidade: 'Unidade Jardins',
    distacia: '4.1 km',
    endereco: 'Av. Paulista, 1000 - Jardins, São Paulo, SP',
    telefone: '(11) 3456-7891',
    horario: 'Seg-Sáb: 9h-20h',
  },
];

const formVazio: NovaUnidadeForm = {
  nomeUnidade: '',
  distacia: '',
  endereco: '',
  telefone: '',
  horario: '',
};

function gerarUrlMapa(endereco: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(endereco)}&output=embed&hl=pt-BR&z=15`;
}

function UnidadesPage() {
  const [unidades, setUnidades] = useState<Unidade[]>(unidadesIniciais);
  const [modalAberto, setModalAberto] = useState<boolean>(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [form, setForm] = useState<NovaUnidadeForm>(formVazio);
  const [errosCampos, setErrosCampos] = useState<{ telefone?: string }>({});
  const { perfil } = useAuth();
  const { mostrarToast } = useToast();
  const isAdmin = perfil === 'ADMIN';

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    if (name === 'telefone') {
      const masked = mascaraTelefone(value);
      if (errosCampos.telefone) setErrosCampos(prev => ({ ...prev, telefone: '' }));
      setForm(prev => ({ ...prev, telefone: masked }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  }

  function abrirEdicao(u: Unidade): void {
    const distaciaNum = u.distacia.replace(/\s*km$/i, '').trim();
    setForm({
      nomeUnidade: u.nomeUnidade,
      distacia: distaciaNum,
      endereco: u.endereco,
      telefone: u.telefone,
      horario: u.horario,
    });
    setEditandoId(u.id);
    setModalAberto(true);
  }

  function fecharModal(): void {
    setModalAberto(false);
    setForm(formVazio);
    setErrosCampos({});
    setEditandoId(null);
  }

  function handleSalvar(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (!validarTelefone(form.telefone)) {
      setErrosCampos({ telefone: 'Informe o celular no formato (XX) XXXXX-XXXX.' });
      return;
    }

    const distaciaFormatada = form.distacia ? `${form.distacia} km` : '';

    if (editandoId !== null) {
      setUnidades(prev => prev.map(u => u.id === editandoId
        ? { ...u, ...form, distacia: distaciaFormatada }
        : u
      ));
      mostrarToast(`Unidade "${form.nomeUnidade}" atualizada com sucesso!`);
    } else {
      setUnidades(prev => [...prev, { id: Date.now(), ...form, distacia: distaciaFormatada }]);
      mostrarToast(`Unidade "${form.nomeUnidade}" adicionada com sucesso!`);
    }

    fecharModal();
  }

  function deletarUnidade(id: number, nome: string): void {
    setUnidades(prev => prev.filter(u => u.id !== id));
    mostrarToast(`Unidade "${nome}" removida.`, 'removido');
  }

  return (
    <>
      <main className="principal__planos">
        <TituloTextoPadrao
          titulo="Nossas Unidades"
          texto="Encontre a unidade mais próxima de você"
        />
        <Search />

        {isAdmin && (
          <div className="admin__adicionar">
            <button className="admin__botao-adicionar" onClick={() => { setEditandoId(null); setModalAberto(true); }}>
              <i className="fa-solid fa-plus"></i> Adicionar Unidade
            </button>
          </div>
        )}

        <section className="unidades__cartoes-container">
          {unidades.map(u => (
            <Local
              key={u.id}
              nomeUnidade={u.nomeUnidade}
              distacia={u.distacia}
              endereco={u.endereco}
              telefone={u.telefone}
              horario={u.horario}
              mapaUrl={gerarUrlMapa(u.endereco)}
              isAdmin={isAdmin}
              aoEditar={() => abrirEdicao(u)}
              aoDeletar={() => deletarUnidade(u.id, u.nomeUnidade)}
            />
          ))}
        </section>
      </main>

      {modalAberto && (
        <Modal
          titulo={editandoId !== null ? 'Editar Unidade' : 'Adicionar Unidade'}
          onFechar={fecharModal}
        >
          <form className="modal__form" onSubmit={handleSalvar}>
            <div className="modal__campo">
              <label htmlFor="nomeUnidade">Nome da unidade</label>
              <input id="nomeUnidade" type="text" name="nomeUnidade" value={form.nomeUnidade} onChange={handleChange} placeholder="Ex: Unidade Vila Madalena" required />
            </div>
            <div className="modal__campo">
              <label htmlFor="endereco">Endereço completo</label>
              <input id="endereco" type="text" name="endereco" value={form.endereco} onChange={handleChange} placeholder="Ex: Rua das Flores, 123 - Bairro, SP" required />
            </div>
            <div className="modal__campo">
              <label htmlFor="telefone">Telefone</label>
              <input
                id="telefone"
                type="tel"
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
                required
                className={errosCampos.telefone ? 'input--invalido' : ''}
              />
              {errosCampos.telefone && <span className="erro-campo">{errosCampos.telefone}</span>}
            </div>
            <div className="modal__campo">
              <label htmlFor="horario">Horário de funcionamento</label>
              <input id="horario" type="text" name="horario" value={form.horario} onChange={handleChange} placeholder="Ex: Seg-Sáb: 9h-20h" required />
            </div>
            <div className="modal__campo">
              <label htmlFor="distacia">Distância (km)</label>
              <input
                id="distacia"
                type="number"
                name="distacia"
                min="0"
                step="0.1"
                value={form.distacia}
                onChange={handleChange}
                placeholder="Ex: 3.2"
                required
              />
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

export default UnidadesPage;
