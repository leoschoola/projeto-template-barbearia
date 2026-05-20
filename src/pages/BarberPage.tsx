import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BarberPage.css';
import TituloTextoPadrao from '../components/TituloTextoPadrao';
import BarberCard from '../components/Barber-card';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface Barbeiro {
  id: number;
  img: string;
  nome: string;
  especialidade: string;
  nota: string;
  avaliacao: string;
  experiencia: string;
  agendar: string;
  curtidas: number;
}

interface NovoBarbeiroForm {
  nome: string;
  especialidade: string;
  experiencia: string;
  nota: string;
  avaliacao: string;
  imagemUrl: string;
}

const barbeirosIniciais: Barbeiro[] = [
  {
    id: 1,
    img: 'barbeiros',
    nome: 'Carlos Silva',
    especialidade: 'Cortes Clássicos & Modernos',
    nota: '4.9',
    avaliacao: '(230)',
    experiencia: '12 anos de experiência',
    agendar: 'Agendar com Carlos',
    curtidas: 47,
  },
];

const formVazio: NovoBarbeiroForm = {
  nome: '',
  especialidade: '',
  experiencia: '',
  nota: '5.0',
  avaliacao: '0',
  imagemUrl: '',
};

function BarberPage() {
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>(barbeirosIniciais);
  const [modalAberto, setModalAberto] = useState<boolean>(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [form, setForm] = useState<NovoBarbeiroForm>(formVazio);
  const [ordenarPorCurtidas, setOrdenarPorCurtidas] = useState<boolean>(false);
  const [curtidasLocais, setCurtidasLocais] = useState<Set<number>>(() => {
    const saved = localStorage.getItem('fahcortes_curtidas');
    return saved ? new Set(JSON.parse(saved)) : new Set<number>();
  });
  const { perfil } = useAuth();
  const { mostrarToast } = useToast();
  const navigate = useNavigate();
  const isAdmin = perfil === 'ADMIN';

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleImagemChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm(prev => ({ ...prev, imagemUrl: reader.result as string }));
    };
    reader.readAsDataURL(file);
  }

  function abrirEdicao(b: Barbeiro): void {
    setForm({
      nome: b.nome,
      especialidade: b.especialidade,
      experiencia: b.experiencia,
      nota: b.nota,
      avaliacao: b.avaliacao.replace(/[()]/g, ''),
      imagemUrl: b.img.startsWith('data:') || b.img.startsWith('http') ? b.img : '',
    });
    setEditandoId(b.id);
    setModalAberto(true);
  }

  function fecharModal(): void {
    setModalAberto(false);
    setForm(formVazio);
    setEditandoId(null);
  }

  function handleSalvar(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const primeiroNome = form.nome.split(' ')[0];

    if (editandoId !== null) {
      setBarbeiros(prev => prev.map(b => b.id === editandoId ? {
        ...b,
        nome: form.nome,
        especialidade: form.especialidade,
        experiencia: form.experiencia,
        nota: form.nota,
        avaliacao: `(${form.avaliacao})`,
        img: form.imagemUrl || b.img,
        agendar: `Agendar com ${primeiroNome}`,
      } : b));
      mostrarToast(`Barbeiro "${form.nome}" atualizado com sucesso!`);
    } else {
      const novo: Barbeiro = {
        id: Date.now(),
        img: form.imagemUrl || 'barbeiros',
        nome: form.nome,
        especialidade: form.especialidade,
        nota: form.nota,
        avaliacao: `(${form.avaliacao})`,
        experiencia: form.experiencia,
        agendar: `Agendar com ${primeiroNome}`,
        curtidas: 0,
      };
      setBarbeiros(prev => [...prev, novo]);
      mostrarToast(`Barbeiro "${form.nome}" adicionado com sucesso!`);
    }

    fecharModal();
  }

  function deletarColaborador(id: number, nome: string): void {
    setBarbeiros(prev => prev.filter(b => b.id !== id));
    mostrarToast(`Barbeiro "${nome}" removido.`, 'removido');
  }

  function curtirBarbeiro(id: number, nome: string): void {
    if (curtidasLocais.has(id)) return;
    setBarbeiros(prev => prev.map(b => b.id === id ? { ...b, curtidas: b.curtidas + 1 } : b));
    const novas = new Set(curtidasLocais);
    novas.add(id);
    setCurtidasLocais(novas);
    localStorage.setItem('fahcortes_curtidas', JSON.stringify([...novas]));
    mostrarToast(`Você curtiu ${nome}!`);
  }

  const barbeirosMostrados = ordenarPorCurtidas
    ? [...barbeiros].sort((a, b) => b.curtidas - a.curtidas)
    : barbeiros;

  return (
    <>
      <main className="principal__barbeiro">
        <TituloTextoPadrao
          titulo="Nossos Barbeiros"
          texto="Profissionais certificados e experientes prontos para cuidar do seu visual"
        />

        <div className="barbeiros__controles">
          {isAdmin && (
            <button className="admin__botao-adicionar" onClick={() => { setEditandoId(null); setModalAberto(true); }}>
              <i className="fa-solid fa-plus"></i> Adicionar Barbeiro
            </button>
          )}
          <button
            className={`barbeiros__ordenar ${ordenarPorCurtidas ? 'barbeiros__ordenar--ativo' : ''}`}
            onClick={() => setOrdenarPorCurtidas(prev => !prev)}
          >
            <i className="fa-solid fa-heart"></i>
            {ordenarPorCurtidas ? 'Ordem padrão' : 'Mais curtidos'}
          </button>
        </div>

        <div className="barbeiros__cartoes">
          {barbeirosMostrados.map(b => (
            <BarberCard
              key={b.id}
              img={b.img}
              nome={b.nome}
              especialidade={b.especialidade}
              nota={b.nota}
              avaliacao={b.avaliacao}
              experiencia={b.experiencia}
              agendar={b.agendar}
              curtidas={b.curtidas}
              jaCurtiu={curtidasLocais.has(b.id)}
              isAdmin={isAdmin}
              aoAgendar={() => navigate('/agendar')}
              aoEditar={() => abrirEdicao(b)}
              aoDeletar={() => deletarColaborador(b.id, b.nome)}
              aoCurtir={() => curtirBarbeiro(b.id, b.nome)}
            />
          ))}
        </div>
      </main>

      {modalAberto && (
        <Modal
          titulo={editandoId !== null ? 'Editar Barbeiro' : 'Adicionar Barbeiro'}
          onFechar={fecharModal}
        >
          <form className="modal__form" onSubmit={handleSalvar}>
            <div className="modal__campo">
              <label htmlFor="nome">Nome completo</label>
              <input id="nome" type="text" name="nome" value={form.nome} onChange={handleChange} placeholder="Ex: João Santos" required />
            </div>
            <div className="modal__campo">
              <label htmlFor="especialidade">Especialidade</label>
              <input id="especialidade" type="text" name="especialidade" value={form.especialidade} onChange={handleChange} placeholder="Ex: Cortes Clássicos & Degradê" required />
            </div>
            <div className="modal__campo">
              <label htmlFor="experiencia">Experiência</label>
              <input id="experiencia" type="text" name="experiencia" value={form.experiencia} onChange={handleChange} placeholder="Ex: 5 anos de experiência" required />
            </div>
            <div className="modal__campo">
              <label htmlFor="nota">Nota (1.0 – 5.0)</label>
              <input id="nota" type="number" name="nota" min="1" max="5" step="0.1" value={form.nota} onChange={handleChange} required />
            </div>
            <div className="modal__campo">
              <label htmlFor="avaliacao">Nº de avaliações</label>
              <input id="avaliacao" type="number" name="avaliacao" min="0" value={form.avaliacao} onChange={handleChange} required />
            </div>
            <div className="modal__campo">
              <label htmlFor="imagem-barbeiro">Foto do barbeiro</label>
              <input id="imagem-barbeiro" type="file" accept="image/*" onChange={handleImagemChange} />
              {form.imagemUrl && (
                <img src={form.imagemUrl} alt="Prévia" className="modal__imagem-previa" />
              )}
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

export default BarberPage;
