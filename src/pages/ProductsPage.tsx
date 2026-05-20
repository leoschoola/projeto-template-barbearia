import { useState } from 'react';
import Products from '../components/Products';
import TituloTextoPadrao from '../components/TituloTextoPadrao';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { mascaraPreco } from '../utils/validacoes';
import './BarberPage.css';

interface Produto {
  id: number;
  img: string;
  nomeProduto: string;
  valor: string;
}

interface NovoProdutoForm {
  nomeProduto: string;
  valor: string;
  imagemUrl: string;
}

const produtosIniciais: Produto[] = [
  { id: 1, img: 'produtos', nomeProduto: 'Pomada Modeladora Premium', valor: '45,00' },
  { id: 2, img: 'produtos', nomeProduto: 'Óleo para Barba',           valor: '38,00' },
  { id: 3, img: 'produtos', nomeProduto: 'Kit Iniciante',              valor: '89,00' },
  { id: 4, img: 'produtos', nomeProduto: 'Kit Tesouras',               valor: '85,00' },
];

const formVazio: NovoProdutoForm = {
  nomeProduto: '',
  valor: '',
  imagemUrl: '',
};

function ProductsPage() {
  const [produtos, setProdutos] = useState<Produto[]>(produtosIniciais);
  const [modalAberto, setModalAberto] = useState<boolean>(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [form, setForm] = useState<NovoProdutoForm>(formVazio);
  const [errosCampos, setErrosCampos] = useState<{ valor?: string }>({});
  const { perfil } = useAuth();
  const { mostrarToast } = useToast();
  const isAdmin = perfil === 'ADMIN';

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    if (name === 'valor') {
      setForm(prev => ({ ...prev, valor: mascaraPreco(value) }));
      if (errosCampos.valor) setErrosCampos(prev => ({ ...prev, valor: '' }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
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

  function abrirEdicao(p: Produto): void {
    setForm({
      nomeProduto: p.nomeProduto,
      valor: p.valor,
      imagemUrl: p.img.startsWith('data:') || p.img.startsWith('http') ? p.img : '',
    });
    setEditandoId(p.id);
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

    if (!form.valor || !/^\d+(?:,\d{1,2})?$/.test(form.valor)) {
      setErrosCampos({ valor: 'Informe um preço válido. Ex: 52,90' });
      return;
    }

    if (editandoId !== null) {
      setProdutos(prev => prev.map(p => p.id === editandoId ? {
        ...p,
        nomeProduto: form.nomeProduto,
        valor: form.valor,
        img: form.imagemUrl || p.img,
      } : p));
      mostrarToast(`Produto "${form.nomeProduto}" atualizado com sucesso!`);
    } else {
      const novo: Produto = {
        id: Date.now(),
        img: form.imagemUrl || 'produtos',
        nomeProduto: form.nomeProduto,
        valor: form.valor,
      };
      setProdutos(prev => [...prev, novo]);
      mostrarToast(`Produto "${form.nomeProduto}" adicionado com sucesso!`);
    }

    fecharModal();
  }

  function deletarProduto(id: number, nome: string): void {
    setProdutos(prev => prev.filter(p => p.id !== id));
    mostrarToast(`Produto "${nome}" removido.`, 'removido');
  }

  return (
    <>
      <main className="principal__planos">
        <TituloTextoPadrao
          titulo="Nossos Produtos"
          texto="Produtos premium selecionados para você cuidar do seu visual em casa"
        />

        {isAdmin && (
          <div className="admin__adicionar">
            <button className="admin__botao-adicionar" onClick={() => { setEditandoId(null); setModalAberto(true); }}>
              <i className="fa-solid fa-plus"></i> Adicionar Produto
            </button>
          </div>
        )}

        <section className="produtos__cartoes-container">
          {produtos.map(p => (
            <Products
              key={p.id}
              img={p.img}
              nomeProduto={p.nomeProduto}
              valor={p.valor}
              isAdmin={isAdmin}
              aoAdicionarCarrinho={() => mostrarToast(`"${p.nomeProduto}" adicionado ao carrinho!`)}
              aoEditar={() => abrirEdicao(p)}
              aoDeletar={() => deletarProduto(p.id, p.nomeProduto)}
            />
          ))}
        </section>

        <section className="produtos__final">
          <button className="produtos__ver-todos" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Ver Todos os Produtos
          </button>
        </section>
      </main>

      {modalAberto && (
        <Modal
          titulo={editandoId !== null ? 'Editar Produto' : 'Adicionar Produto'}
          onFechar={fecharModal}
        >
          <form className="modal__form" onSubmit={handleSalvar}>
            <div className="modal__campo">
              <label htmlFor="nomeProduto">Nome do produto</label>
              <input id="nomeProduto" type="text" name="nomeProduto" value={form.nomeProduto} onChange={handleChange} placeholder="Ex: Cera Matte Extreme" required />
            </div>
            <div className="modal__campo">
              <label htmlFor="valor">Preço (R$)</label>
              <input
                id="valor"
                type="text"
                inputMode="decimal"
                name="valor"
                value={form.valor}
                onChange={handleChange}
                placeholder="Ex: 52,90"
                required
                className={errosCampos.valor ? 'input--invalido' : ''}
              />
              {errosCampos.valor && <span className="erro-campo">{errosCampos.valor}</span>}
            </div>
            <div className="modal__campo">
              <label htmlFor="imagem-produto">Foto do produto</label>
              <input id="imagem-produto" type="file" accept="image/*" onChange={handleImagemChange} />
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

export default ProductsPage;
