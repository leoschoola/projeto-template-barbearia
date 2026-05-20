import './Products.css';

interface ProductsProps {
  img: string;
  nomeProduto: string;
  valor: string;
  isAdmin?: boolean;
  aoAdicionarCarrinho?: () => void;
  aoDeletar?: () => void;
  aoEditar?: () => void;
}

const Products = ({ img, nomeProduto, valor, isAdmin, aoAdicionarCarrinho, aoDeletar, aoEditar }: ProductsProps) => {
  const imgSrc = img.startsWith('data:') || img.startsWith('http')
    ? img
    : `${process.env.PUBLIC_URL}/imagens/${img}.jpg`;

  return (
    <article className="produto__card">
      {isAdmin && (
        <div className="admin-controles">
          <button className="admin-controles__btn admin-controles__btn--editar" onClick={aoEditar} title="Editar produto">
            <i className="fa-solid fa-pen" />
          </button>
          <button className="admin-controles__btn admin-controles__btn--deletar" onClick={aoDeletar} title="Remover produto">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
      )}
      <div className="produto__imagem-container">
        <img src={imgSrc} alt={`imagem ${nomeProduto}`} className="produto__foto" />
      </div>
      <div className="produto__info">
        <h3 className="produto__nome">{nomeProduto}</h3>
        <p className="produto__preco-atual">R$ {valor}</p>
        <button className="produto__botao-carrinho" onClick={aoAdicionarCarrinho}>
          <i className="fa-solid fa-shopping-cart"></i> Adicionar ao Carrinho
        </button>
      </div>
    </article>
  );
};

export default Products;
